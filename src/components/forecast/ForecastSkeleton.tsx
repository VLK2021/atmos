export const ForecastSkeleton = () => {
    return (
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 overflow-hidden">
            <div className="h-[300px] animate-pulse rounded-[30px] border border-[var(--color-border)] bg-[var(--color-card)]" />

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]">
                <div className="h-[340px] animate-pulse rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)]" />
                <div className="h-[340px] animate-pulse rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)]" />
            </div>

            <div className="h-[260px] animate-pulse rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)]" />

            <div className="grid gap-4 xl:grid-cols-2">
                <div className="h-[320px] animate-pulse rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)]" />
                <div className="h-[320px] animate-pulse rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)]" />
            </div>
        </div>
    );
};