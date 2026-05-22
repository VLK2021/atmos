import type {
    AlertsResponse,
    AstronomyResponse,
    CurrentWeatherResponse,
    ForecastResponse,
    IpLookupResponse,
    SearchLocation,
    TimezoneResponse,
    WeatherApiLang,
    WeatherMapLayer,
    WeatherQuery,
} from "@/src/types";

const WEATHER_API_BASE_URL = "https://api.weatherapi.com/v1";
const WEATHER_MAPS_BASE_URL = "https://weathermaps.weatherapi.com";

type RequestParams = Record<string, string | number | boolean | undefined>;

const getWeatherApiKey = (): string => {
    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
        throw new Error("WEATHER_API_KEY is missing in .env.local");
    }

    return apiKey;
};

const buildWeatherApiUrl = (endpoint: string, params: RequestParams = {}): string => {
    const url = new URL(`${WEATHER_API_BASE_URL}/${endpoint}`);

    url.searchParams.set("key", getWeatherApiKey());

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
            url.searchParams.set(key, String(value));
        }
    });

    return url.toString();
};

const fetchWeatherApi = async <T>(
    endpoint: string,
    params: RequestParams = {},
    revalidate = 300,
): Promise<T> => {
    const url = buildWeatherApiUrl(endpoint, params);

    const response = await fetch(url, {
        next: {
            revalidate,
        },
    });

    if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
            `WeatherAPI request failed: ${response.status} ${response.statusText}. ${errorText}`,
        );
    }

    return response.json() as Promise<T>;
};

export const weatherService = {
    getCurrent: ({
                     query,
                     lang = "uk",
                 }: {
        query: WeatherQuery;
        lang?: WeatherApiLang;
    }) => {
        return fetchWeatherApi<CurrentWeatherResponse>("current.json", {
            q: query,
            lang,
            aqi: "yes",
        });
    },

    getForecast: ({
                      query,
                      lang = "uk",
                      days = 14,
                  }: {
        query: WeatherQuery;
        lang?: WeatherApiLang;
        days?: number;
    }) => {
        return fetchWeatherApi<ForecastResponse>("forecast.json", {
            q: query,
            lang,
            days,
            aqi: "yes",
            alerts: "yes",
        });
    },

    searchLocations: ({ query }: { query: string }) => {
        if (query.trim().length < 2) {
            return Promise.resolve([]);
        }

        return fetchWeatherApi<SearchLocation[]>(
            "search.json",
            {
                q: query,
            },
            86400,
        );
    },

    getAstronomy: ({
                       query,
                       date,
                   }: {
        query: WeatherQuery;
        date?: string;
    }) => {
        return fetchWeatherApi<AstronomyResponse>("astronomy.json", {
            q: query,
            dt: date,
        });
    },

    getTimezone: ({ query }: { query: WeatherQuery }) => {
        return fetchWeatherApi<TimezoneResponse>(
            "timezone.json",
            {
                q: query,
            },
            3600,
        );
    },

    getIpLookup: ({ query = "auto:ip" }: { query?: string }) => {
        return fetchWeatherApi<IpLookupResponse>(
            "ip.json",
            {
                q: query,
            },
            3600,
        );
    },

    getAlerts: ({
                    query,
                    lang = "uk",
                }: {
        query: WeatherQuery;
        lang?: WeatherApiLang;
    }) => {
        return fetchWeatherApi<AlertsResponse>("alerts.json", {
            q: query,
            lang,
        });
    },

    getWeatherMapTileUrl: ({
                               layer,
                               date,
                               hour,
                               z,
                               x,
                               y,
                           }: {
        layer: WeatherMapLayer;
        date: string;
        hour: string;
        z: number;
        x: number;
        y: number;
    }) => {
        return `${WEATHER_MAPS_BASE_URL}/${layer}/tiles/${date}${hour}/${z}/${x}/${y}.png`;
    },
};