export const HomeSkeleton = () => {
    return (
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 overflow-hidden">
            <div className="h-[300px] animate-pulse rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)]" />

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.85fr)]">
                <div className="space-y-4">
                    <div className="h-[340px] animate-pulse rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)]" />
                    <div className="h-[420px] animate-pulse rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)]" />
                </div>

                <div className="space-y-4">
                    <div className="h-[320px] animate-pulse rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)]" />
                    <div className="h-[340px] animate-pulse rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)]" />
                </div>
            </div>
        </div>
    );
};