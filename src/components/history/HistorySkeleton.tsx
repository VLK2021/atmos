export const HistorySkeleton = () => {
    return (
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 overflow-hidden">
            <div className="h-[290px] animate-pulse rounded-[30px] border border-[var(--color-border)] bg-[var(--color-card)]" />

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div className="h-[150px] animate-pulse rounded-[24px] border border-[var(--color-border)] bg-[var(--color-card)]" />
                <div className="h-[150px] animate-pulse rounded-[24px] border border-[var(--color-border)] bg-[var(--color-card)]" />
                <div className="h-[150px] animate-pulse rounded-[24px] border border-[var(--color-border)] bg-[var(--color-card)]" />
                <div className="h-[150px] animate-pulse rounded-[24px] border border-[var(--color-border)] bg-[var(--color-card)]" />
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
                <div className="h-[360px] animate-pulse rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)]" />
                <div className="h-[360px] animate-pulse rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)]" />
            </div>

            <div className="h-[560px] animate-pulse rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)]" />
        </div>
    );
};