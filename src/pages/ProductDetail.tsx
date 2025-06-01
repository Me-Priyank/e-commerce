import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

import { useParams, Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  Heart,
  Share2,
  ShoppingBag,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { getProductById, getRelatedProducts } from "../data/products";
import { apiRequest } from "../utils/apiCall";
import { API_URL, APP_URL } from "../constants";

const ProductDetail: React.FC = () => {
  const { addToCart, setIsCartOpen } = useCart(); // Add setIsCartOpen here

  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const userDetails = localStorage.getItem("user_data");
  const user = JSON.parse(userDetails || "{}");
  console.log("User Details:", user);
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    description: false,
    delivery: false,
    disclaimer: false,
    washcare: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsLoading(true);
        const fetchedProduct = await getProductById(id);

        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setSelectedImage(fetchedProduct.images[0]);
          if (fetchedProduct.sizes && fetchedProduct.sizes.length > 0) {
            setSelectedSize(fetchedProduct.sizes[0]);
          }

          const related = await getRelatedProducts(id, fetchedProduct.category);
          setRelatedProducts(related);
        }

        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 w-1/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 w-2/4 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl mb-4">Product Not Found</h1>
        <p className="mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/"
          className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    // const cartItem = {
    //   userId: user.id,
    //   productVariantId: product.id,
    //   quantity: quantity,
    //   savedForLater: true,
    // };
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      selectedSize,
      quantity,
      category: product.category,
    };

    // try {
    //   const response = await apiRequest(APP_URL + "/api/cart/manage", {
    //     method: "POST",
    //     body: cartItem,
    //   });
    //   setIsCartOpen(true);
    //   console.log({ response });
    // } catch (error) {
    //   console.error("Error fetching products:", error);
    //   return [];
    // }
    addToCart(cartItem);
    setIsCartOpen(true);
    // Open the cart drawer after adding item

    // Optional: Remove the alert since cart will open
    // alert('Added to cart successfully!');
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    console.log("Buy now:", {
      ...product,
      selectedSize,
      quantity,
    });
  };

  return (
    <>
      <div className="bg-[#f9f2e8] px-40 mt-6">
        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Images - Left Side */}
            <div className="space-y-4">
              <div className="aspect-[3/4] overflow-hidden bg-gray-50 rounded-lg">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <LazyLoadImage
                    src={selectedImage}
                    alt={product.name}
                    effect="blur"
                    className="w-full h-[100vh] object-cover"
                  />
                </motion.div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    className={`aspect-square overflow-hidden rounded-md border-2 transition-all ${
                      selectedImage === image
                        ? "border-black"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <LazyLoadImage
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      effect="blur"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info - Right Side */}
            <div className="space-y-6">
              {/* Brand and Product Name */}
              <div>
                <h2 className="text-5xl font-light text-gray-800 mb-2">
                  {product.name}
                </h2>
                <h1 className="text-lg font-medium text-black uppercase tracking-wide">
                  Description Of This Product
                </h1>
              </div>

              {/* Price */}
              <div>
                <p className="text-lg text-black">
                  Rs. {product.price.toLocaleString()}.00
                </p>
                <p className="text-sm text-gray-600">Tax included.</p>
              </div>

              {/* Size Selection */}
              {product.sizes && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm text-black">Size: {selectedSize}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size: string) => (
                      <button
                        key={size}
                        className={`px-4 py-2 border text-sm transition-all ${
                          selectedSize === size
                            ? "bg-black text-white border-black"
                            : "bg-white text-black border-gray-300 hover:border-black"
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-sm text-black mb-3">Quantity</h3>
                <div>
                  <div className="flex flex-row w-full">
                    <div className="flex items-center border border-gray-900 w-32 rounded">
                      <button
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-2xl"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(
                            Math.max(1, parseInt(e.target.value) || 1)
                          )
                        }
                        className="w-12 h-10 text-center border-none focus:ring-0 focus:outline-none bg-[#f9f2e8] pl-4"
                      />
                      <button
                        className="w-10 h-10 flex items-center justify-center  hover:bg-gray-50 transition-colors text-2xl"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="w-full ml-8">
                      <button
                        onClick={handleAddToCart}
                        className="w-full bg-[#f9f2e8] border border-black text-black py-3 px-6 font-medium hover:bg-black hover:text-white transition-all duration-200 rounded"
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-[#c1cdbd] text-black py-3 px-6 font-medium hover:bg-black/90 hover:text-white transition-all duration-200"
                >
                  BUY IT NOW
                </button>
              </div>

              {/* Collapsible Sections */}
              <div className="space-y-0 border-t border-gray-200 pt-6">
                {/* Description */}
                <div className="border-b border-black">
                  <button
                    onClick={() => toggleSection("description")}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-lg text-black">Description</span>
                    {expandedSections.description ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                  {expandedSections.description && (
                    <div className="pb-4">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Delivery Timelines */}
                <div className="border-b border-black">
                  <button
                    onClick={() => toggleSection("delivery")}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-lg text-black">
                      Delivery Timelines
                    </span>
                    {expandedSections.delivery ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                  {expandedSections.delivery && (
                    <div className="pb-4">
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Standard Delivery: 5-7 business days</li>
                        <li>• Express Delivery: 2-3 business days</li>
                        <li>• Free shipping on orders above ₹2000</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Disclaimer */}
                <div className="border-b border-black">
                  <button
                    onClick={() => toggleSection("disclaimer")}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-lg text-black">Disclaimer</span>
                    {expandedSections.disclaimer ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                  {expandedSections.disclaimer && (
                    <div className="pb-4">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Product colors may vary slightly due to photographic
                        lighting or your monitor settings. Handcrafted products
                        may have minor variations that make each piece unique.
                      </p>
                    </div>
                  )}
                </div>

                {/* Washcare Instructions */}
                <div className="border-b border-black">
                  <button
                    onClick={() => toggleSection("washcare")}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-lg text-black">
                      Washcare Instructions
                    </span>
                    {expandedSections.washcare ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                  {expandedSections.washcare && (
                    <div className="pb-4">
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Dry clean only</li>
                        <li>• Do not bleach</li>
                        <li>• Store in cool, dry place</li>
                        <li>• Handle with care</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Floating Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            onClick={() => window.open("https://wa.me/your-number", "_blank")}
          >
            <MessageCircle size={24} fill="currentColor" />
          </button>
        </div>
      </div>
      <div className="px-20">
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <p className=" text-center mb-12 jiji text-5xl">
              You Might Also Like
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
