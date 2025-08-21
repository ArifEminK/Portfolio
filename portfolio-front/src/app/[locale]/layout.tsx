import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import { locales, defaultLocale } from '@/app/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Locale'i doğrula ve fallback sağla
  const activeLocale = locales.includes(locale as any) ? locale : defaultLocale;
  
  // getMessages ile doğru locale'den messages'ı al
  const messages = await getMessages({ locale: activeLocale });
  
  return (
    <NextIntlClientProvider locale={activeLocale} messages={messages}>
      <TopBar />
      {children}
      <Footer currentLocale={activeLocale} />
    </NextIntlClientProvider>
  );
}
