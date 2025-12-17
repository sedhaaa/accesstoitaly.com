'use client';

interface TicketSelectButtonProps {
  ticketId: string;
  label: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function TicketSelectButton({ ticketId, label, className, variant = 'primary' }: TicketSelectButtonProps) {
  const handleClick = () => {
    // 1. Üzenet küldése a naptárnak
    const event = new CustomEvent('select-ticket-variant', { detail: ticketId });
    window.dispatchEvent(event);

    // 2. GÖRGETÉS KIS KÉSLELTETÉSSEL (Hogy a UI frissüljön előtte)
    setTimeout(() => {
        const element = document.getElementById('booking-widget-anchor');
        
        if (element) {
            // A modern 'scrollIntoView' sokkal stabilabb mobilon
            element.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' // A tetejére igazítjuk
            });
        } else {
            // Vészmegoldás: fel a legtetejére
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, 100); // 0.1 másodperc késleltetés pont elég
  };

  const baseClass = "block w-full text-center py-3 rounded-xl font-bold text-sm transition touch-manipulation cursor-pointer";
  const primaryClass = "bg-[#B8860B] text-white hover:bg-[#9a7009] shadow-lg active:scale-[0.98]";
  const secondaryClass = "border border-stone-300 text-[#1a1a1a] hover:bg-stone-50 active:scale-[0.98]";

  return (
    <button 
      onClick={handleClick}
      className={`${baseClass} ${variant === 'primary' ? primaryClass : secondaryClass} ${className || ''}`}
    >
      {label}
    </button>
  );
}