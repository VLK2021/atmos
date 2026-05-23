import type { Metadata } from "next";

import { HistoryPage } from "@/src/components/history";

export const metadata: Metadata = {
    title: "Weather History | Atmos",
    description:
        "Historical weather archive with temperature, rain, wind, humidity and daily weather analytics.",
};

export default function HistoryRoutePage() {
    return <HistoryPage />;
}