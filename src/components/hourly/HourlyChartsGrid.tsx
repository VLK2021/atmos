"use client";

import { motion } from "framer-motion";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
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

export const HourlyChartsGrid = ({ hours, t }: Props) => {
    const chartData = hours.map((hour) => ({
        time: hour.time.split(" ")[1],
        temp: Math.round(hour.temp_c),
        feels: Math.round(hour.feelslike_c),
        rain: hour.chance_of_rain,
        wind: Math.round(hour.wind_kph),
        humidity: hour.humidity,
    }));

    return (
        <div className="grid min-w-0 gap-4 xl:grid-cols-3">
            <motion.section
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="min-w-0 rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px] xl:col-span-2"
            >
                <h2 className="text-base font-semibold">{t.temperatureByHour}</h2>
                <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                    {t.feels}, {t.heatIndex}, {t.windChill}
                </p>

                <div className="mt-4 h-[300px] min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="hourTemp" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.45} />
                                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                                </linearGradient>

                                <linearGradient id="hourFeels" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.35} />
                                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" opacity={0.12} />
                            <XAxis dataKey="time" tick={{ fontSize: 11 }} />
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
                                dataKey="temp"
                                stroke="#38BDF8"
                                strokeWidth={3}
                                fill="url(#hourTemp)"
                            />

                            <Area
                                type="monotone"
                                dataKey="feels"
                                stroke="#F59E0B"
                                strokeWidth={2}
                                fill="url(#hourFeels)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="min-w-0 rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
            >
                <h2 className="text-base font-semibold">{t.rainByHour}</h2>
                <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                    {t.rainChance}
                </p>

                <div className="mt-4 h-[300px] min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.12} />
                            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
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
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.08 }}
                className="min-w-0 rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]"
            >
                <h2 className="text-base font-semibold">{t.windByHour}</h2>
                <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                    km/h
                </p>

                <div className="mt-4 h-[260px] min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="hourWind" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" opacity={0.12} />
                            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
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
                                fill="url(#hourWind)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="min-w-0 rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px] xl:col-span-2"
            >
                <h2 className="text-base font-semibold">{t.humidity}</h2>
                <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                    Relative humidity by hour
                </p>

                <div className="mt-4 h-[260px] min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="hourHumidity" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" opacity={0.12} />
                            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
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
                                dataKey="humidity"
                                stroke="#8B5CF6"
                                strokeWidth={3}
                                fill="url(#hourHumidity)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.section>
        </div>
    );
};