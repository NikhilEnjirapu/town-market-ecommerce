import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/api.service';
import { useCart } from '../contexts/CartContext';
import { Minus, Plus, ShoppingCart, ArrowLeft, Truck, Shield } from 'lucide-react';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart, updateQuantity } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getById(id);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading product...</div>;
  if (!product) return <div className="p-8 text-center text-red-600">Product not found</div>;

  const cartItem = cart.find(item => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    if (product.stock > 0) addToCart(product);
  };

  const handleIncrease = () => {
    if (quantity < product.stock) updateQuantity(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    updateQuantity(product.id, quantity - 1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </Link>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 p-8 bg-gray-50 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
          <img src={product.image_url} alt={product.name} className="max-w-full h-auto max-h-[400px] object-contain mix-blend-multiply" />
        </div>
        <div className="md:w-1/2 p-8 lg:p-12">
          {product.featured && <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-md mb-4 uppercase tracking-wide">Featured</div>}
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-sm text-gray-500 mb-6">{product.unit || '1 unit'}</p>
          
          <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-gray-100">
            <span className="text-4xl font-extrabold text-gray-900">₹{product.price.toFixed(2)}</span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-lg text-gray-400 line-through">₹{product.original_price.toFixed(2)}</span>
            )}
          </div>

          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="flex gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600"><Truck className="w-4 h-4 text-blue-600" /> 11-Minute Delivery</div>
            <div className="flex items-center gap-2 text-sm text-gray-600"><Shield className="w-4 h-4 text-blue-600" /> 100% Quality</div>
          </div>

          {quantity === 0 ? (
            <button 
              onClick={handleAdd}
              disabled={product.stock === 0}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-5 h-5" /> {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          ) : (
            <div className="flex items-center bg-gray-100 rounded-xl p-1 w-full justify-between max-w-xs">
              <button onClick={handleDecrease} className="p-3 bg-white hover:bg-gray-50 rounded-lg shadow-sm text-gray-600 transition-colors"><Minus className="w-5 h-5" /></button>
              <span className="px-6 text-lg font-bold">{quantity}</span>
              <button onClick={handleIncrease} className="p-3 bg-white hover:bg-gray-50 rounded-lg shadow-sm text-gray-600 transition-colors"><Plus className="w-5 h-5" /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
