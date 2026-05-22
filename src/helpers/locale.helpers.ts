export type AppLanguage = "uk" | "en";

export const DEFAULT_LANGUAGE: AppLanguage = "uk";

export const SUPPORTED_LANGUAGES: AppLanguage[] = ["uk", "en"];

export const getValidLanguage = (lang?: string): AppLanguage => {
    return SUPPORTED_LANGUAGES.includes(lang as AppLanguage)
        ? (lang as AppLanguage)
        : DEFAULT_LANGUAGE;
};

export const getWeatherApiLanguage = (lang?: string): AppLanguage => {
    return getValidLanguage(lang);
};

export const getLocaleCode = (lang?: string): string => {
    const validLang = getValidLanguage(lang);

    return validLang === "en" ? "en-US" : "uk-UA";
};