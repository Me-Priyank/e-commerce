import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import Range from 'rc-slider';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../data/products";
import { API_URL } from "../constants";
import { apiRequest } from "../utils/apiCall";

interface FilterState {
  minPrice: number;
  maxPrice: number;
  colors: string[];
  productTypes: string[];
  sizes: string[];
  occasions: string[];
}

interface FilterOptions {
  colors: string[];
  productTypes: string[];
  sizes: string[];
  occasions: string[];
  priceRange: { min: number; max: number };
}

interface ApiFilterOptions {
  category: string[];
  subCategory: string[];
  colorVariants: string[];
  sizeVariants: string[];
  occasions: string[];
}

const AllProducts: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    colors: [],
    productTypes: [],
    sizes: [],
    occasions: [],
    priceRange: { min: 0, max: 100000 }
  });

  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 100000,
    colors: [],
    productTypes: [],
    sizes: [],
    occasions: []
  });

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    productType: true,
    color: true,
    size: true,
    occasions: true
  });

  const [sortBy, setSortBy] = useState<string>("featured");

  // Initialize filters from URL parameters
  const initializeFiltersFromURL = () => {
    const categoryParam = searchParams.get('category');
    const occasionParam = searchParams.get('occasion');
    const colorParam = searchParams.get('color');
    const sizeParam = searchParams.get('size');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');

    const initialFilters: FilterState = {
      minPrice: minPriceParam ? parseInt(minPriceParam) : 0,
      maxPrice: maxPriceParam ? parseInt(maxPriceParam) : 100000,
      colors: colorParam ? colorParam.split(',') : [],
      productTypes: categoryParam ? categoryParam.split(',') : [],
      sizes: sizeParam ? sizeParam.split(',') : [],
      occasions: occasionParam ? occasionParam.split(',') : []
    };

    setFilters(initialFilters);
  };

  // Update URL when filters change
  const updateURL = (newFilters: FilterState) => {
    const params = new URLSearchParams();
    
    if (newFilters.productTypes.length > 0) {
      params.set('category', newFilters.productTypes.join(','));
    }
    if (newFilters.occasions.length > 0) {
      params.set('occasion', newFilters.occasions.join(','));
    }
    if (newFilters.colors.length > 0) {
      params.set('color', newFilters.colors.join(','));
    }
    if (newFilters.sizes.length > 0) {
      params.set('size', newFilters.sizes.join(','));
    }
    if (newFilters.minPrice !== 0) {
      params.set('minPrice', newFilters.minPrice.toString());
    }
    if (newFilters.maxPrice !== 100000) {
      params.set('maxPrice', newFilters.maxPrice.toString());
    }

    setSearchParams(params);
  };

  // Fetch filter options from API
  const fetchFilterOptions = async () => {
    try {
      const response = await apiRequest(API_URL + "/products/get-params", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const apiFilterOptions: ApiFilterOptions = response;
      
      // Set filter options from API response
      setFilterOptions({
        colors: apiFilterOptions.colorVariants || [],
        productTypes: apiFilterOptions.category || [],
        sizes: apiFilterOptions.sizeVariants || [],
        occasions: apiFilterOptions.occasions || [],
        priceRange: { min: 0, max: 100000 }
      });

    } catch (error) {
      console.error("Error fetching filter options:", error);
      // Fallback to empty arrays if API fails
      setFilterOptions({
        colors: [],
        productTypes: [],
        sizes: [],
        occasions: [],
        priceRange: { min: 0, max: 100000 }
      });
    }
  };

  // Fetch initial products (if needed for fallback)
  const fetchInitialProducts = async () => {
    try {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching initial products:", error);
    }
  };

  // Fetch initial data and initialize filters from URL
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          fetchFilterOptions(),
          fetchInitialProducts()
        ]);
        
        // Initialize filters from URL after options are loaded
        initializeFiltersFromURL();
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
      setIsLoading(false);
    };

    fetchInitialData();
  }, []);

  // Apply filters whenever filter state changes (but not on initial mount)
  useEffect(() => {
    if (filterOptions.colors.length > 0 || filterOptions.productTypes.length > 0 || 
        filterOptions.sizes.length > 0 || filterOptions.occasions.length > 0) {
      applyFilters();
      updateURL(filters);
    }
  }, [filters]);

  // Apply filters by calling the filter API
  const applyFilters = async () => {
    try {
      const filterPayload = {
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        colors: filters.colors.length > 0 ? filters.colors : [],
        productTypes: filters.productTypes.length > 0 ? filters.productTypes : [],
        sizes: filters.sizes.length > 0 ? filters.sizes : [],
        occasions: filters.occasions.length > 0 ? filters.occasions : []
      };

      const response = await apiRequest(API_URL + "/products/filter", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: filterPayload
      });

      // Transform API response similar to getAllProducts
      const transformedProducts = response.map((apiProduct: any) => {
        const isSale = apiProduct.price.originalAmount > apiProduct.price.amount;
        const discount = isSale
          ? Math.round(
            ((apiProduct.price.originalAmount - apiProduct.price.amount) /
              apiProduct.price.originalAmount) *
            100
          )
          : undefined;

        return {
          id: apiProduct.id,
          name: apiProduct.name,
          price: apiProduct.price.amount,
          images: apiProduct.images,
          colors: apiProduct.variants.colors.map((c: any) => c.name),
          sizes: apiProduct.variants.sizes?.map((s: any) => s.name) || [],
          category: apiProduct.category,
          description: apiProduct.description,
          isNew: apiProduct.details?.isNewArrival,
          isSale,
          discount,
        };
      });

      setFilteredProducts(transformedProducts);
    } catch (error) {
      console.error("Error applying filters:", error);
      // Fallback to client-side filtering if API fails
      const filtered = products.filter(product => {
        const priceMatch = product.price >= filters.minPrice && product.price <= filters.maxPrice;
        const colorMatch = filters.colors.length === 0 || filters.colors.some(color => product.colors.includes(color));
        const typeMatch = filters.productTypes.length === 0 || filters.productTypes.includes(product.category);
        const sizeMatch = filters.sizes.length === 0 || filters.sizes.some(size => product.sizes.includes(size));
        const occasionMatch = filters.occasions.length === 0 || filters.occasions.some(occasion => product.occasions?.includes(occasion));
        return priceMatch && colorMatch && typeMatch && sizeMatch && occasionMatch;
      });
      setFilteredProducts(filtered);
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleColorFilter = (color: string) => {
    setFilters(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const handleProductTypeFilter = (type: string) => {
    setFilters(prev => ({
      ...prev,
      productTypes: prev.productTypes.includes(type)
        ? prev.productTypes.filter(t => t !== type)
        : [...prev.productTypes, type]
    }));
  };

  const handleSizeFilter = (size: string) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleOccasionFilter = (occasion: string) => {
    setFilters(prev => ({
      ...prev,
      occasions: prev.occasions.includes(occasion)
        ? prev.occasions.filter(o => o !== occasion)
        : [...prev.occasions, occasion]
    }));
  };

  const handleRangeChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      setFilters(prev => ({
        ...prev,
        minPrice: values[0],
        maxPrice: values[1]
      }));
    }
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      minPrice: filterOptions.priceRange.min,
      maxPrice: filterOptions.priceRange.max,
      colors: [],
      productTypes: [],
      sizes: [],
      occasions: []
    };
    setFilters(clearedFilters);
    setSearchParams(new URLSearchParams()); // Clear URL parameters
  };

  if (isLoading) {
    return (
      <div className="container-custom py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 w-1/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 w-2/4 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading">All Products</h1>
        <div className="w-20 h-[2px] bg-gold mx-auto mt-3 mb-4"></div>
      </div>

      <div className="flex flex-col justify-between lg:flex-row gap-8 px-8">
        {/* Filters Sidebar */}
        <div className="w-[30%] bg-[#f9f2e8] p-5 h-fit -ml-[12%] flex flex-col gap-4">
          <div className="flex items-center justify-between mb-6 lg:w-[18vw]">
            <h2 className="text-3xl font-semibold jiji">Filters</h2>
            {(filters.colors.length > 0 || filters.productTypes.length > 0 ||
              filters.sizes.length > 0 || filters.occasions.length > 0 ||
              filters.minPrice !== filterOptions.priceRange.min ||
              filters.maxPrice !== filterOptions.priceRange.max) && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-gold hover:underline flex items-center gap-1"
                >
                  <X size={14} />
                  Clear All
                </button>
              )}
          </div>

          {/* Price Filter */}
          <div className="mb-6 text-lg">
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full text-left font-medium mb-3"
            >
              <span>Price</span>
              {expandedSections.price ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {expandedSections.price && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-1">Min</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={filters.minPrice}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          minPrice: Math.min(Number(e.target.value), prev.maxPrice)
                        }))}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gold bg-[#f2ede7]"
                        min={filterOptions.priceRange.min}
                        max={filterOptions.priceRange.max}
                      />
                    </div>
                  </div>
                  <span className="text-gray-500 mt-6">To</span>
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-1">Max</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          maxPrice: Math.max(Number(e.target.value), prev.minPrice)
                        }))}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gold bg-[#f2ede7]"
                        min={filterOptions.priceRange.min}
                        max={filterOptions.priceRange.max}
                      />
                    </div>
                  </div>
                </div>

                {/* Dual Range Slider */}
                <div className="px-2 py-4">
                  <Range
                    min={filterOptions.priceRange.min}
                    max={filterOptions.priceRange.max}
                    value={[filters.minPrice, filters.maxPrice]}
                    onChange={handleRangeChange}
                    allowCross={false}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Product Type Filter */}
          <div className="mb-6 text-lg">
            <button
              onClick={() => toggleSection('productType')}
              className="flex items-center justify-between w-full text-left font-medium mb-3"
            >
              <span>Product Type</span>
              {expandedSections.productType ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {expandedSections.productType && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {filterOptions.productTypes.map((type) => (
                  <label key={type} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.productTypes.includes(type)}
                      onChange={() => handleProductTypeFilter(type)}
                      className="mr-3 accent-[#f9f2e8] bg-[#f9f2e8] h-5 w-5"
                    />
                    <span className="text-sm capitalize">{type}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Size Filter */}
          <div className="mb-6 text-lg">
            <button
              onClick={() => toggleSection('size')}
              className="flex items-center justify-between w-full text-left font-medium mb-3"
            >
              <span>Size</span>
              {expandedSections.size ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {expandedSections.size && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {filterOptions.sizes.map((size) => (
                  <label key={size} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.sizes.includes(size)}
                      onChange={() => handleSizeFilter(size)}
                      className="mr-3 accent-gold bg-[#f9f2e8] h-5 w-5"
                    />
                    <span className="text-sm capitalize">{size}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Occasions Filter */}
          <div className="mb-6 text-lg">
            <button
              onClick={() => toggleSection('occasions')}
              className="flex items-center justify-between w-full text-left font-medium mb-3"
            >
              <span>Occasions</span>
              {expandedSections.occasions ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {expandedSections.occasions && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {filterOptions.occasions.map((occasion) => (
                  <label key={occasion} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.occasions.includes(occasion)}
                      onChange={() => handleOccasionFilter(occasion)}
                      className="mr-3 accent-gold bg-[#f9f2e8] h-5 w-5"
                    />
                    <span className="text-sm capitalize">{occasion}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Color Filter */}
          <div className="mb-6 text-lg">
            <button
              onClick={() => toggleSection('color')}
              className="flex items-center justify-between w-full text-left font-medium mb-3"
            >
              <span>Color</span>
              {expandedSections.color ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {expandedSections.color && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {filterOptions.colors.map((color) => (
                  <label key={color} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.colors.includes(color)}
                      onChange={() => handleColorFilter(color)}
                      className="mr-3 accent-gold bg-[#f9f2e8] h-5 w-5"
                    />
                    <span className="text-sm capitalize">{color}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort Options */}
          <div className="flex justify-between items-center mb-6 bg-[#f9f2e8]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded px-3 py-2 focus:outline-none focus:border-gold bg-[#f9f2e8]"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-[70vw] pr-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters</p>
              <button
                onClick={clearAllFilters}
                className="bg-gold text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;