'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  { question: "Kell nyomtatnom a jegyeket?", answer: "Nem, a jegyek 100%-ban digitálisak. A kapott QR-kódot bemutathatja okostelefonján a bejáratnál." },
  { question: "Van öltözködési szabály (Dress Code)?", answer: "Igen. A Sagrada Família egy templom. A vállakat és a térdeket fedni kell. Ujjatlan póló és rövidnadrág viselése esetén a belépést megtagadhatják." },
  { question: "Mit tartalmaz az Audio Guide?", answer: "Az audio guide elérhető magyar nyelven is (alkalmazáson keresztül), és végigvezeti Önt a bazilika történetén, az építészeti részleteken és Gaudí szimbolikáján." },
  { question: "Lemondhatom a foglalást?", answer: "A jegyek névre szólóak és az időpontok fixek, ezért a hivatalos szabályzat szerint általában nem visszatéríthetők. Kérjük, válassza a Flexi opciót a pénztárnál a rugalmasságért." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#F5F0E6] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-center font-bold text-gray-800 mb-2">Gyakori Kérdések</h2>
        <p className="text-center text-gray-600 mb-10">Minden, amit tudnia kell a látogatás előtt.</p>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-orange-100 overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-gray-800">{faq.question}</span>
                {openIndex === index ? <ChevronUp className="text-orange-500"/> : <ChevronDown className="text-gray-400"/>}
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100 p-5 pt-0' : 'max-h-0 opacity-0 overflow-hidden'}`}
              >
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}