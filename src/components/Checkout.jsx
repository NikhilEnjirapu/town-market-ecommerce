import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext.jsx';
import { addOrderItems, createOrder } from '../lib/api';

export default function Checkout({ isOpen, onClose }) {
  const { cart, getCartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const order = await createOrder({
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        delivery_address: formData.address,
        total_amount: getCartTotal(),
        status: 'pending',
      });

      const orderItems = cart.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      await addOrderItems(order.id, orderItems);

      setIsSuccess(true);
      clearCart();

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({ name: '', email: '', phone: '', address: '' });
      }, 3000);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={onClose} />

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          {isSuccess ? (
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
              <p className="text-gray-600">Your order will be delivered in 11 minutes.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Delivery Details</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Full Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all" placeholder="John Doe" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Phone</label>
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all" placeholder="+91 98765 43210" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Email</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all" placeholder="john@example.com" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Delivery Address</label>
                  <textarea required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} rows={2} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none" placeholder="Apt/House No, Street, Area" />
                </div>

                <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>Subtotal</span>
                    <span>₹{getCartTotal().toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{getCartTotal().toFixed(0)}</span>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting || cart.length === 0} className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Confirming...' : 'Confirm Order'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
