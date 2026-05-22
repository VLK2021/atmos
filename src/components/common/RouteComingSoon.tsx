type Props = {
    title: string;
};

export const RouteComingSoon = ({ title }: Props) => {
    return (
        <section className="mx-auto w-full max-w-[1440px] rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)] backdrop-blur-[18px]">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                Atmos module
            </p>

            <h1 className="mt-3 text-2xl font-bold">
                {title}
            </h1>

            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                This page will be developed as a full detailed route.
            </p>
        </section>
    );
};