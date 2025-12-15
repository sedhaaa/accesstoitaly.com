import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

// --- 1. KOMPONENSEK IMPORTÁLÁSA ---
// import Navbar from './components/Navbar'; // Page szinten kezeled
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';

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
  // ADS TIPP: A "Rooftops" (Teraszok) és "Cathedral" a fő hívószavak.
  // Kerüljük a sima "Duomo di Milano Official" megnevezést.
  title: 'Duomo di Milano Tickets | Rooftops & Cathedral Entry',
  
  // ADS TIPP: Konkrét szolgáltatásokat sorolunk fel, nem hivatalos képviseletet.
  description: 'Book your visit to the Duomo di Milano. Secure access to the Rooftop Terraces, Cathedral, and Museum. Instant mobile tickets and fast-track options available.',
  
  keywords: ['Duomo di Milano tickets', 'Milan Cathedral entry', 'Duomo rooftops tickets', 'Milan Duomo skip the line', 'Duomo terraces lift'],
  
  openGraph: {
    title: 'Duomo di Milano Tickets | Rooftop Access',
    description: 'Experience the breathtaking views from the Duomo Terraces. Book your tickets online.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        // FONTOS: Ide tedd be a saját Duomo képed URL-jét!
        url: 'https://res.cloudinary.com/dldgqjxkn/image/upload/v12345678/duomo-di-milano-cover.jpg', 
        width: 1200,
        height: 630,
        alt: 'Duomo di Milano Rooftops and Cathedral',
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
      <body className={`${playfair.variable} ${dmSans.variable} font-sans bg-[#FAFAF9] text-[#1C1917] antialiased flex flex-col min-h-screen`}>
        
        {/* --- GOOGLE ADS / ANALYTICS --- 
            Cseréld le az ID-t a sajátodra! 
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

        {/* --- NAVBAR HELYE (Page szinten van) --- */}

        {/* --- FŐ TARTALOM --- */}
        <main className="flex-grow">
          {children}
        </main>

        {/* --- FOOTER --- */}
        <Footer />
        
        {/* Opcionális: Cookie Banner */}
        <CookieBanner />

      </body>
    </html>
  );
}