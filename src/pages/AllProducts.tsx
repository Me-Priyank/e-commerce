import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import Range from "rc-slider";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../data/products";
import { API_URL } from "../constants";
import { apiRequest } from "../utils/apiCall";

interface FilterState {
  minPrice: number;
  maxPrice: number;
  colors: string[];
  productTypes: string[];
}

interface FilterOptions {
  colors: string[];
  productTypes: string[];
  priceRange: { min: number; max: number };
}

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    colors: [],
    productTypes: [],
    priceRange: { min: 0, max: 100000 },
  });

  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 100000,
    colors: [],
    productTypes: [],
  });

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    productType: true,
    color: true,
  });

  const [sortBy, setSortBy] = useState<string>("featured");

  // Fetch initial products and filter options
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
        setFilteredProducts(allProducts);

        // Extract filter options from products
        const colors = [...new Set(allProducts.flatMap((p) => p.colors))];
        const productTypes = [...new Set(allProducts.map((p) => p.category))];
        const prices = allProducts.map((p) => p.price);
        const priceRange = {
          min: Math.min(...prices),
          max: Math.max(...prices),
        };

        setFilterOptions({ colors, productTypes, priceRange });
        setFilters((prev) => ({
          ...prev,
          minPrice: priceRange.min,
          maxPrice: priceRange.max,
        }));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setIsLoading(false);
    };

    fetchInitialData();
  }, []);

  // Apply filters
  const applyFilters = async () => {
    if (
      filters.colors.length === 0 &&
      filters.productTypes.length === 0 &&
      filters.minPrice === filterOptions.priceRange.min &&
      filters.maxPrice === filterOptions.priceRange.max
    ) {
      setFilteredProducts(products);
      return;
    }

    try {
      const filterPayload = {
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        colors: filters.colors.length > 0 ? filters.colors : [],
        productCategories:
          filters.productTypes.length > 0 ? filters.productTypes : [],
      };

      const response = await apiRequest(API_URL + "/products/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: filterPayload,
      });

      // Transform API response similar to getAllProducts
      const transformedProducts = response.map((apiProduct: any) => {
        const isSale =
          apiProduct.price.originalAmount > apiProduct.price.amount;
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
          sizes: apiProduct.variants.sizes?.map((s: any) => s.name),
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
      // Fallback to client-side filtering
      const filtered = products.filter((product) => {
        const priceMatch =
          product.price >= filters.minPrice &&
          product.price <= filters.maxPrice;
        const colorMatch =
          filters.colors.length === 0 ||
          filters.colors.some((color) => product.colors.includes(color));
        const typeMatch =
          filters.productTypes.length === 0 ||
          filters.productTypes.includes(product.category);
        return priceMatch && colorMatch && typeMatch;
      });
      setFilteredProducts(filtered);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleColorFilter = (color: string) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const handleProductTypeFilter = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      productTypes: prev.productTypes.includes(type)
        ? prev.productTypes.filter((t) => t !== type)
        : [...prev.productTypes, type],
    }));
  };

  const handleRangeChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      setFilters((prev) => ({
        ...prev,
        minPrice: values[0],
        maxPrice: values[1],
      }));
    }
  };
  const clearAllFilters = () => {
    setFilters({
      minPrice: filterOptions.priceRange.min,
      maxPrice: filterOptions.priceRange.max,
      colors: [],
      productTypes: [],
    });
  };

  const getColorStyle = (color: string) => {
    const colorMap: { [key: string]: string } = {
      white: "#FFFFFF",
      black: "#000000",
      red: "#FF0000",
      blue: "#0000FF",
      green: "#008000",
      yellow: "#FFFF00",
      pink: "#FFC0CB",
      purple: "#800080",
      orange: "#FFA500",
      brown: "#A52A2A",
      gray: "#808080",
      grey: "#808080",
      gold: "#D4AF37",
      silver: "#C0C0C0",
      navy: "#000080",
      maroon: "#800000",
      olive: "#808000",
      lime: "#00FF00",
      aqua: "#00FFFF",
      teal: "#008080",
      fuchsia: "#FF00FF",
    };

    return colorMap[color.toLowerCase()] || color;
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
        <div className="w-full  bg-[#f9f2e8] p-5 h-fit -ml-[12%] flex flex-col gap-4">
          <div className="flex items-center justify-between mb-6 lg:w-[18vw]">
            <h2 className="text-3xl font-semibold jiji ">Filters</h2>
            {(filters.colors.length > 0 ||
              filters.productTypes.length > 0 ||
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
              onClick={() => toggleSection("price")}
              className="flex items-center justify-between w-full text-left font-medium mb-3"
            >
              <span>Price</span>
              {expandedSections.price ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            {expandedSections.price && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-1">
                      Min
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        ₹
                      </span>
                      <input
                        type="number"
                        value={filters.minPrice}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            minPrice: Math.min(
                              Number(e.target.value),
                              prev.maxPrice
                            ),
                          }))
                        }
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gold bg-[#f2ede7]"
                        min={filterOptions.priceRange.min}
                        max={filterOptions.priceRange.max}
                      />
                    </div>
                  </div>
                  <span className="text-gray-500 mt-6">To</span>
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-1">
                      Max
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        ₹
                      </span>
                      <input
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            maxPrice: Math.max(
                              Number(e.target.value),
                              prev.minPrice
                            ),
                          }))
                        }
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
              onClick={() => toggleSection("productType")}
              className="flex items-center justify-between w-full text-left font-medium mb-3"
            >
              <span>Product Type</span>
              {expandedSections.productType ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            {expandedSections.productType && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {filterOptions.productTypes.map((type) => (
                  <label
                    key={type}
                    className="flex items-center cursor-pointer "
                  >
                    <input
                      type="checkbox"
                      checked={filters.productTypes.includes(type)}
                      onChange={() => handleProductTypeFilter(type)}
                      className="mr-3 accent-[#f9f2e8] bg-[#f9f2e8] h-5 w-5"
                    />
                    <span className="text-sm capitalize ">{type}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Color Filter */}
          <div className="mb-6 text-lg">
            <button
              onClick={() => toggleSection("color")}
              className="flex items-center justify-between w-full text-left font-medium mb-3"
            >
              <span>Color</span>
              {expandedSections.color ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            {expandedSections.color && (
              <div className="grid grid-cols-4 gap-2">
                {filterOptions.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorFilter(color)}
                    className={`relative w-8 h-8 rounded-full border-2 ${
                      filters.colors.includes(color)
                        ? "border-gold border-4"
                        : "border-gray-300"
                    } ${color.toLowerCase() === "white" ? "shadow-md" : ""}`}
                    style={{ backgroundColor: getColorStyle(color) }}
                    title={color}
                  >
                    {filters.colors.includes(color) && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            ["white", "yellow", "lime", "aqua"].includes(
                              color.toLowerCase()
                            )
                              ? "bg-gray-800"
                              : "bg-white"
                          }`}
                        ></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort Options */}
          <div className="flex justify-between items-center mb-6 bg-[#f9f2e8] ">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className=" rounded px-3 py-2 focus:outline-none focus:border-gold bg-[#f9f2e8]"
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
