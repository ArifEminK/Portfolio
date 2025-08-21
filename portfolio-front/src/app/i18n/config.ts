export const locales = ['tr', 'en', 'de'] as const;
export const defaultLocale = 'tr' as const;

export type Locale = typeof locales[number];