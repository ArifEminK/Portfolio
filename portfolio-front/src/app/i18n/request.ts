import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, type Locale } from './config';

export default getRequestConfig(async ({ locale }) => {
  // Next 15'te locale parametresini güvenli şekilde çöz
  let resolvedLocale: Locale = defaultLocale;
  
  if (locale) {
    if (typeof locale === 'string' && locales.includes(locale as Locale)) {
      resolvedLocale = locale as Locale;
    } else if (typeof locale === 'object' && locale !== null) {
      // Eğer locale bir Promise ise await et
      try {
        const awaitedLocale = await (locale as any);
        if (locales.includes(awaitedLocale as Locale)) {
          resolvedLocale = awaitedLocale as Locale;
        }
      } catch (error) {
        console.warn('Locale resolution failed, using default:', error);
      }
    }
  }

  return {
    locale: resolvedLocale,
    messages: (await import(`./${resolvedLocale}.json`)).default
  };
});
