import { getProducts, getCategories } from '../lib/api.js';
import { useState, useEffect } from 'react';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  DollarSign,
  Box,
  AlertTriangle,
  Activity,
  Clock,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Search,
  Bell,
  User,
  LayoutDashboard,
  ChevronRight
} from 'lucide-react';
import AdminProductManager from './AdminProductManager';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    lowStockProducts: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [products, categories] = await Promise.all([
        getProducts(),
        getCategories()
      ]);

      // Simulated revenue and orders data
      setStats({
        totalRevenue: 124563,
        totalOrders: 1234,
        totalProducts: products.length,
        lowStockProducts: products.filter(p => p.stock < 10).length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const menuItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      description: 'Dashboard overview',
      badge: null
    },
    {
      id: 'products',
      label: 'Products',
      icon: Package,
      description: 'Manage product inventory',
      badge: stats.totalProducts
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: ShoppingCart,
      description: 'View and manage orders',
      badge: stats.totalOrders
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: Users,
      description: 'Customer management',
      badge: null
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: TrendingUp,
      description: 'Sales and performance analytics',
      badge: null
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      description: 'System settings',
      badge: null
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewDashboard stats={stats} />;
      case 'products':
        return <AdminProductManager />;
      case 'orders':
        return <OrdersManagement />;
      case 'customers':
        return <CustomersManagement />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <OverviewDashboard stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200"
              >
                {sidebarOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">TownMarket Admin</h1>
                  <p className="text-xs text-gray-600">Management Dashboard</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all duration-200 w-64"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200">
                <Bell className="w-5 h-5 text-gray-700" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-600">enjirapunikhil@gmail.com</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Modern Sidebar */}
        <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} bg-white/80 backdrop-blur-lg border-r border-gray-200 min-h-screen transition-all duration-300 overflow-hidden shadow-xl`}>
          <nav className="p-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full group relative overflow-hidden rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-[1.02]'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-4 px-4 py-3.5">
                    <div className={`p-2 rounded-lg ${
                      isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-gray-200'
                    }`}>
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-700'}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className={`font-semibold ${isActive ? 'text-white' : 'text-gray-900'}`}>
                        {item.label}
                      </div>
                      <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                        {item.description}
                      </div>
                    </div>
                    {item.badge && (
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                      isActive ? 'text-white rotate-90' : 'text-gray-400 group-hover:text-gray-600'
                    }`} />
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
            <button 
              onClick={() => window.location.href = '/'}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group"
            >
              <div className="p-2 rounded-lg bg-red-100 group-hover:bg-red-200">
                <LogOut className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold">Back to Store</div>
                <div className="text-xs text-red-500">Return to main website</div>
              </div>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

// Overview Dashboard Component
function OverviewDashboard({ stats }) {
  const statCards = [
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      change: '+3.1%',
      trend: 'up',
      icon: Box,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Low Stock Items',
      value: stats.lowStockProducts,
      change: '-2.4%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentActivity = [
    { id: 1, type: 'order', title: 'New order #1234', value: '₹2,450', time: '2 minutes ago', status: 'success' },
    { id: 2, type: 'product', title: 'Product "Fresh Apples" low stock', value: '5 units left', time: '15 minutes ago', status: 'warning' },
    { id: 3, type: 'customer', title: 'New customer registered', value: 'john@example.com', time: '1 hour ago', status: 'info' },
    { id: 4, type: 'order', title: 'Order #1233 completed', value: '₹1,230', time: '2 hours ago', status: 'success' },
    { id: 5, type: 'product', title: 'New product added', value: 'Organic Tomatoes', time: '3 hours ago', status: 'success' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium text-gray-700">
            Export Report
          </button>
          <button className="px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? ArrowUp : ArrowDown;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                  stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  <TrendIcon className="w-3 h-3" />
                  <span className="text-xs font-semibold">{stat.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-green-300 transition-all duration-200 text-left group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Package className="w-5 h-5 text-green-700" />
              </div>
              <h4 className="font-semibold text-gray-900">Add Product</h4>
            </div>
            <p className="text-sm text-gray-600">Create a new product listing</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-blue-300 transition-all duration-200 text-left group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <ShoppingCart className="w-5 h-5 text-blue-700" />
              </div>
              <h4 className="font-semibold text-gray-900">View Orders</h4>
            </div>
            <p className="text-sm text-gray-600">Manage customer orders</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-purple-300 transition-all duration-200 text-left group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <Users className="w-5 h-5 text-purple-700" />
              </div>
              <h4 className="font-semibold text-gray-900">Customers</h4>
            </div>
            <p className="text-sm text-gray-600">View customer database</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-orange-300 transition-all duration-200 text-left group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                <TrendingUp className="w-5 h-5 text-orange-700" />
              </div>
              <h4 className="font-semibold text-gray-900">Analytics</h4>
            </div>
            <p className="text-sm text-gray-600">View sales analytics</p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <button className="text-sm text-green-600 hover:text-green-700 font-medium">View All</button>
        </div>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                }`} />
                <div>
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.value}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">{activity.time}</span>
                <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Placeholder Components
function OrdersManagement() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <div className="text-center">
        <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Management</h2>
        <p className="text-gray-600">Advanced order management features coming soon...</p>
      </div>
    </div>
  );
}

function CustomersManagement() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <div className="text-center">
        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Customer Management</h2>
        <p className="text-gray-600">Customer management features coming soon...</p>
      </div>
    </div>
  );
}

function AnalyticsDashboard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <div className="text-center">
        <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h2>
        <p className="text-gray-600">Advanced analytics features coming soon...</p>
      </div>
    </div>
  );
}

function SettingsPanel() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <div className="text-center">
        <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">System Settings</h2>
        <p className="text-gray-600">Settings configuration coming soon...</p>
      </div>
    </div>
  );
}
