import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import Footer from './components/Footer';
import GoogleAnalytics from './components/GoogleAnalytics'; // <--- ÚJ
import CookieBanner from './components/CookieBanner';       // <--- ÚJ
import './globals.css';

// Font optimalizálás
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
  title: 'Duomo di Milano Tickets | Skip The Line & Terraces',
  description: 'Book official Duomo di Milano tickets. Instant mobile delivery, skip-the-line access to the Cathedral, Rooftop Terraces (Lift/Stairs), and Museum.',
  keywords: ['Duomo di Milano tickets', 'Milan Cathedral entry', 'Duomo terraces lift', 'Milan museum entry', 'Skip the line Duomo'],
  openGraph: {
    title: 'Duomo di Milano Tickets | Official Access',
    description: 'Experience the majesty of Milan\'s Cathedral. Book your tickets for the Cathedral, Terraces, and Museum now.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://res.cloudinary.com/dldgqjxkn/image/upload/v1765768474/federico-di-dio-photography-yfYZKkt5nes-unsplash_lmlmtk.jpg',
        width: 1200,
        height: 630,
        alt: 'Duomo di Milano',
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
      <body className={`${playfair.variable} ${dmSans.variable} font-sans bg-[#FAFAF9] text-[#1C1917] antialiased`}>
        
        {/* --- GOOGLE ANALYTICS & ADS (CONSENT MODE) --- */}
        {/* Cseréld le a kódot a sajátodra! */}
        <GoogleAnalytics GA_MEASUREMENT_ID="AW-XXXXXXXXX" />

        {/* FŐ TARTALOM */}
        {children}

        {/* LÁBLÉC */}
        <Footer />

        {/* COOKIE BANNER (Mindig a legtetején rétegben) */}
        <CookieBanner />
        
      </body>
    </html>
  );
}