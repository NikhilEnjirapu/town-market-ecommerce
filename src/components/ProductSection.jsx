import { ChevronRight } from 'lucide-react';
import PremiumProductCard from './PremiumProductCard.jsx';
import { ArrowRight } from 'lucide-react';

export default function ProductSection({ title, products, onViewAll }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600">Fresh picks from our collection</p>
          </div>
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <div key={product.id} className="transform transition-all duration-300 hover:scale-105">
              <PremiumProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
