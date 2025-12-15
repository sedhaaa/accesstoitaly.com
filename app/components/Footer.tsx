'use client';

import Link from 'next/link';
import { Mail, ShieldCheck, Lock } from 'lucide-react';

export default function Footer() {
  
  // Sima görgetés a tetejére (a "Buy Tickets" gombhoz)
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1a1a1a] border-t border-white/10 pt-16 pb-8 text-stone-400 font-sans relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* 1. BRAND & TRUST */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-white tracking-widest uppercase">
              Access<span className="text-[#B8860B]">To</span>Italy
            </h2>
            <p className="text-sm leading-relaxed max-w-xs">
              Independent reseller company offering services for the Duomo di Milano. 
              Experience the Cathedral, Rooftops, and Museum without the wait.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#B8860B] font-bold uppercase tracking-wider pt-2">
              <ShieldCheck size={16} /> 100% Secure Checkout
            </div>
          </div>

          {/* 2. CUSTOMER SUPPORT */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Customer Support</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:info@accesstoitaly.com" 
                  className="flex items-center gap-3 hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#B8860B] group-hover:text-white transition-all">
                    <Mail size={14} />
                  </div>
                  <span className="text-sm">info@accesstoitaly.com</span>
                </a>
              </li>
              <li>
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <Lock size={14} />
                    </div>
                    <span className="text-sm">256-bit SSL Encryption</span>
                 </div>
              </li>
            </ul>
          </div>

          {/* 3. ACTION */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Bookings</h3>
            <p className="text-xs mb-4">Ready to visit Milan? Secure your spot now.</p>
            <button 
              onClick={scrollToTop}
              className="bg-white text-black font-bold py-3 px-6 rounded-lg uppercase tracking-wider text-xs hover:bg-[#B8860B] hover:text-white transition-all shadow-lg"
            >
              Buy Tickets Now
            </button>
          </div>

        </div>

        {/* BOTTOM BAR: LEGAL & COPYRIGHT */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest">
            <p className="text-center md:text-left">© 2025 Access To Italy. All rights reserved.</p>
            
            {/* JOGI LINKEK EGYMÁS MELLETT */}
            <div className="flex flex-wrap justify-center gap-6">
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
        </div>

      </div>
    </footer>
  );
}