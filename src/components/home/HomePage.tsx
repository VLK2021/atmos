"use client";

import { useEffect, useState } from "react";

import { useLanguage } from "@/src/context";
import en from "@/src/locales/en";
import uk from "@/src/locales/uk";
import type { ForecastResponse } from "@/src/types";

import {
    AirQualityCard,
    AstronomyCard,
    DataSourceFooter,
    HeroWeatherCard,
    HomeSkeleton,
    HourlyForecastCard,
    PrecipitationCard,
    WeatherAlertsCard,
    WeatherMapPreviewCard,
    WeatherMetricCards,
    WeeklyForecastCard,
} from "@/src/components/home";

export const HomePage = () => {
    const { lang } = useLanguage();
    const t = lang === "en" ? en : uk;

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
                        cache: "no-store",
                    },
                );

                if (!response.ok) {
                    throw new Error("Failed to load weather data");
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

        loadWeather();

        return () => controller.abort();
    }, [lang, t.failedLoadWeather]);

    if (loading) return <HomeSkeleton />;

    if (error || !data) {
        return (
            <section className="mx-auto w-full max-w-[1440px] rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card)] p-5 text-[var(--color-error)] shadow-[var(--shadow-card)] backdrop-blur-[18px]">
                {error || t.noWeatherData}
            </section>
        );
    }

    const today = data.forecast.forecastday[0];

    return (
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 overflow-hidden">
            <HeroWeatherCard data={data} t={t} />

            <WeatherAlertsCard alerts={data.alerts?.alert} t={t} />

            <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.85fr)]">
                <HourlyForecastCard hours={today.hour} t={t} />
                <AirQualityCard airQuality={data.current.air_quality} t={t} />
            </div>

            <div className="grid min-w-0 items-stretch gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.85fr)]">
                <WeeklyForecastCard days={data.forecast.forecastday} t={t} />
                <AstronomyCard astro={today.astro} t={t} />
            </div>

            <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <PrecipitationCard day={today} t={t} />
                <WeatherMapPreviewCard
                    t={t}
                    lat={data.location.lat}
                    lon={data.location.lon}
                    city={data.location.name}
                />
            </div>

            <WeatherMetricCards current={data.current} t={t} />

            <DataSourceFooter data={data} t={t} />
        </div>
    );
};