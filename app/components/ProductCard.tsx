import { Check } from 'lucide-react';

interface ProductProps {
  title: string;
  price: string;
  features: string[];
  image: string;
  badge?: string;
  ctaText?: string;
}

export default function ProductCard({ title, price, features, image, badge, ctaText = "Jegy kiválasztása" }: ProductProps) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
      {/* Kép konténer */}
      <div className="relative h-48 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url('${image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        {badge && (
          <span className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
            {badge}
          </span>
        )}
        <div className="absolute bottom-3 left-3 text-white">
          <p className="text-xs font-medium opacity-90">Kezdő ár</p>
          <p className="text-2xl font-serif font-bold">{price}</p>
        </div>
      </div>

      {/* Tartalom */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-serif text-xl font-bold text-gray-900 mb-4 line-clamp-2">{title}</h3>
        
        <ul className="space-y-3 mb-6 flex-grow">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button className="w-full bg-white border-2 border-orange-600 text-orange-600 font-bold py-3 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-colors">
          {ctaText}
        </button>
      </div>
    </div>
  );
}