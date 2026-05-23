import type { ForecastDay } from "@/src/types";

export type WeatherHistoryResponse = {
    location: {
        name: string;
        region: string;
        country: string;
        lat: number;
        lon: number;
        tz_id: string;
        localtime_epoch: number;
        localtime: string;
    };
    forecast: {
        forecastday: ForecastDay[];
    };
};

export type WeatherHistoryDay = ForecastDay;