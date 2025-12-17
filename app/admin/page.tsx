'use client';

import { useEffect, useState, Suspense, useMemo, useCallback } from 'react'; 
import { supabase } from '@/lib/supabase';
import TicketSender from '../components/admin/TicketSender';

import { 
  Search, Trash2, Users, Clock, Lock, Unlock, LogOut, Key,
  ChevronLeft, ChevronRight, X, Save, Shield,
  CalendarCheck, CalendarClock, Phone, Mail, CreditCard, Ticket, CheckCircle, 
  MailCheck, AlertCircle 
} from 'lucide-react';

// --- TÍPUSOK ---
type Order = {
  id: string;
  created_at: string;
  ticket_type: string;
  visit_date: string;
  visit_time: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_price: number;
  quantity_adult: number;
  quantity_reduced: number;
  status: string;
  language?: string;
  tickets_sent?: boolean;
};

type AvailabilityRule = {
  id?: string;
  blocked_date: string;
  is_full_day_blocked: boolean;
  blocked_times: string[];
  ticket_type: string;
};

const STANDARD_TIMES = ["09:00", "09:30", "10:00", "10:30", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

// --- SEGÉDFÜGGVÉNYEK ---
const formatDateTime = (isoString: string) => {
    return new Date(isoString).toLocaleString('hu-HU', { 
        year: 'numeric', month: 'short', day: 'numeric', 
        hour: '2-digit', minute: '2-digit' 
    });
};

// JAVÍTÁS: EGYSÉGES TÍPUS KEZELÉS (Megszüntetjük a kavarodást a kijelzésben)
const getTicketDetails = (type: string) => {
    const t = type?.toLowerCase() || '';
    
    // Ha bármi "lift" vagy "combo", ugyanazt a szép arany címkét kapja
    if (t.includes('lift')) {
         return { label: 'COMBO: Lift & Terraces + Cathedral', color: 'text-amber-400 border-amber-400/30 bg-amber-400/10' };
    }
    
    switch(t) {
        case 'stairs': 
            return { label: 'COMBO: Stairs & Terraces + Cathedral', color: 'text-blue-400 border-blue-400/30 bg-blue-400/10' };
        case 'duomo': 
            return { label: 'Duomo Cathedral Only', color: 'text-stone-400 border-stone-400/30 bg-stone-400/10' };
        default: 
            return { label: type.toUpperCase(), color: 'text-white border-white/20 bg-white/5' };
    }
};

function AdminContent() {
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'availability'>('orders');
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [rules, setRules] = useState<AvailabilityRule[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<AvailabilityRule>({
    blocked_date: '', ticket_type: 'all', is_full_day_blocked: false, blocked_times: []
  });

  // --- ADAT LEKÉRÉS + DUPLIKÁCIÓ SZŰRÉS ---
  const fetchData = useCallback(async () => {
    setLoading(true);
    
    // Lekérünk mindent (hogy a teszt üzemmódú "pending" rendelések is látsszanak)
    const { data: orderData } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(300);

    if (orderData) {
        // JAVÍTÁS: Kiszűrjük a dupla adatbázis bejegyzést
        const cleanOrders = orderData.filter((order, index, self) => {
            // Megkeressük, van-e másik bejegyzés ugyanezzel az emaillel, napon, órában
            const isDuplicate = self.findIndex(o => 
                o.customer_email === order.customer_email && 
                o.visit_date === order.visit_date && 
                o.visit_time === order.visit_time &&
                o.created_at.split(':')[0] === order.created_at.split(':')[0] // egy órán belüli bejegyzés
            );
            // Csak az első találatot hagyjuk meg (így ha bejött egy 'lift' és egy 'combo lift', csak egy marad)
            return isDuplicate === index;
        });
        setOrders(cleanOrders);
    }

    const { data: ruleData } = await supabase.from('availability').select('*');
    if (ruleData) setRules(ruleData);
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
      if (session) fetchData();
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchData();
    });
    return () => subscription.unsubscribe();
  }, [fetchData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPass });
    if (error) setLoginError('Érvénytelen adatok');
  };

  const handleLogout = async () => { await supabase.auth.signOut(); };

  // Optimista frissítés jegyküldés után
  const handleTicketSuccess = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, tickets_sent: true } : o));
    fetchData(); // Frissítés a háttérben
  };

  const filteredOrders = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return orders.filter(o => o.customer_name.toLowerCase().includes(q) || o.customer_email.toLowerCase().includes(q));
  }, [orders, searchQuery]);

  const totalRevenue = useMemo(() => orders.reduce((acc, o) => acc + o.total_price, 0), [orders]);

  // Naptár logika (rövidítve a helytakarékosság miatt)
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay() === 0 ? 6 : new Date(currentYear, currentMonth, 1).getDay() - 1;
  const changeMonth = (offset: number) => setCurrentDate(new Date(currentYear, currentMonth + offset, 1));

  const handleDayClick = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    const rule = rules.find(r => r.blocked_date === dateStr);
    setEditingRule(rule || { blocked_date: dateStr, ticket_type: 'all', is_full_day_blocked: false, blocked_times: [] });
    setIsModalOpen(true);
  };

  const saveRule = async () => {
    const { data: existing } = await supabase.from('availability').select('id').eq('blocked_date', editingRule.blocked_date).single();
    if (existing) await supabase.from('availability').update(editingRule).eq('id', existing.id);
    else await supabase.from('availability').insert([editingRule]);
    setIsModalOpen(false);
    fetchData();
  };

  if (authLoading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#B8860B]"><div className="animate-spin text-4xl">❖</div></div>;

  if (!session) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <div className="bg-[#111]/80 backdrop-blur-xl border border-white/10 p-10 rounded-3xl w-full max-w-md shadow-2xl">
            <div className="text-center mb-8">
                <Shield className="mx-auto text-[#B8860B] mb-4" size={48} />
                <h1 className="text-3xl font-serif font-bold text-white uppercase tracking-widest">Access<span className="text-[#B8860B]">To</span>Italy</h1>
            </div>
            <form onSubmit={handleLogin} className="space-y-5">
                <input type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-[#B8860B]" placeholder="Admin Email"/>
                <input type="password" required value={loginPass} onChange={(e) => setLoginPass(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-[#B8860B]" placeholder="Jelszó"/>
                {loginError && <p className="text-red-500 text-xs text-center">{loginError}</p>}
                <button type="submit" className="w-full bg-[#B8860B] text-white font-bold py-4 rounded-xl uppercase tracking-wider hover:bg-[#9a7009] transition-all">Belépés</button>
            </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-stone-200 pb-20">
      <header className="bg-[#111]/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <Shield className="text-[#B8860B]" size={28}/>
            <h1 className="text-xl font-serif font-bold text-white">Admin<span className="text-[#B8860B]">Vezérlő</span></h1>
        </div>
        <div className="flex gap-4 items-center">
            <div className="hidden md:flex bg-black/40 p-1 rounded-lg border border-white/10">
                <button onClick={() => setActiveTab('orders')} className={`px-6 py-2 rounded-md text-xs font-bold ${activeTab === 'orders' ? 'bg-[#B8860B] text-white' : 'text-stone-500'}`}>Rendelések</button>
                <button onClick={() => setActiveTab('availability')} className={`px-6 py-2 rounded-md text-xs font-bold ${activeTab === 'availability' ? 'bg-[#B8860B] text-white' : 'text-stone-500'}`}>Naptár</button>
            </div>
            <button onClick={handleLogout} className="text-stone-500 hover:text-red-500 transition"><LogOut size={20}/></button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-8">
        {activeTab === 'orders' && (
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex gap-4">
                        <div className="bg-[#111] p-4 rounded-xl border border-white/10 min-w-[120px]">
                            <p className="text-[10px] text-stone-500 uppercase font-bold">Összes</p>
                            <p className="text-2xl font-serif text-white">{orders.length}</p>
                        </div>
                        <div className="bg-[#111] p-4 rounded-xl border border-white/10 min-w-[120px]">
                            <p className="text-[10px] text-stone-500 uppercase font-bold">Bevétel</p>
                            <p className="text-2xl font-serif text-[#B8860B]">€{totalRevenue.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="relative flex-grow max-w-md">
                        <div className="w-full bg-[#111] border border-white/10 rounded-xl flex items-center px-4 py-3 shadow-lg focus-within:border-[#B8860B]">
                            <Search className="text-stone-500 mr-3" size={20}/>
                            <input type="text" placeholder="Keresés..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-white w-full"/>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {filteredOrders.map((order) => {
                        const ticketDetails = getTicketDetails(order.ticket_type);
                        return (
                            <div key={order.id} className="bg-[#111] rounded-xl border border-white/5 overflow-hidden shadow-md relative group">
                                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${order.status === 'paid' ? 'bg-green-500' : 'bg-amber-600'}`}></div>
                                <div className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.02] border-b border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center text-[#B8860B] font-serif font-bold text-xl">{order.customer_name.charAt(0)}</div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">{order.customer_name}</h3>
                                            <div className="flex flex-wrap items-center gap-2 mt-1">
                                                <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${order.status === 'paid' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                                                    {order.status === 'paid' ? 'FIZETVE' : `STÁTUSZ: ${order.status.toUpperCase()}`}
                                                </span>
                                                {order.tickets_sent ? (
                                                    <span className="text-[10px] px-2 py-0.5 rounded font-bold border bg-blue-500/10 text-blue-400 border-blue-500/30 flex items-center gap-1">
                                                        <MailCheck size={10} /> JEGYEK KIKÜLDVE
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] px-2 py-0.5 rounded font-bold border bg-stone-500/10 text-stone-500 border-stone-500/30 flex items-center gap-1">
                                                        <AlertCircle size={10} /> KIKÜLDÉSRE VÁR
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-[#B8860B]">€{order.total_price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Időpont</p>
                                        <p className="text-white font-bold">{order.visit_date}</p>
                                        <p className="text-[#B8860B] font-bold">{order.visit_time}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Jegy</p>
                                        <div className={`p-2 rounded text-[11px] font-bold border ${ticketDetails.color}`}>{ticketDetails.label}</div>
                                        <p className="text-xs text-stone-400">{order.quantity_adult} Felnőtt, {order.quantity_reduced} Kedvezményes</p>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-xs text-stone-300"><Mail size={12}/> {order.customer_email}</div>
                                        <div className="flex items-center gap-2 text-xs text-stone-300"><Phone size={12}/> {order.customer_phone}</div>
                                        <TicketSender 
                                            order={{
                                                orderId: order.id, customerName: order.customer_name, customerEmail: order.customer_email,
                                                customerPhone: order.customer_phone, ticketType: order.ticket_type, date: order.visit_date,
                                                time: order.visit_time, adults: order.quantity_adult, reduced: order.quantity_reduced,
                                                total: order.total_price, language: order.language
                                            }}
                                            onSuccess={() => handleTicketSuccess(order.id)}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )}

        {activeTab === 'availability' && (
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6 bg-[#111] p-4 rounded-xl border border-white/10">
                    <button onClick={() => changeMonth(-1)} className="text-white"><ChevronLeft/></button>
                    <h2 className="text-lg font-bold text-[#B8860B] uppercase tracking-widest">{currentDate.toLocaleDateString('hu-HU', { month: 'long', year: 'numeric' })}</h2>
                    <button onClick={() => changeMonth(1)} className="text-white"><ChevronRight/></button>
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {[...Array(firstDayIndex)].map((_, i) => <div key={i}></div>)}
                    {[...Array(daysInMonth)].map((_, i) => {
                        const day = i + 1;
                        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const rule = rules.find(r => r.blocked_date === dateStr);
                        return (
                            <button key={day} onClick={() => handleDayClick(day)} className={`aspect-square rounded-lg border flex flex-col items-center justify-center transition-all ${rule ? (rule.is_full_day_blocked ? 'bg-red-900/20 border-red-500/50 text-red-400' : 'bg-amber-900/20 border-amber-500/50 text-amber-400') : 'bg-[#111] border-white/10 text-stone-400'}`}>
                                <span className="text-sm font-bold">{day}</span>
                                {rule && <Lock size={10}/>}
                            </button>
                        );
                    })}
                </div>
            </div>
        )}
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#111] w-full max-w-lg rounded-2xl border border-[#B8860B]/30 p-6 relative">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-stone-500"><X/></button>
                <h3 className="text-xl font-bold text-white mb-4">Nap kezelése: {selectedDate}</h3>
                <div className="space-y-4">
                    <label className="flex items-center gap-3 bg-black/40 p-4 rounded-xl border border-white/5 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 accent-[#B8860B]" checked={editingRule.is_full_day_blocked} onChange={(e) => setEditingRule({...editingRule, is_full_day_blocked: e.target.checked})}/>
                        <span className="text-sm font-bold text-white">Egész nap lezárása</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                        {STANDARD_TIMES.map(time => (
                            <button key={time} onClick={() => {
                                const times = editingRule.blocked_times || [];
                                const newTimes = times.includes(time) ? times.filter(t => t !== time) : [...times, time].sort();
                                setEditingRule({...editingRule, blocked_times: newTimes});
                            }} className={`py-2 text-[10px] font-bold rounded border ${editingRule.blocked_times?.includes(time) ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-black text-stone-500 border-white/10'}`}>
                                {time}
                            </button>
                        ))}
                    </div>
                    <button onClick={saveRule} className="w-full bg-[#B8860B] text-white py-3 rounded-xl font-bold uppercase tracking-wider shadow-lg">Mentés</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  return ( <Suspense fallback={<div>Loading...</div>}><AdminContent /></Suspense> );
}