import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

const locales = ['en', 'it', 'de', 'fr', 'es'];

// FIGYELD A VÁLTOZÁST: {requestLocale}-t kérünk, nem {locale}-t!
export default getRequestConfig(async ({requestLocale}) => {
  
  // 1. Kicsomagoljuk a Promise-t (ez az új módszer)
  let locale = await requestLocale;

  // 2. Biztonsági ellenőrzés: Ha undefined lenne, állítsuk be alapértelmezettnek az angolt
  if (!locale || !locales.includes(locale as any)) {
    locale = 'en'; 
  }

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    locale: locale // Itt visszaadjuk a végleges nyelvet
  };
});