import { cookies } from "next/headers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { LanguageProvider, ThemeProvider } from "@/src/context";
import { getValidLanguage } from "@/src/helpers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ATMOS",
    description: "Premium weather dashboard",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const initialLang = getValidLanguage(cookieStore.get("lang")?.value);

    return (
        <html
            lang={initialLang}
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
            suppressHydrationWarning
        >
        <body className="min-h-full flex flex-col bg-[var(--color-background)] text-[var(--color-text)]">
        <ThemeProvider>
            <LanguageProvider initialLang={initialLang}>
                {children}
            </LanguageProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}