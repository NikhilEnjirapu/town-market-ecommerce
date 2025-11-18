import { Store, Package, ChevronRight } from 'lucide-react';

export default function CategoryGrid({ categories, onSelectCategory, selectedCategory }) {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Browse Categories</h2>
          <p className="text-gray-600">Find exactly what you're looking for</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* All Products Button */}
          <button
            onClick={() => onSelectCategory(null)}
            className={`group relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-lg ${
              selectedCategory === null 
                ? 'border-green-600 shadow-green-100 shadow-lg scale-105' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center gap-3">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                selectedCategory === null
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 group-hover:bg-green-100 group-hover:text-green-600'
              }`}>
                <Store className="w-7 h-7" />
              </div>
              <div className="text-center">
                <span className={`text-sm font-semibold transition-colors ${
                  selectedCategory === null ? 'text-green-600' : 'text-gray-900'
                }`}>
                  All Products
                </span>
                <div className={`text-xs mt-1 ${
                  selectedCategory === null ? 'text-green-600' : 'text-gray-500'
                }`}>
                  Browse all
                </div>
              </div>
            </div>
            
            {/* Selection Indicator */}
            {selectedCategory === null && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
            )}
          </button>

          {/* Category Buttons */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`group relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-lg ${
                selectedCategory === category.id 
                  ? 'border-green-600 shadow-green-100 shadow-lg scale-105' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <div className={`w-14 h-14 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'ring-2 ring-green-600'
                    : 'group-hover:ring-2 group-hover:ring-gray-300'
                }`}>
                  {category.image_url ? (
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${
                      selectedCategory === category.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-600 group-hover:bg-green-100 group-hover:text-green-600'
                    }`}>
                      <Package className="w-7 h-7" />
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <span className={`text-sm font-semibold transition-colors line-clamp-2 ${
                    selectedCategory === category.id ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {category.name}
                  </span>
                  <div className={`text-xs mt-1 ${
                    selectedCategory === category.id ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    View items
                  </div>
                </div>
              </div>
              
              {/* Selection Indicator */}
              {selectedCategory === category.id && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Active Filter Display */}
        {selectedCategory && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              <span>Filtering by: {categories.find(c => c.id === selectedCategory)?.name || 'All Products'}</span>
              <button
                onClick={() => onSelectCategory(null)}
                className="ml-2 text-green-600 hover:text-green-800 font-semibold"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
