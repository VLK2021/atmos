"use client";

import {
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import en from "@/src/locales/en";
import type { ForecastHour } from "@/src/types";

type Locale = typeof en;

type Props = {
    hours: ForecastHour[];
    t: Locale;
};

export const HourlyForecastCard = ({ hours, t }: Props) => {
    const startHour = new Date().getHours();
    const nextHours = hours.slice(startHour, startHour + 12);
    const visibleHours = nextHours.length ? nextHours : hours.slice(0, 12);

    const chartData = visibleHours.map((hour) => ({
        time: hour.time.split(" ")[1],
        temp: Math.round(hour.temp_c),
        rain: hour.chance_of_rain,
    }));

    return (
        <section className="min-w-0 overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-[18px]">
            <h3 className="text-lg font-semibold">{t.hourlyForecast}</h3>

            <div className="mt-5 flex max-w-full gap-3 overflow-x-auto pb-2">
                {visibleHours.map((hour) => {
                    const iconSrc = hour.condition.icon.startsWith("//")
                        ? `https:${hour.condition.icon}`
                        : hour.condition.icon;

                    return (
                        <div
                            key={hour.time_epoch}
                            className="min-w-[84px] rounded-3xl border border-[var(--color-border)] bg-white/10 p-3 text-center"
                        >
                            <p className="text-xs text-[var(--color-text-muted)]">
                                {hour.time.split(" ")[1]}
                            </p>

                            <img
                                src={iconSrc}
                                alt={hour.condition.text}
                                className="mx-auto my-2 size-10 object-contain"
                            />

                            <p className="text-xl font-semibold">
                                {Math.round(hour.temp_c)}°
                            </p>

                            <p className="mt-1 text-xs text-sky-300">
                                {hour.chance_of_rain}%
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 h-[180px] min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
                        <Tooltip
                            contentStyle={{
                                borderRadius: "16px",
                                border: "1px solid rgba(148,163,184,0.2)",
                                background: "rgba(15,23,42,0.9)",
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="temp"
                            stroke="#38BDF8"
                            strokeWidth={3}
                            dot={{ r: 3 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
};