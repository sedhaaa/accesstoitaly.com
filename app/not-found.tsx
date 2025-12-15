import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      {/* Nagy 404 szám vagy ikon */}
      <h1 className="text-9xl font-extrabold text-gray-200">404</h1>
      
      <div className="absolute mt-2">
        <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
          Hoppá! Ez az oldal nem található.
        </h2>
      </div>
      
      {/* Leíró szöveg */}
      <p className="mt-8 mb-8 text-gray-600 max-w-md mx-auto">
        Úgy tűnik, olyan linkre kattintottál, ami már nem létezik, vagy elírtad a címet.
      </p>

      {/* Gomb vissza a főoldalra */}
      <Link 
        href="/"
        className="px-8 py-3 font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
      >
        Vissza a főoldalra
      </Link>
    </div>
  )
}