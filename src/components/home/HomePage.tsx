"use client";

import { useEffect, useState } from "react";

import { useLanguage } from "@/src/context";
import type { ForecastResponse } from "@/src/types";

import {
    AirQualityCard,
    AstronomyCard,
    HeroWeatherCard,
    HomeSkeleton,
    HourlyForecastCard,
    WeatherMetricCards,
    WeeklyForecastCard,
} from "@/src/components/home";

export const HomePage = () => {
    const { lang } = useLanguage();

    const [data, setData] = useState<ForecastResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const loadWeather = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `/api/weather/forecast?q=Lviv&lang=${lang}&days=7`,
                    {
                        signal: controller.signal,
                    },
                );

                if (!response.ok) {
                    throw new Error("Failed to load weather data");
                }

                const result: ForecastResponse = await response.json();
                setData(result);
            } catch (error) {
                if (error instanceof DOMException && error.name === "AbortError") {
                    return;
                }

                setError("Failed to load weather data");
            } finally {
                setLoading(false);
            }
        };

        loadWeather();

        return () => controller.abort();
    }, [lang]);

    if (loading) {
        return <HomeSkeleton />;
    }

    if (error || !data) {
        return (
            <section className="mx-auto w-full max-w-[1440px] rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)] p-6 text-[var(--color-error)] shadow-[var(--shadow-card)] backdrop-blur-[18px]">
                {error || "No weather data"}
            </section>
        );
    }

    const today = data.forecast.forecastday[0];

    return (
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 overflow-hidden">
            <HeroWeatherCard data={data} />

            <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.85fr)]">
                <div className="flex min-w-0 flex-col gap-4">
                    <HourlyForecastCard hours={today.hour} />
                    <WeeklyForecastCard days={data.forecast.forecastday} />
                </div>

                <div className="flex min-w-0 flex-col gap-4">
                    <AirQualityCard airQuality={data.current.air_quality} />
                    <AstronomyCard astro={today.astro} />
                </div>
            </div>

            <WeatherMetricCards current={data.current} />
        </div>
    );
};