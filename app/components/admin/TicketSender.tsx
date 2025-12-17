'use client'

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { sendTicketEmailAction } from '@/app/actions/send-tickets';
import { OrderDetails } from '@/lib/email-templates';
import { Mail, Upload, X, Check, Loader2, FileText, Layers } from 'lucide-react';

// ÚJ PROP: onSuccess
export default function TicketSender({ order, onSuccess }: { order: OrderDetails, onSuccess?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [fileCount, setFileCount] = useState<number>(0); // Darabszámot figyelünk
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileCount(files.length);
    } else {
      setFileCount(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await sendTicketEmailAction(formData, order);

    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      formRef.current?.reset();
      setFileCount(0);
      
      // Callback hívása, hogy az admin oldal frissüljön
      if (onSuccess) onSuccess();

      setTimeout(() => { setIsOpen(false); setMessage(null); }, 2000);
    } else {
      setMessage({ type: 'error', text: result.message });
    }
    
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full mt-3 py-2 bg-[#B8860B]/20 hover:bg-[#B8860B] text-[#B8860B] hover:text-white border border-[#B8860B]/50 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
      >
        <Mail size={14} /> Jegyek Küldése
      </button>

      {isOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#111] w-full max-w-md rounded-2xl border border-[#B8860B]/30 shadow-2xl p-6 relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-stone-500 hover:text-white transition">
                <X size={20}/>
            </button>
            
            <h3 className="text-lg font-serif font-bold text-white mb-1">Jegyek Csatolása</h3>
            <p className="text-xs text-stone-400 mb-6">Címzett: <span className="text-[#B8860B]">{order.customerEmail}</span></p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              
              <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors group cursor-pointer relative ${fileCount > 0 ? 'border-[#B8860B] bg-[#B8860B]/10' : 'border-white/10 hover:bg-white/5 hover:border-[#B8860B]/50'}`}>
                <input 
                  type="file" 
                  name="ticketFiles" // Többesszám a névben
                  accept=".pdf" 
                  multiple // TÖBB FÁJL ENGEDÉLYEZÉSE
                  required 
                  onChange={handleFileChange} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="flex flex-col items-center gap-2 text-stone-500 group-hover:text-stone-300">
                    {fileCount > 0 ? (
                        <>
                            <div className="relative">
                                <FileText size={32} className="text-[#B8860B]" />
                                {fileCount > 1 && (
                                    <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {fileCount}
                                    </span>
                                )}
                            </div>
                            <span className="text-sm font-bold text-white">{fileCount} fájl kiválasztva</span>
                            <span className="text-[10px] uppercase text-[#B8860B]">Kattints a módosításhoz</span>
                        </>
                    ) : (
                        <>
                            <Layers size={24} className="group-hover:text-[#B8860B] transition-colors"/>
                            <span className="text-xs font-bold uppercase tracking-wide">Válassz ki egy vagy több PDF-et</span>
                        </>
                    )}
                </div>
              </div>

              {message && (
                <div className={`text-xs p-3 rounded border flex items-center gap-2 ${message.type === 'success' ? 'bg-green-900/20 border-green-500/30 text-green-400' : 'bg-red-900/20 border-red-500/30 text-red-400'}`}>
                  {message.type === 'success' && <Check size={14}/>}
                  {message.text}
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#B8860B] hover:bg-[#9a7009] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition shadow-lg flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin"/> : <Mail size={16}/>}
                  {isLoading ? 'Küldés...' : 'Email Küldése'}
                </button>
              </div>

            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}