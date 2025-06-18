import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import Logo from "./Logo";
import CategoryMenu from "./CategoryMenu";
import ContactMenu from "./ContactMenu";
import SearchBar from "./SearchBar";
import { useCart } from "../context/CartContext";
import { apiRequest } from "../utils/apiCall";
import { API_URL } from "../constants";

// Define types for the API response
interface ApiParams {
  category: string[];
  occasions: string[];
  colorVariants: string[];
}

const Header: React.FC = () => {
  const { getTotalItems, setIsCartOpen, isLoading } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showContactMenu, setShowContactMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  // State for API data
  const [categories, setCategories] = useState<string[]>([]);
  const [occasions, setOccasions] = useState<string[]>([]);

  const location = useLocation();
  const lastScrollYRef = useRef(0);
  const isScrollingDownRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close menus when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setShowCategoryMenu(false);
    setShowContactMenu(false);
    setShowSearch(false);
  }, [location]);

  // Stable scroll handler that prevents feedback loops
  useEffect(() => {
    const handleScroll = () => {
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Debounce scroll handling
      scrollTimeoutRef.current = setTimeout(() => {
        const currentScrollY = window.scrollY;
        const scrollDifference = currentScrollY - lastScrollYRef.current;

        // Update scrolled state (for header styling)
        setIsScrolled(currentScrollY > 50);

        // Handle visibility with larger thresholds to prevent flickering
        if (currentScrollY < 100) {
          // Always show header near the top
          setIsVisible(true);
          isScrollingDownRef.current = false;
        } else {
          // Only change visibility on significant scroll movements
          if (scrollDifference > 25) {
            // Scrolling down significantly
            if (!isScrollingDownRef.current) {
              setIsVisible(false);
              isScrollingDownRef.current = true;
            }
          } else if (scrollDifference < -25) {
            // Scrolling up significantly
            if (isScrollingDownRef.current) {
              setIsVisible(true);
              isScrollingDownRef.current = false;
            }
          }
        }

        lastScrollYRef.current = currentScrollY;
      }, 10); // Small debounce delay
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const totalItems = getTotalItems();

  const getCategoryAndOccasions = async () => {
    try {
      const response = await apiRequest(API_URL + "/products/get-params", {
        method: "GET",
      });

      console.log({ response }, "categories and occasions");
      
      // Set the categories and occasions from API response
      if (response?.category) {
        setCategories(response.category);
      }
      if (response?.occasions) {
        setOccasions(response.occasions);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getCategoryAndOccasions();
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-black ease-in-out ${
          isScrolled ? "bg-[#f9f2e8] shadow-md py-2" : "bg-[#f9f2e8] py-12"
        } ${isVisible ? "transform translate-y-0" : "transform -translate-y-full"}`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Search button */}
          <button
            className="p-2 transform translate-x-[260%] lg:translate-x-[0%]"
            onClick={() => setShowSearch(true)}
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 ">
            <div className="flex gap-8 lg:-ml-[20%]">
              <NavLink to="/" className="nav-link lg:-mr-0">
                Home
              </NavLink>
              <div
                className="relative "
                onMouseEnter={() => setShowCategoryMenu(true)}
                onMouseLeave={() => setShowCategoryMenu(false)}
              >
                <button className="nav-link flex items-center lg:mr-[80%]">
                  Shop
                  <svg
                    className="w-2.5 h-2.5 ml-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {showCategoryMenu && (
                  <CategoryMenu 
                    categories={categories} 
                    occasions={occasions} 
                  />
                )}
              </div>
            </div>
            <div className="flex gap-8  ">
              <NavLink to="/about" className="nav-link lg:ml-[130%]">
                About
              </NavLink>
              <div
                className="relative "
                onMouseEnter={() => setShowContactMenu(true)}
                onMouseLeave={() => setShowContactMenu(false)}
              >
                <button className="nav-link flex items-center lg:mr-[80%]">
                  Contact
                  <svg
                    className="w-2.5 h-2.5 ml-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {showContactMenu && <ContactMenu />}
              </div>
            </div>
          </nav>

          {/* Logo */}
          <Link
            to="/"
            className={`absolute left-1/2 transform -translate-x-1/2 mx-auto transition-all duration-300 ${
              isScrolled ? "-mt-[14%] lg:-mt-[5%]" : ""
            }`}
          >
            <Logo />
          </Link>

          {/* Account and Cart */}
          <div className="flex items-center space-x-4">
            <Link to="/account" className="p-2" aria-label="Account">
              <User size={20} />
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 relative"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {!isLoading && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-cream absolute top-full left-0 w-full shadow-md z-50">
            <nav className="flex flex-col p-4 space-y-3">
              <NavLink to="/" className="nav-link py-2">
                Home
              </NavLink>
              <button
                className="flex items-center justify-between w-full py-2 nav-link"
                onClick={() => setShowCategoryMenu(!showCategoryMenu)}
              >
                Shop
                <svg
                  className={`w-2.5 h-2.5 transform transition-transform ${
                    showCategoryMenu ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {showCategoryMenu && (
                <div className="pl-4 space-y-2">
                  {categories.map((category) => (
                    <NavLink
                      key={category}
                      to={`/collection/${category.toLowerCase()}`}
                      className="block py-1 text-sm hover:text-gold capitalize"
                    >
                      {category}
                    </NavLink>
                  ))}
                </div>
              )}
              <NavLink to="/about" className="nav-link py-2">
                About
              </NavLink>
              <NavLink to="/contact" className="nav-link py-2">
                Contact
              </NavLink>
            </nav>
          </div>
        )}
      </header>

      {/* Add spacer to prevent content jump when header changes size */}
      <div 
        className={`transition-all duration-300 ${
          isScrolled ? "h-16" : "h-32"
        }`}
      />

      {/* Search Modal */}
      {showSearch && <SearchBar onClose={() => setShowSearch(false)} />}
    </>
  );
};

export default Header;