import en from "@/src/locales/en";
import type { WeatherMapLayer } from "@/src/types";

type Locale = typeof en;

type Props = {
    t: Locale;
    activeLayer: WeatherMapLayer;
    opacity: number;
    onLayerChange: (layer: WeatherMapLayer) => void;
    onOpacityChange: (value: number) => void;
};

export const MapLayerControls = ({
                                     t,
                                     activeLayer,
                                     opacity,
                                     onLayerChange,
                                     onOpacityChange,
                                 }: Props) => {
    const layers: { label: string; value: WeatherMapLayer }[] = [
        { label: t.precipitationLayer, value: "precip" },
        { label: t.temperatureLayer, value: "tmp2m" },
        { label: t.windLayer, value: "wind" },
        { label: t.pressureLayer, value: "pressure" },
    ];

    return (
        <div className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[18px]">
            <p className="text-sm font-semibold">{t.mapLayer}</p>

            <div className="mt-3 grid grid-cols-2 gap-2">
                {layers.map((layer) => (
                    <button
                        key={layer.value}
                        type="button"
                        onClick={() => onLayerChange(layer.value)}
                        className={[
                            "rounded-2xl px-3 py-2 text-xs font-medium transition",
                            activeLayer === layer.value
                                ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20"
                                : "bg-white/5 text-[var(--color-text-muted)] hover:bg-white/10 hover:text-[var(--color-text)]",
                        ].join(" ")}
                    >
                        {layer.label}
                    </button>
                ))}
            </div>

            <div className="mt-4">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--color-text-muted)]">
                        {t.mapOpacity}
                    </span>
                    <span className="font-semibold">
                        {Math.round(opacity * 100)}%
                    </span>
                </div>

                <input
                    type="range"
                    min={0.1}
                    max={1}
                    step={0.05}
                    value={opacity}
                    onChange={(event) => onOpacityChange(Number(event.target.value))}
                    className="mt-3 w-full accent-sky-400"
                />
            </div>
        </div>
    );
};