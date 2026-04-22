import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { cart, addToCart, updateQuantity } = useCart();
  
  const cartItem = cart.find(item => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = (e) => {
    e.preventDefault();
    if (product.stock > 0) addToCart(product);
  };

  const handleIncrease = (e) => {
    e.preventDefault();
    if (quantity < product.stock) updateQuantity(product.id, quantity + 1);
  };

  const handleDecrease = (e) => {
    e.preventDefault();
    updateQuantity(product.id, quantity - 1);
  };

  return (
    <Link to={`/products/${product.id}`} className="block group h-full">
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-blue-200 hover:shadow-md transition-all duration-300 h-full flex flex-col relative">
        <div className="relative aspect-[4/3] p-4 bg-white flex items-center justify-center overflow-hidden border-b border-gray-50">
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          />
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-2 left-2 bg-orange-50 text-orange-700 border border-orange-100 text-[10px] font-bold px-2 py-1 rounded">
              Only {product.stock} left
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <span className="bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded">Out of Stock</span>
            </div>
          )}
        </div>
        
        <div className="p-4 flex flex-col flex-1">
          <div className="text-xs text-gray-500 mb-1">
            {product.category_id ? `Category ${product.category_id}` : 'General'}
          </div>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-3 flex-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="text-lg font-bold text-gray-900">
              ₹{product.price.toFixed(2)}
            </div>
            
            <div onClick={(e) => e.preventDefault()}>
              {quantity === 0 ? (
                <button 
                  onClick={handleAdd}
                  disabled={product.stock === 0}
                  className="px-4 py-1.5 border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ADD
                </button>
              ) : (
                <div className="flex items-center bg-blue-600 text-white rounded-lg overflow-hidden shadow-sm">
                  <button onClick={handleDecrease} className="p-1.5 hover:bg-blue-700 transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-2 text-sm font-semibold">{quantity}</span>
                  <button onClick={handleIncrease} className="p-1.5 hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
