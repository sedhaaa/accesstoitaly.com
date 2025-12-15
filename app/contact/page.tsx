'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Mail, MessageSquare, Clock, 
  ChevronDown, ChevronUp, Send, CheckCircle, MapPin 
} from 'lucide-react';

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // FAQ Adatok
  const faqs = [
    {
      question: "I haven't received my tickets yet.",
      answer: "Tickets are usually sent instantly, but can take up to 10 minutes. Please check your Spam/Junk folder. If you still can't find them, please provide your Order ID in the form, and we will resend them immediately."
    },
    {
      question: "Can I cancel or reschedule my booking?",
      answer: "Yes. You can cancel for a full refund or reschedule up to 24 hours before your visit time. Requests made within 24 hours of the visit are non-refundable."
    },
    {
      question: "What is the dress code?",
      answer: "Shoulders and knees must be covered for both men and women. This is strictly enforced by cathedral security. You may be denied entry without refund if you do not comply."
    },
    {
      question: "Do I need to print my tickets?",
      answer: "No. You can show the QR code directly from your smartphone at the entrance turnstiles."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Szimulált küldés
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#1C1917] font-sans pt-12 pb-24">
      
      {/* HEADER */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <Link href="/" className="inline-flex items-center gap-2 text-[#B8860B] font-bold text-xs uppercase tracking-widest hover:text-[#9a7009] transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 className="font-serif text-4xl md:text-5xl mb-4 text-[#1a1a1a]">Contact Support</h1>
        <p className="text-stone-500 text-lg max-w-2xl">
          Have a question about your booking? We're here to help. <br/>
          Check our FAQ below for instant answers.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: CONTACT FORM (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
            
            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm relative overflow-hidden">
                {isSent ? (
                    <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                            <CheckCircle size={40} />
                        </div>
                        <h3 className="font-serif text-2xl font-bold mb-2">Message Sent!</h3>
                        <p className="text-stone-500">We'll get back to you shortly.</p>
                        <button 
                            onClick={() => setIsSent(false)} 
                            className="mt-6 text-[#B8860B] font-bold text-sm uppercase tracking-wider hover:underline"
                        >
                            Send another message
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Full Name</label>
                                <input required type="text" placeholder="John Doe" className="w-full bg-[#FAFAF9] border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#B8860B] transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Order ID (Optional)</label>
                                <input type="text" placeholder="#12345678" className="w-full bg-[#FAFAF9] border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#B8860B] transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Email Address</label>
                            <input required type="email" placeholder="john@example.com" className="w-full bg-[#FAFAF9] border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#B8860B] transition-colors" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Message</label>
                            <textarea required rows={5} placeholder="How can we help you?" className="w-full bg-[#FAFAF9] border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#B8860B] transition-colors resize-none"></textarea>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-[#1a1a1a] text-white font-bold py-4 rounded-xl uppercase tracking-wider text-xs hover:bg-[#B8860B] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Sending...' : <>Send Message <Send size={16}/></>}
                        </button>
                    </form>
                )}
            </div>

            {/* DIRECT CONTACT INFO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#1a1a1a] text-white p-6 rounded-xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#B8860B]">
                        <Mail size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold">Email Us</p>
                        <a href="mailto:info@accesstoitaly.com" className="font-bold hover:text-[#B8860B] transition-colors">info@accesstoitaly.com</a>
                    </div>
                </div>
                <div className="bg-white border border-stone-200 p-6 rounded-xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-600">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Response Time</p>
                        <p className="font-bold text-[#1a1a1a]">Within 24 Hours</p>
                    </div>
                </div>
            </div>

        </div>

        {/* RIGHT COLUMN: FAQ & INFO (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
            
            {/* FAQ SECTION */}
            <div>
                <h3 className="font-serif text-2xl text-[#1a1a1a] mb-6 flex items-center gap-3">
                    <MessageSquare className="text-[#B8860B]" size={24}/> Frequently Asked
                </h3>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white border border-stone-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#B8860B]/50">
                            <button 
                                onClick={() => toggleFaq(index)}
                                className="w-full flex justify-between items-center p-5 text-left"
                            >
                                <span className="font-bold text-[#1a1a1a] text-sm pr-4">{faq.question}</span>
                                {openFaq === index ? <ChevronUp size={18} className="text-[#B8860B] flex-shrink-0"/> : <ChevronDown size={18} className="text-stone-400 flex-shrink-0"/>}
                            </button>
                            <div className={`transition-all duration-300 px-5 ${openFaq === index ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0 overflow-hidden'}`}>
                                <p className="text-sm text-stone-500 leading-relaxed">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* COMPANY INFO */}
            <div className="bg-[#f9f9f9] p-8 rounded-2xl border border-stone-100">
                <h4 className="font-bold uppercase tracking-widest text-xs text-[#1a1a1a] mb-4">Office Address</h4>
                <div className="flex items-start gap-3 text-sm text-stone-600 mb-6">
                    <MapPin className="text-[#B8860B] flex-shrink-0 mt-0.5" size={18} />
                    <p>
                        Access To Italy HQ<br/>
                        Via Example 123<br/>
                        20121 Milan, Italy
                    </p>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                    Please note: This address is for administrative purposes only. No tickets are sold at this location.
                </p>
            </div>

        </div>
      </div>
    </main>
  );
}