const tickets = [
  {
    id: 1,
    title: "Sagrada Familia Belépő",
    desc: "Soron kívüli belépés + Audio guide",
    price: "33,80 €-tól",
    tag: "Legnépszerűbb"
  },
  {
    id: 2,
    title: "Belépő + Torony",
    desc: "Belépés a bazilikába + Torony látogatás",
    price: "46,80 €-tól",
    tag: "Teljes élmény"
  },
  {
    id: 3,
    title: "Vezetett Túra",
    desc: "Hivatalos idegenvezetővel (90 perc)",
    price: "55,00 €-tól",
    tag: null
  },
  {
    id: 4,
    title: "Privát Túra",
    desc: "Exkluzív élmény saját vezetővel",
    price: "195,00 €-tól",
    tag: "VIP"
  }
];

export default function ProductList() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Válasszon jegytípust</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 flex flex-col">
            {ticket.tag && (
              <div className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 uppercase tracking-wide text-center">
                {ticket.tag}
              </div>
            )}
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{ticket.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{ticket.desc}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-gray-500 text-xs">Ár</p>
                <p className="text-2xl font-bold text-blue-600">{ticket.price}</p>
                <button className="mt-4 w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-2 px-4 rounded transition">
                  Kiválaszt
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}