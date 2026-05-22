import en from "@/src/locales/en";
import type { ForecastDay } from "@/src/types";

type Locale = typeof en;

type Props = {
    days: ForecastDay[];
    t: Locale;
};

export const WeeklyForecastCard = ({ days, t }: Props) => {
    return (
        <section className="min-w-0 overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-[18px]">
            <h3 className="text-lg font-semibold">{t.sevenDayForecast}</h3>

            <div className="mt-4 space-y-2">
                {days.map((day) => {
                    const min = Math.round(day.day.mintemp_c);
                    const max = Math.round(day.day.maxtemp_c);

                    const iconSrc = day.day.condition.icon.startsWith("//")
                        ? `https:${day.day.condition.icon}`
                        : day.day.condition.icon;

                    return (
                        <div
                            key={day.date}
                            className="grid min-w-0 grid-cols-[minmax(0,1fr)_42px_52px_52px] items-center gap-3 rounded-2xl bg-white/5 px-4 py-3"
                        >
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold">
                                    {day.date}
                                </p>

                                <p className="truncate text-xs text-[var(--color-text-muted)]">
                                    {day.day.condition.text}
                                </p>
                            </div>

                            <img
                                src={iconSrc}
                                alt={day.day.condition.text}
                                className="size-10 object-contain"
                            />

                            <p className="text-right text-sm text-[var(--color-text-muted)]">
                                {min}°
                            </p>

                            <p className="text-right text-lg font-semibold">
                                {max}°
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};