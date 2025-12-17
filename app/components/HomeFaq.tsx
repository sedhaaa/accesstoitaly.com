'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

// Meghatározzuk, hogy milyen adatokat várunk a szülőtől (page.tsx)
interface FaqItem {
  question: string;
  answer: string;
}

interface HomeFaqProps {
  faqs: FaqItem[];
}

export default function HomeFaq({ faqs }: HomeFaqProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-4 border-t border-gray-200 pt-8">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-gray-200 pb-4">
            <button 
                onClick={() => toggleFaq(index)}
                aria-expanded={openFaq === index}
                className="w-full flex justify-between items-center text-left py-2 hover:text-[#B8860B] transition focus:outline-none focus:text-[#B8860B]"
            >
                {/* Itt jelenítjük meg a kapott (már lefordított) kérdést */}
                <span className="font-bold text-base md:text-lg text-[#1a1a1a] pr-4">{faq.question}</span>
                
                {/* Ikon csere állapot szerint */}
                {openFaq === index ? (
                    <Minus size={18} className="text-[#B8860B] flex-shrink-0" aria-hidden="true"/> 
                ) : (
                    <Plus size={18} className="text-gray-400 flex-shrink-0" aria-hidden="true"/>
                )}
            </button>
            
            {/* Animált lenyíló rész */}
            <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                {/* Itt jelenítjük meg a kapott (már lefordított) választ */}
                <p className="text-[#1a1a1a]/70 font-light leading-relaxed text-sm md:text-base">{faq.answer}</p>
            </div>
        </div>
      ))}
    </div>
  );
}