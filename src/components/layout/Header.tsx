"use client";

import { LangSwitcher, ThemeSwitcher } from "@/src/components";
import { CitySearch } from "@/src/components/header/CitySearch";

export const Header = () => {
    return (
        <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-background)]/65 px-4 py-5 backdrop-blur-[22px] sm:px-6 lg:px-8">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                <div className="hidden lg:block" />

                <div className="flex justify-center">
                    <CitySearch />
                </div>

                <div className="flex justify-end gap-2">
                    <LangSwitcher />
                    <ThemeSwitcher />
                </div>
            </div>
        </header>
    );
};