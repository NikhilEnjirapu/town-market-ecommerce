const featuredDeals = [
  {
    title: 'Breakfast Staples',
    description: 'Butters, cereals, spreads and fresh breads',
    discount: 'Up to 25% off',
    image: 'https://images.pexels.com/photos/3653747/pexels-photo-3653747.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Gourmet Snacks',
    description: 'Artisan crisps, dips, nuts and chocolates',
    discount: 'Flat ₹200 off on combos',
    image: 'https://images.pexels.com/photos/271715/pexels-photo-271715.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Hydrate & Glow',
    description: 'Cold-pressed juices, vitamin waters & teas',
    discount: 'Buy 2 get 1 free',
    image: 'https://images.pexels.com/photos/414262/pexels-photo-414262.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function FeaturedDeals() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Handpicked</p>
          <h2 className="text-3xl font-bold text-gray-900">Featured deals of the week</h2>
        </div>
        <button className="text-sm font-semibold text-gray-900 border-b border-gray-900 hover:opacity-70">
          View all offers
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredDeals.map((deal) => (
          <div
            key={deal.title}
            className="rounded-3xl overflow-hidden bg-gray-900 text-white"
          >
            <div className="h-52 overflow-hidden">
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-3">
              <span className="inline-flex text-xs uppercase tracking-widest text-gray-300">
                {deal.discount}
              </span>
              <h3 className="text-2xl font-semibold">{deal.title}</h3>
              <p className="text-sm text-gray-200">{deal.description}</p>
              <button className="inline-flex items-center text-sm font-semibold text-white/90">
                Shop collection
                <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
