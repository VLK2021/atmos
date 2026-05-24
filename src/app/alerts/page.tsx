import type { Metadata } from "next";

import { AlertsPage } from "@/src/components/alerts";

export const metadata: Metadata = {
    title: "Weather Alerts | Atmos",
    description:
        "Weather alerts dashboard with severe weather warnings, affected areas, urgency, severity and safety instructions.",
};

export default function AlertsRoutePage() {
    return <AlertsPage />;
}