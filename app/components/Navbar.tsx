import { Menu, Globe } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo helye */}
          <div className="flex-shrink-0 flex items-center">
            <span className="font-bold text-2xl text-gray-800">
              Sagrada<span className="text-blue-600">Tickets</span>
            </span>
          </div>

          {/* Desktop Menü */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Jegyek</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Galéria</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Info</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">GYIK</a>
            <div className="flex items-center space-x-1 text-gray-500 cursor-pointer">
              <Globe size={18} />
              <span>EN</span>
            </div>
          </div>

          {/* Mobil menü gomb */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-500 hover:text-blue-600">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}