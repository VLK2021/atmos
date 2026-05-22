import type { AirQuality } from "@/src/types";

type Props = {
    airQuality?: AirQuality;
};

export const AirQualityCard = ({ airQuality }: Props) => {
    const index = airQuality?.["us-epa-index"] ?? 0;
    const percent = Math.min(index * 16, 100);

    return (
        <section className="min-w-0 overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-[18px]">
            <h3 className="text-lg font-semibold">Air quality</h3>

            <div className="mt-6 grid min-w-0 gap-5 sm:grid-cols-[160px_minmax(0,1fr)] xl:grid-cols-1 2xl:grid-cols-[160px_minmax(0,1fr)]">
                <div className="relative mx-auto flex size-36 items-center justify-center rounded-full bg-white/5">
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: `conic-gradient(#22c55e ${percent}%, rgba(148,163,184,0.18) 0)`,
                        }}
                    />

                    <div className="relative flex size-28 flex-col items-center justify-center rounded-full bg-[var(--color-card-solid)]">
                        <p className="text-4xl font-semibold">{index || "-"}</p>

                        <p className="text-xs text-[var(--color-text-muted)]">
                            AQI US
                        </p>
                    </div>
                </div>

                <div className="min-w-0 space-y-3">
                    {[
                        ["PM2.5", airQuality?.pm2_5],
                        ["PM10", airQuality?.pm10],
                        ["O₃", airQuality?.o3],
                        ["NO₂", airQuality?.no2],
                        ["SO₂", airQuality?.so2],
                        ["CO", airQuality?.co],
                    ].map(([label, value]) => (
                        <div
                            key={label}
                            className="flex min-w-0 items-center justify-between gap-3 border-b border-[var(--color-border)] pb-2 text-sm"
                        >
                            <span className="text-[var(--color-text-muted)]">
                                {label}
                            </span>

                            <span className="truncate font-semibold">
                                {typeof value === "number" ? value.toFixed(1) : "-"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};