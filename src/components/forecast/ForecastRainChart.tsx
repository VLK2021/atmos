"use client";

import { motion } from "framer-motion";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import en from "@/src/locales/en";
import type { ForecastDay } from "@/src/types";

type Locale = typeof en;

type Props = {
    days: ForecastDay[];
    t: Locale;
};

export const ForecastRainChart = ({ days, t }: Props) => {
    const chartData = days.map((day) => ({
        date: day.date.slice(5),
        chance: day.day.daily_chance_of_rain,
        rain: day.day.totalprecip_mm,
        snow: day.day.totalsnow_cm,
    }));

    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="min-w-0 rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <h2 className="text-base font-semibold">{t.rainAnalytics}</h2>
            <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                {t.rainChance}, {t.totalRain}, {t.snow}
            </p>

            <div className="mt-4 h-[260px] min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.12} />
                        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip
                            contentStyle={{
                                borderRadius: "16px",
                                border: "1px solid rgba(148,163,184,0.2)",
                                background: "rgba(15,23,42,0.92)",
                            }}
                        />
                        <Bar
                            dataKey="chance"
                            fill="#38BDF8"
                            radius={[10, 10, 0, 0]}
                        />
                        <Bar
                            dataKey="rain"
                            fill="#2563EB"
                            radius={[10, 10, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.section>
    );
};