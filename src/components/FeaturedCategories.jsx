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
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Special Offers
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Curated Collections
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked categories with exclusive deals just for you
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {featuredCategories.map((category, index) => (
            <div
              key={category.title}
              className="group relative bg-gray-900 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-3"
            >
              {/* Image Container with Overlay */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-80" />
                
                {/* Floating Badge */}
                <div className="absolute top-4 left-4">
                  <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm ${
                    category.color === 'green' ? 'bg-green-500/20 text-green-300 border border-green-400/30' :
                    category.color === 'blue' ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' :
                    'bg-orange-500/20 text-orange-300 border border-orange-400/30'
                  }`}>
                    <Tag className="w-3 h-3" />
                    {category.badge}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-white group-hover:text-green-400 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {category.description}
                  </p>
                </div>
                
                <button className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 group/btn ${
                  category.color === 'green' ? 'bg-green-600 hover:bg-green-700 text-white' :
                  category.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                  'bg-orange-600 hover:bg-orange-700 text-white'
                }`}>
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
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl">
            <Clock className="w-5 h-5" />
            View All Categories
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
