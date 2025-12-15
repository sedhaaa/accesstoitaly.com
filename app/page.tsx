'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import BookingWidget from './components/BookingWidget';
import { 
  Shield, Star, ArrowRight, Clock, ChevronDown, 
  Smartphone, CalendarCheck, Award, Plus, Minus, 
  Quote, CheckCircle, MapPin, Train, Bus, Utensils,
  Landmark, Gem, Sun, Menu, X
} from 'lucide-react';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Scroll letiltása, ha a menü nyitva van
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://accesstoitaly.com/#organization",
        "name": "Access to Italy",
        "description": "Independent booking agency for Italian cultural landmarks.",
        "url": "https://accesstoitaly.com"
      },
      {
        "@type": "Product",
        "name": "Duomo di Milano: Rooftop & Cathedral Ticket",
        "description": "Skip-the-line entry to Milan Cathedral, Terraces and Museum.",
        "image": "https://res.cloudinary.com/dldgqjxkn/image/upload/v1765768474/federico-di-dio-photography-yfYZKkt5nes-unsplash_lmlmtk.jpg",
        "brand": {
          "@type": "Organization",
          "name": "Veneranda Fabbrica del Duomo di Milano"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://accesstoitaly.com",
          "priceCurrency": "EUR",
          "price": "26.00",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@id": "https://accesstoitaly.com/#organization"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "2450"
        }
      }
    ]
  };

  const faqs = [
    {
      question: "Is there a strict dress code?",
      answer: "YES. The Duomo is an active cathedral and strict rules apply. Both men and women must cover their shoulders and knees. Sleeveless tops, shorts, and mini-skirts are not permitted. We recommend bringing a scarf or shawl to cover up if visiting in summer. You may be denied entry without refund if you do not comply."
    },
    {
      question: "What is the difference between Lift and Stairs?",
      answer: "The 'Combo Lift' ticket allows you to take an elevator to the first level of the terraces, skipping approximately 200 steps. However, to reach the very top rooftop (where the Madonnina is), everyone must walk the final flight of stairs. The 'Combo Stairs' ticket requires climbing all 251 steps from the ground level."
    },
    {
      question: "Can I change my ticket date?",
      answer: "Tickets are valid for 72 hours from the selected date to allow for flexibility in case of travel delays. However, each specific area (Cathedral, Museum, Terraces) can only be accessed once within that window."
    },
    {
      question: "Is the Museum open every day?",
      answer: "No. The Duomo Museum and the Church of San Gottardo are CLOSED on Wednesdays. If you book for a Wednesday, you can still visit the Cathedral and the Rooftop Terraces, but the museum portion of the ticket cannot be used."
    }
  ];

  const GoogleLogo = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );

  return (
    <main className="min-h-screen text-[#1a1a1a] font-sans selection:bg-[#B8860B] selection:text-white overflow-x-hidden">
      
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- GOOGLE ADS DISCLAIMER --- */}
      <div className="bg-[#1a1a1a] text-white/80 text-[9px] md:text-[10px] py-3 text-center font-medium px-4 relative z-[40] border-b border-white/10">
        <p className="max-w-5xl mx-auto leading-relaxed opacity-90">
          <strong>DISCLAIMER:</strong> Access to Italy is an independent ticket agency and is <strong>not affiliated, associated, or connected</strong> with the Veneranda Fabbrica del Duomo di Milano. We provide a booking service for travelers. Ticket prices may include a booking fee or handling surcharge compared to the box office price.
        </p>
      </div>

      {/* --- STICKY NAVIGATION --- */}
      <nav className="sticky top-0 w-full z-[50] bg-[#1a1a1a]/90 backdrop-blur-md border-b border-white/5 pointer-events-auto transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-16 md:h-20">
          <div className="text-white drop-shadow-md z-[60]">
            <h1 className="font-serif text-xl md:text-3xl font-bold tracking-widest cursor-pointer uppercase">
              Access<span className="font-light text-[#B8860B]">To</span>Italy
            </h1>
          </div>
          
          <div className="hidden md:flex gap-10 text-xs font-bold uppercase tracking-widest text-white/95 drop-shadow-md">
            <a href="#history" className="hover:text-[#B8860B] transition-colors duration-300 py-2">History</a>
            <a href="#experience" className="hover:text-[#B8860B] transition-colors duration-300 py-2">The Experience</a>
            <a href="#info" className="hover:text-[#B8860B] transition-colors duration-300 py-2">Info</a>
          </div>

          <button 
            className="md:hidden text-white z-[60]"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* --- SIDE DRAWER MOBILE MENU --- */}
      {mobileMenuOpen && (
        <>
            <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[190] animate-in fade-in duration-300"
                onClick={() => setMobileMenuOpen(false)}
            ></div>

            <div className="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-[#1a1a1a] z-[200] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-white/10">
                <div className="flex justify-end p-6">
                    <button onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#B8860B] transition">
                        <X size={32} />
                    </button>
                </div>

                <div className="flex flex-col items-center justify-center flex-grow space-y-8 p-6">
                    <a href="#history" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-[#B8860B] transition-colors">History</a>
                    <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-[#B8860B] transition-colors">Experience</a>
                    <a href="#info" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-[#B8860B] transition-colors">Info</a>
                    <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-[#B8860B] transition-colors">Reviews</a>
                    
                    <div className="pt-8 w-full">
                        <button onClick={() => {setMobileMenuOpen(false); window.scrollTo({top:0, behavior:'smooth'})}} className="w-full bg-[#B8860B] text-white py-4 rounded-xl font-bold uppercase tracking-wider text-sm shadow-lg hover:bg-[#9a7009] transition">
                            Book Tickets
                        </button>
                    </div>
                </div>
            </div>
        </>
      )}

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90svh] flex items-center justify-center overflow-hidden -mt-[1px]">
        <div className="absolute inset-0 bg-[#1a1a1a]">
          <Image 
            src="https://res.cloudinary.com/dldgqjxkn/image/upload/v1765768474/federico-di-dio-photography-yfYZKkt5nes-unsplash_lmlmtk.jpg" 
            alt="Duomo di Milano Facade at Sunset" 
            fill
            priority={true}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/95 via-[#1a1a1a]/50 to-[#1a1a1a]/20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full pt-8 md:pt-12 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          <div className="lg:col-span-7 text-white space-y-6 md:space-y-8 animate-in slide-in-from-left-4 fade-in duration-1000">
            <div className="inline-flex items-center gap-3 border-b border-[#B8860B] pb-2">
              <Star className="text-[#B8860B] w-4 h-4 fill-current"/>
              <span className="text-[#B8860B] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">Milan's Crown Jewel</span>
            </div>
            <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl leading-[0.9] drop-shadow-2xl">
              Duomo <br/>
              <span className="italic font-light opacity-90 ml-2 md:ml-4">Di Milano</span>
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-lg font-light leading-relaxed drop-shadow-md border-l-2 border-[#B8860B] pl-4 md:pl-6">
              Experience the gothic grandeur. Ascend to the rooftops and walk among the spires of the world's most beautiful cathedral.
            </p>
            
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-lg w-fit border border-white/10">
                <GoogleLogo />
                <div>
                    <div className="flex text-[#B8860B] text-xs">
                        {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" className="text-[#B8860B]"/>)}
                    </div>
                    <p className="text-[10px] text-white font-medium">4.9/5 based on 2,450+ reviews</p>
                </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative z-20 flex justify-center lg:justify-end animate-in slide-in-from-right-4 fade-in duration-1000 delay-200">
            <div className="w-full max-w-md">
               <BookingWidget />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce hidden md:block">
          <ChevronDown size={24} className="mx-auto" />
        </div>
      </section>

      {/* --- HISTORY SECTION --- */}
      <section id="history" className="py-16 md:py-24 px-6 md:px-12 bg-[#1a1a1a] text-white -mt-[1px] relative z-10">
         <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
               <span className="text-[#B8860B] font-bold uppercase tracking-widest text-xs">A Journey Through Time</span>
               <h2 className="font-serif text-3xl md:text-5xl text-white mt-4 mb-6">Six Centuries of History</h2>
               <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-light">
                  The Duomo is not just a building; it is a story carved in marble that spans generations. It took nearly 600 years to complete.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
               <div className="space-y-12">
                  <div className="flex gap-6">
                     <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2a2a2a] border border-[#333] flex items-center justify-center text-[#B8860B] font-serif font-bold text-xl">1</div>
                     <div>
                        <h4 className="font-serif text-xl font-bold text-white mb-2">1386: The Vision</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                           Archbishop Antonio da Saluzzo breaks ground. Gian Galeazzo Visconti provides exclusive access to the pink Candoglia marble.
                        </p>
                     </div>
                  </div>
                  <div className="flex gap-6">
                     <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2a2a2a] border border-[#333] flex items-center justify-center text-[#B8860B] font-serif font-bold text-xl">2</div>
                     <div>
                        <h4 className="font-serif text-xl font-bold text-white mb-2">1805: Napoleon</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                           Napoleon Bonaparte orders its completion to crown himself King of Italy. A statue of Napoleon was placed atop one of the spires.
                        </p>
                     </div>
                  </div>
                  <div className="flex gap-6">
                     <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2a2a2a] border border-[#333] flex items-center justify-center text-[#B8860B] font-serif font-bold text-xl">3</div>
                     <div>
                        <h4 className="font-serif text-xl font-bold text-white mb-2">Today</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                           The cathedral is complete, standing as the 3rd largest church in the world. The "Veneranda Fabbrica" works daily to maintain it.
                        </p>
                     </div>
                  </div>
               </div>
               <div className="relative h-[400px] md:h-[600px] rounded-t-full overflow-hidden border-8 border-[#2a2a2a]">
                  <Image 
                     src="https://res.cloudinary.com/dldgqjxkn/image/upload/v1765768475/alessandro-cavestro-SXHm_cboGiI-unsplash_cmalx8.jpg" 
                     alt="Duomo Historical Detail" 
                     fill 
                     className="object-cover hover:scale-105 transition duration-1000"
                  />
               </div>
            </div>
         </div>
      </section>

      {/* --- ARCHITECTURE HIGHLIGHTS --- */}
      <section className="bg-[#f5f5f5] py-16 md:py-24 px-6 md:px-12 relative z-10">
         <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
               <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                  <Landmark className="mx-auto text-[#B8860B] mb-6" size={48}/>
                  <h3 className="font-serif text-2xl mb-4 text-[#1a1a1a]">Candoglia Marble</h3>
                  <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">
                     The entire cathedral is built from unique pink-hued marble quarried from Lake Maggiore.
                  </p>
               </div>
               <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                  <Award className="mx-auto text-[#B8860B] mb-6" size={48}/>
                  <h3 className="font-serif text-2xl mb-4 text-[#1a1a1a]">3,400 Statues</h3>
                  <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">
                     More statues than any other building in the world. From saints to gargoyles, the façade is alive.
                  </p>
               </div>
               <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                  <Sun className="mx-auto text-[#B8860B] mb-6" size={48}/>
                  <h3 className="font-serif text-2xl mb-4 text-[#1a1a1a]">The Madonnina</h3>
                  <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">
                     Standing at 108 meters, the golden statue of Mary protects the city of Milan.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* --- DID YOU KNOW? --- */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-white relative z-10">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-center">
            <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px]">
               <Image 
                  src="https://res.cloudinary.com/dldgqjxkn/image/upload/v1765768475/ouael-ben-salah-0xe2FGo7Vc0-unsplash_qk8u3f.jpg" 
                  alt="Duomo Detail" 
                  fill 
                  className="object-cover rounded-sm shadow-xl"
               />
               <div className="absolute -bottom-6 -right-6 bg-[#1a1a1a] p-6 shadow-lg max-w-xs border-l-4 border-[#B8860B]">
                  <p className="text-white font-serif italic text-lg">"Frozen music."</p>
                  <p className="text-white/60 text-xs mt-2 uppercase tracking-wide">— Oscar Wilde</p>
               </div>
            </div>
            <div className="w-full md:w-1/2 space-y-8">
               <span className="text-[#B8860B] font-bold uppercase tracking-widest text-xs">Insider Secrets</span>
               <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a]">Secrets of the Stone</h3>
               
               <div className="space-y-6">
                  <div className="flex gap-4">
                     <Gem className="text-[#B8860B] flex-shrink-0" size={24}/>
                     <div>
                        <h4 className="font-bold text-[#1a1a1a]">The Boxer & The Tennis Player</h4>
                        <p className="text-sm text-[#1a1a1a]/70">Look closely at the façade. Among the saints, you can find statues representing modern sports.</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <Gem className="text-[#B8860B] flex-shrink-0" size={24}/>
                     <div>
                        <h4 className="font-bold text-[#1a1a1a]">The Statue of Liberty?</h4>
                        <p className="text-sm text-[#1a1a1a]/70">On the balcony, the statue "The New Law" (1810) bears a striking resemblance to New York's Lady Liberty.</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <Gem className="text-[#B8860B] flex-shrink-0" size={24}/>
                     <div>
                        <h4 className="font-bold text-[#1a1a1a]">The Holy Nail</h4>
                        <p className="text-sm text-[#1a1a1a]/70">High above the altar, a red light marks the spot of a nail believed to be from the True Cross.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- MILANO JOURNAL --- */}
      <section id="experience" className="py-16 md:py-24 px-6 md:px-12 bg-[#f9f9f9] relative z-10">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
               <span className="text-[#B8860B] font-bold uppercase tracking-widest text-xs">Travel Guide</span>
               <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mt-2">Plan Your Perfect Visit</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="group cursor-pointer">
                  <div className="relative h-64 w-full overflow-hidden mb-6">
                     <Image 
                        src="https://res.cloudinary.com/dldgqjxkn/image/upload/v1765768474/rebecca-mckenna-CzjWqp0UWAc-unsplash_lnqbpz.jpg" 
                        alt="Rooftop Sunset" 
                        fill 
                        className="object-cover transition duration-700 group-hover:scale-105"
                     />
                  </div>
                  <span className="text-[#B8860B] text-[10px] font-bold uppercase tracking-[0.2em]">Best Time</span>
                  <h4 className="font-serif text-2xl text-[#1a1a1a] mt-2 mb-3 group-hover:text-[#B8860B] transition-colors">Golden Hour on the Roof</h4>
                  <p className="text-[#1a1a1a]/70 text-sm leading-relaxed mb-4">
                     The most magical time to visit the terraces is one hour before sunset.
                  </p>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] underline decoration-[#B8860B] underline-offset-4">Read Guide</span>
               </div>

               <div className="group cursor-pointer">
                  <div className="relative h-64 w-full overflow-hidden mb-6">
                     <Image 
                        src="https://res.cloudinary.com/dldgqjxkn/image/upload/v1765768474/rebecca-mckenna-DQge-qqqzxU-unsplash_csigsf.jpg" 
                        alt="Inside the Duomo" 
                        fill 
                        className="object-cover transition duration-700 group-hover:scale-105"
                     />
                  </div>
                  <span className="text-[#B8860B] text-[10px] font-bold uppercase tracking-[0.2em]">Tips</span>
                  <h4 className="font-serif text-2xl text-[#1a1a1a] mt-2 mb-3 group-hover:text-[#B8860B] transition-colors">How to Skip the Line</h4>
                  <p className="text-[#1a1a1a]/70 text-sm leading-relaxed mb-4">
                     Lines can be hours long. Our Fast-Track Combo tickets let you bypass the general queue.
                  </p>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] underline decoration-[#B8860B] underline-offset-4">Read Guide</span>
               </div>

               <div className="group cursor-pointer">
                  <div className="relative h-64 w-full overflow-hidden mb-6">
                     <Image 
                        src="https://res.cloudinary.com/dldgqjxkn/image/upload/v1765768475/ouael-ben-salah-0xe2FGo7Vc0-unsplash_qk8u3f.jpg" 
                        alt="Milan Food" 
                        fill 
                        className="object-cover transition duration-700 group-hover:scale-105"
                     />
                  </div>
                  <span className="text-[#B8860B] text-[10px] font-bold uppercase tracking-[0.2em]">Dining</span>
                  <h4 className="font-serif text-2xl text-[#1a1a1a] mt-2 mb-3 group-hover:text-[#B8860B] transition-colors">Where to Eat Nearby</h4>
                  <p className="text-[#1a1a1a]/70 text-sm leading-relaxed mb-4">
                     Avoid the tourist traps. We've listed the top 5 authentic trattorias nearby.
                  </p>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] underline decoration-[#B8860B] underline-offset-4">Read Guide</span>
               </div>
            </div>
         </div>
      </section>

      {/* --- REVIEWS --- */}
      <section id="reviews" className="py-16 md:py-20 px-6 md:px-12 bg-white border-t border-gray-200 relative z-10">
         <div className="max-w-7xl mx-auto">
             <div className="flex items-center justify-center gap-3 mb-12">
                 <GoogleLogo />
                 <h3 className="font-serif text-3xl text-[#1a1a1a]">Traveler Reviews</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* Review 1 */}
                 <div className="bg-white p-8 shadow-sm border border-gray-200 rounded-xl relative">
                     <Quote size={40} className="text-gray-200 absolute top-6 right-6"/>
                     <div className="flex text-[#B8860B] mb-4">
                        {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor"/>)}
                     </div>
                     <p className="text-[#1a1a1a]/70 text-sm leading-relaxed mb-6">
                        "The booking process was seamless. We received the QR codes instantly and walked right past the ticket line."
                     </p>
                     <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center font-bold text-xs">S</div>
                         <div>
                             <span className="block text-xs font-bold text-[#1a1a1a]">Sarah J.</span>
                             <span className="text-[10px] text-gray-500">December 2024</span>
                         </div>
                         <div className="ml-auto"><GoogleLogo/></div>
                     </div>
                 </div>

                 {/* Review 2 */}
                 <div className="bg-white p-8 shadow-sm border border-gray-200 rounded-xl relative">
                     <Quote size={40} className="text-gray-200 absolute top-6 right-6"/>
                     <div className="flex text-[#B8860B] mb-4">
                        {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor"/>)}
                     </div>
                     <p className="text-[#1a1a1a]/70 text-sm leading-relaxed mb-6">
                        "Highly recommend the Combo Lift ticket. Climbing the last stairs to the very top is worth it for the photos."
                     </p>
                     <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-[#B8860B] text-white flex items-center justify-center font-bold text-xs">M</div>
                         <div>
                             <span className="block text-xs font-bold text-[#1a1a1a]">Mark D.</span>
                             <span className="text-[10px] text-gray-500">January 2025</span>
                         </div>
                         <div className="ml-auto"><GoogleLogo/></div>
                     </div>
                 </div>

                 {/* Review 3 */}
                 <div className="bg-white p-8 shadow-sm border border-gray-200 rounded-xl relative">
                     <Quote size={40} className="text-gray-200 absolute top-6 right-6"/>
                     <div className="flex text-[#B8860B] mb-4">
                        {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor"/>)}
                     </div>
                     <p className="text-[#1a1a1a]/70 text-sm leading-relaxed mb-6">
                        "Reliable service. We were worried about the tickets not working but everything was smooth at the turnstiles."
                     </p>
                     <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center font-bold text-xs">E</div>
                         <div>
                             <span className="block text-xs font-bold text-[#1a1a1a]">Elena R.</span>
                             <span className="text-[10px] text-gray-500">November 2024</span>
                         </div>
                         <div className="ml-auto"><GoogleLogo/></div>
                     </div>
                 </div>
             </div>
         </div>
      </section>

      {/* --- INFO & FAQ --- */}
      <section id="info" className="py-16 md:py-24 w-full bg-white relative z-10">
         <div className="max-w-4xl mx-auto px-6 md:px-12">
             <div className="text-center mb-16">
                 <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a]">Essential Information</h3>
                 <p className="text-[#1a1a1a]/60 mt-4">Know before you go.</p>
             </div>

             <div className="space-y-4 border-t border-gray-200 pt-8">
                {faqs.map((faq, index) => (
                   <div key={index} className="border-b border-gray-200 pb-4">
                      <button 
                         onClick={() => toggleFaq(index)}
                         className="w-full flex justify-between items-center text-left py-2 hover:text-[#B8860B] transition"
                      >
                         <span className="font-bold text-base md:text-lg text-[#1a1a1a] pr-4">{faq.question}</span>
                         {openFaq === index ? <Minus size={18} className="text-[#B8860B] flex-shrink-0"/> : <Plus size={18} className="text-gray-400 flex-shrink-0"/>}
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                         <p className="text-[#1a1a1a]/70 font-light leading-relaxed text-sm md:text-base">{faq.answer}</p>
                      </div>
                   </div>
                ))}
             </div>
         </div>
      </section>

      {/* --- LOCATION MAP --- */}
      <section className="w-full bg-white relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-3 h-auto lg:h-[500px]">
             
             {/* Bal oldal: Információ */}
             <div className="bg-[#f9f9f9] p-8 md:p-12 flex flex-col justify-center order-1 lg:order-1">
                 <MapPin className="text-[#B8860B] mb-6" size={40}/>
                 <h3 className="font-serif text-3xl text-[#1a1a1a] mb-6">Getting There</h3>
                 
                 <div className="space-y-6">
                     <div>
                         <div className="flex items-center gap-3 mb-2">
                             <Train className="text-[#B8860B]" size={20}/>
                             <h4 className="font-bold text-[#1a1a1a]">By Metro</h4>
                         </div>
                         <p className="text-[#1a1a1a]/70 text-sm ml-8">
                             Take the Yellow Line (M3) or Red Line (M1) and get off at <strong>Duomo</strong> station. The stairs lead directly into the piazza.
                         </p>
                     </div>

                     <div>
                         <div className="flex items-center gap-3 mb-2">
                             <Bus className="text-[#B8860B]" size={20}/>
                             <h4 className="font-bold text-[#1a1a1a]">By Tram</h4>
                         </div>
                         <p className="text-[#1a1a1a]/70 text-sm ml-8">
                             Lines 2, 3, 14, and 15 stop at <strong>Via Torino</strong>, just 2 minutes walk from the cathedral.
                         </p>
                     </div>
                 </div>
             </div>

             {/* Jobb oldal: Térkép (iframe) */}
             <div className="lg:col-span-2 h-[400px] lg:h-full relative grayscale hover:grayscale-0 transition duration-700 order-2 lg:order-2">
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.272173322471!2d9.188258376551066!3d45.46421137107383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c6aec34636a1%3A0xab7f4e27101a2e13!2sDuomo%20di%20Milano!5e0!3m2!1sen!2shu!4v1709568945621!5m2!1sen!2shu" 
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                 ></iframe>
             </div>
         </div>
      </section>

      {/* --- FOOTER TÖRÖLVE (MERT A LAYOUT KEZELI) --- */}
    </main>
  );
}