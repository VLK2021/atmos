import en from "@/src/locales/en";
import type { AirQuality } from "@/src/types";

type Locale = typeof en;

type Props = {
    airQuality?: AirQuality;
    t: Locale;
};

export const AirQualityCard = ({ airQuality, t }: Props) => {
    const index = airQuality?.["us-epa-index"] ?? 0;
    const percent = Math.min(index * 16, 100);

    return (
        <section className="min-w-0 overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-[18px]">
            <h3 className="text-lg font-semibold">{t.airQualityIndex}</h3>

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
                            {t.aqiUs}
                        </p>
                    </div>
                </div>

                <div className="min-w-0 space-y-3">
                    {[
                        [t.pm25, airQuality?.pm2_5],
                        [t.pm10, airQuality?.pm10],
                        [t.ozone, airQuality?.o3],
                        [t.nitrogenDioxide, airQuality?.no2],
                        [t.sulfurDioxide, airQuality?.so2],
                        [t.carbonMonoxide, airQuality?.co],
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