import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  selectedSize: string;
  quantity: number;
  category?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isLoading: boolean;
  pendingCartAction: (() => void) | null; // For storing pending cart actions
  setPendingCartAction: (action: (() => void) | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper function to check if user is logged in
const isUserLoggedIn = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const token = localStorage.getItem('access_token');
    return !!token;
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
};

// Helper function to safely access localStorage
const getStoredCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const savedCart = localStorage.getItem('shopping-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

// Helper function to safely save to localStorage
const saveCartToStorage = (cartItems: CartItem[]) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('shopping-cart', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [pendingCartAction, setPendingCartAction] = useState<(() => void) | null>(null);
  const navigate = useNavigate();

  // Load cart from localStorage on component mount
  useEffect(() => {
    const loadCart = () => {
      const storedCart = getStoredCart();
      setCartItems(storedCart);
      setIsLoading(false);
      setIsInitialized(true);
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(loadCart, 10);
    
    return () => clearTimeout(timer);
  }, []);

  // Save cart to localStorage whenever cartItems change (but not on initial load)
  useEffect(() => {
    if (isInitialized) {
      saveCartToStorage(cartItems);
    }
  }, [cartItems, isInitialized]);

  // Execute pending cart action after login
  useEffect(() => {
    if (pendingCartAction && isUserLoggedIn()) {
      pendingCartAction();
      setPendingCartAction(null);
    }
  }, [pendingCartAction]);

  const addToCart = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    // Check if user is logged in
    if (!isUserLoggedIn()) {
      // Store the add to cart action to execute after login
      setPendingCartAction(() => () => {
        const quantity = item.quantity || 1;
        
        setCartItems(prevItems => {
          const existingItemIndex = prevItems.findIndex(
            cartItem => cartItem.id === item.id && cartItem.selectedSize === item.selectedSize
          );

          if (existingItemIndex > -1) {
            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex].quantity += quantity;
            return updatedItems;
          } else {
            return [...prevItems, { ...item, quantity }];
          }
        });
        
        // Open cart after adding item
        setIsCartOpen(true);
      });
      
      // Redirect to login
      navigate('/login');
      return;
    }

    // User is logged in, proceed with adding to cart
    const quantity = item.quantity || 1;
    
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        cartItem => cartItem.id === item.id && cartItem.selectedSize === item.selectedSize
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  const removeFromCart = (id: string, size: string) => {
    if (!isUserLoggedIn()) {
      navigate('/login');
      return;
    }

    setCartItems(prevItems => 
      prevItems.filter(item => !(item.id === id && item.selectedSize === size))
    );
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (!isUserLoggedIn()) {
      navigate('/login');
      return;
    }

    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    if (!isUserLoggedIn()) {
      navigate('/login');
      return;
    }

    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Override setIsCartOpen to check login status
  const handleSetIsCartOpen = (open: boolean) => {
    if (open && !isUserLoggedIn()) {
      // Store the action to open cart after login
      setPendingCartAction(() => () => {
        setIsCartOpen(true);
      });
      navigate('/login');
      return;
    }
    
    setIsCartOpen(open);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      isCartOpen,
      setIsCartOpen: handleSetIsCartOpen,
      isLoading,
      pendingCartAction,
      setPendingCartAction
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};