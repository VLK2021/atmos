import { Moon, Sunrise, Sunset } from "lucide-react";

import en from "@/src/locales/en";
import type { Astro } from "@/src/types";

type Locale = typeof en;

type Props = {
    astro: Astro;
    t: Locale;
};

export const AstronomyCard = ({ astro, t }: Props) => {
    return (
        <section className="min-w-0 overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-[18px]">
            <h3 className="text-lg font-semibold">{t.sunAndMoon}</h3>

            <div className="mt-6 rounded-[28px] border border-[var(--color-border)] bg-white/5 p-5">
                <div className="relative mx-auto h-28 max-w-[360px] overflow-hidden">
                    <div className="absolute left-0 right-0 top-10 h-40 rounded-t-full border-t-2 border-amber-400/80" />

                    <div className="absolute left-0 top-14 flex items-center gap-2 text-sm">
                        <Sunrise className="size-5 text-amber-300" />
                        <span>{astro.sunrise}</span>
                    </div>

                    <div className="absolute right-0 top-14 flex items-center gap-2 text-sm">
                        <Sunset className="size-5 text-orange-400" />
                        <span>{astro.sunset}</span>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="min-w-0 rounded-2xl bg-white/5 p-4">
                        <p className="text-xs text-[var(--color-text-muted)]">
                            {t.moonrise}
                        </p>

                        <p className="mt-1 truncate font-semibold">
                            {astro.moonrise}
                        </p>
                    </div>

                    <div className="min-w-0 rounded-2xl bg-white/5 p-4">
                        <p className="text-xs text-[var(--color-text-muted)]">
                            {t.moonset}
                        </p>

                        <p className="mt-1 truncate font-semibold">
                            {astro.moonset}
                        </p>
                    </div>
                </div>

                <div className="mt-3 flex min-w-0 items-center gap-3 rounded-2xl bg-white/5 p-4">
                    <Moon className="size-10 shrink-0 text-violet-300" />

                    <div className="min-w-0">
                        <p className="truncate font-semibold">
                            {astro.moon_phase}
                        </p>

                        <p className="truncate text-xs text-[var(--color-text-muted)]">
                            {t.illumination} {astro.moon_illumination}%
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};