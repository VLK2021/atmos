import { NextRequest, NextResponse } from "next/server";

import { weatherService } from "@/src/services";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("q")?.trim();

        if (!query || query.length < 2) {
            return NextResponse.json([]);
        }

        const data = await weatherService.searchLocations({ query });

        return NextResponse.json(data);
    } catch (error) {
        console.error("Weather search API error:", error);

        return NextResponse.json([], { status: 200 });
    }
}