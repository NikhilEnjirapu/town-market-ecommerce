export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="text-2xl font-bold text-gray-900 tracking-tight mb-4">
            Town<span className="text-blue-600">Market</span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Your neighborhood market, delivered to your door in 11 minutes. Fresh produce, daily essentials, and more.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Categories</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-blue-600 transition-colors">Fresh Vegetables</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Fresh Fruits</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Dairy & Bakery</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Snacks & Beverages</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Useful Links</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Download App</h4>
          <p className="text-sm text-gray-500 mb-4">Get the best experience on our mobile app.</p>
          <div className="flex gap-2">
            <div className="w-32 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500 cursor-pointer hover:bg-gray-300">App Store</div>
            <div className="w-32 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500 cursor-pointer hover:bg-gray-300">Play Store</div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TownMarket. All rights reserved.
      </div>
    </footer>
  );
}
