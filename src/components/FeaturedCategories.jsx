import { ArrowRight, Sparkles, Clock, Tag } from 'lucide-react';

const featuredCategories = [
  {
    title: 'Breakfast Staples',
    description: 'Butters, cereals, spreads and fresh breads',
    image: 'https://images.pexels.com/photos/3653747/pexels-photo-3653747.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Up to 25% off',
    color: 'green'
  },
  {
    title: 'Gourmet Snacks',
    description: 'Artisan crisps, dips, nuts and chocolates',
    image: 'https://images.pexels.com/photos/271715/pexels-photo-271715.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Flat ₹200 off on combos',
    color: 'blue'
  },
  {
    title: 'Hydrate & Glow',
    description: 'Cold-pressed juices, vitamin waters & teas',
    image: 'https://images.pexels.com/photos/414262/pexels-photo-414262.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Buy 2 get 1 free',
    color: 'orange'
  }
];

export default function FeaturedCategories() {
  return (
    <section className="py-20 bg-slate-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md text-sm font-semibold mb-4 uppercase tracking-wide">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Special Offers
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Curated Collections
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked categories with exclusive deals just for you
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {featuredCategories.map((category, index) => (
            <div
              key={category.title}
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 transition-shadow hover:shadow-lg"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden bg-gray-50">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute top-4 left-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white text-gray-900 text-xs font-bold shadow-sm">
                    <Tag className="w-3.5 h-3.5" />
                    {category.badge}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-gray-900">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.description}
                  </p>
                </div>
                
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-lg font-medium text-sm transition-colors border border-gray-200 group/btn">
                  Shop collection
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            <Clock className="w-5 h-5" />
            View All Categories
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
