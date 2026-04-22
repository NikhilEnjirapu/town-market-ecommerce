import { useState, useEffect } from 'react';
import { productService, categoryService } from '../services/api.service';
import ProductCard from '../components/ProductCard';
import { Clock, Shield, Star, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodData, catData] = await Promise.all([
          productService.getAll(),
          categoryService.getAll()
        ]);
        setProducts(prodData);
        setCategories(catData);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const freshToday = products.filter(p => !p.featured).slice(0, 8);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-bold uppercase tracking-wide mb-6">
              <Clock className="w-4 h-4" /> 11-Minute Delivery
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6">
              Farm Fresh Groceries, <span className="text-blue-600">At Your Door</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Get your daily essentials, fresh produce, and favorite snacks delivered reliably and extremely fast.
            </p>
            <Link to="/products" className="inline-flex px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
              Shop Now
            </Link>
          </div>
          <div className="hidden md:block">
            <img src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg" alt="Groceries" className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]" />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y border-gray-100 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-3"><Truck className="w-6 h-6 text-blue-600" /><span className="font-semibold text-gray-800">Superfast Delivery</span></div>
          <div className="flex items-center gap-3"><Shield className="w-6 h-6 text-blue-600" /><span className="font-semibold text-gray-800">100% Quality Guarantee</span></div>
          <div className="flex items-center gap-3"><Star className="w-6 h-6 text-blue-600" /><span className="font-semibold text-gray-800">Top Rated Service</span></div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Category Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
            <Link to="/products" className="text-blue-600 font-semibold hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {categories.map(cat => (
              <Link to={`/category/${cat.id}`} key={cat.id} className="group bg-white border border-gray-100 rounded-xl p-4 text-center hover:border-blue-200 hover:shadow-md transition-all">
                <div className="w-12 h-12 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors text-blue-600 font-bold text-lg">
                  {cat.name.charAt(0)}
                </div>
                <div className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">{cat.name}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Deals</h2>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1,2,3,4].map(n => <div key={n} className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>)}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Fresh Today */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Fresh Today</h2>
            <Link to="/products" className="text-blue-600 font-semibold hover:underline">See All</Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1,2,3,4].map(n => <div key={n} className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>)}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {freshToday.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
