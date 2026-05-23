export const MapSkeleton = () => {
    return (
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 overflow-hidden">
            <div className="h-[260px] animate-pulse rounded-[30px] border border-[var(--color-border)] bg-[var(--color-card)]" />
            <div className="h-[680px] animate-pulse rounded-[30px] border border-[var(--color-border)] bg-[var(--color-card)]" />
        </div>
    );
};