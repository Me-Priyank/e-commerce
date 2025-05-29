import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Heart, Share2, ShoppingBag, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { getProductById, getRelatedProducts } from '../data/products';


const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    console.log('Added to cart:', {
      ...product,
      selectedSize,
      quantity
    });
    
    // Here you would add the product to your cart state/context
  };

  return (
    <div className="container-custom py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-8 text-sm">
        <Link to="/" className="text-gray-500 hover:text-gold">Home</Link>
        <ChevronRight size={16} className="mx-2 text-gray-400" />
        <Link to={`/collection/${product.category.toLowerCase()}`} className="text-gray-500 hover:text-gold capitalize">
          {product.category}
        </Link>
        <ChevronRight size={16} className="mx-2 text-gray-400" />
        <span className="text-gray-800">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-[3/4] overflow-hidden bg-gray-100">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <LazyLoadImage
                src={selectedImage}
                alt={product.name}
                effect="blur"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image: string, index: number) => (
              <button 
                key={index}
                className={`aspect-square overflow-hidden ${selectedImage === image ? 'ring-2 ring-gold' : 'opacity-70'}`}
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

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-heading mb-2">{product.name}</h1>
          <p className="text-2xl font-heading text-gold mb-4">₹{product.price.toLocaleString()}</p>
          
          {/* Color Options */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Color: <span className="capitalize">{product.colors[0]}</span></h3>
            <div className="flex space-x-2">
              {product.colors.map((color: string, index: number) => (
                <div 
                  key={index}
                  className={`w-8 h-8 rounded-full p-0.5 ${index === 0 ? 'ring-2 ring-gold' : ''}`}
                >
                  <div 
                    className="w-full h-full rounded-full" 
                    style={{ backgroundColor: color === 'white' ? '#FFFFFF' : color === 'gold' ? '#D4AF37' : color === 'blue' ? '#A7C7E7' : color === 'pink' ? '#FFB6C1' : color === 'green' ? '#90EE90' : color }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Size Options */}
          {product.sizes && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Size</h3>
                <button className="text-xs text-gold underline">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size: string, index: number) => (
                  <button
                    key={index}
                    className={`border py-2 px-3 text-center hover:border-gold transition-colors ${
                      selectedSize === size ? 'border-gold bg-gold/5' : 'border-gray-300'
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
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Quantity</h3>
            <div className="flex w-32 border border-gray-300">
              <button 
                className="w-10 h-10 flex items-center justify-center border-r border-gray-300"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-12 h-10 text-center border-none focus:ring-0"
              />
              <button 
                className="w-10 h-10 flex items-center justify-center border-l border-gray-300"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-4 mb-8">
            <button 
              onClick={handleAddToCart}
              className="btn-primary flex-1 flex items-center justify-center"
            >
              <ShoppingBag size={18} className="mr-2" />
              Add to Cart
            </button>
            <button className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:border-gold transition-colors">
              <Heart size={20} />
            </button>
            <button className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:border-gold transition-colors">
              <Share2 size={20} />
            </button>
          </div>
          
          {/* Product Description */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <div className="prose text-gray-600">
              <p>{product.description}</p>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-2">Details</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Handcrafted in pure silk</li>
              <li>• Embellished with intricate embroidery</li>
              <li>• Dry clean only</li>
              <li>• Product Code: {product.id}</li>
            </ul>
          </div>
          
          {/* Shipping Info */}
          <div>
            <h3 className="text-lg font-medium mb-2">Shipping & Returns</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Free shipping all over India</li>
              <li>• Express delivery available (2-3 business days)</li>
              <li>• Easy 14 days return policy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-heading text-center mb-2">You May Also Like</h2>
          <div className="w-20 h-[2px] bg-gold mx-auto mt-3 mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;