import {
    BarChart3,
    Bell,
    CloudSun,
    Heart,
    Home,
    Map,
    MoonStar,
    Settings,
    Wind,
} from "lucide-react";

export const NAVIGATION_ITEMS = [
    { href: "/", labelKey: "overview", icon: Home },
    { href: "/forecast", labelKey: "forecast", icon: CloudSun },
    { href: "/astronomy", labelKey: "astronomy", icon: MoonStar },
    { href: "/air-quality", labelKey: "airQuality", icon: Wind },
    { href: "/maps", labelKey: "maps", icon: Map },
    { href: "/history", labelKey: "history", icon: BarChart3 },
    { href: "/alerts", labelKey: "alerts", icon: Bell },
    { href: "/favorites", labelKey: "favorites", icon: Heart },
    { href: "/settings", labelKey: "settings", icon: Settings },
] as const;