"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type AirQuality = {
    pm2_5?: number;
    pm10?: number;
    o3?: number;
    no2?: number;
    so2?: number;
    co?: number;
};

type Props = {
    airQuality?: AirQuality | null;
    t: {
        pm25?: string;
        pm10?: string;
        ozone?: string;
        nitrogenDioxide?: string;
        sulphurDioxide?: string;
        carbonMonoxide?: string;
        noAirQualityData?: string;
    };
};

const safeNumber = (value: unknown): number => {
    if (typeof value !== "number" || Number.isNaN(value)) return 0;
    return Number(value.toFixed(1));
};

export const AirQualityPollutantsChart = ({ airQuality, t }: Props) => {
    const hasData =
        airQuality &&
        Object.values(airQuality).some(
            (value) => typeof value === "number" && value > 0,
        );

    if (!hasData) {
        return (
            <div className="flex min-h-[260px] items-center justify-center rounded-[24px] border border-[var(--color-border)] bg-[var(--color-card)] p-5 text-center text-sm text-[var(--color-text-muted)]">
                {t.noAirQualityData || "Air quality data is currently unavailable."}
            </div>
        );
    }

    const chartData = [
        {
            name: t.pm25 || "PM2.5",
            value: safeNumber(airQuality?.pm2_5),
        },
        {
            name: t.pm10 || "PM10",
            value: safeNumber(airQuality?.pm10),
        },
        {
            name: t.ozone || "O₃",
            value: safeNumber(airQuality?.o3),
        },
        {
            name: t.nitrogenDioxide || "NO₂",
            value: safeNumber(airQuality?.no2),
        },
        {
            name: t.sulphurDioxide || "SO₂",
            value: safeNumber(airQuality?.so2),
        },
        {
            name: t.carbonMonoxide || "CO",
            value: safeNumber(airQuality?.co),
        },
    ];

    return (
        <div className="h-[320px] w-full rounded-[24px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};