"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useLanguage } from "@/src/context";
import en from "@/src/locales/en";
import uk from "@/src/locales/uk";
import type { WeatherHistoryResponse } from "@/src/types";

import {
    HistoryDailyCards,
    HistoryHero,
    HistoryRainChart,
    HistorySkeleton,
    HistoryStatsCards,
    HistoryTemperatureChart,
} from "@/src/components/history";

const DEFAULT_CITY = "Lviv";

export const HistoryPage = () => {
    const searchParams = useSearchParams();

    const { lang } = useLanguage();
    const t = lang === "en" ? en : uk;

    const selectedCity = searchParams.get("q") || DEFAULT_CITY;

    const [data, setData] = useState<WeatherHistoryResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const loadHistory = async () => {
            try {
                setLoading(true);
                setError("");

                const params = new URLSearchParams({
                    q: selectedCity,
                    lang,
                    days: "7",
                });

                const response = await fetch(`/api/weather/history?${params}`, {
                    signal: controller.signal,
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error("Failed to load history");
                }

                const result: WeatherHistoryResponse = await response.json();
                setData(result);
            } catch (error) {
                if (error instanceof DOMException && error.name === "AbortError") return;
                setError(t.failedLoadWeather);
            } finally {
                setLoading(false);
            }
        };

        loadHistory();

        return () => controller.abort();
    }, [selectedCity, lang, t.failedLoadWeather]);

    if (loading) return <HistorySkeleton />;

    if (error || !data) {
        return (
            <section className="mx-auto w-full max-w-[1440px] rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card)] p-5 text-[var(--color-error)] shadow-[var(--shadow-card)] backdrop-blur-[18px]">
                {error || t.noWeatherData}
            </section>
        );
    }

    const days = data.forecast.forecastday;

    return (
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 overflow-hidden">
            <HistoryHero data={data} t={t} />

            <HistoryStatsCards days={days} t={t} />

            <div className="grid min-w-0 gap-4 xl:grid-cols-2">
                <HistoryTemperatureChart days={days} t={t} />
                <HistoryRainChart days={days} t={t} />
            </div>

            <HistoryDailyCards days={days} t={t} />
        </div>
    );
};