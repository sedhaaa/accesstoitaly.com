import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A támogatott nyelvek
  locales: ['en', 'it', 'de', 'fr', 'es'],
 
  // Alapértelmezett nyelv
  defaultLocale: 'en'
});
 
export const config = {
  // A JAVÍTOTT RÉSZ:
  // Ez a regex azt mondja: Illeszkedj mindenre, AMI NEM:
  // - api (...)
  // - _next (...)
  // - fájlok kiterjesztéssel (.*\\..*)
  // - admin (EZT ADTUK HOZZÁ)
  matcher: ['/((?!api|_next|.*\\..*|admin).*)']
};