import { Calendar, Users, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative bg-gray-900 h-[600px] flex items-center">
      {/* Háttérkép (Placeholderrel helyettesítve) */}
      <div 
        className="absolute inset-0 z-0 opacity-60 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544983808-1600b3e55106?q=80&w=2070&auto=format&fit=crop")' }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-4 w-full z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Bal oldali szöveg (opcionális, mobilon látszik jobban) */}
        <div className="hidden md:block text-white">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Sagrada Família</h1>
          <p className="text-xl drop-shadow-md">Foglalja le hivatalos belépőjegyét sorban állás nélkül.</p>
        </div>

        {/* Jobb oldali foglalási doboz (A weboldal lelke) */}
        <div className="bg-white rounded-lg shadow-2xl p-6 md:w-[450px] md:ml-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Jegyfoglalás</h2>
          
          <div className="space-y-4">
            {/* Dátumválasztó Mock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Válasszon dátumot</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input type="text" className="block w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="2025. december 12." />
              </div>
            </div>

            {/* Jegyek száma Mock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Látogatók száma</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <select className="block w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>1 Felnőtt</option>
                  <option>2 Felnőtt</option>
                  <option>Family Pack</option>
                </select>
              </div>
            </div>

            {/* Keresés gomb */}
            <button className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-200">
              Jegyek keresése <ArrowRight className="ml-2 h-5 w-5" />
            </button>

            <p className="text-xs text-center text-gray-500 mt-2">
              A legjobb ár garancia. Biztonságos fizetés.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}