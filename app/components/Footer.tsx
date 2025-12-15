'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl'; 
import { Mail, ShieldCheck, Lock } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('Footer'); 
  const locale = useLocale(); 
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // JAVÍTÁS: border-[#333] a biztos sötétszürke vonalért
    <footer className="bg-[#1a1a1a] border-t border-[#333] pt-16 pb-8 text-stone-400 font-sans relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* 1. BRAND & TRUST */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-white tracking-widest uppercase">
              Access<span className="text-[#B8860B]">To</span>Italy
            </h2>
            <p className="text-sm leading-relaxed max-w-xs">
              {t('description')}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#B8860B] font-bold uppercase tracking-wider pt-2">
              <ShieldCheck size={16} /> {t('secure_checkout')}
            </div>
          </div>

          {/* 2. CUSTOMER SUPPORT */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6">{t('support_title')}</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:info@accesstoitaly.com" 
                  className="flex items-center gap-3 hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#B8860B] group-hover:text-white transition-all">
                    <Mail size={14} />
                  </div>
                  <span className="text-sm">info@accesstoitaly.com</span>
                </a>
              </li>
              <li>
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <Lock size={14} />
                    </div>
                    <span className="text-sm">{t('encryption')}</span>
                 </div>
              </li>
            </ul>
          </div>

          {/* 3. ACTION */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6">{t('bookings_title')}</h3>
            <p className="text-xs mb-4">{t('bookings_desc')}</p>
            <button 
              onClick={scrollToTop}
              className="bg-white text-black font-bold py-3 px-6 rounded-lg uppercase tracking-wider text-xs hover:bg-[#B8860B] hover:text-white transition-all shadow-lg"
            >
              {t('buy_btn')}
            </button>
          </div>

        </div>

        {/* BOTTOM BAR: LEGAL & COPYRIGHT */}
        <div className="border-t border-[#333] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest">
            <p className="text-center md:text-left">{t('copyright')}</p>
            
            <div className="flex flex-wrap justify-center gap-6">
                <Link href={`/${locale}/contact`} className="hover:text-white transition-colors">{t('links.contact')}</Link>
                <Link href={`/${locale}/privacy-policy`} className="hover:text-white transition-colors">{t('links.privacy')}</Link>
                <Link href={`/${locale}/cookie-policy`} className="hover:text-white transition-colors">{t('links.cookies')}</Link>
                <Link href={`/${locale}/terms-of-service`} className="hover:text-white transition-colors">{t('links.terms')}</Link>
            </div>
        </div>

      </div>
    </footer>
  );
}