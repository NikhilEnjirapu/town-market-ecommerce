import { useState, useEffect } from 'react';
import { productService, categoryService } from '../services/api.service';
import ProductCard from '../components/ProductCard';
import { useParams, Link } from 'react-router-dom';

import { Search, Filter } from 'lucide-react';

export default function ProductListingPage() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(id || null);
  const [searchQuery, setSearchQuery] = useState('');
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

  useEffect(() => {
    if (id) {
      setSelectedCategory(id);
    }
  }, [id]);

  const filteredProducts = products.filter(p => {
    const matchCat = selectedCategory ? p.category_id === selectedCategory : true;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-24">
          <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold text-lg">
            <Filter className="w-5 h-5" /> Filters
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-sm text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={`block w-full text-left text-sm ${selectedCategory === null ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  All Products
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`block w-full text-left text-sm ${selectedCategory === cat.id ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : 'All Products'}
            <span className="text-gray-500 text-sm ml-2 font-normal">({filteredProducts.length} items)</span>
          </h1>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1,2,3,4,5,6,7,8].map(n => <div key={n} className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>)}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-500">No products found matching your criteria.</p>
            <button onClick={() => {setSearchQuery(''); setSelectedCategory(null);}} className="mt-4 text-blue-600 font-semibold hover:underline">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
