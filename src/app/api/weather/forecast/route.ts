import { NextRequest, NextResponse } from "next/server";

import { weatherService } from "@/src/services";
import { getValidLanguage } from "@/src/helpers";

export const revalidate = 300;

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const query = searchParams.get("q")?.trim();
        const lang = getValidLanguage(searchParams.get("lang") || undefined);

        const daysParam = Number(searchParams.get("days") || 14);
        const days = Number.isFinite(daysParam)
            ? Math.min(Math.max(daysParam, 1), 14)
            : 14;

        if (!query) {
            return NextResponse.json(
                {
                    message: "Query parameter q is required.",
                    example: "/api/weather/forecast?q=Lviv&lang=uk&days=14",
                },
                { status: 400 },
            );
        }

        const data = await weatherService.getForecast({
            query,
            lang,
            days,
        });

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