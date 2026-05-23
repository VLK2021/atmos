import { NextRequest, NextResponse } from "next/server";

const WEATHER_API_BASE_URL = "https://api.weatherapi.com/v1";

const getPastDate = (daysAgo: number) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const apiKey = process.env.WEATHER_API_KEY;
        const q = searchParams.get("q") || "Lviv";
        const lang = searchParams.get("lang") || "uk";
        const days = Math.min(Number(searchParams.get("days") || 7), 7);

        if (!apiKey) {
            return NextResponse.json(
                { message: "WEATHER_API_KEY is missing" },
                { status: 500 },
            );
        }

        const requests = Array.from({ length: days }, (_, index) => {
            const date = getPastDate(index + 1);

            const params = new URLSearchParams({
                key: apiKey,
                q,
                dt: date,
                lang,
            });

            return fetch(`${WEATHER_API_BASE_URL}/history.json?${params}`, {
                cache: "no-store",
            }).then(async (response) => {
                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(text);
                }

                return response.json();
            });
        });

        const results = await Promise.all(requests);

        const first = results[0];

        return NextResponse.json({
            location: first.location,
            forecast: {
                forecastday: results
                    .flatMap((item) => item.forecast.forecastday)
                    .sort((a, b) => a.date.localeCompare(b.date)),
            },
        });
    } catch (error) {
        console.error("Weather history API error:", error);

        return NextResponse.json(
            { message: "Failed to load weather history" },
            { status: 500 },
        );
    }
}