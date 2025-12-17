'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Itt már szabad használni az ssr: false-t, mert ez egy Client Component ('use client')
const BookingWidget = dynamic(() => import('./BookingWidget'), {
  loading: () => (
    <div className="w-full h-[580px] bg-[#1a1a1a] rounded-3xl flex flex-col items-center justify-center text-stone-500 border border-white/10 shadow-xl">
       <Loader2 size={32} className="animate-spin mb-3 text-[#B8860B]"/>
       <p className="text-[10px] uppercase tracking-widest font-medium opacity-70">Loading Calendar...</p>
    </div>
  ),
  ssr: false
});

export default function BookingWidgetWrapper() {
  return <BookingWidget />;
}