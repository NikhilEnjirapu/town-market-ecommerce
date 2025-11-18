import { useState, useEffect } from 'react';
import { getCategories, getProducts } from './lib/api.js';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { CartProvider, useCart } from './contexts/CartContext.jsx';
import { AdminProvider } from './contexts/AdminContext.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import PremiumHeader from './components/PremiumHeader.jsx';
import HeroSection from './components/HeroSection.jsx';
import FeaturedCategories from './components/FeaturedCategories.jsx';
import QuickServices from './components/QuickServices.jsx';
import CategoryGrid from './components/CategoryGrid.jsx';
import ProductSection from './components/ProductSection.jsx';
import PremiumCart from './components/PremiumCart.jsx';
import Checkout from './components/Checkout.jsx';
import { Loader2 } from 'lucide-react';
import LoginModal from './components/LoginModal.jsx';
import SignupModal from './components/SignupModal.jsx';
import FeaturedDeals from './components/FeaturedDeals.jsx';
import SelectedCategoryView from './components/SelectedCategoryView.jsx';
import PremiumFooter from './components/PremiumFooter.jsx';

function AppContent() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const { user, logout } = useAuth();

  // Simple routing based on current path
  const currentPath = window.location.pathname;
  
  // If admin route, show admin panel
  if (currentPath === '/admin') {
    return <AdminRoute />;
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [categoriesRes, productsRes] = await Promise.all([
        getCategories(),
        getProducts(),
      ]);

      if (categoriesRes) setCategories(categoriesRes);
      if (productsRes) setProducts(productsRes);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category_id === selectedCategory)
    : products;

  const getCategoryName = (categoryId) => {
    return categories.find((c) => c.id === categoryId)?.name || '';
  };

  const groupedProducts = categories.reduce((acc, category) => {
    acc[category.id] = products.filter((p) => p.category_id === category.id).slice(0, 6);
    return acc;
  }, {});

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <PremiumHeader
        onCartClick={() => setIsCartOpen(true)}
        onLogin={() => setIsLoginOpen(true)}
        onSignup={() => setIsSignupOpen(true)}
        onLogout={logout}
        user={user}
      />

      {isLoading ? (
        <div className="flex justify-center items-center py-40">
          <Loader2 className="w-10 h-10 text-gray-900 animate-spin" />
        </div>
      ) : (
        <>
          <HeroSection />
          <FeaturedCategories />
          <QuickServices />

          <CategoryGrid
            categories={categories}
            onSelectCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />

          {selectedCategory ? (
            <SelectedCategoryView
              category={categories.find((c) => c.id === selectedCategory)}
              products={filteredProducts}
              onBack={() => setSelectedCategory(null)}
            />
          ) : (
            <>
              {categories.map((category) => (
                <ProductSection
                  key={category.id}
                  title={category.name}
                  products={groupedProducts[category.id] || []}
                  onViewAll={() => setSelectedCategory(category.id)}
                />
              ))}
              <FeaturedDeals />
            </>
          )}
        </>
      )}

      <PremiumCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignup={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }}
      />

      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onSwitchToLogin={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
        }}
      />

      <PremiumFooter />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AdminProvider>
          <AppContent />
        </AdminProvider>
      </CartProvider>
    </AuthProvider>
  );
}
