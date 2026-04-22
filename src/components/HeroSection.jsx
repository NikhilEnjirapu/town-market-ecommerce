import { ArrowRight, Star, Shield, Truck } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative bg-white border-b border-gray-100 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%221%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 lg:pt-12 lg:pb-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md text-sm font-semibold tracking-wide uppercase">
                Fresh from local farms
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                Quality Groceries
                <span className="block text-blue-600">Delivered Daily</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                From farm-fresh produce to daily essentials, get everything you need with same-day delivery. Quality you can trust, convenience you deserve.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 py-4">
              <div className="flex flex-col items-start">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-xl font-bold text-gray-900">11min</div>
                <div className="text-sm text-gray-500">Express</div>
              </div>
              <div className="flex flex-col items-start">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-500">Quality</div>
              </div>
              <div className="flex flex-col items-start">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                  <Star className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-xl font-bold text-gray-900">4.8</div>
                <div className="text-sm text-gray-500">Rating</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 group">
                Start Shopping
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-3.5 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-lg transition-colors border border-gray-200 flex items-center justify-center gap-2">
                View Deals
              </button>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-fade-in lg:ml-8">
            <div className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <img 
                src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg" 
                alt="Fresh groceries and produce" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 bg-white border border-gray-100 rounded-xl shadow-lg p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Free Delivery</div>
                <div className="text-xs text-gray-500">Above ₹499</div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white border border-gray-100 rounded-xl shadow-lg p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Top Rated</div>
                <div className="text-xs text-gray-500">10k+ Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
