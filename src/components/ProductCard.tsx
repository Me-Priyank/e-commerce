import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  colors: string[];
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden">
          {/* Main Image */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <LazyLoadImage
              src={product.images[0]}
              alt={product.name}
              effect="blur"
              className="h-[100vh] w-full "
            />
          </motion.div>

          {/* Hover Image */}
          <AnimatePresence>
            {isHovered && (
              <motion.img
                key="hover-img"
                src="https://images.unsplash.com/photo-1531734510209-2da4a139a53a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={`${product.name} hover`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1.1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>

          {/* Overlay */}
          <div className="product-card-overlay pointer-events-none absolute inset-0 bg-black bg-opacity-10 z-10"></div>

          

          
        </div>
      </Link>

      {/* Product Info */}
      <div className="pt-4 pb-2">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-2xl hover:text-gold transition-colors">{product.name}</h3>
          <h3 className='text-2xl'>Description Of This Product</h3>
        </Link>
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center">
            {product.isSale && product.discount ? (
              <>
                <span className="text-black text-sm ">
                  ₹{(product.price * (1 - product.discount / 100)).toLocaleString()}
                </span>
                <span className="ml-2 text-gray-500 line-through text-sm">
                  ₹{product.price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-gold font-medium">₹{product.price.toLocaleString()}</span>
            )}
          </div>
          <div className="flex space-x-1">
            {product.colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor:
                    color === 'white'
                      ? '#FFFFFF'
                      : color === 'gold'
                      ? '#D4AF37'
                      : color === 'blue'
                      ? '#A7C7E7'
                      : color === 'pink'
                      ? '#FFB6C1'
                      : color === 'green'
                      ? '#90EE90'
                      : color,
                }}
              ></div>
            ))}
            {product.colors.length > 3 && (
              <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
