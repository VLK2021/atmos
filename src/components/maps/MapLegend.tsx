import en from "@/src/locales/en";
import type { WeatherMapLayer } from "@/src/types";

type Locale = typeof en;

type Props = {
    t: Locale;
    layer: WeatherMapLayer;
};

export const MapLegend = ({ t, layer }: Props) => {
    const titleMap: Record<WeatherMapLayer, string> = {
        precip: t.precipitationLayer,
        tmp2m: t.temperatureLayer,
        wind: t.windLayer,
        pressure: t.pressureLayer,
    };

    return (
        <div className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]">
            <p className="text-sm font-semibold">{titleMap[layer]}</p>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-gradient-to-r from-sky-400 via-emerald-400 via-amber-400 to-red-500" />

            <div className="mt-2 flex items-center justify-between text-[11px] text-[var(--color-text-muted)]">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
            </div>

            <p className="mt-3 text-xs text-[var(--color-text-muted)]">
                {t.mapZoomHint}
            </p>
        </div>
    );
};