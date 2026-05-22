"use client";

import { motion } from "framer-motion";
import { Droplets, CloudRain, Snowflake } from "lucide-react";
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import en from "@/src/locales/en";
import type { ForecastDay } from "@/src/types";
import { HomeSectionHeader } from "@/src/components/home";

type Locale = typeof en;

type Props = {
    day: ForecastDay;
    t: Locale;
};

export const PrecipitationCard = ({ day, t }: Props) => {
    const chartData = day.hour.slice(0, 24).map((hour) => ({
        time: hour.time.split(" ")[1],
        rain: hour.chance_of_rain,
        mm: hour.precip_mm,
    }));

    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="min-w-0 overflow-hidden rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
        >
            <HomeSectionHeader
                title={t.precipitation}
                subtitle={t.chanceOfRain}
                href="/forecast"
                t={t}
            />

            <div className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.5} />
                                <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <XAxis dataKey="time" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                        <YAxis hide />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="rain"
                            stroke="#38BDF8"
                            strokeWidth={2}
                            fill="url(#rainGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="rounded-2xl bg-white/5 p-3">
                    <Droplets className="size-4 text-sky-300" />
                    <p className="mt-2 text-sm font-semibold">{day.day.daily_chance_of_rain}%</p>
                    <p className="text-[11px] text-[var(--color-text-muted)]">{t.chanceOfRain}</p>
                </div>

                <div className="rounded-2xl bg-white/5 p-3">
                    <CloudRain className="size-4 text-cyan-300" />
                    <p className="mt-2 text-sm font-semibold">{day.day.totalprecip_mm} mm</p>
                    <p className="text-[11px] text-[var(--color-text-muted)]">{t.rain}</p>
                </div>

                <div className="rounded-2xl bg-white/5 p-3">
                    <Snowflake className="size-4 text-blue-300" />
                    <p className="mt-2 text-sm font-semibold">{day.day.totalsnow_cm} cm</p>
                    <p className="text-[11px] text-[var(--color-text-muted)]">{t.snow}</p>
                </div>
            </div>
        </motion.section>
    );
};