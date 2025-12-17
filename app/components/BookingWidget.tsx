'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { supabase } from '@/lib/supabase';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
  Minus, Plus, ArrowRight, Check, Calendar, AlertCircle, Info,
  ChevronLeft, User, Mail, Phone, Lock, Shield, Loader2, Flame, CreditCard, XCircle, AlertTriangle
} from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface StripePaymentFormProps {
  total: number;
  customerDetails: { fullName: string; email: string; phone: string };
  onSuccess: () => Promise<void>;
  onError: (msg: string) => void;
  isProcessing: boolean;
  setIsProcessing: (loading: boolean) => void;
}

// --- 1. STRIPE FORM KOMPONENS ---
const StripePaymentForm = ({ total, customerDetails, onSuccess, onError, isProcessing, setIsProcessing }: StripePaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const t = useTranslations('Booking');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    // 1. Fizetés indítása a Stripe felé
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/thank-you`,
        payment_method_data: {
          billing_details: {
            name: customerDetails.fullName,
            email: customerDetails.email,
            phone: customerDetails.phone,
          } as any
        }
      },
      redirect: 'if_required', 
    });

    if (error) {
      // Hiba a Stripe oldalán (pl. elutasított kártya)
      setMessage(error.message || "Unknown error");
      onError(error.message || "Unknown error");
      setIsProcessing(false);
    } else {
      // 2. Ha sikeres, hívjuk a mentést
      await onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 fade-in-anim pb-2">
      <div className="bg-stone-50 p-1 rounded-xl border border-stone-200">
        <PaymentElement options={{ layout: "tabs", defaultValues: { billingDetails: { name: customerDetails.fullName, email: customerDetails.email, phone: customerDetails.phone } } }} />
      </div>
      {message && <div className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg flex gap-2 animate-pulse"><AlertCircle size={16} /> {message}</div>}
      <button disabled={isProcessing || !stripe || !elements} className="w-full bg-[#1a1a1a] text-white h-14 rounded-xl font-bold tracking-wide flex items-center justify-center gap-3 hover:bg-stone-800 disabled:bg-stone-300 transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] text-lg touch-manipulation">
        {isProcessing ? <><Loader2 className="animate-spin" size={20} /> {t('buttons.processing')}</> : <>{t('buttons.pay')} €{total.toFixed(2)} <CreditCard size={20} /></>}
      </button>
    </form>
  );
};

// --- 2. FŐ WIDGET KOMPONENS ---
export default function BookingWidget() {
  const t = useTranslations('Booking');
  const locale = useLocale();
  const router = useRouter();

  const ticketVariants = useMemo(() => [
    {
      id: 'lift',
      name: t('tickets.lift_name'),
      desc: t('tickets.lift_desc'),
      price: 35.90,
      originalPrice: 42.00,
      reduced: 19.90,
      highlight: t('tickets.lift_tag')
    },
    {
      id: 'stairs',
      name: t('tickets.stairs_name'),
      desc: t('tickets.stairs_desc'),
      price: 29.90,
      originalPrice: 35.00,
      reduced: 20.90,
      highlight: t('tickets.stairs_tag')
    },
    {
      id: 'duomo',
      name: t('tickets.duomo_name'),
      desc: t('tickets.duomo_desc'),
      price: 21.90,
      originalPrice: 26.00,
      reduced: 13.90,
      highlight: null
    },
  ], [t]);

  const [step, setStep] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(ticketVariants[0]);
  const [adults, setAdults] = useState(1);
  const [reduced, setReduced] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '' });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<{ code: string, param?: string } | null>(null);

  const [clientSecret, setClientSecret] = useState("");
  const [availabilityRules, setAvailabilityRules] = useState<any[]>([]);

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const total = (adults * selectedVariant.price) + (reduced * selectedVariant.reduced);
  const count = adults + reduced;
  const times = ["09:00", "09:30", "10:00", "10:30", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isGmailTypo = (email: string) => email.toLowerCase().endsWith('@gmail.con');
  const isNameValid = formData.fullName.length > 3;
  const isEmailValid = emailRegex.test(formData.email) && !isGmailTypo(formData.email);
  const isPhoneValid = formData.phone.length > 6;
  const isFormValid = isNameValid && isEmailValid && isPhoneValid;

  useEffect(() => {
    const currentId = selectedVariant.id;
    const updatedVariant = ticketVariants.find(v => v.id === currentId);
    if (updatedVariant) setSelectedVariant(updatedVariant);
  }, []);

  useEffect(() => {
    if (serverError) setServerError(null);
  }, [step, selectedDay, time, ticketVariants]);

  useEffect(() => {
    const fetchAvailability = async () => {
      const { data } = await supabase.from('availability').select('*');
      if (data) setAvailabilityRules(data);
    };
    fetchAvailability();
    const channel = supabase.channel('availability_changes').on('postgres_changes', { event: '*', schema: 'public', table: 'availability' }, () => fetchAvailability()).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const getDateString = (day: number) => `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const getDayStatus = (day: number) => {
    const dateStr = getDateString(day);
    const rule = availabilityRules.find(r => r.blocked_date === dateStr);
    const isPast = day < currentDay;
    if (isPast) return { status: 'disabled', label: '' };
    if (!rule) return { status: 'open', label: '' };
    const applies = rule.ticket_type === 'all' || rule.ticket_type === selectedVariant.id;
    if (!applies) return { status: 'open', label: '' };
    if (rule.is_full_day_blocked) return { status: 'blocked', label: t('calendar.sold_out') };
    const blockedCount = rule.blocked_times?.length || 0;
    const remainingSlots = times.length - blockedCount;
    if (remainingSlots <= 2 && remainingSlots > 0) return { status: 'critical', label: t('calendar.last_spots') };
    if (remainingSlots <= 4 && remainingSlots > 2) return { status: 'low', label: t('calendar.selling_fast') };
    if (remainingSlots === 0) return { status: 'blocked', label: t('calendar.sold_out') };
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

  // --- 1. LÉPÉS: INICIALIZÁLÁS (Fizetési szándék létrehozása a Stripe-nál) ---
  const initializePayment = async () => {
    if (!selectedDay) return;
    setIsSubmitting(true);
    setServerError(null);

    // Külön adatobjektum a fizetés előkészítéséhez
    const paymentInitData = {
      total: total,
      currency: 'eur'
    };

    try {
      // FONTOS: Ez egy ÚJ, KÜLÖN API útvonal, nem a create-order!
      // Ennek az API-nak csak a clientSecret-et kell visszaadnia.
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentInitData),
      });

      const result = await response.json();

      if (!response.ok) {
         console.error("Stripe Init Hiba:", result);
         setServerError({ code: 'generic_error' });
         alert("Hiba a fizetési rendszer inicializálásakor.");
         return;
      }

      if (result.clientSecret) {
        setClientSecret(result.clientSecret);
        // Ha megvan a titkos kulcs, akkor mehetünk a fizetési felületre
        setStep(5);
      } else {
         console.error("Nincs clientSecret!");
         alert("Szerver hiba: Nem érkezett válasz a fizetési szolgáltatótól.");
      }
    } catch (error: any) {
      console.error(error);
      setServerError({ code: 'generic_error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- 2. LÉPÉS: SIKERES FIZETÉS UTÁNI MENTÉS (A te beküldött create-order API-dat hívja) ---
  const handlePaymentSuccess = async () => {
    if (!selectedDay) return;

    // Itt állítjuk össze az adatokat, amit a 'create-order' vár
    const finalOrderData = {
      ticketType: selectedVariant.name,
      ticketTypeId: selectedVariant.id,
      date: getDateString(selectedDay),
      time: time,
      adults, reduced, total,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      locale: locale
    };

    try {
      // Hívjuk a TE create-order API-dat
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalOrderData),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Mentés hiba:", result.error);
        // Ha a mentés nem sikerült, de fizetett, küldjük hiba-paraméterrel
        router.push(`/${locale}/thank-you?orderId=error_saved_contact_support&total=${total}&currency=EUR`);
      } else {
        // Minden szuper, megvan az orderId a szervertől (a 8 jegyű szám)
        const finalOrderId = result.orderId || 'confirmed';
        router.push(`/${locale}/thank-you?orderId=${finalOrderId}&total=${total}&currency=EUR`);
      }

    } catch (error) {
      console.error("Kritikus hiba:", error);
      router.push(`/${locale}/thank-you?orderId=error_network&total=${total}&currency=EUR`);
    }
  };

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2 && selectedDay && time) setStep(3);
    else if (step === 3 && count > 0) setStep(4);
    else if (step === 4 && isFormValid) initializePayment();
  };

  const handleBack = () => { if (step > 1) setStep(step - 1); };

  const getButtonText = () => {
    if (isSubmitting) return t('buttons.processing');
    if (step === 4) return t('buttons.to_payment');
    return t('buttons.continue');
  };

  const isButtonDisabled = () => {
    if (isSubmitting) return true;
    if (step === 2 && (!selectedDay || !time)) return true;
    if (step === 3 && count === 0) return true;
    if (step === 4 && !isFormValid) return true;
    return false;
  };

  return (
    <>
      <style jsx global>{`
        @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDownFade { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        .step-animation { animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .fade-in-anim { animation: fadeIn 0.3s ease-out forwards; }
        .error-anim { animation: slideDownFade 0.3s ease-out forwards; }
        .pulse-dot-red { animation: pulse-red 2s infinite; background-color: #ef4444; }
    `}</style>

      <div className="bg-white w-full rounded-2xl md:rounded-3xl shadow-2xl border border-stone-100 relative z-20 text-[#1a1a1a] flex flex-col transition-all duration-300 overflow-hidden">

        {/* HEADER */}
        <div className="p-4 md:p-8 border-b border-stone-100 bg-white sticky top-0 z-30">
          <div className="flex justify-between items-center mb-2 md:mb-4">
            {step > 1 ? (<button onClick={handleBack} className="text-stone-400 hover:text-[#B8860B] transition p-1 -ml-1 active:scale-90"><ChevronLeft size={20} className="md:w-6 md:h-6" /></button>) : <div className="w-5 md:w-6"></div>}
            <span className="text-[#B8860B] text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase">{step === 5 ? t('steps', { step: 4 }) : t('steps', { step: step })}</span>
            <div className="w-5 md:w-6"></div>
          </div>
          <div className="flex justify-between items-end">
            <h2 className="text-xl md:text-3xl font-serif font-bold text-[#1a1a1a] leading-none">
              {step === 1 ? t('titles.step1') : step === 2 ? t('titles.step2') : step === 3 ? t('titles.step3') : step === 4 ? t('titles.step4') : 'Payment'}
            </h2>
            <div className="text-right">
              <div className="text-[8px] md:text-[9px] text-stone-400 uppercase tracking-widest mb-0.5 md:mb-1">{t('total')}</div>
              <div className="text-xl md:text-2xl font-sans font-bold text-[#1a1a1a] leading-none tracking-tight">€{total.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4 md:p-8 min-h-[300px] md:min-h-[320px]">

          {/* STEP 1 */}
          {step === 1 && (
            <div key="step1" className="space-y-3 step-animation">
              {ticketVariants.map((variant) => (
                <div key={variant.id} onClick={() => setSelectedVariant(variant)} className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 relative group active:scale-[0.98] ${selectedVariant.id === variant.id ? 'border-[#B8860B] bg-[#B8860B]/5' : 'border-stone-100 bg-white'}`}>
                  {variant.highlight && <span className={`absolute -top-2 right-4 text-white text-[9px] px-2 py-0.5 rounded uppercase tracking-wider font-bold shadow-sm transition-colors ${selectedVariant.id === variant.id ? 'bg-[#B8860B]' : 'bg-[#1a1a1a]'}`}>{variant.highlight}</span>}
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-[#1a1a1a] text-sm md:text-base">{variant.name}</span>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-stone-400 line-through decoration-red-400 decoration-1">€{variant.originalPrice.toFixed(2)}</span>
                      <span className="font-sans font-bold text-[#B8860B] text-sm md:text-base leading-none">€{variant.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-stone-500 leading-snug pr-2">{variant.desc}</p>
                </div>
              ))}
              <div className="flex items-start gap-2 mt-4 p-3 bg-stone-50 rounded-lg text-xs text-stone-500"><Info size={14} className="flex-shrink-0 mt-0.5 text-[#B8860B]" /><p>{t('info_validity')}</p></div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div key="step2" className="step-animation">
              <div className="bg-stone-50 p-2 md:p-3 rounded-xl border border-stone-100 mb-4">
                <div className="grid grid-cols-7 gap-1 mb-2 text-center text-[9px] md:text-[10px] font-bold text-stone-400 uppercase tracking-wider">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => <div key={i}>{day}</div>)}</div>
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
                      <button key={i} disabled={isDisabled} onClick={() => !isDisabled && setSelectedDay(day)} className={`aspect-square rounded-lg text-sm flex items-center justify-center transition-all duration-200 border relative ${btnClass} touch-manipulation`}>
                        {day}
                        {status === 'critical' && !isDisabled && !isSelected && <span className="absolute top-1 right-1 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full pulse-dot-red"></span>}
                        {status === 'low' && !isDisabled && !isSelected && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>}
                      </button>
                    )
                  })}
                </div>
              </div>
              {selectedDay && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-3 fade-in-anim">
                    <p className="text-xs font-bold text-stone-400 uppercase">{t('calendar.entry_time')}</p>
                    {getDayStatus(selectedDay).status === 'critical' && <span className="text-[10px] font-bold text-red-600 flex items-center gap-1 bg-red-100 px-2 py-0.5 rounded-full"><Flame size={10} /> {t('calendar.last_spots')}</span>}
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {times.map((t, index) => {
                      const blocked = isTimeBlocked(t);
                      return (
                        <button key={t} disabled={blocked} onClick={() => !blocked && setTime(t)} style={{ animationDelay: `${index * 30}ms` }} className={`stagger-item py-3 md:py-2 text-xs font-bold rounded border transition-all touch-manipulation ${time === t ? 'bg-[#B8860B] text-white border-[#B8860B]' : blocked ? 'bg-stone-100 text-stone-300 cursor-not-allowed border-transparent decoration-stone-300 line-through' : 'bg-white border-stone-200 text-stone-600 active:scale-95'}`}>{t}</button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div key="step3" className="step-animation space-y-6">
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 mb-6 flex items-center gap-4">
                <div className="bg-white p-2 rounded-lg border border-stone-100 shadow-sm shrink-0"><Calendar size={20} className="text-[#B8860B]" /></div>
                <div><p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{t('summary.title')}</p><p className="font-bold text-sm text-[#1a1a1a]">Dec {selectedDay}, {time}</p><p className="text-xs text-stone-500">{selectedVariant.name}</p></div>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-stone-100">
                <div><p className="font-bold text-[#1a1a1a]">{t('summary.adult')}</p><p className="text-xs text-stone-500">{t('summary.adult_desc')}</p><p className="text-sm font-sans font-bold text-[#B8860B]">€{selectedVariant.price.toFixed(2)}</p></div>
                <div className="flex items-center gap-4"><button onClick={() => setAdults(Math.max(0, adults - 1))} className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center bg-white hover:bg-stone-50 text-[#1a1a1a] transition active:scale-90 touch-manipulation"><Minus size={18} /></button><span className="w-6 text-center font-bold text-lg text-[#1a1a1a]">{adults}</span><button onClick={() => setAdults(adults + 1)} className="w-12 h-12 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center hover:bg-stone-800 transition active:scale-90 touch-manipulation"><Plus size={18} /></button></div>
              </div>
              <div className="flex justify-between items-center">
                <div><p className="font-bold text-[#1a1a1a]">{t('summary.reduced')}</p><p className="text-xs text-stone-500">{t('summary.reduced_desc')}</p><p className="text-sm font-sans font-bold text-[#B8860B]">€{selectedVariant.reduced.toFixed(2)}</p></div>
                <div className="flex items-center gap-4"><button onClick={() => setReduced(Math.max(0, reduced - 1))} className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center bg-white hover:bg-stone-50 text-[#1a1a1a] transition active:scale-90 touch-manipulation"><Minus size={18} /></button><span className="w-6 text-center font-bold text-lg text-[#1a1a1a]">{reduced}</span><button onClick={() => setReduced(reduced + 1)} className="w-12 h-12 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center hover:bg-stone-800 transition active:scale-90 touch-manipulation"><Plus size={18} /></button></div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div key="step4" className="step-animation space-y-4">
              <div className="bg-[#B8860B]/10 p-4 rounded-xl flex gap-3 items-start mb-4 border border-[#B8860B]/20"><AlertCircle size={18} className="text-[#B8860B] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-stone-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw('form.info') }} />
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <User size={18} className={`absolute left-4 top-3.5 transition-colors ${!isNameValid && formData.fullName.length > 0 ? 'text-red-400' : 'text-stone-400'}`} />
                  <input type="text" placeholder={t('form.name_placeholder')} value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className={`w-full bg-stone-50 border rounded-xl py-3 pl-12 pr-4 text-base focus:outline-none focus:ring-2 transition-all text-[#1a1a1a] placeholder:text-stone-400 ${formData.fullName.length > 0 && !isNameValid ? 'border-red-500 focus:ring-red-200 bg-red-50' : 'border-stone-200 focus:ring-[#B8860B]'}`} />
                  {formData.fullName.length > 0 && !isNameValid && <div className="flex items-center gap-1.5 mt-1.5 ml-1 error-anim"><XCircle size={10} className="text-red-500 shrink-0" /><p className="text-[10px] text-red-500 font-bold leading-none">{t('form.validation_name')}</p></div>}
                </div>
                <div className="relative">
                  <Mail size={18} className={`absolute left-4 top-3.5 transition-colors ${!isEmailValid && formData.email.length > 0 ? 'text-red-400' : 'text-stone-400'}`} />
                  <input type="email" placeholder={t('form.email_placeholder')} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`w-full bg-stone-50 border rounded-xl py-3 pl-12 pr-4 text-base focus:outline-none focus:ring-2 transition-all text-[#1a1a1a] placeholder:text-stone-400 ${formData.email.length > 0 && !isEmailValid ? 'border-red-500 focus:ring-red-200 bg-red-50' : 'border-stone-200 focus:ring-[#B8860B]'}`} />
                  {formData.email.length > 0 && !emailRegex.test(formData.email) && <div className="flex items-center gap-1.5 mt-1.5 ml-1 error-anim"><XCircle size={10} className="text-red-500 shrink-0" /><p className="text-[10px] text-red-500 font-bold leading-none">{t('form.validation_email')}</p></div>}
                  {isGmailTypo(formData.email) && <div className="flex items-center gap-1.5 mt-1.5 ml-1 error-anim"><AlertCircle size={10} className="text-red-500 shrink-0" /><p className="text-[10px] text-red-500 font-bold leading-none">{t('form.validation_gmail_typo')}</p></div>}
                </div>
                <div className="relative">
                  <Phone size={18} className={`absolute left-4 top-3.5 transition-colors ${!isPhoneValid && formData.phone.length > 0 ? 'text-red-400' : 'text-stone-400'}`} />
                  <input type="tel" placeholder={t('form.phone_placeholder')} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={`w-full bg-stone-50 border rounded-xl py-3 pl-12 pr-4 text-base focus:outline-none focus:ring-2 transition-all text-[#1a1a1a] placeholder:text-stone-400 ${formData.phone.length > 0 && !isPhoneValid ? 'border-red-500 focus:ring-red-200 bg-red-50' : 'border-stone-200 focus:ring-[#B8860B]'}`} />
                  {formData.phone.length > 0 && !isPhoneValid && <div className="flex items-center gap-1.5 mt-1.5 ml-1 error-anim"><XCircle size={10} className="text-red-500 shrink-0" /><p className="text-[10px] text-red-500 font-bold leading-none">{t('form.validation_phone')}</p></div>}
                </div>
              </div>
              <div className="flex items-center gap-2 justify-center mt-4"><Lock size={12} className="text-stone-400" /><span className="text-[10px] text-stone-400 uppercase tracking-wider">{t('form.security')}</span></div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && clientSecret && (
            <div className="step-animation pb-4">
              <Elements options={{ clientSecret, locale: locale as any, appearance: { theme: 'stripe', variables: { colorPrimary: '#B8860B', fontFamily: 'sans-serif' } } }} stripe={stripePromise}>
                <StripePaymentForm
                  total={total}
                  customerDetails={formData}
                  onSuccess={handlePaymentSuccess}
                  onError={(msg: string) => alert(msg)}
                  isProcessing={isProcessing}
                  setIsProcessing={setIsProcessing}
                />
              </Elements>
            </div>
          )}
        </div>

        {/* FOOTER */}
        {step < 5 && (
          <div className="p-5 md:p-8 border-t border-stone-100 bg-white rounded-b-3xl">

            {/* SZERVER HIBA */}
            {serverError && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-3 error-anim">
                <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                <p className="text-xs text-red-600 font-bold leading-relaxed">
                  {t(`errors.${serverError.code}`, { time: serverError.param || '' })}
                </p>
              </div>
            )}

            <button onClick={handleNext} disabled={isButtonDisabled()} className="w-full bg-[#1a1a1a] text-white h-14 rounded-xl font-bold tracking-wide flex items-center justify-center gap-3 hover:bg-stone-800 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98] text-lg touch-manipulation">
              {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : null} {getButtonText()} {!isSubmitting && <ArrowRight size={20} />}
            </button>
            <div className="mt-5 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-[10px] text-stone-500 uppercase tracking-widest font-medium"><Check size={12} className="text-green-600" /> {t('footer.instant')}</div>
              <div className="flex items-center gap-2 text-[10px] text-stone-500 uppercase tracking-widest font-medium"><Shield size={12} className="text-[#B8860B]" /> {t('footer.cancel')}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}