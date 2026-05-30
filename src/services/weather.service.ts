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

const OPEN_METEO_GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const OPEN_METEO_FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

const MAX_FREE_FORECAST_DAYS = 3;

type RequestParams = Record<string, string | number | boolean | undefined>;

type WeatherApiErrorResponse = {
    error?: {
        code?: number;
        message?: string;
    };
};

type OpenMeteoLocation = {
    name: string;
    latitude: number;
    longitude: number;
    country?: string;
    timezone?: string;
};

type OpenMeteoGeocodingResponse = {
    results?: OpenMeteoLocation[];
};

type OpenMeteoForecastResponse = {
    latitude: number;
    longitude: number;
    timezone: string;
    current?: {
        temperature_2m?: number;
        relative_humidity_2m?: number;
        apparent_temperature?: number;
        precipitation?: number;
        weather_code?: number;
        wind_speed_10m?: number;
        wind_direction_10m?: number;
        pressure_msl?: number;
        cloud_cover?: number;
        is_day?: number;
    };
    hourly?: {
        time?: string[];
        temperature_2m?: number[];
        relative_humidity_2m?: number[];
        apparent_temperature?: number[];
        precipitation?: number[];
        weather_code?: number[];
        wind_speed_10m?: number[];
        wind_direction_10m?: number[];
        pressure_msl?: number[];
        cloud_cover?: number[];
    };
    daily?: {
        time?: string[];
        weather_code?: number[];
        temperature_2m_max?: number[];
        temperature_2m_min?: number[];
        sunrise?: string[];
        sunset?: string[];
        precipitation_sum?: number[];
        wind_speed_10m_max?: number[];
    };
};

const emptyAirQuality = {
    co: 0,
    no2: 0,
    o3: 0,
    so2: 0,
    pm2_5: 0,
    pm10: 0,
    "us-epa-index": 0,
    "gb-defra-index": 0,
};

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
        next: { revalidate },
    });

    const json = (await response.json()) as T & WeatherApiErrorResponse;

    if (!response.ok || json?.error) {
        throw new Error(
            json?.error?.message ||
            `WeatherAPI request failed: ${response.status} ${response.statusText}`,
        );
    }

    return json as T;
};

const getOpenMeteoConditionText = (code?: number): string => {
    if (code === 0) return "Clear";
    if ([1, 2, 3].includes(code ?? -1)) return "Partly cloudy";
    if ([45, 48].includes(code ?? -1)) return "Fog";
    if ([51, 53, 55, 56, 57].includes(code ?? -1)) return "Drizzle";
    if ([61, 63, 65, 66, 67].includes(code ?? -1)) return "Rain";
    if ([71, 73, 75, 77].includes(code ?? -1)) return "Snow";
    if ([80, 81, 82].includes(code ?? -1)) return "Rain showers";
    if ([95, 96, 99].includes(code ?? -1)) return "Thunderstorm";

    return "Unknown";
};

const formatOpenMeteoTime = (time: string): string => {
    return time.replace("T", " ");
};

const getOpenMeteoLocation = async (query: WeatherQuery): Promise<OpenMeteoLocation> => {
    const url = new URL(OPEN_METEO_GEOCODING_URL);

    url.searchParams.set("name", String(query));
    url.searchParams.set("count", "1");
    url.searchParams.set("language", "en");
    url.searchParams.set("format", "json");

    const response = await fetch(url.toString(), {
        next: { revalidate: 86400 },
    });

    if (!response.ok) {
        throw new Error("Open-Meteo geocoding failed");
    }

    const data = (await response.json()) as OpenMeteoGeocodingResponse;
    const location = data.results?.[0];

    if (!location) {
        throw new Error("Location not found in Open-Meteo");
    }

    return location;
};

