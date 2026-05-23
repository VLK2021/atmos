"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useLanguage } from "@/src/context";
import en from "@/src/locales/en";
import uk from "@/src/locales/uk";
import type { ForecastResponse } from "@/src/types";

import {
    ForecastDailyCards,
    ForecastHero,
    ForecastHourlyTimeline,
    ForecastInsights,
    ForecastRainChart,
    ForecastSkeleton,
    ForecastTemperatureChart,
    ForecastWindChart,
} from "@/src/components/forecast";

const DEFAULT_CITY = "Lviv";

export const ForecastPage = () => {
    const searchParams = useSearchParams();

    const { lang } = useLanguage();
    const t = lang === "en" ? en : uk;

    const selectedCity = searchParams.get("q") || DEFAULT_CITY;

    const [data, setData] = useState<ForecastResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const loadForecast = async () => {
            try {
                setLoading(true);
                setError("");

                const params = new URLSearchParams({
                    q: selectedCity,
                    lang,
                    days: "14",
                });

                const response = await fetch(`/api/weather/forecast?${params}`, {
                    signal: controller.signal,
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error("Failed to load forecast");
                }

                const result: ForecastResponse = await response.json();
                setData(result);
            } catch (error) {
                if (error instanceof DOMException && error.name === "AbortError") return;

                setError(t.failedLoadWeather);
            } finally {
                setLoading(false);
            }
        };

        loadForecast();

        return () => controller.abort();
    }, [selectedCity, lang, t.failedLoadWeather]);

    if (loading) return <ForecastSkeleton />;

    if (error || !data) {
        return (
            <section className="mx-auto w-full max-w-[1440px] rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card)] p-5 text-[var(--color-error)] shadow-[var(--shadow-card)] backdrop-blur-[18px]">
                {error || t.noWeatherData}
            </section>
        );
    }

    const days = data.forecast.forecastday;
    const today = days[0];

    return (
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 overflow-hidden">
            <ForecastHero data={data} t={t} />

            <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]">
                <ForecastTemperatureChart days={days} t={t} />
                <ForecastInsights days={days} t={t} />
            </div>

            <ForecastHourlyTimeline hours={today.hour} t={t} />

            <div className="grid min-w-0 gap-4 xl:grid-cols-2">
                <ForecastRainChart days={days} t={t} />
                <ForecastWindChart days={days} t={t} />
            </div>

            <ForecastDailyCards days={days} t={t} />
        </div>
    );
};