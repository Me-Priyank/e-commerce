import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
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
  return (
    <div className="product-card group">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden">
          <LazyLoadImage
            src={product.images[0]}
            alt={product.name}
            effect="blur"
            className="product-card-img h-[100vh] w-[100vw]"
          />
          <div className="product-card-overlay"></div>
          
          {/* Product Badges */}
          {(product.isNew || product.isSale) && (
            <div className="absolute top-3 left-3 space-y-1">
              {product.isNew && (
                <div className="bg-dark text-white px-2 py-1 text-xs uppercase">New</div>
              )}
              {product.isSale && (
                <div className="bg-gold text-white px-2 py-1 text-xs uppercase">Sale</div>
              )}
            </div>
          )}
          
          {/* Quick Actions */}
          <div className="product-quick-actions">
            <button className="text-dark hover:text-gold transition-colors" aria-label="Add to cart">
              <ShoppingBag size={20} />
            </button>
            <button className="text-dark hover:text-gold transition-colors" aria-label="Add to wishlist">
              <Heart size={20} />
            </button>
            <button className="text-dark hover:text-gold transition-colors" aria-label="Quick view">
              <Eye size={20} />
            </button>
          </div>
        </div>
      </Link>
      
      {/* Product Info */}
      <div className="pt-4 pb-2">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg hover:text-gold transition-colors">{product.name}</h3>
        </Link>
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center">
            {product.isSale && product.discount ? (
              <>
                <span className="text-gold font-medium">
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
                style={{ backgroundColor: color === 'white' ? '#FFFFFF' : color === 'gold' ? '#D4AF37' : color === 'blue' ? '#A7C7E7' : color === 'pink' ? '#FFB6C1' : color === 'green' ? '#90EE90' : color }}
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