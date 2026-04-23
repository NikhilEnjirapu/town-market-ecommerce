import { useState, useEffect } from 'react';
import { productService, categoryService } from '../services/api.service';
import { Plus, Edit2, Trash2, X, AlertCircle } from 'lucide-react';

export default function ProductManagementPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', original_price: '',
    image_url: '', stock: '', category_id: '', featured: false, unit: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [p, c] = await Promise.all([productService.getAll(), categoryService.getAll()]);
      setProducts(p);
      setCategories(c);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await productService.delete(id);
      fetchData();
    } catch (e) {
      console.error(e);
      alert('Failed to delete product');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        stock: parseInt(formData.stock, 10) || 0
      };

      if(editingId) {
        await productService.update(editingId, payload);
      } else {
        await productService.create(payload);
      }
      setIsFormOpen(false);
      setEditingId(null);
      setFormData({ name: '', description: '', price: '', original_price: '', image_url: '', stock: '', category_id: '', featured: false, unit: '' });
      fetchData();
    } catch (e) {
      alert('Error saving product');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
        <button onClick={() => {setIsFormOpen(true); setEditingId(null);}} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          <Plus className="w-5 h-5" /> Add Product
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 relative shadow-sm">
          <button onClick={() => setIsFormOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900"><X className="w-6 h-6" /></button>
          <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit' : 'Add'} Product</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Name</label><input required className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
            <div className="col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label><input type="number" step="0.01" required className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label><input type="number" step="0.01" className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600" value={formData.original_price} onChange={e => setFormData({...formData, original_price: e.target.value})} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Stock</label><input type="number" required className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Unit</label><input className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600" placeholder="e.g. 1 kg" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} /></div>
            <div className="col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label><input className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} /></div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600" value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})}>
                <option value="">Select a category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2 mt-6"><input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4 text-blue-600 rounded" /> <label className="text-sm font-medium text-gray-700">Featured</label></div>
            <div className="col-span-2 mt-4"><button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-lg font-bold">Save Product</button></div>
          </form>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500 uppercase tracking-wide">
              <th className="p-4 font-semibold">Product</th>
              <th className="p-4 font-semibold">Price</th>
              <th className="p-4 font-semibold">Stock</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={p.image_url} alt={p.name} className="w-12 h-12 rounded-lg object-contain bg-gray-50 mix-blend-multiply border border-gray-100" />
                    <div>
                      <div className="font-semibold text-gray-900 line-clamp-1">{p.name}</div>
                      <div className="text-xs text-gray-500">{categories.find(c=>c.id===p.category_id)?.name || 'General'}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-semibold text-gray-900">₹{p.price.toFixed(2)}</td>
                <td className="p-4">
                  {p.stock === 0 ? <span className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-bold flex items-center w-max gap-1"><AlertCircle className="w-3 h-3"/> Out of stock</span> : <span className="text-gray-900">{p.stock} units</span>}
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleEdit(p)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-2"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(p.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
