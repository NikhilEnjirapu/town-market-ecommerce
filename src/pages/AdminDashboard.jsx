import { Package, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useState, useEffect } from 'react';
import { productService } from '../services/api.service';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, lowStock: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const prods = await productService.getAll();
        setStats({
          products: prods.length,
          lowStock: prods.filter(p => p.stock <= 5).length
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><Package className="w-6 h-6" /></div>
          <div><p className="text-sm text-gray-500 font-medium">Total Products</p><p className="text-2xl font-bold text-gray-900">{stats.products}</p></div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center"><TrendingUp className="w-6 h-6" /></div>
          <div><p className="text-sm text-gray-500 font-medium">Low Stock Items</p><p className="text-2xl font-bold text-gray-900">{stats.lowStock}</p></div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center"><DollarSign className="w-6 h-6" /></div>
          <div><p className="text-sm text-gray-500 font-medium">Total Revenue</p><p className="text-2xl font-bold text-gray-900">₹0.00</p></div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center"><Users className="w-6 h-6" /></div>
          <div><p className="text-sm text-gray-500 font-medium">Total Customers</p><p className="text-2xl font-bold text-gray-900">0</p></div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">
        More analytics and charts coming soon...
      </div>
    </div>
  );
}
