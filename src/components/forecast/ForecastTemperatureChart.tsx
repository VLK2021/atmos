"use client";

import { motion } from "framer-motion";
import {
    Area,
    AreaChart,
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

export const ForecastTemperatureChart = ({ days, t }: Props) => {
    const chartData = days.map((day) => ({
        date: day.date.slice(5),
        max: Math.round(day.day.maxtemp_c),
        min: Math.round(day.day.mintemp_c),
        avg: Math.round(day.day.avgtemp_c),
    }));

    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="min-w-0 rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <div>
                <h2 className="text-base font-semibold">{t.temperatureTrend}</h2>
                <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                    {t.maxTemp}, {t.minTemp}, {t.avgTemp}
                </p>
            </div>

            <div className="mt-4 h-[280px] min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="forecastMax" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.45} />
                                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                            </linearGradient>

                            <linearGradient id="forecastMin" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.35} />
                                <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                            </linearGradient>
                        </defs>

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

                        <Area
                            type="monotone"
                            dataKey="max"
                            stroke="#F59E0B"
                            strokeWidth={3}
                            fill="url(#forecastMax)"
                        />

                        <Area
                            type="monotone"
                            dataKey="min"
                            stroke="#38BDF8"
                            strokeWidth={3}
                            fill="url(#forecastMin)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.section>
    );
};