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
import { Compass } from "lucide-react";

import en from "@/src/locales/en";
import type { ForecastDay } from "@/src/types";

type Locale = typeof en;

type Props = {
    days: ForecastDay[];
    t: Locale;
};

export const ForecastWindChart = ({ days, t }: Props) => {
    const chartData = days.map((day) => ({
        date: day.date.slice(5),
        wind: Math.round(day.day.maxwind_kph),
    }));

    const strongest = [...days].sort(
        (a, b) => b.day.maxwind_kph - a.day.maxwind_kph,
    )[0];

    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="min-w-0 rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2 className="text-base font-semibold">{t.windAnalytics}</h2>
                    <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                        {t.maxWind}: {Math.round(strongest.day.maxwind_kph)} km/h
                    </p>
                </div>

                <motion.div
                    animate={{ rotate: [0, 12, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-sky-400/10"
                >
                    <Compass className="size-5 text-sky-300" />
                </motion.div>
            </div>

            <div className="mt-4 h-[260px] min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.45} />
                                <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
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
                            dataKey="wind"
                            stroke="#22D3EE"
                            strokeWidth={3}
                            fill="url(#windGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.section>
    );
};