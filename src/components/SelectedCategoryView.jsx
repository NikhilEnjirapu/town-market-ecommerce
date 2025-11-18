import { useMemo, useState } from 'react';
import { ArrowLeft, Filter, Layers, Sparkles } from 'lucide-react';
import PremiumProductCard from './PremiumProductCard.jsx';
import { useCart } from '../contexts/CartContext.jsx';

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'priceLow', label: 'Price: Low to High' },
  { id: 'priceHigh', label: 'Price: High to Low' },
  { id: 'newest', label: 'Newest' },
];

const getProductTimestamp = (product) => {
  const tryParse = (value) => {
    if (!value) return NaN;
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? NaN : parsed;
  };

  const updated = tryParse(product?.updated_at);
  if (!Number.isNaN(updated)) return updated;

  const created = tryParse(product?.created_at);
  if (!Number.isNaN(created)) return created;

  return typeof product?.id === 'number' ? product.id : 0;
};

const getSortedProducts = (products, sortOption) => {
  const list = [...products];

  switch (sortOption) {
    case 'priceLow':
      return list.sort((a, b) => a.price - b.price);
    case 'priceHigh':
      return list.sort((a, b) => b.price - a.price);
    case 'newest':
      return list.sort((a, b) => getProductTimestamp(b) - getProductTimestamp(a));
    case 'featured':
    default:
      return list.sort((a, b) => {
        const featuredScore = Number(b.featured || 0) - Number(a.featured || 0);
        if (featuredScore !== 0) return featuredScore;
        const stockA = typeof a.stock === 'number' ? a.stock : 0;
        const stockB = typeof b.stock === 'number' ? b.stock : 0;
        return stockB - stockA;
      });
  }
};

export default function SelectedCategoryView({ category, products = [], onBack }) {
  const { addToCart } = useCart();
  const [sortOption, setSortOption] = useState('featured');

  const sortedProducts = useMemo(
    () => getSortedProducts(products, sortOption),
    [products, sortOption]
  );

  const spotlightProduct = useMemo(
    () => products.find((product) => product.featured) ?? products[0],
    [products]
  );

  const categoryDescription =
    category?.description ||
    'Discover premium essentials curated just for you and add them to your cart without leaving this view.';

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-3xl p-6">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to categories
          </button>

          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-gray-500 font-semibold">
            {category?.tagline || 'Category spotlight'}
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            {category?.name || 'Curated Collection'}
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed">{categoryDescription}</p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-700 font-medium">
            <span className="inline-flex items-center gap-2">
              <Layers className="w-4 h-4 text-gray-500" />
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gray-500" />
              {spotlightProduct ? 'Best of the collection highlighted' : 'Fresh picks coming soon'}
            </span>
          </div>
        </div>

        {spotlightProduct && (
          <div className="w-full lg:w-80 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-3xl p-6 text-white relative overflow-hidden">
            {spotlightProduct.image_url && (
              <img
                src={spotlightProduct.image_url}
                alt={spotlightProduct.name}
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
            )}
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-300">
                Spotlight pick
              </p>
              <h3 className="mt-3 text-2xl font-bold">{spotlightProduct.name}</h3>
              <p className="mt-2 text-sm text-gray-200 line-clamp-3">
                {spotlightProduct.description || 'Limited release with premium finishing touches.'}
              </p>
              <p className="mt-4 text-3xl font-bold">₹{spotlightProduct.price.toFixed(0)}</p>
              <button
                type="button"
                onClick={() => addToCart(spotlightProduct)}
                className="mt-6 w-full bg-white text-gray-900 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Quick add to cart
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border border-gray-200 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 text-gray-800 font-semibold text-sm">
          <Filter className="w-4 h-4" /> Refine products
        </div>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSortOption(option.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                sortOption === option.id
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'border-gray-200 text-gray-700 hover:border-gray-900'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="border border-dashed border-gray-200 rounded-3xl py-16 text-center">
          <p className="text-lg font-semibold text-gray-600">No products yet</p>
          <p className="mt-2 text-sm text-gray-400">
            Please check other categories or adjust the filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sortedProducts.map((product) => (
            <div key={product.id} className="flex justify-center">
              <PremiumProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
