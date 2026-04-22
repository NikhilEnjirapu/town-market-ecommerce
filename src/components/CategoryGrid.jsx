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
            className={`group relative bg-white rounded-xl p-4 border transition-colors ${
              selectedCategory === null 
                ? 'border-blue-600 bg-blue-50/50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-900'
              }`}>
                <Store className="w-6 h-6" />
              </div>
              <div className="text-center">
                <span className={`text-sm font-semibold transition-colors ${
                  selectedCategory === null ? 'text-blue-700' : 'text-gray-700 group-hover:text-gray-900'
                }`}>
                  All Products
                </span>
                <div className={`text-xs mt-0.5 ${
                  selectedCategory === null ? 'text-blue-500' : 'text-gray-400'
                }`}>
                  Browse all
                </div>
              </div>
            </div>
            
            {/* Selection Indicator */}
            {selectedCategory === null && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center shadow-sm border-2 border-white">
                <ChevronRight className="w-3 h-3 text-white" />
              </div>
            )}
          </button>

          {/* Category Buttons */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`group relative bg-white rounded-xl p-4 border transition-colors ${
                selectedCategory === category.id 
                  ? 'border-blue-600 bg-blue-50/50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center transition-colors ${
                  selectedCategory === category.id
                    ? 'ring-2 ring-blue-600 ring-offset-2'
                    : 'group-hover:ring-2 group-hover:ring-gray-300 group-hover:ring-offset-2'
                }`}>
                  {category.image_url ? (
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-900'
                    }`}>
                      <Package className="w-6 h-6" />
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <span className={`text-sm font-semibold transition-colors line-clamp-2 ${
                    selectedCategory === category.id ? 'text-blue-700' : 'text-gray-700 group-hover:text-gray-900'
                  }`}>
                    {category.name}
                  </span>
                  <div className={`text-xs mt-0.5 ${
                    selectedCategory === category.id ? 'text-blue-500' : 'text-gray-400'
                  }`}>
                    View items
                  </div>
                </div>
              </div>
              
              {/* Selection Indicator */}
              {selectedCategory === category.id && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center shadow-sm border-2 border-white">
                  <ChevronRight className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Active Filter Display */}
        {selectedCategory && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200">
              <span>Filtering by: {categories.find(c => c.id === selectedCategory)?.name || 'All Products'}</span>
              <button
                onClick={() => onSelectCategory(null)}
                className="ml-2 text-gray-500 hover:text-gray-900 transition-colors"
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
