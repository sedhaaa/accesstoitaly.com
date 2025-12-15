'use client';

import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Cookie } from 'lucide-react';

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#1C1917] font-sans pt-12 pb-24">
      
      {/* HEADER */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <Link href="/" className="inline-flex items-center gap-2 text-[#B8860B] font-bold text-xs uppercase tracking-widest hover:text-[#9a7009] transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 className="font-serif text-4xl md:text-5xl mb-4">Cookie Policy</h1>
        <p className="text-stone-500 text-sm">Last Updated: December 2025</p>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 space-y-12 leading-relaxed text-stone-700">
        
        {/* Intro */}
        <section className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
            <p className="mb-4">
                This Cookie Policy explains how <strong>Access To Italy</strong> ("we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>
            <p>
                In some cases, we may use cookies to collect personal information, or that becomes personal information if we combine it with other information.
            </p>
        </section>

        {/* What are cookies */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4 flex items-center gap-3">
                <Cookie className="text-[#B8860B]" size={24}/> What are cookies?
            </h2>
            <p className="mb-4">
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
            <p className="mb-4">
                Cookies set by the website owner (us) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).
            </p>
        </section>

        {/* Why we use them */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4">Why do we use cookies?</h2>
            <p className="mb-4">
                We use first- and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Website for advertising, analytics, and other purposes.
            </p>
        </section>

        {/* Specific Cookies */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-6">Types of Cookies We Use</h2>
            
            <div className="space-y-6">
                {/* 1. Necessary */}
                <div className="border-l-4 border-stone-300 pl-6 py-2">
                    <h3 className="font-bold text-[#1a1a1a] mb-2">Strictly Necessary Cookies</h3>
                    <p className="text-sm mb-2">
                        These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.
                    </p>
                    <ul className="list-disc ml-5 text-sm text-stone-600 space-y-1">
                        <li><strong>cookie_consent:</strong> Stores your cookie consent preferences (Accepted/Declined).</li>
                    </ul>
                </div>

                {/* 2. Analytics */}
                <div className="border-l-4 border-blue-400 pl-6 py-2">
                    <h3 className="font-bold text-[#1a1a1a] mb-2">Analytics and Performance Cookies</h3>
                    <p className="text-sm mb-2">
                        These cookies are used to collect information about traffic to our Website and how users use our Website. The information gathered does not identify any individual visitor.
                    </p>
                    <ul className="list-disc ml-5 text-sm text-stone-600 space-y-1">
                        <li><strong>_ga, _gid:</strong> Google Analytics cookies used to distinguish users and session duration.</li>
                    </ul>
                </div>

                {/* 3. Marketing */}
                <div className="border-l-4 border-[#B8860B] pl-6 py-2">
                    <h3 className="font-bold text-[#1a1a1a] mb-2">Targeting and Advertising Cookies</h3>
                    <p className="text-sm mb-2">
                        These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.
                    </p>
                    <ul className="list-disc ml-5 text-sm text-stone-600 space-y-1">
                        <li><strong>_gcl_au, _gcl_aw:</strong> Google Ads cookies used to track conversions and ad efficiency.</li>
                    </ul>
                </div>
            </div>
        </section>

        {/* Control */}
        <section>
            <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4 flex items-center gap-3">
                <ShieldCheck className="text-[#B8860B]" size={24}/> How can you control cookies?
            </h2>
            <p className="mb-4">
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Banner that appears when you first visit the website.
            </p>
            <p className="mb-4">
                Additionally, most web browsers allow you to control cookies through their settings preferences. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit <a href="https://www.aboutcookies.org" target="_blank" className="text-[#B8860B] underline">www.aboutcookies.org</a>.
            </p>
        </section>

        {/* Contact */}
        <section className="bg-[#1a1a1a] text-white p-8 rounded-2xl">
            <h2 className="font-serif text-xl mb-4 text-[#B8860B]">Contact Us</h2>
            <p className="text-sm opacity-80 mb-4">
                If you have any questions about our use of cookies or other technologies, please email us at:
            </p>
            <a href="mailto:info@accesstoitaly.com" className="text-lg font-bold hover:text-[#B8860B] transition-colors">
                info@accesstoitaly.com
            </a>
        </section>

      </div>
    </main>
  );
}