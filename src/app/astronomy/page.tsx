import type { Metadata } from "next";

import { AstronomyPage } from "@/src/components/astronomy";

export const metadata: Metadata = {
    title: "Astronomy | Atmos",
    description:
        "Astronomy weather page with sunrise, sunset, moonrise, moonset, moon phase and moon illumination.",
};

export default function AstronomyRoutePage() {
    return <AstronomyPage />;
}