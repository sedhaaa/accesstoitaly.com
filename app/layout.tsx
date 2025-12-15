import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

// --- 1. KOMPONENSEK IMPORTÁLÁSA ---
// Ellenőrizd, hogy a fájlnevek pontosan egyeznek-e (kis/nagybetű)!
//import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner'; // Opcionális: Ha akarod, hogy mindenhol ott legyen

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

export const metadata: Metadata = {
  title: 'Guggenheim Bilbao Tickets | Skip The Line Entry',
  description: 'Book official Guggenheim Museum Bilbao tickets. Instant mobile delivery, skip-the-line access, and visitor guide. Experience Frank Gehry\'s masterpiece.',
  keywords: ['Guggenheim Bilbao tickets', 'Bilbao museum entry', 'Guggenheim skip the line', 'Frank Gehry architecture'],
  openGraph: {
    title: 'Guggenheim Bilbao Tickets | Skip The Line',
    description: 'Experience the Titanium Masterpiece. Book your tickets now.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://res.cloudinary.com/dldgqjxkn/image/upload/v1765748488/el-edificio-guggenheim-bilbao-1_nursre.jpg',
        width: 1200,
        height: 630,
        alt: 'Guggenheim Museum Bilbao',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* --- 2. STICKY FOOTER BEÁLLÍTÁS ---
         flex flex-col min-h-screen: Biztosítja, hogy az oldal kitöltse a képernyőt,
         és a footer alul maradjon akkor is, ha kevés a tartalom.
      */}
      <body className={`${playfair.variable} ${dmSans.variable} font-sans bg-[#FAFAF9] text-[#1C1917] antialiased flex flex-col min-h-screen`}>
        
        {/* --- GOOGLE SCRIPTS --- */}
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

        {/* --- NAVBAR  nem kell ez nekem--- */}
        

        {/* --- FŐ TARTALOM --- */}
        {/* A flex-grow tolja le a footert, ha üres hely van */}
        <main className="flex-grow">
          {children}
        </main>

        {/* --- FOOTER --- */}
        <Footer />
        
        {/* Opcionális: Cookie Banner (a layout szintjén szokás kezelni) */}
        <CookieBanner />

      </body>
    </html>
  );
}