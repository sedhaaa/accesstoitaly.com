'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Ticket } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Görgetés figyelése a háttérszín átlátszóságának kezeléséhez
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Görgetés a footerhez (vagy jegyvásárláshoz)
  const scrollToTicket = () => {
    // Ha van külön ID a jegyvásárló szekciónak:
    const ticketSection = document.getElementById('buy-tickets');
    if (ticketSection) {
      ticketSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: görgetés az aljára (ahol a te footer gombod is van)
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-[#1a1a1a] border-white/10 py-4 shadow-lg' 
            : 'bg-[#1a1a1a]/80 backdrop-blur-md border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* LOGO - Ugyanaz a stílus, mint a Footerben */}
          <Link href="/" className="z-50 relative">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-white tracking-widest uppercase">
              Access<span className="text-[#B8860B]">To</span>Italy
            </h2>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-xs uppercase tracking-widest text-stone-300 hover:text-white transition-colors font-bold">
              Home
            </Link>
            <Link href="/tours" className="text-xs uppercase tracking-widest text-stone-300 hover:text-white transition-colors font-bold">
              Tours
            </Link>
            <Link href="/info" className="text-xs uppercase tracking-widest text-stone-300 hover:text-white transition-colors font-bold">
              Info
            </Link>
            
            {/* CTA BUTTON - Hasonló a Footer gombhoz, de kisebb paddinggal a navbarhoz igazítva */}
            <button 
              onClick={scrollToTicket}
              className="bg-white text-black font-bold py-2 px-5 rounded-lg uppercase tracking-wider text-[10px] hover:bg-[#B8860B] hover:text-white transition-all shadow-md flex items-center gap-2"
            >
              <Ticket size={14} />
              Book Now
            </button>
          </nav>

          {/* MOBILE MENU TOGGLE */}
          <button 
            className="md:hidden text-white z-50 hover:text-[#B8860B] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* MOBILE FULLSCREEN MENU OVERLAY */}
      <div 
        className={`fixed inset-0 bg-[#1a1a1a] z-40 flex flex-col justify-center items-center transition-all duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-8 text-center">
          <Link 
            href="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-serif font-bold text-white tracking-widest uppercase hover:text-[#B8860B] transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/tours" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-serif font-bold text-white tracking-widest uppercase hover:text-[#B8860B] transition-colors"
          >
            Tours
          </Link>
          <Link 
            href="/info" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-serif font-bold text-white tracking-widest uppercase hover:text-[#B8860B] transition-colors"
          >
            Info
          </Link>
          
          <div className="w-12 h-1 bg-[#B8860B] rounded-full my-4"></div>

          <button 
            onClick={scrollToTicket}
            className="bg-white text-black font-bold py-4 px-10 rounded-lg uppercase tracking-wider text-sm hover:bg-[#B8860B] hover:text-white transition-all shadow-lg flex items-center gap-2"
          >
            <Ticket size={18} />
            Buy Tickets Now
          </button>
        </nav>
      </div>
    </>
  );
}