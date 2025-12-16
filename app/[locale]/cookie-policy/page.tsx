'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft, ShieldCheck, Cookie, Info, BarChart3, Megaphone } from 'lucide-react';

export default function CookiePolicy() {
  const t = useTranslations('CookiePolicy');
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#1C1917] font-sans pt-12 pb-24 selection:bg-[#B8860B] selection:text-white">
      
      {/* HEADER */}
      <div className="max-w-3xl mx-auto px-6 mb-12">
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-[#B8860B] font-bold text-xs uppercase tracking-widest hover:text-[#9a7009] transition-colors mb-8 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> {t('back_home')}
        </Link>
        <h1 className="font-serif text-3xl md:text-5xl mb-4 text-[#1a1a1a]">{t('title')}</h1>
        <p className="text-stone-500 text-sm font-medium border-l-2 border-[#B8860B] pl-3">{t('last_updated')}</p>
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-6 space-y-12 leading-relaxed text-stone-700">
        
        {/* Intro */}
        <section className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#B8860B]"></div>
            <p className="mb-4 text-lg">
                {t.rich('intro_1', {
                    bold: (chunks) => <strong className="text-[#1a1a1a] font-semibold">{chunks}</strong>
                })}
            </p>
            <p className="text-stone-600">
                {t('intro_2')}
            </p>
        </section>

        {/* What are cookies */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4 flex items-center gap-3">
                <div className="p-2 bg-[#B8860B]/10 rounded-lg text-[#B8860B]"><Cookie size={24}/></div>
                {t('what_title')}
            </h2>
            <div className="prose prose-stone max-w-none text-stone-600">
                <p className="mb-4">{t('what_text_1')}</p>
                <p className="mb-4 bg-[#f5f5f4] p-4 rounded-xl border border-stone-200 text-sm">
                    <Info size={16} className="inline mr-2 text-[#B8860B] -mt-0.5"/>
                    {t('what_text_2')}
                </p>
            </div>
        </section>

        {/* Why we use them */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4">{t('why_title')}</h2>
            <p className="text-stone-600">{t('why_text')}</p>
        </section>

        {/* Specific Cookies */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-6">{t('types_title')}</h2>
            
            <div className="grid gap-6">
                {/* 1. Necessary */}
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm transition hover:shadow-md">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-stone-100 rounded-lg text-stone-600"><ShieldCheck size={20}/></div>
                        <div>
                            <h3 className="font-bold text-[#1a1a1a] mb-1">{t('type_necessary_title')}</h3>
                            <p className="text-sm text-stone-600 mb-3 leading-relaxed">{t('type_necessary_desc')}</p>
                            <div className="inline-block bg-stone-100 px-3 py-1 rounded text-xs font-mono text-stone-500">cookie_consent</div>
                        </div>
                    </div>
                </div>

                {/* 2. Analytics */}
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm transition hover:shadow-md">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><BarChart3 size={20}/></div>
                        <div>
                            <h3 className="font-bold text-[#1a1a1a] mb-1">{t('type_analytics_title')}</h3>
                            <p className="text-sm text-stone-600 mb-3 leading-relaxed">{t('type_analytics_desc')}</p>
                            <div className="flex gap-2">
                                <span className="bg-blue-50 px-3 py-1 rounded text-xs font-mono text-blue-600">_ga</span>
                                <span className="bg-blue-50 px-3 py-1 rounded text-xs font-mono text-blue-600">_gid</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Marketing */}
                <div className="bg-white p-6 rounded-xl border border-yellow-100 shadow-sm transition hover:shadow-md">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-yellow-50 rounded-lg text-[#B8860B]"><Megaphone size={20}/></div>
                        <div>
                            <h3 className="font-bold text-[#1a1a1a] mb-1">{t('type_marketing_title')}</h3>
                            <p className="text-sm text-stone-600 mb-3 leading-relaxed">{t('type_marketing_desc')}</p>
                            <div className="flex gap-2">
                                <span className="bg-yellow-50 px-3 py-1 rounded text-xs font-mono text-[#B8860B]">_gcl_au</span>
                                <span className="bg-yellow-50 px-3 py-1 rounded text-xs font-mono text-[#B8860B]">_gcl_aw</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Control */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4">{t('control_title')}</h2>
            <div className="text-stone-600 space-y-4">
                <p>{t('control_text_1')}</p>
                <p>
                    {t('control_text_2')} <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-[#B8860B] font-medium hover:underline underline-offset-4">www.aboutcookies.org</a>.
                </p>
            </div>
        </section>

        {/* Contact */}
        <section className="bg-[#1a1a1a] text-white p-8 md:p-10 rounded-2xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <h2 className="font-serif text-xl mb-2 text-[#B8860B]">{t('contact_title')}</h2>
                <p className="text-sm opacity-80 max-w-md">{t('contact_text')}</p>
            </div>
            <a href="mailto:info@accesstoitaly.com" className="bg-white/10 hover:bg-white/20 border border-white/10 px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap">
                info@accesstoitaly.com
            </a>
        </section>

      </div>
    </main>
  );
}