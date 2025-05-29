import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../data/products';

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

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

      {products.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl mb-2">No products found</h3>
          <p className="text-gray-600">Try again later</p>
        </div>
      )}
    </div>
  );
};

export default AllProducts;