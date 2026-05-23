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
import type { AirQuality } from "@/src/types";

type Locale = typeof en;

type Props = {
    airQuality: AirQuality;
    t: Locale;
};

export const AirQualityPollutantsChart = ({ airQuality, t }: Props) => {
    const chartData = [
        { name: t.pm25, value: Number(airQuality.pm2_5.toFixed(1)) },
        { name: t.pm10, value: Number(airQuality.pm10.toFixed(1)) },
        { name: t.ozone, value: Number(airQuality.o3.toFixed(1)) },
        { name: t.nitrogenDioxide, value: Number(airQuality.no2.toFixed(1)) },
        { name: t.sulfurDioxide, value: Number(airQuality.so2.toFixed(1)) },
        { name: t.carbonMonoxide, value: Number(airQuality.co.toFixed(1)) },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="min-w-0 rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <h2 className="text-base font-semibold">{t.pollutionChart}</h2>
            <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                {t.pollutants}
            </p>

            <div className="mt-4 h-[340px] min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.12} />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip
                            contentStyle={{
                                borderRadius: "16px",
                                border: "1px solid rgba(148,163,184,0.2)",
                                background: "rgba(15,23,42,0.92)",
                            }}
                        />
                        <Bar
                            dataKey="value"
                            fill="#38BDF8"
                            radius={[12, 12, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.section>
    );
};