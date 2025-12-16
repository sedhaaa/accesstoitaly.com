import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A támogatott nyelvek
  locales: ['en', 'it', 'de', 'fr', 'es'],
 
  // Alapértelmezett nyelv
  defaultLocale: 'en',

  // FONTOS: Ez stabilizálja az URL-eket és gyorsítja a betöltést.
  // Így mindig /en, /it stb. lesz a link, nem ugrál a rendszer.
  localePrefix: 'always'
});
 
export const config = {
  // A JAVÍTOTT MATCHER:
  // - api: API hívások kihagyása
  // - _next: Rendszerfájlok kihagyása
  // - .*\..*: Képek, ikonok, fájlok kihagyása (ez a legfontosabb a sebességhez!)
  // - admin: Az admin felületet nem kell fordítani
  matcher: ['/((?!api|_next|.*\\..*|admin).*)']
};