'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl'; // FORDÍTÓ IMPORT
import { 
  CheckCircle, Home, Mail, QrCode, ShieldCheck 
} from 'lucide-react';

// --- BIZTONSÁGOS GOOGLE ADS TRACKING ---
function GoogleAdsTracking({ orderId, total, currency }: { orderId: string, total: string, currency: string }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag && orderId !== 'UNKNOWN') {
      
      const storageKey = `ads_tracked_${orderId}`;
      const alreadyTracked = localStorage.getItem(storageKey);

      if (!alreadyTracked) {
        console.log('Firing Google Ads Conversion (First time):', orderId);
        
        (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-XXXXXXXXX/YYYYYYYYYYY', // <--- SAJÁT ID IDE (FONTOS!)
            'value': parseFloat(total),
            'currency': currency,
            'transaction_id': orderId
        });

        localStorage.setItem(storageKey, 'true');
      }
    }
  }, [orderId, total, currency]);

  return null;
}

function ThankYouContent() {
  const t = useTranslations('ThankYou'); // Betöltjük a 'ThankYou' névteret
  const searchParams = useSearchParams();
  const rawId = searchParams.get('orderId') || 'UNKNOWN';
  const total = searchParams.get('total') || '0';
  const currency = searchParams.get('currency') || 'EUR';

  // Numerikus ID generálás
  const numericOrderId = rawId !== 'UNKNOWN' ? (rawId.replace(/\D/g, '') + '82937102').slice(0, 8) : '--------';

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 md:p-6 font-sans text-white overflow-x-hidden bg-[#0a0a0a]">
      
      {/* 1. HÁTTÉR */}
      <div className="fixed inset-0 z-0">
        <Image 
            src="https://res.cloudinary.com/dldgqjxkn/image/upload/v1765768474/federico-di-dio-photography-yfYZKkt5nes-unsplash_lmlmtk.jpg" 
            alt="Duomo Background" 
            fill
            className="object-cover opacity-40 grayscale"
            priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-[#050505]/80"></div>
      </div>

      <GoogleAdsTracking orderId={rawId} total={total} currency={currency} />

      {/* 2. ARANY RAGYOGÁS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-[600px] md:h-[600px] bg-[#B8860B]/20 rounded-full blur-[80px] md:blur-[100px] pointer-events-none animate-in fade-in duration-1000"></div>

      {/* 3. FŐ KÁRTYA */}
      <div className="relative z-10 w-full max-w-lg animate-in slide-in-from-bottom-8 duration-700 my-auto">
        
        {/* FELSŐ RÉSZ */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-t-3xl p-6 md:p-8 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent opacity-50"></div>

            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-900/20 border border-green-500/30 mb-4 md:mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                <CheckCircle size={32} className="text-green-500 md:w-10 md:h-10" />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 tracking-wide">{t('title')}</h1>
            <p className="text-xs md:text-sm text-stone-400">{t('subtitle')}</p>
        </div>

        {/* JEGY RÉSZLETEK */}
        <div className="bg-[#161616] border-x border-b border-white/10 rounded-b-3xl p-6 md:p-8 relative shadow-2xl">
            
            <div className="absolute -top-3 left-0 w-full flex justify-between items-center px-4">
                <div className="w-6 h-6 bg-[#050505] rounded-full -ml-7 border-r border-white/10"></div>
                <div className="flex-grow border-t-2 border-dashed border-white/10 mx-2"></div>
                <div className="w-6 h-6 bg-[#050505] rounded-full -mr-7 border-l border-white/10"></div>
            </div>

            {/* ADATOK */}
            <div className="flex justify-between items-start mb-6 md:mb-8 mt-2">
                <div>
                    <p className="text-[9px] md:text-[10px] text-stone-500 uppercase tracking-widest font-bold mb-1">{t('order_number')}</p>
                    <p className="text-xl md:text-2xl font-mono font-bold text-[#B8860B] tracking-wider">#{numericOrderId}</p>
                </div>
                <div className="text-right">
                    <p className="text-[9px] md:text-[10px] text-stone-500 uppercase tracking-widest font-bold mb-1">{t('total_paid')}</p>
                    <div className="text-2xl md:text-3xl font-sans font-bold text-white leading-none tracking-tight">
                        €{total}
                    </div>
                </div>
            </div>

            {/* TIMELINE */}
            <div className="space-y-5 md:space-y-6">
                <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-[#B8860B]">
                        <Mail size={16}/>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white">{t('timeline.email_title')}</h4>
                        <p className="text-xs text-stone-500 leading-relaxed mt-1">
                            {t('timeline.email_desc')}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-[#B8860B]">
                        <QrCode size={16}/>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white">{t('timeline.mobile_title')}</h4>
                        <p className="text-xs text-stone-500 leading-relaxed mt-1">
                            {t('timeline.mobile_desc')}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-[#B8860B]">
                        <ShieldCheck size={16}/>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white">{t('timeline.skip_title')}</h4>
                        <p className="text-xs text-stone-500 leading-relaxed mt-1">
                            {t('timeline.skip_desc')}
                        </p>
                    </div>
                </div>
            </div>

            {/* BUTTON */}
            <div className="mt-8 pt-6 border-t border-white/5">
                <Link href="/" className="w-full bg-white text-black font-bold py-3.5 md:py-4 rounded-xl uppercase tracking-wider text-xs hover:bg-stone-200 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95">
                    <Home size={16}/> {t('back_home')}
                </Link>
            </div>

        </div>

        {/* SUPPORT SECTION */}
        <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 pb-8 md:pb-0">
            <p className="text-xs text-stone-500 mb-2">{t('support')}</p>
            <a href="mailto:info@accesstoitaly.com" className="inline-flex items-center gap-2 text-[#B8860B] text-sm font-bold hover:text-white transition-colors border border-[#B8860B]/30 px-4 py-2 rounded-full bg-[#B8860B]/10 active:scale-95">
                <Mail size={14}/> info@accesstoitaly.com
            </a>
        </div>

      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#B8860B]">Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}