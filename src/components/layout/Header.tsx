"use client";

import { Search } from "lucide-react";

import { LangSwitcher, ThemeSwitcher } from "@/src/components";
import { useLanguage } from "@/src/context";
import en from "@/src/locales/en";
import uk from "@/src/locales/uk";

export const Header = () => {
    const { lang } = useLanguage();
    const t = lang === "en" ? en : uk;

    return (
        <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-card)]/80 px-4 py-4 backdrop-blur-[18px] sm:px-5 md:px-6 lg:px-8">
            <div className="flex items-center gap-4">
                <div className="lg:hidden">
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-indigo-500 to-amber-400">
                        <span className="text-sm font-bold text-white">A</span>
                    </div>
                </div>

                <div className="relative max-w-xl flex-1">
                    <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[var(--color-text-muted)]" />

                    <input
                        type="text"
                        placeholder={t.searchPlaceholder}
                        className="h-12 w-full rounded-2xl border border-[var(--color-border)] bg-white/10 pl-12 pr-4 text-sm text-[var(--color-text)] outline-none backdrop-blur-xl transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-brand)]"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <LangSwitcher />
                    <ThemeSwitcher />
                </div>
            </div>
        </header>
    );
};