import { NextRequest, NextResponse } from "next/server";

import { weatherService } from "@/src/services";
import { getValidLanguage } from "@/src/helpers";

export const revalidate = 300;

const MAX_FREE_FORECAST_DAYS = 3;

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const query = searchParams.get("q")?.trim();
        const lang = getValidLanguage(searchParams.get("lang") || undefined);

        const daysParam = Number(searchParams.get("days") || MAX_FREE_FORECAST_DAYS);
        const days = Number.isFinite(daysParam)
            ? Math.min(Math.max(daysParam, 1), MAX_FREE_FORECAST_DAYS)
            : MAX_FREE_FORECAST_DAYS;

        if (!query) {
            return NextResponse.json(
                {
                    message: "Query parameter q is required.",
                    example: "/api/weather/forecast?q=Lviv&lang=uk&days=3",
                },
                { status: 400 },
            );
        }

        const data = await weatherService.getForecast({
            query,
            lang,
            days,
        });

        const forecastDays = data?.forecast?.forecastday;

        if (!Array.isArray(forecastDays) || forecastDays.length === 0) {
            return NextResponse.json(
                {
                    message: "No forecast data available.",
                    details: "Weather provider response does not contain forecast.forecastday.",
                },
                { status: 502 },
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Forecast API error:", error);

        return NextResponse.json(
            {
                message: "Failed to fetch weather forecast.",
            },
            { status: 500 },
        );
    }
}