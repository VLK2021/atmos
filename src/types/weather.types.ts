export type WeatherApiLang = "uk" | "en";

export type WeatherQuery = string;

export type WeatherMapLayer = "tmp2m" | "precip" | "pressure" | "wind";

export type WeatherCondition = {
    text: string;
    icon: string;
    code: number;
};

export type WeatherLocation = {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
};

export type AirQuality = {
    co: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    "us-epa-index": number;
    "gb-defra-index": number;
};

export type CurrentWeather = {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: WeatherCondition;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
    air_quality?: AirQuality;
};

export type Astro = {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: number;
    is_moon_up: number;
    is_sun_up: number;
};

export type ForecastDayInfo = {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    totalsnow_cm: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    condition: WeatherCondition;
    uv: number;
    air_quality?: AirQuality;
};

export type ForecastHour = {
    time_epoch: number;
    time: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: WeatherCondition;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    snow_cm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    will_it_rain: number;
    chance_of_rain: number;
    will_it_snow: number;
    chance_of_snow: number;
    vis_km: number;
    vis_miles: number;
    gust_mph: number;
    gust_kph: number;
    uv: number;
    air_quality?: AirQuality;
};

export type ForecastDay = {
    date: string;
    date_epoch: number;
    day: ForecastDayInfo;
    astro: Astro;
    hour: ForecastHour[];
};

export type WeatherAlert = {
    headline: string;
    msgtype: string;
    severity: string;
    urgency: string;
    areas: string;
    category: string;
    certainty: string;
    event: string;
    note: string;
    effective: string;
    expires: string;
    desc: string;
    instruction: string;
};

export type CurrentWeatherResponse = {
    location: WeatherLocation;
    current: CurrentWeather;
};

export type ForecastResponse = {
    location: WeatherLocation;
    current: CurrentWeather;
    forecast: {
        forecastday: ForecastDay[];
    };
    alerts?: {
        alert: WeatherAlert[];
    };
};

export type AstronomyResponse = {
    location: WeatherLocation;
    astronomy: {
        astro: Astro;
    };
};

export type TimezoneResponse = {
    location: WeatherLocation;
};

export type SearchLocation = {
    id: number;
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    url: string;
};

export type IpLookupResponse = {
    ip: string;
    type: string;
    continent_code: string;
    continent_name: string;
    country_code: string;
    country_name: string;
    is_eu: boolean;
    geoname_id: string;
    city: string;
    region: string;
    lat: number;
    lon: number;
    tz_id: string;
};

export type AlertsResponse = {
    location: WeatherLocation;
    alerts: {
        alert: WeatherAlert[];
    };
};