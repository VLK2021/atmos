"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useLanguage } from "@/src/context";
import en from "@/src/locales/en";
import uk from "@/src/locales/uk";
import type { ForecastResponse } from "@/src/types";

import {
    AstronomyDailyCards,
    AstronomyHero,
    AstronomySkeleton,
    MoonDetailsCard,
    SunCycleCard,
} from "@/src/components/astronomy";

const DEFAULT_CITY = "Lviv";

export const AstronomyPage = () => {
    const searchParams = useSearchParams();

    const { lang } = useLanguage();
    const t = lang === "en" ? en : uk;

    const selectedCity = searchParams.get("q") || DEFAULT_CITY;

    const [data, setData] = useState<ForecastResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const loadAstronomy = async () => {
            try {
                setLoading(true);
                setError("");

                const params = new URLSearchParams({
                    q: selectedCity,
                    lang,
                    days: "7",
                });

                const response = await fetch(`/api/weather/forecast?${params}`, {
                    signal: controller.signal,
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error("Failed to load astronomy data");
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

        loadAstronomy();

        return () => controller.abort();
    }, [selectedCity, lang, t.failedLoadWeather]);

    if (loading) return <AstronomySkeleton />;

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
            <AstronomyHero data={data} t={t} />

            <div className="grid min-w-0 gap-4 xl:grid-cols-2">
                <SunCycleCard astro={today.astro} t={t} />
                <MoonDetailsCard astro={today.astro} t={t} />
            </div>

            <AstronomyDailyCards days={days} t={t} />
        </div>
    );
};