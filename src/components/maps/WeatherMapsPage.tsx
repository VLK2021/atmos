"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import { useLanguage } from "@/src/context";
import en from "@/src/locales/en";
import uk from "@/src/locales/uk";
import type { ForecastResponse, WeatherMapLayer } from "@/src/types";

import {
    MapHero,
    MapLayerControls,
    MapLegend,
    MapSkeleton,
} from "@/src/components/maps";

const WeatherInteractiveMap = dynamic(
    () =>
        import("@/src/components/maps/WeatherInteractiveMap").then(
            (mod) => mod.WeatherInteractiveMap,
        ),
    {
        ssr: false,
    },
);

const DEFAULT_CITY = "Lviv";

export const WeatherMapsPage = () => {
    const searchParams = useSearchParams();

    const { lang } = useLanguage();
    const t = lang === "en" ? en : uk;

    const selectedCity = searchParams.get("q") || DEFAULT_CITY;

    const [data, setData] = useState<ForecastResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [activeLayer, setActiveLayer] = useState<WeatherMapLayer>("precip");
    const [opacity, setOpacity] = useState(0.55);

    useEffect(() => {
        const controller = new AbortController();

        const loadMapsData = async () => {
            try {
                setLoading(true);
                setError("");

                const params = new URLSearchParams({
                    q: selectedCity,
                    lang,
                    days: "1",
                });

                const response = await fetch(`/api/weather/forecast?${params}`, {
                    signal: controller.signal,
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error("Failed to load map data");
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

        loadMapsData();

        return () => controller.abort();
    }, [selectedCity, lang, t.failedLoadWeather]);

    if (loading) return <MapSkeleton />;

    if (error || !data) {
        return (
            <section className="mx-auto w-full max-w-[1440px] rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card)] p-5 text-[var(--color-error)] shadow-[var(--shadow-card)] backdrop-blur-[18px]">
                {error || t.noWeatherData}
            </section>
        );
    }

    return (
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 overflow-hidden">
            <MapHero data={data} t={t} />

            <div className="grid min-w-0 gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
                <aside className="flex min-w-0 flex-col gap-4">
                    <MapLayerControls
                        t={t}
                        activeLayer={activeLayer}
                        opacity={opacity}
                        onLayerChange={setActiveLayer}
                        onOpacityChange={setOpacity}
                    />

                    <MapLegend t={t} layer={activeLayer} />
                </aside>

                <motion.section
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="relative min-h-[620px] overflow-hidden rounded-[30px] border border-[var(--color-border)] bg-[var(--color-card)] p-3 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
                >
                    <div className="h-[calc(100vh-260px)] min-h-[560px] overflow-hidden rounded-[24px]">
                        <WeatherInteractiveMap
                            lat={data.location.lat}
                            lon={data.location.lon}
                            city={data.location.name}
                            layer={activeLayer}
                            opacity={opacity}
                        />
                    </div>

                    <div className="pointer-events-none absolute left-6 top-6 rounded-2xl bg-black/30 px-4 py-2 text-xs text-white backdrop-blur-md">
                        {data.location.name}, {data.location.country}
                    </div>
                </motion.section>
            </div>
        </div>
    );
};