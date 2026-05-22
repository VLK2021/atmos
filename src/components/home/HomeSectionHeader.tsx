import Link from "next/link";
import { ArrowRight } from "lucide-react";

import en from "@/src/locales/en";

type Locale = typeof en;

type Props = {
    title: string;
    subtitle?: string;
    href: string;
    t: Locale;
};

export const HomeSectionHeader = ({ title, subtitle, href, t }: Props) => {
    return (
        <div className="mb-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
                <h3 className="truncate text-base font-semibold">{title}</h3>
                {subtitle && (
                    <p className="mt-0.5 truncate text-xs text-[var(--color-text-muted)]">
                        {subtitle}
                    </p>
                )}
            </div>

            <Link
                href={href}
                className="flex shrink-0 items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs text-[var(--color-text-muted)] transition hover:bg-white/15 hover:text-[var(--color-text)]"
            >
                {t.viewDetails}
                <ArrowRight className="size-3.5" />
            </Link>
        </div>
    );
};