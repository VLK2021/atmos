export const AirQualitySkeleton = () => {
    return (
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 overflow-hidden">
            <div className="h-[310px] animate-pulse rounded-[30px] border border-[var(--color-border)] bg-[var(--color-card)]" />

            <div className="grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                <div className="h-[420px] animate-pulse rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)]" />
                <div className="h-[420px] animate-pulse rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)]" />
            </div>
        </div>
    );
};