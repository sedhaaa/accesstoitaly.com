import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

// CSS IMPORTÁLÁSA
import '../globals.css'; 

// KOMPONENSEK
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';

// BETŰTÍPUSOK (Subset optimalizálás)
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair',
  display: 'swap',
  adjustFontFallback: false // Néha segít a CLS-en (Layout Shift)
});

const dmSans = DM_Sans({ 
  subsets: ['latin'], 
  variable: '--font-dm',
  display: 'swap',
  adjustFontFallback: false
});

// METADATA (SEO)
export const metadata: Metadata = {
  // FONTOS: Cseréld le a saját domainedre! Ez kell a helyes SEO kép betöltéshez.
  metadataBase: new URL('https://access-to-italy.com'), 
  title: 'Duomo di Milano Tickets | Rooftops & Cathedral Entry',
  description: 'Book your visit to the Duomo di Milano. Secure access to the Rooftop Terraces, Cathedral, and Museum. Instant mobile tickets and fast-track options available.',
  openGraph: {
    title: 'Duomo di Milano Tickets | Rooftop Access',
    description: 'Experience the breathtaking views from the Duomo Terraces.',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dldgqjxkn/image/upload/v1765768474/federico-di-dio-photography-yfYZKkt5nes-unsplash_lmlmtk.jpg', 
        width: 1200,
        height: 630,
        alt: 'Duomo di Milano',
      },
    ],
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params
}: Props) {
  
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      {/* suppressHydrationWarning: Megvéd a bővítmények okozta hibáktól */}
      <body 
        className={`${playfair.variable} ${dmSans.variable} font-sans bg-[#FAFAF9] text-[#1C1917] antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning={true}
      >
        
        {/* --- OPTIMALIZÁLT GOOGLE SCRIPTEK --- 
            A 'lazyOnload' stratégia kulcsfontosságú a 90+ PageSpeed eléréséhez!
            Csak akkor tölt be, ha az oldal már kész és interaktív.
        */}
        <Script
            src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"
            strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', 'AW-XXXXXXXXX');
            `}
        </Script>

        <NextIntlClientProvider messages={messages}>
          
          <main className="flex-grow">
            {children}
          </main>

          {/* Footer és CookieBanner - ezek maradnak */}
          <Footer />
          <CookieBanner />

        </NextIntlClientProvider>

      </body>
    </html>
  );
}