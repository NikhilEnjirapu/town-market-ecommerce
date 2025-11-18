import { MapPin, Search, User, ShoppingCart, Menu, X, ChevronDown, LogOut, Settings, Shield } from 'lucide-react';
import { useCart } from '../contexts/CartContext.jsx';
import { useAdmin } from '../contexts/AdminContext.jsx';
import { useState, useEffect, useRef } from 'react';

export default function PremiumHeader({ onCartClick, onLogin, onSignup, onLogout, user }) {
  const { getCartCount } = useCart();
  const { isAdmin, logout } = useAdmin();
  const cartCount = getCartCount();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  const handleAdminPanel = () => {
    window.location.href = '/admin';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Single Row Header */}
        <div className="flex items-center justify-between gap-4 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="text-2xl font-bold text-gray-900 tracking-tight">
              Town<span className="text-green-600">Market</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Right Side Items */}
          <div className="flex items-center gap-3">
            {/* Delivery Info */}
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-green-600" />
              <span className="text-gray-700 font-medium">11 min delivery</span>
            </div>

            {/* User Account */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="hidden sm:flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
                >
                  {/* Circular Profile */}
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.fullName ? user.fullName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.fullName ? user.fullName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.fullName || 'User'}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {isAdmin && (
                        <button 
                          onClick={handleAdminPanel}
                          className="w-full px-4 py-2 text-left hover:bg-green-50 flex items-center gap-3 transition-colors"
                        >
                          <Shield className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-700 font-medium">Admin Panel</span>
                        </button>
                      )}
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors">
                        <Settings className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Account Settings</span>
                      </button>
                      <button 
                        onClick={() => {
                          onLogout();
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-3 transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-red-600 font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={onLogin}
                  className="text-sm text-gray-700 hover:text-gray-900 font-medium"
                >
                  Login
                </button>
                <button
                  onClick={onSignup}
                  className="text-sm bg-green-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Signup
                </button>
              </div>
            )}

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2.5 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white py-4">
            <div className="space-y-3">
              {/* Mobile Delivery Info */}
              <div className="flex items-center gap-2 text-sm bg-green-50 px-3 py-2 rounded-lg">
                <MapPin className="w-4 h-4 text-green-600" />
                <span className="text-green-700 font-medium">Delivery in 11 minutes</span>
              </div>
              
              {user ? (
                <div className="space-y-3">
                  {/* Mobile Profile Section */}
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.fullName ? user.fullName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.fullName || 'User'}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Menu Items */}
                  {isAdmin && (
                    <button 
                      onClick={handleAdminPanel}
                      className="w-full px-3 py-2 text-left hover:bg-green-50 flex items-center gap-3 transition-colors"
                    >
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-700 font-medium">Admin Panel</span>
                    </button>
                  )}
                  <button className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors">
                    <Settings className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Account Settings</span>
                  </button>
                  <button 
                    onClick={onLogout}
                    className="w-full px-3 py-2 text-left hover:bg-red-50 flex items-center gap-3 transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-600 font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={onLogin}
                    className="flex-1 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={onSignup}
                    className="flex-1 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Signup
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
