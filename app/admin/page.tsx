'use client';

// 1. Importáld a Suspense-t
import { useEffect, useState, Suspense } from 'react'; 
import { supabase } from '@/lib/supabase';
import { 
  Search, Calendar, Trash2, Plus, Filter, 
  Users, DollarSign, Clock, MapPin, CheckCircle, XCircle, Shield,
  ChevronLeft, ChevronRight, X, Save, Lock, Unlock, LogOut, Key
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
};

type AvailabilityRule = {
  id?: string;
  blocked_date: string;
  is_full_day_blocked: boolean;
  blocked_times: string[];
  ticket_type: string;
};

const STANDARD_TIMES = ["09:00", "09:30", "10:00", "10:30", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

// 2. A régi 'AdminPage' logikáját átnevezzük 'AdminContent'-re
// Ez a komponens tartalmazza az ÖSSZES eddigi logikádat változatlanul
function AdminContent() {
  // Auth State
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Admin UI State
  const [activeTab, setActiveTab] = useState<'orders' | 'availability'>('orders');
  const [loading, setLoading] = useState(true);
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [rules, setRules] = useState<AvailabilityRule[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [editingRule, setEditingRule] = useState<AvailabilityRule>({
    blocked_date: '',
    ticket_type: 'all',
    is_full_day_blocked: false,
    blocked_times: []
  });

  // --- AUTH CHECK ---
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
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPass,
    });
    if (error) setLoginError('Invalid credentials');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // --- DATA FETCHING ---
  const fetchData = async () => {
    setLoading(true);
    const { data: orderData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (orderData) setOrders(orderData);

    const { data: ruleData } = await supabase.from('availability').select('*');
    if (ruleData) setRules(ruleData);
    setLoading(false);
  };

  // --- CALENDAR LOGIC ---
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth);
  
  const changeMonth = (offset: number) => setCurrentDate(new Date(currentYear, currentMonth + offset, 1));

  const handleDayClick = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    
    const existingRule = rules.find(r => r.blocked_date === dateStr);

    if (existingRule) {
        setEditingRule(existingRule);
    } else {
        setEditingRule({
            blocked_date: dateStr,
            ticket_type: 'all',
            is_full_day_blocked: false,
            blocked_times: []
        });
    }
    setIsModalOpen(true);
  };

  const toggleTimeSlot = (time: string) => {
    const currentTimes = editingRule.blocked_times || [];
    if (currentTimes.includes(time)) {
        setEditingRule({ ...editingRule, blocked_times: currentTimes.filter(t => t !== time) });
    } else {
        setEditingRule({ ...editingRule, blocked_times: [...currentTimes, time].sort() });
    }
  };

  const saveRule = async () => {
    if (!editingRule.is_full_day_blocked && editingRule.blocked_times.length === 0) {
        await deleteCurrentRule();
        return;
    }

    const { data: existing } = await supabase.from('availability').select('id').eq('blocked_date', editingRule.blocked_date).single();

    let error;
    if (existing) {
        const { error: err } = await supabase.from('availability').update({
                ticket_type: editingRule.ticket_type,
                is_full_day_blocked: editingRule.is_full_day_blocked,
                blocked_times: editingRule.blocked_times
            }).eq('id', existing.id);
        error = err;
    } else {
        const { error: err } = await supabase.from('availability').insert([editingRule]);
        error = err;
    }

    if (error) alert('Hiba: ' + error.message);
    else {
        setIsModalOpen(false);
        fetchData();
    }
  };

  const deleteCurrentRule = async () => {
    if (!editingRule.blocked_date) return;
    await supabase.from('availability').delete().eq('blocked_date', editingRule.blocked_date);
    setIsModalOpen(false);
    fetchData();
  };

  // --- RENDER LOGIC ---
  if (authLoading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#B8860B]"><div className="animate-spin text-4xl">❖</div></div>;

  if (!session) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
        <style jsx global>{`
            @keyframes fadeInZoom { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
            .anim-login { animation: fadeInZoom 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        `}</style>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] to-[#000000] z-0"></div>
        <div className="bg-[#111]/80 backdrop-blur-xl border border-white/10 p-10 rounded-3xl w-full max-w-md shadow-2xl relative z-10 anim-login">
            <div className="text-center mb-8">
                <Shield className="mx-auto text-[#B8860B] mb-4" size={48} />
                <h1 className="text-3xl font-serif font-bold text-white tracking-widest uppercase">Access<span className="text-[#B8860B]">To</span>Italy</h1>
                <p className="text-xs text-stone-500 mt-2 uppercase tracking-[0.3em]">Restricted Access</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-5">
                <div>
                    <label className="text-xs font-bold text-stone-400 uppercase ml-1">Email Address</label>
                    <div className="relative mt-1">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" size={18}/>
                        <input type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#B8860B] transition-all" placeholder="admin@access.com"/>
                    </div>
                </div>
                <div>
                    <label className="text-xs font-bold text-stone-400 uppercase ml-1">Password</label>
                    <div className="relative mt-1">
                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" size={18}/>
                        <input type="password" required value={loginPass} onChange={(e) => setLoginPass(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#B8860B] transition-all" placeholder="••••••••"/>
                    </div>
                </div>
                {loginError && <p className="text-red-500 text-xs text-center">{loginError}</p>}
                <button type="submit" className="w-full bg-gradient-to-r from-[#B8860B] to-[#9a7009] text-white font-bold py-4 rounded-xl uppercase tracking-wider shadow-lg hover:shadow-[#B8860B]/20 transition-all active:scale-[0.98]">
                    Enter Dashboard
                </button>
            </form>
        </div>
      </div>
    );
  }

  // --- A Dashboard UI ---
  return (
    <>
    <style jsx global>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .anim-up { animation: slideUp 0.5s ease-out forwards; }
        .anim-fade { animation: fadeIn 0.4s ease-out forwards; }
        .anim-right { animation: slideRight 0.4s ease-out forwards; }
    `}</style>
    <div className="min-h-screen bg-[#050505] text-stone-200 font-sans selection:bg-[#B8860B] selection:text-white pb-20">
      <header className="bg-[#111]/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/5 px-6 py-4 flex justify-between items-center shadow-2xl">
        <div className="flex items-center gap-3">
            <Shield className="text-[#B8860B]" size={28}/>
            <h1 className="text-xl md:text-2xl font-serif font-bold tracking-wider text-white">
                Admin<span className="text-[#B8860B]">Vezérlő</span>
            </h1>
        </div>
        <div className="flex items-center gap-4">
            <div className="hidden md:flex bg-black/40 p-1 rounded-lg border border-white/10">
                <button onClick={() => setActiveTab('orders')} className={`px-6 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'orders' ? 'bg-[#B8860B] text-white shadow-lg' : 'text-stone-500 hover:text-white'}`}>Rendelések</button>
                <button onClick={() => setActiveTab('availability')} className={`px-6 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'availability' ? 'bg-[#B8860B] text-white shadow-lg' : 'text-stone-500 hover:text-white'}`}>Elérhetőség</button>
            </div>
            <button onClick={handleLogout} className="p-2 text-stone-500 hover:text-red-500 transition"><LogOut size={20}/></button>
        </div>
      </header>
      <div className="md:hidden px-6 mt-4">
        <div className="flex bg-black/40 p-1 rounded-lg border border-white/10 w-full">
            <button onClick={() => setActiveTab('orders')} className={`flex-1 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'orders' ? 'bg-[#B8860B] text-white' : 'text-stone-500'}`}>Rendelések</button>
            <button onClick={() => setActiveTab('availability')} className={`flex-1 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'availability' ? 'bg-[#B8860B] text-white' : 'text-stone-500'}`}>Naptár</button>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-6 mt-8">
        {activeTab === 'orders' && (
            <div className="space-y-6 anim-up">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex gap-4">
                        <div className="bg-[#111] p-4 rounded-xl border border-white/10 w-full md:w-40 shadow-lg">
                            <p className="text-[10px] text-stone-500 uppercase font-bold">Összes Rendelés</p>
                            <p className="text-2xl font-serif text-white">{orders.length}</p>
                        </div>
                        <div className="bg-[#111] p-4 rounded-xl border border-white/10 w-full md:w-40 shadow-lg">
                            <p className="text-[10px] text-stone-500 uppercase font-bold">Összbevétel</p>
                            <p className="text-2xl font-serif text-[#B8860B]">€{orders.reduce((acc, o) => acc + o.total_price, 0)}</p>
                        </div>
                    </div>
                    <div className="relative flex-grow max-w-md">
                        <div className="w-full bg-[#111] border border-white/10 rounded-xl flex items-center px-4 py-3 shadow-lg focus-within:border-[#B8860B] transition-all">
                            <Search className="text-stone-500 mr-3 flex-shrink-0" size={20}/>
                            <input type="text" placeholder="Keresés név, email vagy telefon alapján..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-white w-full placeholder:text-stone-600"/>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {orders.filter(o => o.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) || o.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) || o.customer_phone.includes(searchQuery)).map((order) => (
                        <div key={order.id} className="bg-[#111] hover:bg-[#161616] transition-all p-6 rounded-xl border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-md hover:shadow-xl hover:border-white/10 group">
                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${order.status === 'paid' ? 'bg-green-500' : 'bg-[#B8860B]'}`}></div>
                            <div className="flex-grow space-y-1">
                                <div className="flex items-center gap-3"><h3 className="text-xl font-bold text-white">{order.customer_name}</h3><span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide border ${order.status === 'paid' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>{order.status === 'pending' ? 'Függőben' : 'Fizetve'}</span></div>
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-xs text-stone-400"><span className="flex items-center gap-1"><Users size={14}/> {order.customer_email}</span><span className="flex items-center gap-1"><DollarSign size={14}/> {order.customer_phone}</span></div>
                            </div>
                            <div className="flex w-full md:w-auto justify-between md:justify-end items-center gap-8">
                                <div className="text-center md:text-right"><p className="text-[10px] text-stone-500 uppercase font-bold">Dátum</p><p className="text-white font-serif text-lg">{order.visit_date}</p><p className="text-[#B8860B] text-xs font-bold">{order.visit_time}</p></div>
                                <div className="text-right"><p className="text-[10px] text-stone-500 uppercase font-bold">Összeg</p><p className="text-2xl font-bold text-white">€{order.total_price}</p></div>
                            </div>
                        </div>
                    ))}
                    {orders.length === 0 && <div className="text-center py-20 text-stone-600">Nincs megjeleníthető rendelés.</div>}
                </div>
            </div>
        )}
        {activeTab === 'availability' && (
            <div className="anim-right max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8 bg-[#111] p-4 rounded-xl border border-white/10 shadow-lg">
                    <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-white/10 rounded-full transition text-white"><ChevronLeft size={24}/></button>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-[#B8860B] uppercase tracking-widest">{currentDate.toLocaleDateString('hu-HU', { month: 'long', year: 'numeric' })}</h2>
                    <button onClick={() => changeMonth(1)} className="p-2 hover:bg-white/10 rounded-full transition text-white"><ChevronRight size={24}/></button>
                </div>
                <div className="grid grid-cols-7 gap-3 mb-2 text-center">{['H','K','Sze','Cs','P','Szo','V'].map(d => <div key={d} className="text-xs font-bold text-stone-500 uppercase tracking-wider">{d}</div>)}</div>
                <div className="grid grid-cols-7 gap-2 md:gap-3">
                    {[...Array(firstDayIndex)].map((_, i) => <div key={`empty-${i}`} className="aspect-square"></div>)}
                    {[...Array(daysInMonth)].map((_, i) => {
                        const day = i + 1;
                        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const rule = rules.find(r => r.blocked_date === dateStr);
                        let bgClass = "bg-[#111] border-white/10 text-stone-300 hover:border-[#B8860B] hover:text-white";
                        let icon = null;
                        if (rule) {
                            if (rule.is_full_day_blocked) { bgClass = "bg-red-900/20 border-red-500/40 text-red-400 hover:bg-red-900/40"; icon = <Lock size={14} className="mb-1"/>; } 
                            else { bgClass = "bg-yellow-900/20 border-yellow-500/40 text-yellow-400 hover:bg-yellow-900/40"; icon = <Clock size={14} className="mb-1"/>; }
                        }
                        return (
                            <button key={day} onClick={() => handleDayClick(day)} className={`aspect-square rounded-xl border flex flex-col items-center justify-center transition-all duration-200 relative group ${bgClass}`}>
                                {icon}<span className="text-lg font-bold">{day}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        )}
      </main>
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm anim-fade">
            <div className="bg-[#111] w-full max-w-lg rounded-2xl border border-[#B8860B]/30 shadow-[0_0_50px_rgba(184,134,11,0.15)] p-6 relative anim-up">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-stone-500 hover:text-white transition"><X size={24}/></button>
                <h3 className="text-xl font-serif font-bold text-white mb-1">Elérhetőség Kezelése</h3>
                <p className="text-sm text-[#B8860B] mb-6 font-bold uppercase tracking-wider">{selectedDate}</p>
                <div className="space-y-6">
                    <div className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-3">
                            {editingRule.is_full_day_blocked ? <Lock className="text-red-500"/> : <Unlock className="text-green-500"/>}
                            <div><p className="text-sm font-bold text-white">Teljes Nap Lezárása</p><p className="text-xs text-stone-500">Nincs foglalás ezen a napon</p></div>
                        </div>
                        <input type="checkbox" className="w-5 h-5 accent-[#B8860B] cursor-pointer" checked={editingRule.is_full_day_blocked} onChange={(e) => setEditingRule({...editingRule, is_full_day_blocked: e.target.checked})}/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-stone-400 uppercase">Érintett Termék</label>
                        <select value={editingRule.ticket_type} onChange={(e) => setEditingRule({...editingRule, ticket_type: e.target.value})} className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#B8860B] focus:outline-none appearance-none">
                            <option value="all">MINDEN Termék (Teljes Zárás)</option>
                            <option value="lift">Csak Liftes Jegy</option>
                            <option value="stairs">Csak Lépcsős Jegy</option>
                            <option value="duomo">Csak Dóm Belépő</option>
                        </select>
                    </div>
                    <div className={`space-y-2 transition-opacity duration-300 ${editingRule.is_full_day_blocked ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                        <label className="text-xs font-bold text-stone-400 uppercase">Lezárt Idősávok</label>
                        <div className="grid grid-cols-4 gap-2">
                            {STANDARD_TIMES.map(time => {
                                const isBlocked = editingRule.blocked_times?.includes(time);
                                return (
                                    <button key={time} onClick={() => toggleTimeSlot(time)} className={`py-2 text-xs font-bold rounded-lg border transition-all duration-200 ${isBlocked ? 'bg-red-500/20 text-red-500 border-red-500/50' : 'bg-black/30 text-stone-400 border-white/10 hover:border-[#B8860B] hover:text-white'}`}>{time}</button>
                                )
                            })}
                        </div>
                        <p className="text-[10px] text-stone-500 text-center mt-2">Kattints az időpontra a lezáráshoz/feloldáshoz.</p>
                    </div>
                    <div className="flex gap-3 pt-4 border-t border-white/10">
                        <button onClick={deleteCurrentRule} className="flex-1 bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10 py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition flex items-center justify-center gap-2"><Trash2 size={16}/> Törlés</button>
                        <button onClick={saveRule} className="flex-[2] bg-[#B8860B] hover:bg-[#9a7009] text-white py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition shadow-lg flex items-center justify-center gap-2"><Save size={16}/> Mentés</button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
    </>
  );
}

// 3. EZ AZ ÚJ EXPORT! 
// Ez becsomagolja a fenti logikát egy Suspense-be, hogy a Next.js ne panaszkodjon
export default function AdminPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#B8860B]">
        <div className="animate-spin text-4xl">❖</div>
      </div>
    }>
      <AdminContent />
    </Suspense>
  );
}