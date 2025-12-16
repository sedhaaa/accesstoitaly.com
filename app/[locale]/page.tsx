'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic'; 
import { 
  Star, ChevronDown, Menu, X,
  Landmark, Award, Sun, Gem, MapPin, Train, Bus,
  Quote, Minus, Plus, Loader2, CheckCircle, Check, X as XIcon, ArrowRight
} from 'lucide-react';

// --- STABIL OPTIMALIZÁCIÓ: BookingWidget ---
const BookingWidget = dynamic(() => import('../components/BookingWidget'), {
  loading: () => (
    <div className="w-full min-h-[580px] bg-[#1a1a1a] rounded-3xl flex flex-col items-center justify-center text-stone-500 border border-white/10 shadow-xl">
       <Loader2 size={32} className="animate-spin mb-3 text-[#B8860B]"/>
       <p className="text-[10px] uppercase tracking-widest font-medium opacity-70">Loading Calendar...</p>
    </div>
  ),
  ssr: false
});

// --- GOOGLE LOGÓ HELYETT TRUST BADGE ---
const TrustBadge = () => (
  <div className="flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
    <CheckCircle size={12} className="text-green-500" />
    <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">Verified Reviews</span>
  </div>
);

const FLAGS: Record<string, React.ReactNode> = {
  en: (
    <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-full object-cover border border-white/20 flex-shrink-0" aria-hidden="true">
      <path fill="#012169" d="M0 0h640v480H0z"/>
      <path fill="#FFF" d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
      <path fill="#C8102E" d="M424 294L640 457v23h-67L368 334 146 500H79l207-156-231-177h68l167 127L515 0h80L373 173l267 199v-78H424zM260 216L0 23v63l179 130H260z"/>
      <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
      <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
    </svg>
  ),
  it: (
    <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-full object-cover border border-white/20 flex-shrink-0" aria-hidden="true">
      <g fillRule="evenodd" strokeWidth="1pt">
        <path fill="#FFF" d="M0 0h640v480H0z"/>
        <path fill="#009246" d="M0 0h213.3v480H0z"/>
        <path fill="#ce2b37" d="M426.7 0H640v480H426.7z"/>
      </g>
    </svg>
  ),
  de: (
    <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-full object-cover border border-white/20 flex-shrink-0" aria-hidden="true">
      <path fill="#ffce00" d="M0 320h640v160H0z"/>
      <path fill="#000" d="M0 0h640v160H0z"/>
      <path fill="#d00" d="M0 160h640v160H0z"/>
    </svg>
  ),
  fr: (
    <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-full object-cover border border-white/20 flex-shrink-0" aria-hidden="true">
      <path fill="#FFF" d="M0 0h640v480H0z"/>
      <path fill="#002395" d="M0 0h213.3v480H0z"/>
      <path fill="#ED2939" d="M426.7 0H640v480H426.7z"/>
    </svg>
  ),
  es: (
    <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-full object-cover border border-white/20 flex-shrink-0" aria-hidden="true">
      <path fill="#AA151B" d="M0 0h640v480H0z"/>
      <path fill="#F1BF00" d="M0 120h640v240H0z"/>
    </svg>
  )
};

