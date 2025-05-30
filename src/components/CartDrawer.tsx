import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer: React.FC = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getTotalItems, 
    getTotalPrice, 
    isCartOpen, 
    setIsCartOpen 
  } = useCart();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsCartOpen(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
          onClick={handleBackdropClick}
        />
      )}
      
      {/* Cart Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex items-start space-x-4 p-4 border rounded-lg">
                  {/* Product Image */}
                  <div className="w-16 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{item.name}</h3>
                    <p className="text-gray-600 text-xs">Size: {item.selectedSize}</p>
                    <p className="font-semibold text-sm mt-1">Rs. {item.price.toLocaleString()}.00</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center mt-3 space-x-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                      <button 
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="text-red-500 text-xs ml-4 hover:text-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-6 space-y-4">
            {/* Add Note Section */}
            <div className="flex items-center justify-between text-sm">
              <button className="flex items-center text-gray-600 hover:text-black transition-colors">
                <span className="mr-2">📝</span>
                Note
              </button>
              <button className="flex items-center text-gray-600 hover:text-black transition-colors">
                <span className="mr-2">🏷️</span>
                Coupon
              </button>
            </div>
            
            {/* Subtotal */}
            <div className="flex justify-between items-center text-lg font-semibold border-t pt-4">
              <span>Subtotal</span>
              <span>Rs. {getTotalPrice().toLocaleString()}.00</span>
            </div>
            
            {/* Checkout Button */}
            <button className="w-full bg-black text-white py-3 px-6 font-medium hover:bg-gray-800 transition-colors">
              Check out
            </button>
            
            {/* View Cart Link */}
            <button 
              onClick={() => {
                setIsCartOpen(false);
                // Navigate to cart page if you have one
              }}
              className="w-full text-center text-gray-600 hover:text-black transition-colors text-sm"
            >
              View Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;