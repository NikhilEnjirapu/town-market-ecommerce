import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { LayoutDashboard, Package, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const { isAdmin, isLoading, logout } = useAdmin();

  if (isLoading) return <div>Loading...</div>;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight">
            Town<span className="text-blue-600">Market</span> Admin
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link to="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors">
            <Package className="w-5 h-5" />
            Products
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
