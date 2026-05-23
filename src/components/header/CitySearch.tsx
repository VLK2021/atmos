"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, MapPin, Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { useLanguage } from "@/src/context";
import en from "@/src/locales/en";
import uk from "@/src/locales/uk";
import type { SearchLocation } from "@/src/types";

type SearchForm = {
    city: string;
};

export const CitySearch = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const wrapperRef = useRef<HTMLFormElement | null>(null);

    const { lang } = useLanguage();
    const t = lang === "en" ? en : uk;

    const currentCity = searchParams.get("q") || "";

    const [results, setResults] = useState<SearchLocation[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        resetField,
        setValue,
    } = useForm<SearchForm>({
        defaultValues: {
            city: currentCity,
        },
    });

    const cityValue = watch("city");

    useEffect(() => {
        setValue("city", currentCity);
    }, [currentCity, setValue]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const query = cityValue.trim();

        if (query.length < 2) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        const controller = new AbortController();

        const timeoutId = window.setTimeout(async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `/api/weather/search?q=${encodeURIComponent(query)}`,
                    {
                        signal: controller.signal,
                        cache: "no-store",
                    },
                );

                const data: SearchLocation[] = await response.json();

                setResults(data);
                setIsOpen(true);
            } catch (error) {
                if (error instanceof DOMException && error.name === "AbortError") {
                    return;
                }

                setResults([]);
                setIsOpen(false);
            } finally {
                setLoading(false);
            }
        }, 350);

        return () => {
            window.clearTimeout(timeoutId);
            controller.abort();
        };
    }, [cityValue]);

    const updateQuery = (query: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("q", query);

        router.push(`${pathname}?${params.toString()}`);
    };

    const handleSelectLocation = (location: SearchLocation) => {
        const query = `${location.name}, ${location.country}`;

        setValue("city", query);
        setResults([]);
        setIsOpen(false);

        updateQuery(query);
    };

    const onSubmit = ({ city }: SearchForm) => {
        const trimmedCity = city.trim();

        if (!trimmedCity) return;

        if (results.length > 0) {
            handleSelectLocation(results[0]);
            return;
        }

        updateQuery(trimmedCity);
    };

    const handleClear = () => {
        resetField("city");
        setValue("city", "");
        setResults([]);
        setIsOpen(false);

        const params = new URLSearchParams(searchParams.toString());
        params.delete("q");

        const queryString = params.toString();

        router.push(queryString ? `${pathname}?${queryString}` : pathname);
    };

    return (
        <form
            ref={wrapperRef}
            onSubmit={handleSubmit(onSubmit)}
            className="relative w-full max-w-[620px]"
        >
            <Search className="pointer-events-none absolute left-5 top-1/2 z-10 size-5 -translate-y-1/2 text-[var(--color-text-muted)]" />

            <input
                {...register("city")}
                type="text"
                autoComplete="off"
                placeholder={t.searchPlaceholder}
                onFocus={() => {
                    if (results.length > 0) {
                        setIsOpen(true);
                    }
                }}
                className="h-10 w-full rounded-[24px] border border-[var(--color-border)] bg-white/10 pl-14 pr-14 text-sm text-[var(--color-text)] shadow-[var(--shadow-card)] outline-none backdrop-blur-[18px] transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-brand)] focus:bg-white/15"
            />

            <div className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 items-center gap-1">
                {loading && (
                    <Loader2 className="size-4 animate-spin text-[var(--color-text-muted)]" />
                )}

                {cityValue && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="flex size-8 items-center justify-center rounded-full bg-white/10 text-[var(--color-text-muted)] transition hover:bg-white/15 hover:text-[var(--color-text)]"
                        aria-label="Clear search"
                    >
                        <X className="size-4" />
                    </button>
                )}
            </div>

            {isOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-50 max-h-[320px] overflow-y-auto rounded-3xl border border-[var(--color-border)] bg-[var(--color-card-solid)] p-2 shadow-[var(--shadow-card)]">
                    {results.length > 0 ? (
                        results.map((location) => (
                            <button
                                key={`${location.id}-${location.lat}-${location.lon}`}
                                type="button"
                                onClick={() => handleSelectLocation(location)}
                                className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-white/10"
                            >
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-sky-400/10">
                                    <MapPin className="size-4 text-sky-300" />
                                </div>

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold">
                                        {location.name}
                                    </p>

                                    <p className="truncate text-xs text-[var(--color-text-muted)]">
                                        {location.region
                                            ? `${location.region}, ${location.country}`
                                            : location.country}
                                    </p>
                                </div>
                            </button>
                        ))
                    ) : (
                        <div className="px-4 py-5 text-sm text-[var(--color-text-muted)]">
                            No locations found
                        </div>
                    )}
                </div>
            )}
        </form>
    );
};