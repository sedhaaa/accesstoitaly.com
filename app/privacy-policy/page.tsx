'use client';

import Link from 'next/link';
import { ArrowLeft, Lock, Eye, Server, Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#1C1917] font-sans pt-12 pb-24">
      
      {/* HEADER */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <Link href="/" className="inline-flex items-center gap-2 text-[#B8860B] font-bold text-xs uppercase tracking-widest hover:text-[#9a7009] transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 className="font-serif text-4xl md:text-5xl mb-4">Privacy Policy</h1>
        <p className="text-stone-500 text-sm">Last Updated: December 2025</p>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 space-y-12 leading-relaxed text-stone-700">
        
        {/* Intro */}
        <section className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
            <p className="mb-4">
                At <strong>Access To Italy</strong>, accessible from accesstoitaly.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Access To Italy and how we use it.
            </p>
            <p>
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
            </p>
            <p className="mt-4 text-sm text-stone-500 italic">
                This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Access To Italy.
            </p>
        </section>

        {/* 1. Information we collect */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4 flex items-center gap-3">
                <Eye className="text-[#B8860B]" size={24}/> Information We Collect
            </h2>
            <p className="mb-4">
                When you book a ticket or contact us, we may ask you to provide specific personal information. The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            </p>
            <ul className="list-disc ml-5 space-y-2 mb-4">
                <li><strong>Contact Information:</strong> Full name, email address, and phone number (to send tickets and updates).</li>
                <li><strong>Booking Details:</strong> Date of visit, ticket type, and number of guests.</li>
                <li><strong>Payment Information:</strong> We do not store your credit card details on our servers. All payments are processed securely by our third-party payment processor.</li>
            </ul>
        </section>

        {/* 2. How we use your information */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4">How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect in various ways, including to:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="bg-white p-4 rounded-lg border border-stone-100 shadow-sm text-sm">
                    <strong>Process Transactions:</strong> To process your ticket order and deliver the digital tickets to your email.
                </li>
                <li className="bg-white p-4 rounded-lg border border-stone-100 shadow-sm text-sm">
                    <strong>Customer Support:</strong> To communicate with you regarding your booking, updates, or cancellations.
                </li>
                <li className="bg-white p-4 rounded-lg border border-stone-100 shadow-sm text-sm">
                    <strong>Improve Services:</strong> To understand and analyze how you use our website to improve user experience.
                </li>
                <li className="bg-white p-4 rounded-lg border border-stone-100 shadow-sm text-sm">
                    <strong>Marketing (Optional):</strong> To send you emails about new products or offers, only if you have opted in.
                </li>
            </ul>
        </section>

        {/* 3. Google Ads & Analytics */}
        <section className="border-l-4 border-[#B8860B] pl-6 py-2 bg-orange-50/50 rounded-r-lg">
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4">Google Analytics & Google Ads</h2>
            <p className="mb-4">
                We use third-party services like Google Analytics and Google Ads to analyze website traffic and manage our advertising. These services may use cookies and web beacons to collect information about your visit.
            </p>
            <p className="mb-4">
                <strong>Conversion Tracking:</strong> We use Google Ads conversion tracking to measure the success of our advertising campaigns. This allows us to see if a user who clicked on our ad ended up purchasing a ticket.
            </p>
            <p>
                You can choose to disable cookies through your individual browser options or via our Cookie Banner settings.
            </p>
        </section>

        {/* 4. Data Security */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4 flex items-center gap-3">
                <Lock className="text-[#B8860B]" size={24}/> Data Security
            </h2>
            <p className="mb-4">
                We value your trust in providing us your Personal Information, thus we use commercially acceptable means of protecting it. Our website uses <strong>256-bit SSL encryption</strong> to ensure that data transmitted between your browser and our servers is secure.
            </p>
        </section>

        {/* 5. Sharing Data */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4 flex items-center gap-3">
                <Server className="text-[#B8860B]" size={24}/> Third-Party Disclosure
            </h2>
            <p className="mb-4">
                We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
            </p>
        </section>

        {/* 6. GDPR Rights */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4 flex items-center gap-3">
                <Shield className="text-[#B8860B]" size={24}/> GDPR Data Protection Rights
            </h2>
            <p className="mb-4">
                We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
            </p>
            <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>The right to access – You have the right to request copies of your personal data.</li>
                <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
                <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
                <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data.</li>
            </ul>
        </section>

        {/* Contact Info */}
        <section className="bg-[#1a1a1a] text-white p-8 rounded-2xl mt-12">
            <h2 className="font-serif text-xl mb-6 text-[#B8860B]">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <p className="text-sm opacity-60 uppercase tracking-widest mb-1">Company</p>
                    <p className="font-bold">[Legal Company Name]</p>
                </div>
                <div>
                    <p className="text-sm opacity-60 uppercase tracking-widest mb-1">Address</p>
                    <p className="font-bold">[Full Physical Address]</p>
                    <p className="font-bold">[City, Zip Code, Country]</p>
                </div>
                <div>
                    <p className="text-sm opacity-60 uppercase tracking-widest mb-1">Email</p>
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