export default function Home() {
  const t = useTranslations('HomePage');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLanguage = (newLocale: string) => {
    const currentPath = pathname; 
    const segments = currentPath.split('/');
    if (segments.length > 1) {
        segments[1] = newLocale; 
    } else {
        segments.unshift('', newLocale);
    }
    const newPath = segments.join('/');
    router.push(newPath);
    setLangMenuOpen(false);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  // --- GOOGLE ADS & SEO SCHEMA (Nagyon Fontos!) ---
  // Itt soroljuk fel az összes lehetséges jegyet és árat.
  // Ez "AggregateOffer", ami megmutatja a Google-nek a teljes skálát.
  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "name": "Duomo di Milano: Rooftop, Cathedral & Museum Tickets",
        "description": t('hero.description'),
        "image": "https://res.cloudinary.com/dldgqjxkn/image/upload/v1765768474/federico-di-dio-photography-yfYZKkt5nes-unsplash_lmlmtk.jpg",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "2450"
        },
        "offers": {
          "@type": "AggregateOffer",
          "lowPrice": "13.90", // Legolcsóbb (Duomo Reduced)
          "highPrice": "35.90", // Legdrágább (Lift Adult)
          "priceCurrency": "EUR",
          "offerCount": "6",
          "offers": [
            { "@type": "Offer", "name": "Combo Lift - Adult", "price": "35.90", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" },
            { "@type": "Offer", "name": "Combo Lift - Reduced", "price": "19.90", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" },
            { "@type": "Offer", "name": "Combo Stairs - Adult", "price": "29.90", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" },
            { "@type": "Offer", "name": "Combo Stairs - Reduced", "price": "20.90", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" },
            { "@type": "Offer", "name": "Cathedral + Museum - Adult", "price": "21.90", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" },
            { "@type": "Offer", "name": "Cathedral + Museum - Reduced", "price": "13.90", "priceCurrency": "EUR", "availability": "https://schema.org/InStock" }
          ]
        }
      }
    ]
  }), [t]);

  const faqs = [
    { question: t('info.faq1_q'), answer: t('info.faq1_a') },
    { question: t('info.faq2_q'), answer: t('info.faq2_a') },
    { question: t('info.faq3_q'), answer: t('info.faq3_a') },
    { question: t('info.faq4_q'), answer: t('info.faq4_a') }
  ];

  // CLOUDINARY TURBÓ URL
  const HERO_IMAGE_OPTIMIZED = "https://res.cloudinary.com/dldgqjxkn/image/upload/c_limit,w_1000,q_auto,f_auto/v1765768474/federico-di-dio-photography-yfYZKkt5nes-unsplash_lmlmtk.jpg";

  return (
    <main className="min-h-screen text-[#1a1a1a] font-sans selection:bg-[#B8860B] selection:text-white overflow-x-hidden">
      
      <link rel="preconnect" href="https://res.cloudinary.com" />
      
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- DISCLAIMER --- */}
      <div className="bg-[#1a1a1a] text-white/90 text-[11px] md:text-xs py-3 text-center font-medium px-4 relative z-[40] border-b border-white/10">
        <p className="max-w-5xl mx-auto leading-relaxed opacity-95">
          {t('disclaimer')}
        </p>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="sticky top-0 w-full z-[50] bg-[#1a1a1a]/90 backdrop-blur-md border-b border-white/5 pointer-events-auto transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-16 md:h-20">
          
          <div className="text-white drop-shadow-md z-[60] flex-shrink-0">
            <h1 className="font-serif text-xl md:text-3xl font-bold tracking-widest cursor-pointer uppercase">
              Access<span className="font-light text-[#B8860B]">To</span>Italy
            </h1>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex gap-10 text-xs font-bold uppercase tracking-widest text-white/95 drop-shadow-md">
                <a href="#history" className="hover:text-[#B8860B] transition-colors duration-300 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8860B] rounded">{t('nav.history')}</a>
                <a href="#experience" className="hover:text-[#B8860B] transition-colors duration-300 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8860B] rounded">{t('nav.experience')}</a>
                <a href="#info" className="hover:text-[#B8860B] transition-colors duration-300 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8860B] rounded">{t('nav.info')}</a>
            </div>

            <div className="relative" ref={langMenuRef}>
                <button 
                    onClick={() => setLangMenuOpen(!langMenuOpen)}
                    aria-label="Change language"
                    aria-expanded={langMenuOpen}
                    className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/20 transition active:scale-95 z-[60] focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                >
                    {FLAGS[locale]}
                    <span className="text-[10px] font-bold text-white uppercase hidden md:block">{locale}</span>
                    <ChevronDown size={14} className={`text-white transition-transform duration-300 ${langMenuOpen ? 'rotate-180' : 'rotate-0'}`} />
                </button>

                <div className={`absolute top-full right-0 mt-3 w-40 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden transition-all duration-200 origin-top-right z-[70] ${langMenuOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                    <div className="py-2 flex flex-col">
                        {['en', 'it', 'de', 'fr', 'es'].map((lang) => (
                            <button
                                key={lang}
                                onClick={() => switchLanguage(lang)}
                                className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors ${locale === lang ? 'text-[#B8860B] bg-white/5' : 'text-white/70'}`}
                            >
                                {FLAGS[lang]}
                                {lang === 'en' ? 'English' : lang === 'it' ? 'Italiano' : lang === 'de' ? 'Deutsch' : lang === 'fr' ? 'Français' : 'Español'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <button 
                className="md:hidden text-white z-[60] p-1 focus:outline-none focus:ring-2 focus:ring-[#B8860B] rounded"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open main menu"
            >
                <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE MENU --- */}
      {mobileMenuOpen && (
        <>
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[190] animate-in fade-in duration-300"
              onClick={() => setMobileMenuOpen(false)}
            ></div>

            <div className="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-[#1a1a1a] z-[200] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-white/10">
                <div className="flex justify-end p-6">
                    <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu" className="text-white hover:text-[#B8860B] transition focus:outline-none focus:ring-2 focus:ring-[#B8860B] rounded">
                        <X size={32} />
                    </button>
                </div>

                <div className="flex flex-col items-center justify-center flex-grow space-y-8 p-6">
                    <a href="#history" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-[#B8860B] transition-colors">{t('nav.history')}</a>
                    <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-[#B8860B] transition-colors">{t('nav.experience')}</a>
                    <a href="#info" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-[#B8860B] transition-colors">{t('nav.info')}</a>
                    <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-[#B8860B] transition-colors">{t('nav.reviews')}</a>
                    
                    <div className="pt-8 w-full">
                        <button onClick={() => {setMobileMenuOpen(false); window.scrollTo({top:0, behavior:'smooth'})}} className="w-full bg-[#B8860B] text-white py-4 rounded-xl font-bold uppercase tracking-wider text-sm shadow-lg hover:bg-[#9a7009] transition">
                            {t('nav.bookBtn')}
                        </button>
                    </div>
                </div>
            </div>
        </>
      )}

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90svh] flex items-center justify-center overflow-hidden -mt-[1px]">
        <div className="absolute inset-0 bg-[#1a1a1a]">
          <Image 
            src={HERO_IMAGE_OPTIMIZED} 
            alt="Duomo di Milano Facade at Sunset" 
            fill
            priority={true}
            fetchPriority="high" 
            unoptimized={true} 
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/95 via-[#1a1a1a]/50 to-[#1a1a1a]/20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full pt-8 md:pt-12 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          <div className="lg:col-span-7 text-white space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-3 border-b border-[#B8860B] pb-2">
              <Star className="text-[#B8860B] w-4 h-4 fill-current" aria-hidden="true"/>
              <span className="text-[#B8860B] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">{t('hero.badge')}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl leading-[0.9] drop-shadow-2xl">
              {t('hero.title')} <br/>
              <span className="italic font-light opacity-90 ml-2 md:ml-4">{t('hero.subtitle')}</span>
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-lg font-light leading-relaxed pl-4 md:pl-6 border-l-2 border-[#B8860B]">
              {t('hero.description')}
            </p>
            
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-lg w-fit border border-white/10">
                <TrustBadge />
                <div>
                    <div className="flex text-[#B8860B] text-xs">
                        {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" className="text-[#B8860B]" aria-hidden="true"/>)}
                    </div>
                    <p className="text-[10px] text-white font-medium">{t('hero.ratingText')}</p>
                </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative z-20 flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
               <BookingWidget />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce hidden md:block">
          <ChevronDown size={24} className="mx-auto" />
        </div>
      </section>

      {/* --- ÚJ SZEKCIÓ: TICKET COMPARISON (A Hero alatt) --- */}
      <section className="py-12 md:py-20 px-6 md:px-12 bg-white relative z-10 -mt-2">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mb-2">Choose Your Experience</h2>
                <p className="text-stone-500 text-sm">Select the perfect ticket option for your visit</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. KÁRTYA: COMBO LIFT (Kiemelt) */}
                <div className="border-2 border-[#B8860B] bg-[#fffbf2] rounded-2xl p-6 relative shadow-lg transform md:-translate-y-2">
                    <div className="absolute top-0 right-0 bg-[#B8860B] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg uppercase tracking-wider">Most Popular</div>
                    <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-1">Combo Lift</h3>
                    <p className="text-xs text-stone-500 mb-4">Fast Track Access via Elevator</p>
                    <div className="text-2xl font-bold text-[#B8860B] mb-6">€35.90</div>
                    
                    <ul className="space-y-3 mb-6">
                        <li className="flex items-start gap-2 text-sm text-[#1a1a1a] font-medium"><Check size={16} className="text-green-600 mt-0.5 shrink-0"/> Rooftop via Lift</li>
                        <li className="flex items-start gap-2 text-sm text-[#1a1a1a] font-medium"><Check size={16} className="text-green-600 mt-0.5 shrink-0"/> Cathedral Interior</li>
                        <li className="flex items-start gap-2 text-sm text-[#1a1a1a] font-medium"><Check size={16} className="text-green-600 mt-0.5 shrink-0"/> Duomo Museum</li>
                        <li className="flex items-start gap-2 text-sm text-[#1a1a1a] font-medium"><Check size={16} className="text-green-600 mt-0.5 shrink-0"/> Church of St. Gottardo</li>
                    </ul>
                    <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="w-full bg-[#B8860B] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#9a7009] transition">Select This Ticket</button>
                </div>

                {/* 2. KÁRTYA: COMBO STAIRS */}
                <div className="border border-stone-200 bg-white rounded-2xl p-6 relative">
                    <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-1">Combo Stairs</h3>
                    <p className="text-xs text-stone-500 mb-4">Active Route (~250 Steps)</p>
                    <div className="text-2xl font-bold text-[#1a1a1a] mb-6">€29.90</div>
                    
                    <ul className="space-y-3 mb-6">
                        <li className="flex items-start gap-2 text-sm text-[#1a1a1a]"><Check size={16} className="text-green-600 mt-0.5 shrink-0"/> Rooftop via Stairs</li>
                        <li className="flex items-start gap-2 text-sm text-[#1a1a1a]"><Check size={16} className="text-green-600 mt-0.5 shrink-0"/> Cathedral Interior</li>
                        <li className="flex items-start gap-2 text-sm text-[#1a1a1a]"><Check size={16} className="text-green-600 mt-0.5 shrink-0"/> Duomo Museum</li>
                        <li className="flex items-start gap-2 text-sm text-[#1a1a1a]"><Check size={16} className="text-green-600 mt-0.5 shrink-0"/> Church of St. Gottardo</li>
                    </ul>
                    <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="w-full border border-stone-300 text-[#1a1a1a] py-3 rounded-xl font-bold text-sm hover:bg-stone-50 transition">Select This Ticket</button>
                </div>

                {/* 3. KÁRTYA: CATHEDRAL ONLY */}
                <div className="border border-stone-200 bg-white rounded-2xl p-6 relative">
                    <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-1">Duomo + Museum</h3>
                    <p className="text-xs text-stone-500 mb-4">No Rooftop Access</p>
                    <div className="text-2xl font-bold text-[#1a1a1a] mb-6">€21.90</div>
                    
                    <ul className="space-y-3 mb-6">
                        <li className="flex items-start gap-2 text-sm text-stone-400 line-through"><XIcon size={16} className="text-stone-300 mt-0.5 shrink-0"/> No Rooftop Access</li>
                        <li className="flex items-start gap-2 text-sm text-[#1a1a1a]"><Check size={16} className="text-green-600 mt-0.5 shrink-0"/> Cathedral Interior</li>
                        <li className="flex items-start gap-2 text-sm text-[#1a1a1a]"><Check size={16} className="text-green-600 mt-0.5 shrink-0"/> Duomo Museum</li>
                        <li className="flex items-start gap-2 text-sm text-[#1a1a1a]"><Check size={16} className="text-green-600 mt-0.5 shrink-0"/> Church of St. Gottardo</li>
                    </ul>
                    <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="w-full border border-stone-300 text-[#1a1a1a] py-3 rounded-xl font-bold text-sm hover:bg-stone-50 transition">Select This Ticket</button>
                </div>

            </div>
        </div>
      </section>

      {/* --- HISTORY SECTION --- */}
      <section id="history" className="py-16 md:py-24 px-6 md:px-12 bg-[#1a1a1a] text-white -mt-[1px] relative z-10">
         <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
               <span className="text-[#B8860B] font-bold uppercase tracking-widest text-xs">{t('history.badge')}</span>
               <h2 className="font-serif text-3xl md:text-5xl text-white mt-4 mb-6">{t('history.title')}</h2>
               <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-light">
                 {t('history.description')}
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
               <div className="space-y-12">
                  <div className="flex gap-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2a2a2a] border border-[#333] flex items-center justify-center text-[#B8860B] font-serif font-bold text-xl">1</div>
                      <div>
                        <h4 className="font-serif text-xl font-bold text-white mb-2">{t('history.step1_title')}</h4>
                        <p className="text-white/70 text-sm leading-relaxed">{t('history.step1_desc')}</p>
                      </div>
                  </div>
                  <div className="flex gap-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2a2a2a] border border-[#333] flex items-center justify-center text-[#B8860B] font-serif font-bold text-xl">2</div>
                      <div>
                        <h4 className="font-serif text-xl font-bold text-white mb-2">{t('history.step2_title')}</h4>
                        <p className="text-white/70 text-sm leading-relaxed">{t('history.step2_desc')}</p>
                      </div>
                  </div>
                  <div className="flex gap-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2a2a2a] border border-[#333] flex items-center justify-center text-[#B8860B] font-serif font-bold text-xl">3</div>
                      <div>
                        <h4 className="font-serif text-xl font-bold text-white mb-2">{t('history.step3_title')}</h4>
                        <p className="text-white/70 text-sm leading-relaxed">{t('history.step3_desc')}</p>
                      </div>
                  </div>
               </div>
               <div className="relative h-[400px] md:h-[600px] rounded-t-full overflow-hidden border-8 border-[#2a2a2a]">
                  <Image 
                      src="https://res.cloudinary.com/dldgqjxkn/image/upload/v1765768475/alessandro-cavestro-SXHm_cboGiI-unsplash_cmalx8.jpg" 
                      alt="Duomo Historical Detail" 
                      fill 
                      sizes="(max-width: 768px) 100vw, 50vw" 
                      className="object-cover hover:scale-105 transition duration-1000"
                  />
               </div>
            </div>
         </div>
      </section>

      {/* --- ARCHITECTURE HIGHLIGHTS --- */}
      <section className="bg-[#f5f5f5] py-16 md:py-24 px-6 md:px-12 relative z-10">
         <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
               <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                  <Landmark className="mx-auto text-[#B8860B] mb-6" size={48} aria-hidden="true"/>
                  <h3 className="font-serif text-2xl mb-4 text-[#1a1a1a]">{t('features.marble_title')}</h3>
                  <p className="text-sm text-[#1a1a1a]/80 leading-relaxed font-medium">{t('features.marble_desc')}</p>
               </div>
               <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                  <Award className="mx-auto text-[#B8860B] mb-6" size={48} aria-hidden="true"/>
                  <h3 className="font-serif text-2xl mb-4 text-[#1a1a1a]">{t('features.statues_title')}</h3>
                  <p className="text-sm text-[#1a1a1a]/80 leading-relaxed font-medium">{t('features.statues_desc')}</p>
               </div>
               <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                  <Sun className="mx-auto text-[#B8860B] mb-6" size={48} aria-hidden="true"/>
                  <h3 className="font-serif text-2xl mb-4 text-[#1a1a1a]">{t('features.madonnina_title')}</h3>
                  <p className="text-sm text-[#1a1a1a]/80 leading-relaxed font-medium">{t('features.madonnina_desc')}</p>
               </div>
            </div>
         </div>
      </section>

      {/* --- SECRETS --- */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-white relative z-10">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-center">
            <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px]">
               <Image 
                  src="https://res.cloudinary.com/dldgqjxkn/image/upload/v1765768475/ouael-ben-salah-0xe2FGo7Vc0-unsplash_qk8u3f.jpg" 
                  alt="Duomo Detail" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw" 
                  className="object-cover rounded-sm shadow-xl"
               />
               <div className="absolute -bottom-6 -right-6 bg-[#1a1a1a] p-6 shadow-lg max-w-xs border-l-4 border-[#B8860B]">
                  <p className="text-white font-serif italic text-lg">"{t('secrets.quote')}"</p>
                  <p className="text-white/60 text-xs mt-2 uppercase tracking-wide">— Oscar Wilde</p>
               </div>
            </div>
            <div className="w-full md:w-1/2 space-y-8">
               <span className="text-[#B8860B] font-bold uppercase tracking-widest text-xs">{t('secrets.badge')}</span>
               <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a]">{t('secrets.title')}</h3>
               
               <div className="space-y-6">
                  <div className="flex gap-4">
                      <Gem className="text-[#B8860B] flex-shrink-0" size={24} aria-hidden="true"/>
                      <div>
                        <h4 className="font-bold text-[#1a1a1a]">{t('secrets.item1_title')}</h4>
                        <p className="text-sm text-[#1a1a1a]/70">{t('secrets.item1_desc')}</p>
                      </div>
                  </div>
                  <div className="flex gap-4">
                      <Gem className="text-[#B8860B] flex-shrink-0" size={24} aria-hidden="true"/>
                      <div>
                        <h4 className="font-bold text-[#1a1a1a]">{t('secrets.item2_title')}</h4>
                        <p className="text-sm text-[#1a1a1a]/70">{t('secrets.item2_desc')}</p>
                      </div>
                  </div>
                  <div className="flex gap-4">
                      <Gem className="text-[#B8860B] flex-shrink-0" size={24} aria-hidden="true"/>
                      <div>
                        <h4 className="font-bold text-[#1a1a1a]">{t('secrets.item3_title')}</h4>
                        <p className="text-sm text-[#1a1a1a]/70">{t('secrets.item3_desc')}</p>
                      </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- GUIDE --- */}
      <section id="experience" className="py-16 md:py-24 px-6 md:px-12 bg-[#f9f9f9] relative z-10">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
               <span className="text-[#B8860B] font-bold uppercase tracking-widest text-xs">{t('guide.badge')}</span>
               <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mt-2">{t('guide.title')}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="group cursor-pointer">
                  <div className="relative h-64 w-full overflow-hidden mb-6">
                      <Image 
                        src="https://res.cloudinary.com/dldgqjxkn/image/upload/v1765768474/rebecca-mckenna-CzjWqp0UWAc-unsplash_lnqbpz.jpg" 
                        alt="Rooftop Sunset" 
                        fill 
                        sizes="(max-width: 768px) 100vw, 33vw" 
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                  </div>
                  <span className="text-[#B8860B] text-[10px] font-bold uppercase tracking-[0.2em]">{t('guide.card1_badge')}</span>
                  <h4 className="font-serif text-2xl text-[#1a1a1a] mt-2 mb-3 group-hover:text-[#B8860B] transition-colors">{t('guide.card1_title')}</h4>
                  <p className="text-[#1a1a1a]/70 text-sm leading-relaxed mb-4">{t('guide.card1_desc')}</p>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] underline decoration-[#B8860B] underline-offset-4">{t('guide.card1_link')}</span>
               </div>

               <div className="group cursor-pointer">
                  <div className="relative h-64 w-full overflow-hidden mb-6">
                      <Image 
                        src="https://res.cloudinary.com/dldgqjxkn/image/upload/v1765768474/rebecca-mckenna-DQge-qqqzxU-unsplash_csigsf.jpg" 
                        alt="Inside the Duomo" 
                        fill 
                        sizes="(max-width: 768px) 100vw, 33vw" 
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                  </div>
                  <span className="text-[#B8860B] text-[10px] font-bold uppercase tracking-[0.2em]">{t('guide.card2_badge')}</span>
                  <h4 className="font-serif text-2xl text-[#1a1a1a] mt-2 mb-3 group-hover:text-[#B8860B] transition-colors">{t('guide.card2_title')}</h4>
                  <p className="text-[#1a1a1a]/70 text-sm leading-relaxed mb-4">{t('guide.card2_desc')}</p>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] underline decoration-[#B8860B] underline-offset-4">{t('guide.card2_link')}</span>
               </div>

               <div className="group cursor-pointer">
                  <div className="relative h-64 w-full overflow-hidden mb-6">
                      <Image 
                        src="https://res.cloudinary.com/dldgqjxkn/image/upload/v1765768475/ouael-ben-salah-0xe2FGo7Vc0-unsplash_qk8u3f.jpg" 
                        alt="Milan Food" 
                        fill 
                        sizes="(max-width: 768px) 100vw, 33vw" 
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                  </div>
                  <span className="text-[#B8860B] text-[10px] font-bold uppercase tracking-[0.2em]">{t('guide.card3_badge')}</span>
                  <h4 className="font-serif text-2xl text-[#1a1a1a] mt-2 mb-3 group-hover:text-[#B8860B] transition-colors">{t('guide.card3_title')}</h4>
                  <p className="text-[#1a1a1a]/70 text-sm leading-relaxed mb-4">{t('guide.card3_desc')}</p>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] underline decoration-[#B8860B] underline-offset-4">{t('guide.card3_link')}</span>
               </div>
            </div>
         </div>
      </section>

      {/* --- REVIEWS --- */}
      <section id="reviews" className="py-16 md:py-20 px-6 md:px-12 bg-white border-t border-gray-200 relative z-10">
         <div className="max-w-7xl mx-auto">
             <div className="flex items-center justify-center gap-3 mb-12">
                 <TrustBadge />
                 <h3 className="font-serif text-3xl text-[#1a1a1a]">{t('reviews.title')}</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-white p-8 shadow-sm border border-gray-200 rounded-xl relative">
                     <Quote size={40} className="text-gray-200 absolute top-6 right-6" aria-hidden="true"/>
                     <div className="flex text-[#B8860B] mb-4">
                        {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" aria-hidden="true"/>)}
                     </div>
                     <p className="text-[#1a1a1a]/70 text-sm leading-relaxed mb-6">
                       "{t('reviews.r1_text')}"
                     </p>
                     <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center font-bold text-xs">S</div>
                         <div>
                             <span className="block text-xs font-bold text-[#1a1a1a]">Sarah J.</span>
                             <span className="text-[10px] text-gray-500">December 2024</span>
                         </div>
                     </div>
                 </div>

                 <div className="bg-white p-8 shadow-sm border border-gray-200 rounded-xl relative">
                     <Quote size={40} className="text-gray-200 absolute top-6 right-6" aria-hidden="true"/>
                     <div className="flex text-[#B8860B] mb-4">
                        {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" aria-hidden="true"/>)}
                     </div>
                     <p className="text-[#1a1a1a]/70 text-sm leading-relaxed mb-6">
                       "{t('reviews.r2_text')}"
                     </p>
                     <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-[#B8860B] text-white flex items-center justify-center font-bold text-xs">M</div>
                         <div>
                             <span className="block text-xs font-bold text-[#1a1a1a]">Mark D.</span>
                             <span className="text-[10px] text-gray-500">January 2025</span>
                         </div>
                     </div>
                 </div>

                 <div className="bg-white p-8 shadow-sm border border-gray-200 rounded-xl relative">
                     <Quote size={40} className="text-gray-200 absolute top-6 right-6" aria-hidden="true"/>
                     <div className="flex text-[#B8860B] mb-4">
                        {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" aria-hidden="true"/>)}
                     </div>
                     <p className="text-[#1a1a1a]/70 text-sm leading-relaxed mb-6">
                       "{t('reviews.r3_text')}"
                     </p>
                     <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center font-bold text-xs">E</div>
                         <div>
                             <span className="block text-xs font-bold text-[#1a1a1a]">Elena R.</span>
                             <span className="text-[10px] text-gray-500">November 2024</span>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
      </section>

      {/* --- INFO & FAQ --- */}
      <section id="info" className="py-16 md:py-24 w-full bg-white relative z-10">
         <div className="max-w-4xl mx-auto px-6 md:px-12">
             <div className="text-center mb-16">
                 <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a]">{t('info.title')}</h3>
                 <p className="text-[#1a1a1a]/60 mt-4">{t('info.subtitle')}</p>
             </div>

             <div className="space-y-4 border-t border-gray-200 pt-8">
                {faqs.map((faq, index) => (
                   <div key={index} className="border-b border-gray-200 pb-4">
                      <button 
                         onClick={() => toggleFaq(index)}
                         aria-expanded={openFaq === index}
                         className="w-full flex justify-between items-center text-left py-2 hover:text-[#B8860B] transition focus:outline-none focus:text-[#B8860B]"
                      >
                         <span className="font-bold text-base md:text-lg text-[#1a1a1a] pr-4">{faq.question}</span>
                         {openFaq === index ? <Minus size={18} className="text-[#B8860B] flex-shrink-0" aria-hidden="true"/> : <Plus size={18} className="text-gray-400 flex-shrink-0" aria-hidden="true"/>}
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                         <p className="text-[#1a1a1a]/70 font-light leading-relaxed text-sm md:text-base">{faq.answer}</p>
                      </div>
                   </div>
                ))}
             </div>
         </div>
      </section>

      {/* --- LOCATION MAP --- */}
      <section className="w-full bg-white relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-3 h-auto lg:h-[500px]">
             
             {/* Bal oldal: Információ */}
             <div className="bg-[#f9f9f9] p-8 md:p-12 flex flex-col justify-center order-1 lg:order-1">
                 <MapPin className="text-[#B8860B] mb-6" size={40} aria-hidden="true"/>
                 <h3 className="font-serif text-3xl text-[#1a1a1a] mb-6">{t('location.title')}</h3>
                 
                 <div className="space-y-6">
                     <div>
                         <div className="flex items-center gap-3 mb-2">
                             <Train className="text-[#B8860B]" size={20} aria-hidden="true"/>
                             <h4 className="font-bold text-[#1a1a1a]">{t('location.metro_title')}</h4>
                         </div>
                         <p className="text-[#1a1a1a]/70 text-sm ml-8">
                             {t('location.metro_desc')}
                         </p>
                     </div>

                     <div>
                         <div className="flex items-center gap-3 mb-2">
                             <Bus className="text-[#B8860B]" size={20} aria-hidden="true"/>
                             <h4 className="font-bold text-[#1a1a1a]">{t('location.tram_title')}</h4>
                         </div>
                         <p className="text-[#1a1a1a]/70 text-sm ml-8">
                             {t('location.tram_desc')}
                         </p>
                     </div>
                 </div>
             </div>

             {/* Jobb oldal: Térkép - OPTIMALIZÁLT (Static Image + Link) */}
             <div className="lg:col-span-2 h-[400px] lg:h-full relative order-2 lg:order-2 group overflow-hidden bg-[#1a1a1a]">
                 <a 
                    href="https://www.google.com/maps/search/?api=1&query=Duomo+di+Milano" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full h-full relative"
                    aria-label="Open location in Google Maps"
                 >
                    {/* Placeholder Kép: quality={50} a sebességért */}
                    <Image 
                        src="https://res.cloudinary.com/dldgqjxkn/image/upload/v1765768474/federico-di-dio-photography-yfYZKkt5nes-unsplash_lmlmtk.jpg" 
                        alt="Map Location"
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100 grayscale hover:grayscale-0"
                        sizes="(max-width: 768px) 100vw, 66vw"
                        quality={50} 
                    />
                    
                    {/* Overlay gomb */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white text-[#1a1a1a] px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 transform transition group-hover:scale-110">
                            <MapPin size={20} className="text-[#B8860B]" aria-hidden="true"/>
                            {t('location.title')} (Google Maps)
                        </div>
                    </div>
                 </a>
             </div>
         </div>
      </section>

    </main>
  );
}