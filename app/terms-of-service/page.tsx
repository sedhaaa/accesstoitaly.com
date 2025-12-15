'use client';

import Link from 'next/link';
import { ArrowLeft, FileText, AlertCircle, RefreshCw, CreditCard, Scale, Mail } from 'lucide-react';

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#1C1917] font-sans pt-12 pb-24">
      
      {/* HEADER */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <Link href="/" className="inline-flex items-center gap-2 text-[#B8860B] font-bold text-xs uppercase tracking-widest hover:text-[#9a7009] transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 className="font-serif text-4xl md:text-5xl mb-4">Terms and Conditions</h1>
        <p className="text-stone-500 text-sm">Last Updated: December 2025</p>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 space-y-12 leading-relaxed text-stone-700">
        
        {/* 1. Introduction */}
        <section className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4 flex items-center gap-3">
                <FileText className="text-[#B8860B]" size={24}/> 1. Introduction
            </h2>
            <p>
                These Terms and Conditions (“T&C”) govern the use of services and the purchase of products offered by <strong>Andras Toth (individual entrepreneur)</strong>. By using our services or purchasing from us, you (“Customer”) agree to be bound by these terms.
            </p>
        </section>

        {/* 2. Bookings */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4">2. Bookings, Cancellations & Rescheduling</h2>
            <ul className="list-disc ml-5 space-y-2">
                <li>All bookings must be made in advance and are subject to availability.</li>
                <li>Cancellations are accepted only if requested at least <strong>24 hours before</strong> the scheduled arrival or service time.</li>
                <li>For cancellations made less than 24 hours in advance, the full fee may be charged.</li>
                <li>Rescheduling may be possible depending on availability and the specific situation, if the request is made at least 24 hours before the original booking.</li>
            </ul>
        </section>

        {/* 3. External Events */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4 flex items-center gap-3">
                <AlertCircle className="text-[#B8860B]" size={24}/> 3. External Events & Attractions Disclaimer
            </h2>
            <ul className="list-disc ml-5 space-y-2">
                <li>We are not responsible for issues beyond our control, including but not limited to: road closures, attraction shutdowns, weather conditions, third-party restrictions or changes.</li>
                <li>Such events do not qualify for automatic refunds.</li>
            </ul>
        </section>

        {/* 4. Refund Policy */}
        <section className="border-l-4 border-[#B8860B] pl-6 py-2 bg-orange-50/50 rounded-r-lg">
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4 flex items-center gap-3">
                <RefreshCw className="text-[#B8860B]" size={24}/> 4. Refund Policy
            </h2>
            <ul className="list-disc ml-5 space-y-2">
                <li>Tickets for leisure services provided on a specific date/time are not subject to the 14-day right of withdrawal under Directive 2011/83/EU, Article 16(l).</li>
                <li>Notwithstanding the above, we offer <strong>free cancellation up to 24 hours</strong> before the scheduled time (unless otherwise stated on the product page).</li>
                <li>After this period, tickets are non-refundable.</li>
                <li>Refunds are only considered in justified and exceptional cases, such as defective items or mistakes caused by us.</li>
                <li>Refund requests must be made within 7 days of purchase at <a href="mailto:info@accesstoitaly.com" className="text-[#B8860B] font-bold">info@accesstoitaly.com</a>.</li>
            </ul>
        </section>

        {/* 5. Payments */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4 flex items-center gap-3">
                <CreditCard className="text-[#B8860B]" size={24}/> 5. Payments
            </h2>
            <ul className="list-disc ml-5 space-y-2">
                <li>All prices are listed in EUR and include applicable taxes unless otherwise stated.</li>
                <li>Payments must be completed prior to receiving the product or service, unless otherwise agreed in writing.</li>
                <li>We reserve the right to refuse service or delivery if payment has not been received or is disputed.</li>
            </ul>
        </section>

        {/* 6. Liability */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4">6. Liability</h2>
            <ul className="list-disc ml-5 space-y-2">
                <li>We are not liable for indirect, incidental, or consequential damages that may result from the use of our services or products.</li>
                <li>Our maximum liability is limited to the total amount paid by the customer for the specific service or product in question.</li>
                <li>Our liability does not extend to any loss or inconvenience resulting from the closure or unavailability of third-party venues or attractions.</li>
            </ul>
        </section>

        {/* 7. Changes */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4">7. Changes to These Terms</h2>
            <p>We reserve the right to modify or update these Terms and Conditions at any time. Changes will take effect immediately upon posting on our website.</p>
        </section>

        {/* 8. Delivery */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4">8. Delivery of Tickets</h2>
            <ul className="list-disc ml-5 space-y-2">
                <li>Tickets are delivered digitally as PDF files via email to the address provided at checkout.</li>
                <li>Delivery is deemed completed when our system confirms successful email dispatch.</li>
                <li>If you do not receive your tickets within the indicated timeframe (usually within minutes, but please allow up to 2 hours), check your spam folder and then contact us at <a href="mailto:info@accesstoitaly.com" className="text-[#B8860B] font-bold">info@accesstoitaly.com</a>.</li>
            </ul>
        </section>

        {/* 9. Complaints */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4">9. Customer Service & Complaints</h2>
            <p className="mb-2">You can contact us at <a href="mailto:info@accesstoitaly.com" className="text-[#B8860B] font-bold">info@accesstoitaly.com</a>.</p>
            <p>We aim to respond within 2 business days. If you intend to dispute a card charge (chargeback), please contact us first so we can investigate and provide a resolution. Unwarranted chargebacks may lead to suspension of services.</p>
        </section>

        {/* 10. Governing Law */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4 flex items-center gap-3">
                <Scale className="text-[#B8860B]" size={24}/> 10. Governing Law & Dispute Resolution
            </h2>
            <ul className="list-disc ml-5 space-y-2">
                <li>These T&C are governed by the laws of Hungary. Courts of Hungary shall have jurisdiction, without prejudice to mandatory consumer rights in your country of residence.</li>
                <li>Consumers may use the EU Online Dispute Resolution (ODR) platform: <a href="https://ec.europa.eu/consumers/odr" target="_blank" className="text-[#B8860B] underline">https://ec.europa.eu/consumers/odr</a></li>
            </ul>
        </section>

        {/* 11. Contact */}
        <section className="bg-[#1a1a1a] text-white p-8 rounded-2xl mt-12">
            <h2 className="font-serif text-xl mb-4 text-[#B8860B] flex items-center gap-2">
                <Mail size={20}/> 11. Contact
            </h2>
            <p className="mb-4">If you have any questions about these terms, please contact us at:</p>
            <a href="mailto:info@accesstoitaly.com" className="text-lg font-bold hover:text-[#B8860B] transition-colors">
                info@accesstoitaly.com
            </a>
            <p className="mt-4 text-xs text-stone-500">In case of discrepancies between language versions of these T&C, the English version prevails.</p>
        </section>

      </div>
    </main>
  );
}