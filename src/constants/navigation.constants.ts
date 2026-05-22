import {
    BarChart3,
    Bell,
    CloudSun,
    Clock3,
    Home,
    Map,
    MoonStar,
    Wind,
} from "lucide-react";

import en from "@/src/locales/en";

type LocaleKey = keyof typeof en;

export const NAVIGATION_ITEMS: {
    href: string;
    labelKey: LocaleKey;
    icon: React.ElementType;
}[] = [
    { href: "/", labelKey: "overview", icon: Home },
    { href: "/forecast", labelKey: "forecast", icon: CloudSun },
    { href: "/hourly", labelKey: "hourly", icon: Clock3 },
    { href: "/astronomy", labelKey: "astronomy", icon: MoonStar },
    { href: "/air-quality", labelKey: "airQuality", icon: Wind },
    { href: "/maps", labelKey: "weatherMaps", icon: Map },
    { href: "/history", labelKey: "history", icon: BarChart3 },
    { href: "/alerts", labelKey: "alerts", icon: Bell },
];