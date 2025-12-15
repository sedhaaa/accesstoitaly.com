'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft, Lock, Eye, Server, Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  const t = useTranslations('PrivacyPolicy');
  const locale = useLocale();

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
        
        {/* Intro */}
        <section className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
            <p className="mb-4">
                {t.rich('intro_1', {
                    bold: (chunks) => <strong>{chunks}</strong>
                })}
            </p>
            <p className="mb-4">{t('intro_2')}</p>
            <p className="mt-4 text-sm text-stone-500 italic">
               {t('intro_3')}
            </p>
        </section>

        {/* 1. Information we collect */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4 flex items-center gap-3">
                <Eye className="text-[#B8860B]" size={24}/> {t('collect_title')}
            </h2>
            <p className="mb-4">{t('collect_text')}</p>
            <ul className="list-disc ml-5 space-y-2 mb-4">
                <li dangerouslySetInnerHTML={{ __html: t.raw('collect_list_contact').replace(':', ':</strong>').replace('Information', '<strong>Information') }} />
                <li dangerouslySetInnerHTML={{ __html: t.raw('collect_list_booking').replace(':', ':</strong>').replace('Details', '<strong>Details') }} />
                <li dangerouslySetInnerHTML={{ __html: t.raw('collect_list_payment').replace(':', ':</strong>').replace('Information', '<strong>Information') }} />
            </ul>
        </section>

        {/* 2. How we use your information */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4">{t('use_title')}</h2>
            <p className="mb-4">{t('use_text')}</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="bg-white p-4 rounded-lg border border-stone-100 shadow-sm text-sm">
                    <strong>{t('use_card_process').split(':')[0]}:</strong> {t('use_card_process').split(':')[1]}
                </li>
                <li className="bg-white p-4 rounded-lg border border-stone-100 shadow-sm text-sm">
                    <strong>{t('use_card_support').split(':')[0]}:</strong> {t('use_card_support').split(':')[1]}
                </li>
                <li className="bg-white p-4 rounded-lg border border-stone-100 shadow-sm text-sm">
                    <strong>{t('use_card_improve').split(':')[0]}:</strong> {t('use_card_improve').split(':')[1]}
                </li>
                <li className="bg-white p-4 rounded-lg border border-stone-100 shadow-sm text-sm">
                    <strong>{t('use_card_marketing').split(':')[0]}:</strong> {t('use_card_marketing').split(':')[1]}
                </li>
            </ul>
        </section>

        {/* 3. Google Ads & Analytics */}
        <section className="border-l-4 border-[#B8860B] pl-6 py-2 bg-orange-50/50 rounded-r-lg">
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4">{t('analytics_title')}</h2>
            <p className="mb-4">{t('analytics_text_1')}</p>
            <p className="mb-4">
                <strong>{t('analytics_text_2').split(':')[0]}:</strong> {t('analytics_text_2').split(':')[1]}
            </p>
            <p>{t('analytics_text_3')}</p>
        </section>

        {/* 4. Data Security */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4 flex items-center gap-3">
                <Lock className="text-[#B8860B]" size={24}/> {t('security_title')}
            </h2>
            <p className="mb-4">
                {t.rich('security_text', {
                    bold: (chunks) => <strong>{chunks}</strong>
                })}
            </p>
        </section>

        {/* 5. Sharing Data */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4 flex items-center gap-3">
                <Server className="text-[#B8860B]" size={24}/> {t('thirdparty_title')}
            </h2>
            <p className="mb-4">{t('thirdparty_text')}</p>
        </section>

        {/* 6. GDPR Rights */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4 flex items-center gap-3">
                <Shield className="text-[#B8860B]" size={24}/> {t('gdpr_title')}
            </h2>
            <p className="mb-4">{t('gdpr_text')}</p>
            <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>{t('gdpr_list_access')}</li>
                <li>{t('gdpr_list_rectification')}</li>
                <li>{t('gdpr_list_erasure')}</li>
                <li>{t('gdpr_list_restrict')}</li>
            </ul>
        </section>

        {/* Contact Info */}
        <section className="bg-[#1a1a1a] text-white p-8 rounded-2xl mt-12">
            <h2 className="font-serif text-xl mb-6 text-[#B8860B]">{t('contact_title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <p className="text-sm opacity-60 uppercase tracking-widest mb-1">{t('label_company')}</p>
                    <p className="font-bold">[Legal Company Name]</p>
                </div>
                <div>
                    <p className="text-sm opacity-60 uppercase tracking-widest mb-1">{t('label_address')}</p>
                    <p className="font-bold">[Full Physical Address]</p>
                    <p className="font-bold">[City, Zip Code, Country]</p>
                </div>
                <div>
                    <p className="text-sm opacity-60 uppercase tracking-widest mb-1">{t('label_email')}</p>
                    <a href="mailto:info@accesstoitaly.com" className="font-bold hover:text-[#B8860B] transition-colors">
                        info@accesstoitaly.com
                    </a>
                </div>
            </div>
        </section>

      </div>
    </main>
  );
}