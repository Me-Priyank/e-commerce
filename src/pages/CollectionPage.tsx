import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, FilterX } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../data/products';

const CollectionPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState(getAllProducts());
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [colors, setColors] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Filter products by category when the category param changes
  useEffect(() => {
    if (category) {
      const filtered = products.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered);
      
      // Extract unique colors
      const uniqueColors = Array.from(
        new Set(filtered.map(product => product.colors).flat())
      );
      setColors(uniqueColors);
    } else {
      setFilteredProducts(products);
    }
  }, [category, products]);

  // Apply filters
  useEffect(() => {
    let result = products;
    
    // Filter by category
    if (category) {
      result = result.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by selected colors
    if (selectedColors.length > 0) {
      result = result.filter(product => 
        product.colors.some(color => selectedColors.includes(color))
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low-high':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result = [...result].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'alphabetical':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // 'featured' - no specific sorting
        break;
    }
    
    setFilteredProducts(result);
  }, [category, priceRange, selectedColors, sortOption, products]);

  // Handle color selection
  const handleColorSelect = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setPriceRange([0, 50000]);
    setSelectedColors([]);
    setSortOption('featured');
  };

  // Format category name for display
  const formatCategoryName = (cat?: string) => {
    if (!cat) return 'All Products';
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <div className="container-custom py-8">
      {/* Collection Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading">{formatCategoryName(category)}</h1>
        <div className="w-20 h-[2px] bg-gold mx-auto mt-3 mb-4"></div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full bg-light py-3 px-4 flex justify-between items-center border border-gray-200"
        >
          <span>Filters & Sorting</span>
          <ChevronDown size={20} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Filters Sidebar */}
        <aside 
          className={`lg:w-1/4 lg:pr-8 ${showFilters ? 'block' : 'hidden'} lg:block`}
        >
          <div className="bg-white p-6 border border-gray-200 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-heading">Filters</h2>
              <button 
                onClick={clearFilters}
                className="text-gold flex items-center text-sm"
              >
                <FilterX size={16} className="mr-1" />
                Clear all
              </button>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-4 flex items-center justify-between">
                Price
                <ChevronDown size={18} />
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">₹ {priceRange[0]}</span>
                  <span className="text-sm text-gray-500">₹ {priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="price-slider w-full"
                />
                <div className="flex space-x-4">
                  <div className="flex items-center border border-gray-200 px-3 py-1 w-full">
                    <span className="text-sm mr-1">₹</span>
                    <input
                      type="number"
                      min="0"
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full outline-none"
                    />
                  </div>
                  <div className="flex items-center border border-gray-200 px-3 py-1 w-full">
                    <span className="text-sm mr-1">₹</span>
                    <input
                      type="number"
                      min={priceRange[0]}
                      max="50000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Color Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-4 flex items-center justify-between">
                Color
                <ChevronDown size={18} />
              </h3>
              <div className="space-y-2">
                {colors.map((color, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      id={`color-${index}`}
                      type="checkbox"
                      checked={selectedColors.includes(color)}
                      onChange={() => handleColorSelect(color)}
                      className="filter-checkbox"
                    />
                    <label htmlFor={`color-${index}`} className="ml-2 text-sm capitalize">
                      {color}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          {/* Sort Options */}
          <div className="bg-white p-4 border border-gray-200 mb-6 flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {filteredProducts.length} products
            </span>
            <div className="flex items-center">
              <span className="text-sm mr-2">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border-none bg-transparent focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="alphabetical">Alphabetically</option>
              </select>
            </div>
          </div>

          {/* Products */}
          {filteredProducts.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;