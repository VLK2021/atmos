"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";

import { NAVIGATION_ITEMS } from "@/src/constants/navigation.constants";
import { useLanguage } from "@/src/context";
import en from "@/src/locales/en";
import uk from "@/src/locales/uk";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export const MobileSidebar = ({ isOpen, onClose }: Props) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const queryString = searchParams.toString();

    const { lang } = useLanguage();
    const t = lang === "en" ? en : uk;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.button
                        type="button"
                        aria-label="Close menu overlay"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm lg:hidden"
                    />

                    <motion.aside
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 260, damping: 28 }}
                        className="fixed left-0 top-0 z-50 flex h-dvh w-[290px] flex-col border-r border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-2xl lg:hidden"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex size-11 items-center justify-center overflow-hidden rounded-2xl bg-white/10 shadow-lg shadow-sky-500/20 ring-1 ring-white/15">
                                    <Image
                                        src="/images/logo/logo.svg"
                                        alt="Atmos logo"
                                        width={44}
                                        height={44}
                                        priority
                                        className="size-11 object-contain"
                                    />
                                </div>

                                <div>
                                    <p className="text-lg font-bold">{t.appName}</p>
                                    <p className="text-xs text-[var(--color-text-muted)]">
                                        {t.appDescription}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={onClose}
                                className="flex size-10 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)]"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        <nav className="mt-6 flex-1 space-y-1 overflow-y-auto">
                            {NAVIGATION_ITEMS.map(({ href, labelKey, icon: Icon }) => {
                                const isActive =
                                    href === "/" ? pathname === "/" : pathname.startsWith(href);

                                const hrefWithParams = queryString
                                    ? `${href}?${queryString}`
                                    : href;

                                return (
                                    <Link
                                        key={href}
                                        href={hrefWithParams}
                                        onClick={onClose}
                                        className={[
                                            "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                                            isActive
                                                ? "bg-gradient-to-r from-sky-500/90 to-indigo-500/90 text-white shadow-lg shadow-sky-500/20"
                                                : "text-[var(--color-text-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-text)]",
                                        ].join(" ")}
                                    >
                                        <Icon className="size-5 shrink-0" />
                                        <span>{t[labelKey]}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="mt-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] p-4">
                            <p className="text-sm font-semibold">{t.currentLocation}</p>
                            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                                {searchParams.get("q") || "Lviv, Ukraine"}
                            </p>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};