const getOpenMeteoForecast = async ({
                                        query,
                                        days,
                                    }: {
    query: WeatherQuery;
    days: number;
}): Promise<ForecastResponse> => {
    const location = await getOpenMeteoLocation(query);

    const safeDays = Math.min(Math.max(days, 1), MAX_FREE_FORECAST_DAYS);

    const url = new URL(OPEN_METEO_FORECAST_URL);

    url.searchParams.set("latitude", String(location.latitude));
    url.searchParams.set("longitude", String(location.longitude));
    url.searchParams.set("forecast_days", String(safeDays));
    url.searchParams.set("timezone", "auto");

    url.searchParams.set(
        "current",
        [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "precipitation",
            "weather_code",
            "wind_speed_10m",
            "wind_direction_10m",
            "pressure_msl",
            "cloud_cover",
            "is_day",
        ].join(","),
    );

    url.searchParams.set(
        "hourly",
        [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "precipitation",
            "weather_code",
            "wind_speed_10m",
            "wind_direction_10m",
            "pressure_msl",
            "cloud_cover",
        ].join(","),
    );

    url.searchParams.set(
        "daily",
        [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
            "sunrise",
            "sunset",
            "precipitation_sum",
            "wind_speed_10m_max",
        ].join(","),
    );

    const response = await fetch(url.toString(), {
        next: { revalidate: 300 },
    });

    if (!response.ok) {
        throw new Error("Open-Meteo forecast failed");
    }

    const data = (await response.json()) as OpenMeteoForecastResponse;

    const dailyTimes = data.daily?.time ?? [];
    const hourlyTimes = data.hourly?.time ?? [];

    const forecastday = dailyTimes.map((date, dayIndex) => {
        const hours = hourlyTimes
            .map((time, index) => ({ time, index }))
            .filter(({ time }) => time.startsWith(date))
            .map(({ time, index }) => {
                const code = data.hourly?.weather_code?.[index];

                return {
                    time: formatOpenMeteoTime(time),
                    temp_c: data.hourly?.temperature_2m?.[index] ?? 0,
                    feelslike_c: data.hourly?.apparent_temperature?.[index] ?? 0,
                    humidity: data.hourly?.relative_humidity_2m?.[index] ?? 0,
                    precip_mm: data.hourly?.precipitation?.[index] ?? 0,
                    wind_kph: data.hourly?.wind_speed_10m?.[index] ?? 0,
                    wind_degree: data.hourly?.wind_direction_10m?.[index] ?? 0,
                    pressure_mb: data.hourly?.pressure_msl?.[index] ?? 0,
                    cloud: data.hourly?.cloud_cover?.[index] ?? 0,
                    chance_of_rain: 0,
                    chance_of_snow: 0,
                    condition: {
                        text: getOpenMeteoConditionText(code),
                        icon: "",
                        code: code ?? 0,
                    },
                };
            });

        const maxTemp = data.daily?.temperature_2m_max?.[dayIndex] ?? 0;
        const minTemp = data.daily?.temperature_2m_min?.[dayIndex] ?? 0;
        const dayCode = data.daily?.weather_code?.[dayIndex];

        return {
            date,
            day: {
                maxtemp_c: maxTemp,
                mintemp_c: minTemp,
                avgtemp_c: (maxTemp + minTemp) / 2,
                maxwind_kph: data.daily?.wind_speed_10m_max?.[dayIndex] ?? 0,
                totalprecip_mm: data.daily?.precipitation_sum?.[dayIndex] ?? 0,
                avghumidity: 0,
                daily_chance_of_rain: 0,
                daily_chance_of_snow: 0,
                condition: {
                    text: getOpenMeteoConditionText(dayCode),
                    icon: "",
                    code: dayCode ?? 0,
                },
            },
            astro: {
                sunrise: data.daily?.sunrise?.[dayIndex]?.split("T")[1] ?? "",
                sunset: data.daily?.sunset?.[dayIndex]?.split("T")[1] ?? "",
                moonrise: "",
                moonset: "",
                moon_phase: "",
                moon_illumination: 0,
            },
            hour: hours,
        };
    });

    const currentCode = data.current?.weather_code;

    return {
        location: {
            name: location.name,
            region: location.country ?? "",
            country: location.country ?? "",
            lat: location.latitude,
            lon: location.longitude,
            tz_id: location.timezone ?? data.timezone,
            localtime_epoch: Math.floor(Date.now() / 1000),
            localtime: new Date().toISOString().slice(0, 16).replace("T", " "),
        },
        current: {
            last_updated_epoch: Math.floor(Date.now() / 1000),
            last_updated: new Date().toISOString().slice(0, 16).replace("T", " "),
            temp_c: data.current?.temperature_2m ?? 0,
            feelslike_c: data.current?.apparent_temperature ?? 0,
            humidity: data.current?.relative_humidity_2m ?? 0,
            precip_mm: data.current?.precipitation ?? 0,
            wind_kph: data.current?.wind_speed_10m ?? 0,
            wind_degree: data.current?.wind_direction_10m ?? 0,
            pressure_mb: data.current?.pressure_msl ?? 0,
            cloud: data.current?.cloud_cover ?? 0,
            is_day: data.current?.is_day ?? 1,
            condition: {
                text: getOpenMeteoConditionText(currentCode),
                icon: "",
                code: currentCode ?? 0,
            },
            air_quality: emptyAirQuality,
        },
        forecast: {
            forecastday,
        },
        alerts: {
            alert: [],
        },
    } as unknown as ForecastResponse;
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

    getForecast: async ({
                            query,
                            lang = "uk",
                            days = MAX_FREE_FORECAST_DAYS,
                        }: {
        query: WeatherQuery;
        lang?: WeatherApiLang;
        days?: number;
    }) => {
        const safeDays = Math.min(Math.max(days, 1), MAX_FREE_FORECAST_DAYS);

        try {
            const data = await fetchWeatherApi<ForecastResponse>("forecast.json", {
                q: query,
                lang,
                days: safeDays,
                aqi: "yes",
                alerts: "yes",
            });

            if (data?.forecast?.forecastday?.length) {
                return data;
            }

            return getOpenMeteoForecast({
                query,
                days: safeDays,
            });
        } catch {
            return getOpenMeteoForecast({
                query,
                days: safeDays,
            });
        }
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