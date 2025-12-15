'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Ellenőrizzük, hogy van-e már elmentett döntés
    const consent = localStorage.getItem('cookie_consent');
    
    // Ha NINCS döntés, akkor mutatjuk a bannert
    if (!consent) {
      setShouldRender(true);
      // Kis késleltetés, hogy a böngésző rendereljen, és az animáció elindulhasson
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } 
    // Ha van "granted" döntés, akkor futtatjuk a kódot csendben (UI nélkül)
    else if (consent === 'granted') {
      updateConsent('granted');
    }
  }, []);

  const updateConsent = (status: 'granted' | 'denied') => {
    // 1. Mentés LocalStorage-ba
    localStorage.setItem('cookie_consent', status);
    
    // 2. Animációval eltüntetés (csak ha látható volt)
    if (status) setIsVisible(false);
    
    // Késleltetett unmount az animáció után
    setTimeout(() => setShouldRender(false), 500);

    // 3. Google értesítése
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'ad_storage': status,
        'ad_user_data': status,
        'ad_personalization': status,
        'analytics_storage': status
      });
    }
  };

  if (!shouldRender) return null;

  return (
    <>
      <style jsx global>{`
        .cookie-banner {
          transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s ease;
          transform: translateY(100%);
          opacity: 0;
        }
        .cookie-banner.visible {
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>

      <div className={`cookie-banner fixed bottom-0 left-0 w-full z-[100] ${isVisible ? 'visible' : ''}`}>
        {/* Háttér blur és szín */}
        <div className="bg-[#111]/95 backdrop-blur-xl border-t border-[#B8860B]/30 shadow-[0_-10px_40px_rgba(0,0,0,0.6)] p-4 md:p-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
            
            {/* SZÖVEG RÉSZ */}
            <div className="flex items-start gap-4 w-full md:w-auto">
                {/* Ikon: Mobilon rejtve, hogy spóroljunk a hellyel */}
                <div className="hidden md:flex p-3 bg-[#B8860B]/10 rounded-full text-[#B8860B] flex-shrink-0">
                    <Cookie size={24} />
                </div>
                <div className="text-sm text-stone-300 leading-relaxed">
                    <p className="font-bold text-white mb-1 flex items-center gap-2">
                        <Cookie size={16} className="md:hidden text-[#B8860B]"/> 
                        We value your privacy
                    </p>
                    <p className="text-xs md:text-sm text-stone-400">
                        We use cookies to improve your experience and analyze traffic. 
                        By clicking "Accept", you agree to our use of cookies. 
                        <Link href="#" className="text-[#B8860B] hover:underline ml-1 whitespace-nowrap">Read Policy</Link>.
                    </p>
                </div>
            </div>

            {/* GOMBOK: Mobilon egymás mellett (flex-row), teljes szélességben */}
            <div className="flex flex-row items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                <button 
                    onClick={() => updateConsent('denied')}
                    className="flex-1 md:flex-none py-3 px-4 md:px-6 rounded-lg text-xs font-bold uppercase tracking-wider border border-white/10 hover:bg-white/5 hover:text-white transition-colors text-stone-500 bg-white/5 md:bg-transparent"
                >
                    Decline
                </button>
                <button 
                    onClick={() => updateConsent('granted')}
                    className="flex-1 md:flex-none py-3 px-6 md:px-8 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#B8860B] hover:bg-[#9a7009] text-white shadow-lg transition-all active:scale-95"
                >
                    Accept All
                </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}