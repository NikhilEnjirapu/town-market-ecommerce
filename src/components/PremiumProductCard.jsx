import { Plus, Star, ShoppingCart, AlertCircle, Heart, Eye, Sparkles } from 'lucide-react';
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
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden flex-shrink-0 p-4">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Action Buttons (show on hover) */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
          <button className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
          <button className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wide">
              <Sparkles className="w-3 h-3" />
              Featured
            </div>
          )}
          {product.stock > 0 && product.stock <= 10 && (
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-orange-50 border border-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-wide">
              <AlertCircle className="w-3 h-3" />
              Only {product.stock} left
            </div>
          )}
        </div>

        {/* Out of Stock Overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <div className="px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded">
              Out of Stock
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-400 font-medium">(4.0)</span>
        </div>

        <h3 className="font-bold text-gray-900 text-sm mb-1 leading-tight line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-gray-900">₹{product.price.toFixed(2)}</span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-[10px] text-gray-400 line-through">₹{product.original_price.toFixed(2)}</span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`px-4 py-2 rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-2 ${
              product.stock === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
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
    </div>
  );
}
