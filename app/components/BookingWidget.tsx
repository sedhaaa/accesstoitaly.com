'use client'; // Fontos!

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase'; 
import { 
  Minus, Plus, ArrowRight, Check, Calendar, AlertCircle, Info, 
  ChevronLeft, User, Mail, Phone, Lock, Shield, Loader2, Flame
} from 'lucide-react';

const TICKET_VARIANTS = [
  { id: 'lift', name: 'Combo Lift', desc: 'Duomo + Terraces (Lift) + Museum', price: 26, reduced: 13, highlight: 'Most Popular' },
  { id: 'stairs', name: 'Combo Stairs', desc: 'Duomo + Terraces (Stairs) + Museum', price: 20, reduced: 10, highlight: 'Best Value' },
  { id: 'duomo', name: 'Duomo + Museum', desc: 'Cathedral Access Only (No Terraces)', price: 15, reduced: 8, highlight: null },
];

export default function BookingWidget() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(TICKET_VARIANTS[0]);
  
  const [adults, setAdults] = useState(1);
  const [reduced, setReduced] = useState(0);
  
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [availabilityRules, setAvailabilityRules] = useState<any[]>([]);

  const today = new Date();
  const currentDay = today.getDate(); 
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const total = (adults * selectedVariant.price) + (reduced * selectedVariant.reduced);
  const count = adults + reduced;
  
  // Összes lehetséges időpont (11 db)
  const times = ["09:00", "09:30", "10:00", "10:30", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
  
  const isFormValid = formData.fullName.length > 3 && formData.email.includes('@') && formData.phone.length > 6;

  useEffect(() => {
    const fetchAvailability = async () => {
        const { data } = await supabase.from('availability').select('*');
        if (data) setAvailabilityRules(data);
    };
    fetchAvailability();
  }, []);

  const getDateString = (day: number) => {
    return `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  // --- NAPTÁR LOGIKA (BŐVÍTVE) ---
  const getDayStatus = (day: number) => {
    const dateStr = getDateString(day);
    const rule = availabilityRules.find(r => r.blocked_date === dateStr);
    const isPast = day < currentDay;

    if (isPast) return { status: 'disabled', label: '' };
    if (!rule) return { status: 'open', label: '' };

    const applies = rule.ticket_type === 'all' || rule.ticket_type === selectedVariant.id;
    
    if (!applies) return { status: 'open', label: '' };
    if (rule.is_full_day_blocked) return { status: 'blocked', label: 'Sold Out' };

    // Számoljuk ki hány hely maradt
    const blockedCount = rule.blocked_times?.length || 0;
    const remainingSlots = times.length - blockedCount;

    if (remainingSlots <= 3 && remainingSlots > 0) {
        return { status: 'low', label: 'Last spots' }; // Sárga jelzés
    }
    
    // Ha minden időpont le van zárva kézileg
    if (remainingSlots === 0) return { status: 'blocked', label: 'Sold Out' };

    return { status: 'open', label: '' };
  };

  const isTimeBlocked = (t: string) => {
    if (!selectedDay) return false;
    const dateStr = getDateString(selectedDay);
    const rule = availabilityRules.find(r => r.blocked_date === dateStr);
    if (!rule) return false;
    const applies = rule.ticket_type === 'all' || rule.ticket_type === selectedVariant.id;
    return applies && rule.blocked_times?.includes(t);
  };

  const handleCheckout = async () => {
    if (!selectedDay) return;
    setIsSubmitting(true);
    const formattedDate = getDateString(selectedDay);

    const orderData = {
        ticketType: selectedVariant.id,
        date: formattedDate,
        time: time,
        adults: adults, reduced: reduced, total: total,
        fullName: formData.fullName, email: formData.email, phone: formData.phone
    };

    try {
        const response = await fetch('/api/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });
        const result = await response.json();

        if (result.success) {
            // ÁTIRÁNYÍTÁS A THANK YOU PAGE-RE (Query paraméterekkel a Google Adsnek)
            router.push(`/thank-you?orderId=${result.orderId}&total=${total}&currency=EUR`);
        } else {
            alert("Hiba történt. Kérjük próbáld újra.");
        }
    } catch (error) { alert("Hálózati hiba."); } 
    finally { setIsSubmitting(false); }
  };

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2 && selectedDay && time) setStep(3);
    else if (step === 3 && count > 0) setStep(4);
    else if (step === 4 && isFormValid) handleCheckout();
  };

  const handleBack = () => { if (step > 1) setStep(step - 1); };

  // --- RENDER ---
  return (
    <>
    <style jsx global>{`
        @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse-yellow { 0% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0.4); } 70% { box-shadow: 0 0 0 6px rgba(234, 179, 8, 0); } 100% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0); } }
        .step-animation { animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .fade-in-anim { animation: fadeIn 0.3s ease-out forwards; }
        .pulse-dot { animation: pulse-yellow 2s infinite; }
    `}</style>

    <div className="bg-white w-full rounded-3xl shadow-2xl border border-stone-100 relative z-20 text-[#1a1a1a] flex flex-col transition-all duration-300">
      
      {/* HEADER */}
      <div className="p-5 md:p-8 border-b border-stone-100">
        <div className="flex justify-between items-center mb-4">
            {step > 1 ? ( <button onClick={handleBack} className="text-stone-400 hover:text-[#B8860B] transition p-1 -ml-1"><ChevronLeft size={24}/></button> ) : <div className="w-6"></div>}
            <span className="text-[#B8860B] text-[10px] font-bold tracking-[0.2em] uppercase">Step {step} / 4</span>
            <div className="w-6"></div>
        </div>
        <div className="flex justify-between items-end">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1a1a1a] leading-none">{step === 1 ? 'Select Tickets' : step === 2 ? 'Choose Date' : step === 3 ? 'Guests' : 'Your Details'}</h2>
            <div className="text-right"><div className="text-[9px] text-stone-400 uppercase tracking-widest mb-1">Total</div><div className="text-2xl font-sans font-bold text-[#1a1a1a] leading-none tracking-tight">€{total}</div></div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 md:p-8 min-h-[320px]">
          
          {/* STEP 1 */}
          {step === 1 && (
            <div key="step1" className="space-y-3 step-animation">
              {TICKET_VARIANTS.map((variant) => (
                <div key={variant.id} onClick={() => setSelectedVariant(variant)} className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 relative group active:scale-[0.98] ${selectedVariant.id === variant.id ? 'border-[#B8860B] bg-[#B8860B]/5' : 'border-stone-100 hover:border-[#B8860B]/30 bg-white'}`}>
                  {variant.highlight && <span className={`absolute -top-2 right-4 text-white text-[9px] px-2 py-0.5 rounded uppercase tracking-wider font-bold shadow-sm transition-colors ${selectedVariant.id === variant.id ? 'bg-[#B8860B]' : 'bg-[#1a1a1a]'}`}>{variant.highlight}</span>}
                  <div className="flex justify-between items-center mb-1"><span className="font-bold text-[#1a1a1a]">{variant.name}</span><span className="font-sans font-bold text-[#B8860B]">€{variant.price}</span></div>
                  <p className="text-xs text-stone-500 leading-snug">{variant.desc}</p>
                </div>
              ))}
              <div className="flex items-start gap-2 mt-4 p-3 bg-stone-50 rounded-lg text-xs text-stone-500"><Info size={14} className="flex-shrink-0 mt-0.5 text-[#B8860B]"/><p>Tickets are valid for 72 hours from the selected date.</p></div>
            </div>
          )}

          {/* STEP 2 (OKOS NAPTÁR SÁRGA PÖTTYEL) */}
          {step === 2 && (
            <div key="step2" className="step-animation">
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 mb-4">
                  <div className="grid grid-cols-7 gap-1 mb-2 text-center text-[10px] font-bold text-stone-400 uppercase tracking-wider">{['M','T','W','T','F','S','S'].map((day, i) => <div key={i}>{day}</div>)}</div>
                  <div className="grid grid-cols-7 gap-1 md:gap-2">
                    {[...Array(31)].map((_, i) => {
                      const day = i + 1;
                      const { status } = getDayStatus(day);
                      const isSelected = selectedDay === day;
                      
                      let btnClass = 'bg-white text-stone-600 border-stone-200 hover:border-[#B8860B] hover:text-[#B8860B] active:bg-stone-100';
                      let isDisabled = false;

                      if (isSelected) btnClass = 'bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-md font-bold';
                      else if (status === 'disabled') { btnClass = 'bg-transparent text-stone-300 border-transparent'; isDisabled = true; }
                      else if (status === 'blocked') { btnClass = 'bg-stone-100 text-stone-300 border-transparent line-through decoration-stone-300'; isDisabled = true; }
                      
                      return (
                      <button 
                        key={i} 
                        disabled={isDisabled}
                        onClick={() => !isDisabled && setSelectedDay(day)}
                        className={`aspect-square rounded-lg text-sm flex items-center justify-center transition-all duration-200 border relative ${btnClass}`}
                      >
                        {day}
                        {/* SÁRGA PÖTTY HA KEVÉS A HELY */}
                        {status === 'low' && !isDisabled && !isSelected && (
                            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-yellow-500 rounded-full pulse-dot"></span>
                        )}
                      </button>
                    )})}
                  </div>
              </div>
              
              {/* Time Slots */}
              {selectedDay && (
                <div className="mt-4">
                    <div className="flex justify-between items-center mb-3 fade-in-anim">
                        <p className="text-xs font-bold text-stone-400 uppercase">Entry Time</p>
                        {getDayStatus(selectedDay).status === 'low' && (
                            <span className="text-[10px] font-bold text-yellow-600 flex items-center gap-1 bg-yellow-100 px-2 py-0.5 rounded-full"><Flame size={10}/> Selling Fast!</span>
                        )}
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {times.map((t, index) => {
                            const blocked = isTimeBlocked(t);
                            return (
                                <button 
                                    key={t}
                                    disabled={blocked}
                                    onClick={() => !blocked && setTime(t)}
                                    style={{ animationDelay: `${index * 30}ms` }}
                                    className={`stagger-item py-2 text-xs font-bold rounded border transition-all
                                    ${time === t 
                                        ? 'bg-[#B8860B] text-white border-[#B8860B]' 
                                        : blocked 
                                            ? 'bg-stone-100 text-stone-300 cursor-not-allowed border-transparent decoration-stone-300 line-through'
                                            : 'bg-white border-stone-200 text-stone-600 hover:border-[#B8860B] hover:text-[#B8860B] active:scale-95'}
                                    `}
                                >
                                    {t}
                                </button>
                            )
                        })}
                    </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3 & 4 */}
          {step === 3 && (
            <div key="step3" className="step-animation space-y-6">
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 mb-6 flex items-center gap-4">
                 <div className="bg-white p-2 rounded-lg border border-stone-100 shadow-sm"><Calendar size={20} className="text-[#B8860B]"/></div>
                 <div><p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Summary</p><p className="font-bold text-sm text-[#1a1a1a]">Dec {selectedDay}, {time}</p><p className="text-xs text-stone-500">{selectedVariant.name}</p></div>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-stone-100">
                <div><p className="font-bold text-[#1a1a1a]">Adult</p><p className="text-xs text-stone-500">Age 19+</p><p className="text-sm font-sans font-bold text-[#B8860B]">€{selectedVariant.price}</p></div>
                <div className="flex items-center gap-4"><button onClick={() => setAdults(Math.max(0, adults - 1))} className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50 text-[#1a1a1a] transition active:scale-90"><Minus size={16}/></button><span className="w-6 text-center font-bold text-lg text-[#1a1a1a]">{adults}</span><button onClick={() => setAdults(adults + 1)} className="w-10 h-10 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center hover:bg-stone-800 transition active:scale-90"><Plus size={16}/></button></div>
              </div>
              <div className="flex justify-between items-center">
                <div><p className="font-bold text-[#1a1a1a]">Reduced</p><p className="text-xs text-stone-500">Age 6-18</p><p className="text-sm font-sans font-bold text-[#B8860B]">€{selectedVariant.reduced}</p></div>
                <div className="flex items-center gap-4"><button onClick={() => setReduced(Math.max(0, reduced - 1))} className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50 text-[#1a1a1a] transition active:scale-90"><Minus size={16}/></button><span className="w-6 text-center font-bold text-lg text-[#1a1a1a]">{reduced}</span><button onClick={() => setReduced(reduced + 1)} className="w-10 h-10 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center hover:bg-stone-800 transition active:scale-90"><Plus size={16}/></button></div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div key="step4" className="step-animation space-y-4">
                <div className="bg-[#B8860B]/10 p-4 rounded-xl flex gap-3 items-start mb-4 border border-[#B8860B]/20"><AlertCircle size={18} className="text-[#B8860B] flex-shrink-0 mt-0.5"/><p className="text-xs text-stone-700 leading-relaxed">Please enter the <strong>Lead Traveler's</strong> details. Tickets will be sent to this email address instantly.</p></div>
                <div className="space-y-4">
                    <div className="relative"><User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"/><input type="text" placeholder="Full Name" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 pl-12 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-[#B8860B] transition-all text-[#1a1a1a] placeholder:text-stone-400"/></div>
                    <div className="relative"><Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"/><input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 pl-12 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-[#B8860B] transition-all text-[#1a1a1a] placeholder:text-stone-400"/></div>
                    <div className="relative"><Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"/><input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 pl-12 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-[#B8860B] transition-all text-[#1a1a1a] placeholder:text-stone-400"/></div>
                </div>
                <div className="flex items-center gap-2 justify-center mt-4"><Lock size={12} className="text-stone-400"/><span className="text-[10px] text-stone-400 uppercase tracking-wider">256-bit SSL Encrypted</span></div>
            </div>
          )}
      </div>

      {/* FOOTER */}
      <div className="p-5 md:p-8 border-t border-stone-100 bg-white rounded-b-3xl">
        <button onClick={handleNext} disabled={(step === 2 && (!selectedDay || !time)) || (step === 3 && count === 0) || (step === 4 && !isFormValid) || isSubmitting} className="w-full bg-[#1a1a1a] text-white h-14 rounded-xl font-bold tracking-wide flex items-center justify-center gap-3 hover:bg-stone-800 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98] text-lg">
          {isSubmitting ? <><Loader2 className="animate-spin" size={20}/> Processing...</> : (step === 4 ? 'Go to Checkout' : 'Continue')} {!isSubmitting && <ArrowRight size={20} />}
        </button>
        {step < 4 && (
            <div className="mt-5 flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-[10px] text-stone-500 uppercase tracking-widest font-medium"><Check size={12} className="text-green-600"/> Instant Confirmation</div>
                <div className="flex items-center gap-2 text-[10px] text-stone-500 uppercase tracking-widest font-medium"><Shield size={12} className="text-[#B8860B]"/> Free cancellation up to 24hrs</div>
            </div>
        )}
      </div>
    </div>
    </>
  );
}