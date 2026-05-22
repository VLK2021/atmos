"use client";

import { Search } from "lucide-react";
import { useForm } from "react-hook-form";

import { useLanguage } from "@/src/context";
import en from "@/src/locales/en";
import uk from "@/src/locales/uk";

type SearchForm = {
    city: string;
};

export const CitySearch = () => {
    const { lang } = useLanguage();
    const t = lang === "en" ? en : uk;

    const { register, handleSubmit } = useForm<SearchForm>({
        defaultValues: {
            city: "",
        },
    });

    const onSubmit = (data: SearchForm) => {
        console.log(data.city);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative w-full max-w-[620px]"
        >
            <Search className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-[var(--color-text-muted)]" />

            <input
                {...register("city")}
                type="text"
                placeholder={t.searchPlaceholder}
                className="h-14 w-full rounded-[24px] border border-[var(--color-border)] bg-white/10 pl-14 pr-5 text-sm text-[var(--color-text)] shadow-[var(--shadow-card)] outline-none backdrop-blur-[18px] transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-brand)] focus:bg-white/15"
            />
        </form>
    );
};