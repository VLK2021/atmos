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
import type { WeatherHistoryDay } from "@/src/types";

type Locale = typeof en;

type Props = {
    days: WeatherHistoryDay[];
    t: Locale;
};

export const HistoryRainChart = ({ days, t }: Props) => {
    const chartData = days.map((day) => ({
        date: day.date.slice(5),
        rain: Number(day.day.totalprecip_mm.toFixed(1)),
        humidity: day.day.avghumidity,
    }));

    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="min-w-0 rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <div>
                <h2 className="text-base font-semibold">{t.historyRainTrend}</h2>

                <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                    {t.totalPrecipitation}, {t.averageHumidity}
                </p>
            </div>

            <div className="mt-4 h-[300px] min-w-0">
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
                            dataKey="rain"
                            fill="#38BDF8"
                            radius={[10, 10, 0, 0]}
                        />

                        <Bar
                            dataKey="humidity"
                            fill="#8B5CF6"
                            radius={[10, 10, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.section>
    );
};