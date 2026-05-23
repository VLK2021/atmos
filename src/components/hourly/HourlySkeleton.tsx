export const HourlySkeleton = () => {
    return (
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 overflow-hidden">
            <div className="h-[290px] animate-pulse rounded-[30px] border border-[var(--color-border)] bg-[var(--color-card)]" />

            <div className="h-[260px] animate-pulse rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)]" />

            <div className="grid gap-4 xl:grid-cols-3">
                <div className="h-[360px] animate-pulse rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] xl:col-span-2" />
                <div className="h-[360px] animate-pulse rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)]" />
                <div className="h-[320px] animate-pulse rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)]" />
                <div className="h-[320px] animate-pulse rounded-[26px] border border-[var(--color-border)] bg-[var(--color-card)] xl:col-span-2" />
            </div>
        </div>
    );
};