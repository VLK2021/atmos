import type { ReactNode } from "react";

import { Header, Sidebar } from "@/src/components/layout";

type AppShellProps = {
    children: ReactNode;
};

export const AppShell = ({ children }: AppShellProps) => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
            <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.16),transparent_32%),radial-gradient(circle_at_bottom,rgba(251,146,60,0.10),transparent_36%)]" />

            <div className="flex min-h-screen">
                <Sidebar />

                <div className="flex min-w-0 flex-1 flex-col">
                    <Header />

                    <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-4 py-4 sm:px-5 md:px-6 lg:px-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};