import { Plus, Star, ShoppingCart, AlertCircle, Heart, Eye } from 'lucide-react';
import { useCart } from '../contexts/CartContext.jsx';
import { useState } from 'react';

export default function PremiumProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div 
      className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-[380px] flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative h-44 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex-shrink-0">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Action Buttons (show on hover) */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300">
            <Heart className="w-4 h-4 text-gray-700 hover:text-red-500" />
          </button>
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300">
            <Eye className="w-4 h-4 text-gray-700 hover:text-blue-500" />
          </button>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
              Featured
            </span>
          )}
          {product.stock < 10 && product.stock > 0 && (
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Out of Stock Overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="w-10 h-10 text-white mx-auto mb-2" />
              <span className="text-white font-semibold text-sm">Out of Stock</span>
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3.5 flex flex-col flex-1 bg-white/50 backdrop-blur-sm">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-1.5">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 font-medium">(4.0)</span>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-gray-900 text-xs mb-1.5 overflow-hidden group-hover:text-green-600 transition-colors leading-tight" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-xs text-gray-600 mb-2.5 flex-1 overflow-hidden leading-relaxed" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {product.description}
        </p>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-gray-900">₹{product.price.toFixed(0)}</span>
              {product.original_price && product.original_price > product.price && (
                <span className="text-xs text-gray-500 line-through">₹{product.original_price.toFixed(0)}</span>
              )}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">
              {product.unit || 'per piece'}
            </div>
          </div>
          
          {/* Discount Badge */}
          {product.original_price && product.original_price > product.price && (
            <div className="bg-green-100 text-green-700 text-xs font-bold px-1.5 py-0.5 rounded-full">
              {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-2.5 rounded-xl font-semibold text-xs transition-all duration-300 flex items-center justify-center gap-2 flex-shrink-0 ${
            isAdded
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-200'
              : product.stock === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
          }`}
        >
          {isAdded ? (
            <>
              <span className="text-sm">✓</span>
              Added
            </>
          ) : product.stock === 0 ? (
            <>
              <AlertCircle className="w-3.5 h-3.5" />
              Out of Stock
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5" />
              Add to Cart
            </>
          )}
        </button>
      </div>

      </div>
  );
}
