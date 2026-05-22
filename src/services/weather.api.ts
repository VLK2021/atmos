import type { ForecastResponse } from "@/src/types";

type ForecastParams = {
    query: string;
    lang?: "uk" | "en";
    days?: number;
};

export const weatherApi = {
    getForecast: async ({
                            query,
                            lang = "uk",
                            days = 14,
                        }: ForecastParams): Promise<ForecastResponse> => {
        const params = new URLSearchParams({
            q: query,
            lang,
            days: String(days),
        });

        const response = await fetch(`/api/weather/forecast?${params}`);

        if (!response.ok) {
            throw new Error("Failed to fetch forecast");
        }

        return response.json();
    },
};