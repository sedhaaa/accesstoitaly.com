'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { 
  ArrowLeft, Mail, MessageSquare, Clock, 
  ChevronDown, ChevronUp, Send, CheckCircle, MapPin, Phone
} from 'lucide-react';

// --- GOOGLE ADS EVENT TRACKING ---
const trackContactFormSubmission = () => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'generate_lead', {
      'event_category': 'Contact',
      'event_label': 'Contact Form Submission'
    });
  }
};

export default function ContactPage() {
  const t = useTranslations('Contact');
  const locale = useLocale();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // FAQ Adatok
  const faqs = [
    { question: t('faq_1_q'), answer: t('faq_1_a') },
    { question: t('faq_2_q'), answer: t('faq_2_a') },
    { question: t('faq_3_q'), answer: t('faq_3_a') },
    { question: t('faq_4_q'), answer: t('faq_4_a') }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Szimulált küldés + Google Ads mérés
    setTimeout(() => {
      trackContactFormSubmission(); // <--- ITT MÉRJÜK A KONVERZIÓT
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#1C1917] font-sans pt-8 md:pt-12 pb-24 selection:bg-[#B8860B] selection:text-white">
      
      {/* HEADER */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-[#B8860B] font-bold text-xs uppercase tracking-widest hover:text-[#9a7009] transition-colors mb-8 group active:scale-95">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> {t('back_home')}
        </Link>
        <h1 className="font-serif text-3xl md:text-5xl mb-4 text-[#1a1a1a]">{t('title')}</h1>
        <p className="text-stone-500 text-base md:text-lg max-w-2xl leading-relaxed">
          {t('subtitle_1')} <br className="hidden md:block"/>
          {t('subtitle_2')}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: CONTACT FORM (7 cols) */}
        <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
            
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-sm relative overflow-hidden">
                {isSent ? (
                    <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 shadow-sm">
                            <CheckCircle size={40} />
                        </div>
                        <h3 className="font-serif text-2xl font-bold mb-2 text-[#1a1a1a]">{t('form_success_title')}</h3>
                        <p className="text-stone-500">{t('form_success_desc')}</p>
                        <button 
                            onClick={() => setIsSent(false)} 
                            className="mt-8 text-[#B8860B] font-bold text-sm uppercase tracking-wider hover:underline underline-offset-4 active:text-[#9a7009]"
                        >
                            {t('form_send_another')}
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 ml-1">{t('label_name')}</label>
                                <input required type="text" placeholder={t('placeholder_name')} className="w-full bg-[#FAFAF9] border border-stone-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#B8860B]/20 focus:border-[#B8860B] transition-all text-[#1a1a1a]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 ml-1">{t('label_order')}</label>
                                <input type="text" placeholder={t('placeholder_order')} className="w-full bg-[#FAFAF9] border border-stone-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#B8860B]/20 focus:border-[#B8860B] transition-all text-[#1a1a1a]" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 ml-1">{t('label_email')}</label>
                            <input required type="email" placeholder={t('placeholder_email')} className="w-full bg-[#FAFAF9] border border-stone-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#B8860B]/20 focus:border-[#B8860B] transition-all text-[#1a1a1a]" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 ml-1">{t('label_message')}</label>
                            <textarea required rows={5} placeholder={t('placeholder_message')} className="w-full bg-[#FAFAF9] border border-stone-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#B8860B]/20 focus:border-[#B8860B] transition-all resize-none text-[#1a1a1a]"></textarea>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-[#1a1a1a] text-white font-bold py-4 rounded-xl uppercase tracking-wider text-xs hover:bg-[#333] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed touch-manipulation"
                        >
                            {isSubmitting ? t('btn_sending') : <>{t('btn_send')} <Send size={16}/></>}
                        </button>
                    </form>
                )}
            </div>

            {/* DIRECT CONTACT INFO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="mailto:info@accesstoitaly.com" className="bg-[#1a1a1a] text-white p-6 rounded-xl flex items-center gap-4 hover:bg-[#252525] transition shadow-md group">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#B8860B] group-hover:scale-110 transition-transform">
                        <Mail size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold mb-0.5">{t('info_email_title')}</p>
                        <span className="font-bold text-lg">info@accesstoitaly.com</span>
                    </div>
                </a>
                
                {/* MOBILON: KATTINTHATÓ HÍVÁS GOMB */}
                <div className="bg-white border border-stone-200 p-6 rounded-xl flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-600">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-0.5">{t('info_response_title')}</p>
                        <p className="font-bold text-[#1a1a1a] text-lg">{t('info_response_text')}</p>
                    </div>
                </div>
            </div>

        </div>

        {/* RIGHT COLUMN: FAQ & INFO (5 cols) */}
        <div className="lg:col-span-5 space-y-8 order-1 lg:order-2">
            
            {/* FAQ SECTION */}
            <div>
                <h3 className="font-serif text-2xl text-[#1a1a1a] mb-6 flex items-center gap-3">
                    <div className="p-2 bg-[#B8860B]/10 rounded-lg text-[#B8860B]"><MessageSquare size={24}/></div>
                    {t('faq_title')}
                </h3>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white border border-stone-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md">
                            <button 
                                onClick={() => toggleFaq(index)}
                                className="w-full flex justify-between items-center p-5 text-left active:bg-stone-50 transition-colors"
                            >
                                <span className="font-bold text-[#1a1a1a] text-sm pr-4 leading-snug">{faq.question}</span>
                                {openFaq === index ? <ChevronUp size={18} className="text-[#B8860B] flex-shrink-0"/> : <ChevronDown size={18} className="text-stone-400 flex-shrink-0"/>}
                            </button>
                            <div className={`transition-all duration-300 px-5 ${openFaq === index ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0 overflow-hidden'}`}>
                                <p className="text-sm text-stone-500 leading-relaxed border-t border-stone-100 pt-3">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* COMPANY INFO */}
            <div className="bg-[#f9f9f9] p-8 rounded-2xl border border-stone-100">
                <h4 className="font-bold uppercase tracking-widest text-xs text-[#1a1a1a] mb-4">{t('office_title')}</h4>
                <div className="flex items-start gap-3 text-sm text-stone-600 mb-6">
                    <MapPin className="text-[#B8860B] flex-shrink-0 mt-0.5" size={18} />
                    <p className="leading-relaxed">
                        Access To Italy HQ<br/>
                        Via Example 123<br/>
                        20121 Milan, Italy
                    </p>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed border-l-2 border-stone-300 pl-3 italic">
                    {t('office_note')}
                </p>
            </div>

        </div>
      </div>
    </main>
  );
}