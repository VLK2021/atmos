"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass } from "lucide-react";

import { NAVIGATION_ITEMS } from "@/src/constants/navigation.constants";
import { useLanguage } from "@/src/context";
import en from "@/src/locales/en";
import uk from "@/src/locales/uk";

export const Sidebar = () => {
    const pathname = usePathname();
    const { lang } = useLanguage();
    const t = lang === "en" ? en : uk;

    return (
        <aside className="hidden h-screen w-[280px] shrink-0 border-r border-[var(--color-border)] bg-[var(--color-card)] backdrop-blur-[18px] lg:flex lg:flex-col">
            <div className="flex h-20 items-center gap-3 px-6">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-indigo-500 to-amber-400 shadow-lg shadow-sky-500/20">
                    <Compass className="size-6 text-white" />
                </div>

                <div>
                    <h1 className="text-xl font-bold tracking-tight">
                        {t.appName}
                    </h1>
                    <p className="text-xs text-[var(--color-text-muted)]">
                        {t.appDescription}
                    </p>
                </div>
            </div>

            <nav className="flex-1 space-y-1 px-4 py-4">
                {NAVIGATION_ITEMS.map(({ href, labelKey, icon: Icon }) => {
                    const isActive =
                        href === "/" ? pathname === "/" : pathname.startsWith(href);

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={[
                                "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all",
                                isActive
                                    ? "bg-gradient-to-r from-sky-500/90 to-indigo-500/90 text-white shadow-lg shadow-sky-500/20"
                                    : "text-[var(--color-text-muted)] hover:bg-white/10 hover:text-[var(--color-text)]",
                            ].join(" ")}
                        >
                            <Icon className="size-5" />
                            <span>{t[labelKey]}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4">
                <div className="rounded-3xl border border-[var(--color-border)] bg-white/10 p-4 backdrop-blur-xl">
                    <p className="text-sm font-semibold">
                        {t.currentLocation}
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        Lviv, Ukraine
                    </p>
                </div>
            </div>
        </aside>
    );
};