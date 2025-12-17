'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';

const FLAGS: Record<string, React.ReactNode> = {
  en: <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-full border border-white/20"><path fill="#012169" d="M0 0h640v480H0z"/><path fill="#FFF" d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/><path fill="#C8102E" d="M424 294L640 457v23h-67L368 334 146 500H79l207-156-231-177h68l167 127L515 0h80L373 173l267 199v-78H424zM260 216L0 23v63l179 130H260z"/><path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/><path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/></svg>,
  it: <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-full border border-white/20"><g fillRule="evenodd"><path fill="#FFF" d="M0 0h640v480H0z"/><path fill="#009246" d="M0 0h213.3v480H0z"/><path fill="#ce2b37" d="M426.7 0H640v480H426.7z"/></g></svg>,
  de: <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-full border border-white/20"><path fill="#ffce00" d="M0 320h640v160H0z"/><path fill="#000" d="M0 0h640v160H0z"/><path fill="#d00" d="M0 160h640v160H0z"/></svg>,
  fr: <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-full border border-white/20"><path fill="#FFF" d="M0 0h640v480H0z"/><path fill="#002395" d="M0 0h213.3v480H0z"/><path fill="#ED2939" d="M426.7 0H640v480H426.7z"/></svg>,
  es: <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-full border border-white/20"><path fill="#AA151B" d="M0 0h640v480H0z"/><path fill="#F1BF00" d="M0 120h640v240H0z"/></svg>
};

interface HomeNavbarProps {
  navDict: {
    history: string;
    experience: string;
    info: string;
    reviews: string;
    bookBtn: string;
  }
}

export default function HomeNavbar({ navDict }: HomeNavbarProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside, { passive: true });
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLanguage = (newLocale: string) => {
    const currentPath = pathname; 
    const segments = currentPath.split('/');
    if (segments.length > 1) {
        segments[1] = newLocale; 
    } else {
        segments.unshift('', newLocale);
    }
    const newPath = segments.join('/');
    router.push(newPath);
    setLangMenuOpen(false);
  };

  return (
    <>
    <nav className="sticky top-0 w-full z-[50] bg-[#1a1a1a]/90 backdrop-blur-md border-b border-white/5 pointer-events-auto transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-16 md:h-20">
          
          <div className="text-white drop-shadow-md z-[60] flex-shrink-0">
            <h1 className="font-serif text-xl md:text-3xl font-bold tracking-widest cursor-pointer uppercase">
              Access<span className="font-light text-[#B8860B]">To</span>Italy
            </h1>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex gap-10 text-xs font-bold uppercase tracking-widest text-white/95 drop-shadow-md">
                <a href="#history" className="hover:text-[#B8860B] transition-colors duration-300 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8860B] rounded">{navDict.history}</a>
                <a href="#experience" className="hover:text-[#B8860B] transition-colors duration-300 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8860B] rounded">{navDict.experience}</a>
                <a href="#info" className="hover:text-[#B8860B] transition-colors duration-300 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8860B] rounded">{navDict.info}</a>
            </div>

            <div className="relative" ref={langMenuRef}>
                <button 
                    onClick={() => setLangMenuOpen(!langMenuOpen)}
                    aria-label="Change language"
                    className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/20 transition active:scale-95 z-[60] focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
                >
                    {FLAGS[locale]}
                    <span className="text-[10px] font-bold text-white uppercase hidden md:block">{locale}</span>
                    <ChevronDown size={14} className={`text-white transition-transform duration-300 ${langMenuOpen ? 'rotate-180' : 'rotate-0'}`} />
                </button>

                {langMenuOpen && (
                  <div className="absolute top-full right-0 mt-3 w-40 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden transition-all duration-200 origin-top-right z-[70]">
                      <div className="py-2 flex flex-col">
                          {['en', 'it', 'de', 'fr', 'es'].map((lang) => (
                              <button
                                  key={lang}
                                  onClick={() => switchLanguage(lang)}
                                  className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors ${locale === lang ? 'text-[#B8860B] bg-white/5' : 'text-white/70'}`}
                              >
                                  {FLAGS[lang]}
                                  {lang === 'en' ? 'English' : lang === 'it' ? 'Italiano' : lang === 'de' ? 'Deutsch' : lang === 'fr' ? 'Français' : 'Español'}
                              </button>
                          ))}
                      </div>
                  </div>
                )}
            </div>

            <button 
                className="md:hidden text-white z-[60] p-1 focus:outline-none focus:ring-2 focus:ring-[#B8860B] rounded"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open main menu"
            >
                <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <>
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[190] animate-in fade-in duration-300"
              onClick={() => setMobileMenuOpen(false)}
            ></div>

            <div className="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-[#1a1a1a] z-[200] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-white/10">
                <div className="flex justify-end p-6">
                    <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu" className="text-white hover:text-[#B8860B] transition focus:outline-none focus:ring-2 focus:ring-[#B8860B] rounded">
                        <X size={32} />
                    </button>
                </div>

                <div className="flex flex-col items-center justify-center flex-grow space-y-8 p-6">
                    <a href="#history" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-[#B8860B] transition-colors">{navDict.history}</a>
                    <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-[#B8860B] transition-colors">{navDict.experience}</a>
                    <a href="#info" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-[#B8860B] transition-colors">{navDict.info}</a>
                    <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-[#B8860B] transition-colors">{navDict.reviews}</a>
                    
                    <div className="pt-8 w-full">
                        <button onClick={() => {setMobileMenuOpen(false); window.scrollTo({top:0, behavior:'smooth'})}} className="w-full bg-[#B8860B] text-white py-4 rounded-xl font-bold uppercase tracking-wider text-sm shadow-lg hover:bg-[#9a7009] transition">
                            {navDict.bookBtn}
                        </button>
                    </div>
                </div>
            </div>
        </>
      )}
    </>
  );
}