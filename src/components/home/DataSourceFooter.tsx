import en from "@/src/locales/en";
import type { ForecastResponse } from "@/src/types";

type Locale = typeof en;

type Props = {
    data: ForecastResponse;
    t: Locale;
};

export const DataSourceFooter = ({ data, t }: Props) => {
    return (
        <div className="flex flex-col justify-between gap-2 rounded-[22px] border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-xs text-[var(--color-text-muted)] backdrop-blur-[18px] sm:flex-row">
            <span>{t.dataProvidedBy}</span>
            <span>
                {t.lastUpdated}: {data.current.last_updated}
            </span>
        </div>
    );
};