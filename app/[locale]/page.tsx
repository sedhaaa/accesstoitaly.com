import Script from 'next/script';
import { useTranslations } from 'next-intl';
import { 
  Star, Landmark, Award, Sun, Gem, MapPin, Train, Bus,
  Quote, CheckCircle, Check, X as XIcon
} from 'lucide-react';

// --- KOMPONENSEK IMPORTÁLÁSA ---
import BookingWidgetWrapper from '../components/BookingWidgetWrapper';
import HomeNavbar from '../components/HomeNavbar';
import HomeFaq from '../components/HomeFaq';
import CloudinaryImage from '../components/CloudinaryImage';
import TicketSelectButton from '../components/TicketSelectButton';

// --- TRUST BADGE ---
const TrustBadge = () => (
  <div className="flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
    <CheckCircle size={12} className="text-green-500" />
    <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">Verified Reviews</span>
  </div>
);

export default function Home() {
  const t = useTranslations('HomePage');
  const tComp = useTranslations('comparison'); 

  // MENÜ ADATOK
  const navDict = {
    history: t('nav.history'),
    experience: t('nav.experience'),
    info: t('nav.info'),
    reviews: t('nav.reviews'),
    bookBtn: t('nav.bookBtn')
  };

  // GYIK ADATOK
  const faqs = [
    { question: t('info.faq1_q'), answer: t('info.faq1_a') },
    { question: t('info.faq2_q'), answer: t('info.faq2_a') },
    { question: t('info.faq3_q'), answer: t('info.faq3_a') },
    { question: t('info.faq4_q'), answer: t('info.faq4_a') }
  ];

  // SEO Schema
  const jsonLd = {
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
          "lowPrice": "13.90",
          "highPrice": "35.90",
          "priceCurrency": "EUR",
          "offerCount": "6"
        }
      }
    ]
  };

  return (
    <main className="min-h-screen text-[#1a1a1a] font-sans selection:bg-[#B8860B] selection:text-white overflow-x-hidden bg-white">
      
      <link rel="preconnect" href="https://res.cloudinary.com" />
      
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- DISCLAIMER --- */}
      <div className="bg-[#1a1a1a] text-white/90 text-[11px] md:text-xs py-3 text-center font-medium px-4 relative z-[60] border-b border-white/10 shadow-[0_1px_0_#1a1a1a]">
        <p className="max-w-5xl mx-auto leading-relaxed opacity-95">
          {t('disclaimer')}
        </p>
      </div>

      {/* --- NAVBAR --- */}
      <HomeNavbar navDict={navDict} />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90svh] flex items-center justify-center overflow-hidden -mt-1 shadow-[0_2px_0_#1a1a1a]">
        <div className="absolute inset-0 bg-[#1a1a1a]">
          <CloudinaryImage 
            src="https://res.cloudinary.com/dldgqjxkn/image/upload/v1765768474/federico-di-dio-photography-yfYZKkt5nes-unsplash_lmlmtk.jpg"
            alt="Duomo di Milano Facade at Sunset" 
            fill
            priority={true}
            fetchPriority="high" 
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            quality={85}
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
            {/* ITT AZ ÚJ ID: booking-widget-anchor */}
            <div id="booking-widget-anchor" className="w-full max-w-md min-h-[580px]">
               <BookingWidgetWrapper />
            </div>
          </div>
        </div>
      </section>

      {/* --- TICKET COMPARISON --- */}
      <section className="py-12 md:py-20 px-6 md:px-12 bg-white relative z-10 -mt-2" style={{ contentVisibility: 'auto', containIntrinsicSize: '800px' }}>
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mb-2">{tComp('title')}</h2>
                <p className="text-stone-500 text-sm">{tComp('subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. KÁRTYA: LIFT */}
                <div className="border-2 border-[#B8860B] bg-[#fffbf2] rounded-2xl p-6 relative shadow-lg transform md:-translate-y-2">
                    <div className="absolute top-0 right-0 bg-[#B8860B] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg uppercase tracking-wider">{tComp('lift_badge')}</div>
                    <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-1">{tComp('lift_title')}</h3>
                    <p className="text-xs text-stone-500 mb-4">{tComp('lift_desc')}</p>
                    <div className="text-2xl font-bold text-[#B8860B] mb-6">€35.90</div>
                    
                    <ul className="space-y-3 mb-6">
                        <li className="flex items-start gap-2 text-sm text-[#1a1a1a] font-medium"><Check size={16} className="text-green-600 mt-0.5 shrink-0"/> {tComp('feat_rooftop_lift')}</li>
                        <li className="flex items-start gap-2 text-sm text-[#1a1a1a] font-medium"><Check size={16} className="text-green-600 mt-0.5 shrink-0"/> {tComp('feat_cathedral')}</li>
                        <li className="flex items-start gap-2 text-sm text-[#1a1a1a] font-medium"><Check size={16} className="text-green-600 mt-0.5 shrink-0"/> {tComp('feat_museum')}</li>
                        <li className="flex items-start gap-2 text-sm text-[#1a1a1a] font-medium"><Check size={16} className="text-green-600 mt-0.5 shrink-0"/> {tComp('feat_church')}</li>
                    </ul>
                    <TicketSelectButton ticketId="lift" label={tComp('btn_select')} variant="primary" />
                </div>

                {/* 2. KÁRTYA: STAIRS */}
                <div className="border border-stone-200 bg-white rounded-2xl p-6 relative">
                    <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-1">{tComp('stairs_title')}</h3>
                    <p className="text-xs text-stone-500 mb-4">{tComp('stairs_desc')}</p>
                    <div className="text-2xl font-bold text-[#1a1a1a] mb-6">€29.90</div>
                    <ul className="space-y-3 mb-6">
                        <li className="flex items-start gap-2 text-sm text-[#1a1a1a]"><Check size={16} className="text-green-600 mt-0.5 shrink-0"/> {tComp('feat_rooftop_stairs')}</li>
                        <li className="flex items-start gap-2 text-sm text-[#1a1a1a]"><Check size={16} className="text-green-600 mt-0.5 shrink-0"/> {tComp('feat_cathedral')}</li>
                        <li className="flex items-start gap-2 text-sm text-[#1a1a1a]"><Check size={16} className="text-green-600 mt-0.5 shrink-0"/> {tComp('feat_museum')}</li>
                        <li className="flex items-start gap-2 text-sm text-[#1a1a1a]"><Check size={16} className="text-green-600 mt-0.5 shrink-0"/> {tComp('feat_church')}</li>
                    </ul>
                    <TicketSelectButton ticketId="stairs" label={tComp('btn_select')} variant="secondary" />
                </div>

                {/* 3. KÁRTYA: DUOMO */}
                <div className="border border-stone-200 bg-white rounded-2xl p-6 relative">
                    <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-1">{tComp('duomo_title')}</h3>
                    <p className="text-xs text-stone-500 mb-4">{tComp('duomo_desc')}</p>
                    <div className="text-2xl font-bold text-[#1a1a1a] mb-6">€21.90</div>
                    <ul className="space-y-3 mb-6">
                        <li className="flex items-start gap-2 text-sm text-stone-400 line-through"><XIcon size={16} className="text-stone-300 mt-0.5 shrink-0"/> {tComp('feat_no_rooftop')}</li>
                        <li className="flex items-start gap-2 text-sm text-[#1a1a1a]"><Check size={16} className="text-green-600 mt-0.5 shrink-0"/> {tComp('feat_cathedral')}</li>
                        <li className="flex items-start gap-2 text-sm text-[#1a1a1a]"><Check size={16} className="text-green-600 mt-0.5 shrink-0"/> {tComp('feat_museum')}</li>
                        <li className="flex items-start gap-2 text-sm text-[#1a1a1a]"><Check size={16} className="text-green-600 mt-0.5 shrink-0"/> {tComp('feat_church')}</li>
                    </ul>
                    <TicketSelectButton ticketId="duomo" label={tComp('btn_select')} variant="secondary" />
                </div>

            </div>
        </div>
      </section>

      {/* --- HISTORY SECTION --- */}
      <section id="history" className="py-24 px-6 md:px-12 bg-[#1a1a1a] text-white relative z-20 -mt-2 shadow-[0_-2px_0_#1a1a1a,0_2px_0_#1a1a1a]" style={{ contentVisibility: 'auto', containIntrinsicSize: '800px' }}>
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
                  <CloudinaryImage 
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

      {/* --- ARCHITECTURE --- */}
      <section className="bg-[#f5f5f5] py-16 md:py-24 px-6 md:px-12 relative z-10" style={{ contentVisibility: 'auto', containIntrinsicSize: '400px' }}>
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

      {/* --- SECRETS & GUIDE --- */}
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '1200px' }}>
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white relative z-10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-center">
                <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px]">
                <CloudinaryImage 
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

        <section id="experience" className="py-16 md:py-24 px-6 md:px-12 bg-[#f9f9f9] relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 md:mb-16">
                <span className="text-[#B8860B] font-bold uppercase tracking-widest text-xs">{t('guide.badge')}</span>
                <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mt-2">{t('guide.title')}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group cursor-pointer">
                    <div className="relative h-64 w-full overflow-hidden mb-6">
                        <CloudinaryImage 
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
                        <CloudinaryImage 
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
                        <CloudinaryImage 
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
      </div>

      {/* --- REVIEWS & FAQ & MAP --- */}
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}>
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
                        <p className="text-[#1a1a1a]/70 text-sm leading-relaxed mb-6">"{t('reviews.r1_text')}"</p>
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
                        <p className="text-[#1a1a1a]/70 text-sm leading-relaxed mb-6">"{t('reviews.r2_text')}"</p>
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
                        <p className="text-[#1a1a1a]/70 text-sm leading-relaxed mb-6">"{t('reviews.r3_text')}"</p>
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

          <section id="info" className="py-16 md:py-24 w-full bg-white relative z-10">
             <div className="max-w-4xl mx-auto px-6 md:px-12">
                 <div className="text-center mb-16">
                     <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a]">{t('info.title')}</h3>
                     <p className="text-[#1a1a1a]/60 mt-4">{t('info.subtitle')}</p>
                 </div>
                 {/* --- GYIK KOMPONENS (Client) --- */}
                 <HomeFaq faqs={faqs} />
             </div>
          </section>

          {/* --- LOCATION MAP --- */}
          <section className="w-full bg-white relative z-10">
             <div className="grid grid-cols-1 lg:grid-cols-3 h-auto lg:h-[500px]">
                 <div className="bg-[#f9f9f9] p-8 md:p-12 flex flex-col justify-center order-1 lg:order-1">
                     <MapPin className="text-[#B8860B] mb-6" size={40} aria-hidden="true"/>
                     <h3 className="font-serif text-3xl text-[#1a1a1a] mb-6">{t('location.title')}</h3>
                     <div className="space-y-6">
                         <div>
                             <div className="flex items-center gap-3 mb-2">
                                 <Train className="text-[#B8860B]" size={20} aria-hidden="true"/>
                                 <h4 className="font-bold text-[#1a1a1a]">{t('location.metro_title')}</h4>
                             </div>
                             <p className="text-[#1a1a1a]/70 text-sm ml-8">{t('location.metro_desc')}</p>
                         </div>
                         <div>
                             <div className="flex items-center gap-3 mb-2">
                                 <Bus className="text-[#B8860B]" size={20} aria-hidden="true"/>
                                 <h4 className="font-bold text-[#1a1a1a]">{t('location.tram_title')}</h4>
                             </div>
                             <p className="text-[#1a1a1a]/70 text-sm ml-8">{t('location.tram_desc')}</p>
                         </div>
                     </div>
                 </div>
                 <div className="lg:col-span-2 h-[400px] lg:h-full relative order-2 lg:order-2 group overflow-hidden bg-[#1a1a1a]">
                     <a href="https://www.google.com/maps/search/?api=1&query=Duomo+di+Milano" target="_blank" rel="noopener noreferrer" className="block w-full h-full relative" aria-label="Open location in Google Maps">
                       <CloudinaryImage 
                           src="https://res.cloudinary.com/dldgqjxkn/image/upload/v1765768474/federico-di-dio-photography-yfYZKkt5nes-unsplash_lmlmtk.jpg" 
                           alt="Map Location"
                           fill
                           className="object-cover transition duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100 grayscale hover:grayscale-0"
                           sizes="(max-width: 768px) 100vw, 66vw"
                           quality={50} 
                       />
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
      </div>

    </main>
  );
}