import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

// CSS IMPORTÁLÁSA (Mivel az [locale] mappában vagyunk, két szintet lépünk vissza)
import '../globals.css'; 

// KOMPONENSEK IMPORTÁLÁSA
// Ha a @ alias nem működne, használd a relatív útvonalat: '../../components/Footer'
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';

// BETŰTÍPUSOK BEÁLLÍTÁSA
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair',
  display: 'swap' 
});

const dmSans = DM_Sans({ 
  subsets: ['latin'], 
  variable: '--font-dm',
  display: 'swap' 
});

// METADATA (SEO)
export const metadata: Metadata = {
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

// --- TÍPUS DEFINÍCIÓ A NEXT.JS 15-HÖZ ---
// Ez oldja meg a "Promise" hibát
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// --- FŐ LAYOUT KOMPONENS ---
export default async function RootLayout({
  children,
  params
}: Props) {
  
  // 1. AWAIT-ELJÜK A PARAMÉTEREKET (Next.js 15 követelmény)
  const { locale } = await params;

  // 2. LEKÉRJÜK A FORDÍTÁSOKAT A SZERVERRŐL
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${playfair.variable} ${dmSans.variable} font-sans bg-[#FAFAF9] text-[#1C1917] antialiased flex flex-col min-h-screen`}>
        
        {/* --- GOOGLE ADS & ANALYTICS --- 
            FONTOS: Cseréld le a 'AW-XXXXXXXXX'-et a saját ID-dra! 
        */}
        <Script
            src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"
            strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', 'AW-XXXXXXXXX');
            `}
        </Script>

        {/* --- FORDÍTÓ PROVIDER --- 
            Ez teszi lehetővé a useTranslations használatát a page.tsx-ben
        */}
        <NextIntlClientProvider messages={messages}>
          
          {/* A tartalom kitölti a teret, így a footer mindig alul marad */}
          <main className="flex-grow">
            {children}
          </main>

          <Footer />
          <CookieBanner />

        </NextIntlClientProvider>

      </body>
    </html>
  );
}