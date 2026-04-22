import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { orderService } from '../services/api.service';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Truck, CreditCard } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const total = getCartTotal();
  const deliveryFee = total > 499 ? 0 : 49;
  const grandTotal = total + deliveryFee;

  if (cart.length === 0 && step !== 3) {
    navigate('/cart');
    return null;
  }

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const order = await orderService.createOrder({ total_amount: grandTotal, status: 'PENDING', delivery_address: address });
      const items = cart.map(item => ({ product_id: item.product.id, quantity: item.quantity, price: item.product.price }));
      await orderService.addItems(order.id, items);
      clearCart();
      setStep(3);
    } catch (error) {
      console.error('Order failed', error);
      alert('Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Stepper */}
      <div className="flex items-center justify-center mb-12">
        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}><Truck className="w-5 h-5" /> <span className="font-semibold text-sm">Delivery</span></div>
        <div className={`w-16 h-px mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}><CreditCard className="w-5 h-5" /> <span className="font-semibold text-sm">Payment</span></div>
        <div className={`w-16 h-px mx-4 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        <div className={`flex items-center gap-2 ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}><CheckCircle className="w-5 h-5" /> <span className="font-semibold text-sm">Done</span></div>
      </div>

      {step === 1 && (
        <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-xl mx-auto shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Address</h2>
          <textarea 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="4"
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none resize-none mb-6 text-gray-900 bg-gray-50"
            placeholder="Enter your full delivery address..."
          ></textarea>
          <button 
            onClick={() => setStep(2)}
            disabled={address.trim().length < 5}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50"
          >
            Continue to Payment
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-xl mx-auto shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary & Payment</h2>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-gray-600"><span>Items Total</span><span>₹{total.toFixed(2)}</span></div>
            <div className="flex justify-between text-gray-600"><span>Delivery Fee</span><span>₹{deliveryFee.toFixed(2)}</span></div>
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-4 border-t border-gray-100">
              <span>Amount to Pay</span><span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex gap-3 text-blue-800 text-sm">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <p>Cash on Delivery (COD) is available. You can pay when the order arrives in 11 minutes.</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setStep(1)} className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-colors">Back</button>
            <button onClick={handlePlaceOrder} disabled={loading} className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center">
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white border border-gray-200 rounded-xl p-12 max-w-xl mx-auto text-center shadow-sm">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-8">Your groceries will arrive in exactly 11 minutes. Keep your phone handy.</p>
          <button onClick={() => navigate('/products')} className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}
