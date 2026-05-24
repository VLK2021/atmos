"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { LangSwitcher, ThemeSwitcher } from "@/src/components";
import { MobileSidebar } from "@/src/components/layout/MobileSidebar";
import {CitySearch} from "@/src/components/header";

export const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-card)]/80 px-4 py-3 backdrop-blur-[18px] sm:px-5 md:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)] lg:hidden"
                        aria-label="Open menu"
                    >
                        <Menu className="size-5" />
                    </button>

                    <div className="flex min-w-0 flex-1 justify-center">
                        <CitySearch />
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                        <LangSwitcher />
                        <ThemeSwitcher />
                    </div>
                </div>
            </header>

            <MobileSidebar
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />
        </>
    );
};