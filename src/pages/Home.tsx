import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { motion } from 'framer-motion';
import { getAllProducts } from '../data/products';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const hoverImageUrl = "https://panktichheda.com/cdn/shop/files/Pankti20244126.jpg?v=1728135409&width=750";

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        // Take first 6 products for featured section
        setFeaturedProducts(allProducts.slice(0, 6));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <LazyLoadImage
            src="https://images.pexels.com/photos/2878761/pexels-photo-2878761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Elegant ethnic wear"
            effect="blur"
            className="w-full lg:w-[100vw] h-full object-cover"
          />
          <div className="absolute inset-0 bg-dark/40"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-heading font-medium text-white mb-4">
              Elegance in Every Thread
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Discover our exquisite collection of handcrafted ethnic wear
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-40">
              <Link to="/all" className="btn-primary">Shop Now</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className='h-[40vh] w-full lg:h-[40vh] lg:w-[100vw] bg-[#f9f2e8] flex flex-col justify-center items-center text-center lg:px-80 gap-8'>
        <h1 className='text-3xl lg:text-4xl'>
        SAAH by Pankti Chheda
        </h1>
        <p className='text-sm lg:text-xl'>
        This collection breathes life into Indian fashion by fusing tradition with modern elegance. What set's SAAH apart is its thoughtful curation of intricate handpainting and embroidery, blending artistic motifs with a contemporary twist to celebrate Indian culture and craftsmanship.
        </p>
      </div>

      <div
        className=" relative h-[80vh] w-full bg-cover flex bg-center text-center justify-center items-center text-white lg:px-40 px-4 text-xl"
        style={{
          backgroundImage: "url('https://panktichheda.com/cdn/shop/files/Pankti20244411_1_1.jpg?v=1728500744&width=2000')"
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-white flex items-center justify-center h-full">
          This range transforms each garment into a canvas, showcasing hand-painted artistry with meticulous brushstrokes. Paired with intricate embroidery, it blends traditional Indian craftsmanship with modern design, offering a seamless fusion of luxury and contemporary fashion.
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="py-10 px-4 md:px-8 w-full">
        <div className="text-center mb-12">
          {/* Optional section title */}
        </div>

        {isLoading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-[700px] rounded mb-4"></div>
                <div className="bg-gray-200 h-6 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-5 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group">
                <Link 
                  to={`/product/${product.id}`} 
                  className="relative overflow-hidden h-[700px] block"
                >
                  {/* Original Image */}
                  <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0">
                    <img
                      src={product.images[0] || product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Hover Image (Second image or fallback to hover image) */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-105 group-hover:scale-110">
                    <img
                      src={product.images[1] || hoverImageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Sale/New badges */}
                  
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    
                  </div>
                </Link>
                
                {/* Product Information Below Image */}
                <div className="mt-4 px-2">
                  <h3 className="text-xl font-heading uppercase tracking-wider text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm md:text-base">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-lg text-gray-800">
                      Rs. {product.price.toLocaleString()}.00
                    </p>
                    {product.isSale && product.originalPrice && (
                      <p className="text-sm text-gray-500 line-through">
                        Rs. {product.originalPrice.toLocaleString()}.00
                      </p>
                    )}
                  </div>
                  
                  {/* Colors available */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {product.colors.slice(0, 4).map((color: string, index: number) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.toLowerCase() }}
                          title={color}
                        ></div>
                      ))}
                      {product.colors.length > 4 && (
                        <span className="text-xs text-gray-500 ml-1">
                          +{product.colors.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link 
            to="/all" 
            className="inline-block px-6 py-3 text-sm font-medium tracking-wider text-black border border-black hover:bg-black hover:text-white transition-colors duration-300 rounded-lg mt-5"
          >
            Shop All Products
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;