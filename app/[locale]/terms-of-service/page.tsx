'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft, FileText, AlertCircle, RefreshCw, CreditCard, Scale, Mail } from 'lucide-react';

export default function TermsOfService() {
  const t = useTranslations('TermsOfService');
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
        
        {/* 1. Introduction */}
        <section className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4 flex items-center gap-3">
                <FileText className="text-[#B8860B]" size={24}/> {t('intro_title')}
            </h2>
            <p>
                {t.rich('intro_text', {
                    bold: (chunks) => <strong>{chunks}</strong>
                })}
            </p>
        </section>

        {/* 2. Bookings */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4">{t('bookings_title')}</h2>
            <ul className="list-disc ml-5 space-y-2">
                <li>{t('bookings_list_1')}</li>
                <li dangerouslySetInnerHTML={{ __html: t.raw('bookings_list_2') }}></li>
                <li>{t('bookings_list_3')}</li>
                <li>{t('bookings_list_4')}</li>
            </ul>
        </section>

        {/* 3. External Events */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4 flex items-center gap-3">
                <AlertCircle className="text-[#B8860B]" size={24}/> {t('external_title')}
            </h2>
            <ul className="list-disc ml-5 space-y-2">
                <li>{t('external_list_1')}</li>
                <li>{t('external_list_2')}</li>
            </ul>
        </section>

        {/* 4. Refund Policy */}
        <section className="border-l-4 border-[#B8860B] pl-6 py-2 bg-orange-50/50 rounded-r-lg">
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4 flex items-center gap-3">
                <RefreshCw className="text-[#B8860B]" size={24}/> {t('refund_title')}
            </h2>
            <ul className="list-disc ml-5 space-y-2">
                <li>{t('refund_list_1')}</li>
                <li dangerouslySetInnerHTML={{ __html: t.raw('refund_list_2') }}></li>
                <li>{t('refund_list_3')}</li>
                <li>{t('refund_list_4')}</li>
                <li dangerouslySetInnerHTML={{ __html: t.raw('refund_list_5') }}></li>
            </ul>
        </section>

        {/* 5. Payments */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4 flex items-center gap-3">
                <CreditCard className="text-[#B8860B]" size={24}/> {t('payments_title')}
            </h2>
            <ul className="list-disc ml-5 space-y-2">
                <li>{t('payments_list_1')}</li>
                <li>{t('payments_list_2')}</li>
                <li>{t('payments_list_3')}</li>
            </ul>
        </section>

        {/* 6. Liability */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4">{t('liability_title')}</h2>
            <ul className="list-disc ml-5 space-y-2">
                <li>{t('liability_list_1')}</li>
                <li>{t('liability_list_2')}</li>
                <li>{t('liability_list_3')}</li>
            </ul>
        </section>

        {/* 7. Changes */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4">{t('changes_title')}</h2>
            <p>{t('changes_text')}</p>
        </section>

        {/* 8. Delivery */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4">{t('delivery_title')}</h2>
            <ul className="list-disc ml-5 space-y-2">
                <li>{t('delivery_list_1')}</li>
                <li>{t('delivery_list_2')}</li>
                <li dangerouslySetInnerHTML={{ __html: t.raw('delivery_list_3') }}></li>
            </ul>
        </section>

        {/* 9. Complaints */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4">{t('complaints_title')}</h2>
            <p className="mb-2" dangerouslySetInnerHTML={{ __html: t.raw('complaints_text_1') }}></p>
            <p>{t('complaints_text_2')}</p>
        </section>

        {/* 10. Governing Law */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4 flex items-center gap-3">
                <Scale className="text-[#B8860B]" size={24}/> {t('law_title')}
            </h2>
            <ul className="list-disc ml-5 space-y-2">
                <li>{t('law_list_1')}</li>
                {/* Itt volt a hiba, most javítva teljes lezáró taggel: */}
                <li dangerouslySetInnerHTML={{ __html: t.raw('law_list_2') }}></li>
            </ul>
        </section>

        {/* 11. Contact */}
        <section className="bg-[#1a1a1a] text-white p-8 rounded-2xl mt-12">
            <h2 className="font-serif text-xl mb-4 text-[#B8860B] flex items-center gap-2">
                <Mail size={20}/> {t('contact_title')}
            </h2>
            <p className="mb-4">{t('contact_text')}</p>
            <a href="mailto:info@accesstoitaly.com" className="text-lg font-bold hover:text-[#B8860B] transition-colors">
                info@accesstoitaly.com
            </a>
            <p className="mt-4 text-xs text-stone-500">{t('contact_disclaimer')}</p>
        </section>

      </div>
    </main>
  );
}