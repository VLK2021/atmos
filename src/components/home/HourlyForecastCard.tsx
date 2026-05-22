"use client";

import { motion } from "framer-motion";
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Droplets, Thermometer, Wind } from "lucide-react";

import en from "@/src/locales/en";
import type { ForecastHour } from "@/src/types";

type Locale = typeof en;

type Props = {
    hours: ForecastHour[];
    t: Locale;
};

export const HourlyForecastCard = ({ hours, t }: Props) => {
    const startHour = new Date().getHours();
    const visibleHours = hours.slice(startHour, startHour + 12).length
        ? hours.slice(startHour, startHour + 12)
        : hours.slice(0, 12);

    const chartData = visibleHours.map((hour) => ({
        time: hour.time.split(" ")[1],
        temp: Math.round(hour.temp_c),
        feels: Math.round(hour.feelslike_c),
        rain: hour.chance_of_rain,
    }));

    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="min-w-0 overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px] sm:p-5"
        >
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h3 className="text-base font-semibold sm:text-lg">
                        {t.hourlyForecast}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        Temperature, rain chance and feels-like trend
                    </p>
                </div>

                <Thermometer className="size-5 text-sky-300" />
            </div>

            <div className="mt-4 h-[180px] min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.45} />
                                <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 11 }}
                        />
                        <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
                        <Tooltip
                            contentStyle={{
                                borderRadius: "16px",
                                border: "1px solid rgba(148,163,184,0.2)",
                                background: "rgba(15,23,42,0.92)",
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="temp"
                            stroke="#38BDF8"
                            strokeWidth={3}
                            fill="url(#tempGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 flex max-w-full gap-3 overflow-x-auto pb-2">
                {visibleHours.map((hour, index) => {
                    const iconSrc = hour.condition.icon.startsWith("//")
                        ? `https:${hour.condition.icon}`
                        : hour.condition.icon;

                    return (
                        <motion.div
                            key={hour.time_epoch}
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25, delay: index * 0.025 }}
                            className="min-w-[108px] rounded-3xl border border-[var(--color-border)] bg-white/10 p-3"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-xs text-[var(--color-text-muted)]">
                                    {hour.time.split(" ")[1]}
                                </p>
                                <img
                                    src={iconSrc}
                                    alt={hour.condition.text}
                                    className="size-8 object-contain"
                                />
                            </div>

                            <p className="mt-2 text-xl font-semibold">
                                {Math.round(hour.temp_c)}°
                            </p>

                            <div className="mt-3 space-y-1 text-xs text-[var(--color-text-muted)]">
                                <p className="flex items-center gap-1">
                                    <Droplets className="size-3 text-sky-300" />
                                    {hour.chance_of_rain}%
                                </p>

                                <p className="flex items-center gap-1">
                                    <Wind className="size-3 text-cyan-300" />
                                    {Math.round(hour.wind_kph)} km/h
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.section>
    );
};