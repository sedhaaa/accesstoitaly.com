'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft, ShieldCheck, Cookie } from 'lucide-react';

export default function CookiePolicy() {
  const t = useTranslations('CookiePolicy');
  const locale = useLocale(); // Lekérjük az aktuális nyelvet az URL generáláshoz

  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#1C1917] font-sans pt-12 pb-24">
      
      {/* HEADER */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-[#B8860B] font-bold text-xs uppercase tracking-widest hover:text-[#9a7009] transition-colors mb-8">
            <ArrowLeft size={16} /> {t('back_home')}
        </Link>
        <h1 className="font-serif text-4xl md:text-5xl mb-4">{t('title')}</h1>
        <p className="text-stone-500 text-sm">{t('last_updated')}</p>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 space-y-12 leading-relaxed text-stone-700">
        
        {/* Intro - Rich text használata a félkövér kiemeléshez */}
        <section className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
            <p className="mb-4">
                {t.rich('intro_1', {
                    bold: (chunks) => <strong>{chunks}</strong>
                })}
            </p>
            <p>
                {t('intro_2')}
            </p>
        </section>

        {/* What are cookies */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4 flex items-center gap-3">
                <Cookie className="text-[#B8860B]" size={24}/> {t('what_title')}
            </h2>
            <p className="mb-4">{t('what_text_1')}</p>
            <p className="mb-4">{t('what_text_2')}</p>
        </section>

        {/* Why we use them */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4">{t('why_title')}</h2>
            <p className="mb-4">{t('why_text')}</p>
        </section>

        {/* Specific Cookies */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-6">{t('types_title')}</h2>
            
            <div className="space-y-6">
                {/* 1. Necessary */}
                <div className="border-l-4 border-stone-300 pl-6 py-2">
                    <h3 className="font-bold text-[#1a1a1a] mb-2">{t('type_necessary_title')}</h3>
                    <p className="text-sm mb-2">{t('type_necessary_desc')}</p>
                    <ul className="list-disc ml-5 text-sm text-stone-600 space-y-1">
                        <li><strong>cookie_consent:</strong> Stores your cookie consent preferences.</li>
                    </ul>
                </div>

                {/* 2. Analytics */}
                <div className="border-l-4 border-blue-400 pl-6 py-2">
                    <h3 className="font-bold text-[#1a1a1a] mb-2">{t('type_analytics_title')}</h3>
                    <p className="text-sm mb-2">{t('type_analytics_desc')}</p>
                    <ul className="list-disc ml-5 text-sm text-stone-600 space-y-1">
                        <li><strong>_ga, _gid:</strong> Google Analytics cookies.</li>
                    </ul>
                </div>

                {/* 3. Marketing */}
                <div className="border-l-4 border-[#B8860B] pl-6 py-2">
                    <h3 className="font-bold text-[#1a1a1a] mb-2">{t('type_marketing_title')}</h3>
                    <p className="text-sm mb-2">{t('type_marketing_desc')}</p>
                    <ul className="list-disc ml-5 text-sm text-stone-600 space-y-1">
                        <li><strong>_gcl_au, _gcl_aw:</strong> Google Ads cookies.</li>
                    </ul>
                </div>
            </div>
        </section>

        {/* Control */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4 flex items-center gap-3">
                <ShieldCheck className="text-[#B8860B]" size={24}/> {t('control_title')}
            </h2>
            <p className="mb-4">{t('control_text_1')}</p>
            <p className="mb-4">
                {t('control_text_2')} <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-[#B8860B] underline">www.aboutcookies.org</a>.
            </p>
        </section>

        {/* Contact */}
        <section className="bg-[#1a1a1a] text-white p-8 rounded-2xl">
            <h2 className="font-serif text-xl mb-4 text-[#B8860B]">{t('contact_title')}</h2>
            <p className="text-sm opacity-80 mb-4">{t('contact_text')}</p>
            <a href="mailto:info@accesstoitaly.com" className="text-lg font-bold hover:text-[#B8860B] transition-colors">
                info@accesstoitaly.com
            </a>
        </section>

      </div>
    </main>
  );
}