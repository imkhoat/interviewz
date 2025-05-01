import { getRequestConfig } from 'next-intl/server';
import { locales, type Locale } from './config';

export default getRequestConfig(async ({ locale }) => {
  const currentLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';

  return {
    messages: (await import(`./locales/${currentLocale}/index.ts`)).default,
    timeZone: 'Asia/Ho_Chi_Minh',
    locale: currentLocale
  };
}); 