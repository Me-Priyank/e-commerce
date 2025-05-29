import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import Logo from './Logo';
import CategoryMenu from './CategoryMenu';
import ContactMenu from './ContactMenu';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showContactMenu, setShowContactMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  const location = useLocation();
  const lastScrollYRef = useRef(0);
  const ticking = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close menus when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setShowCategoryMenu(false);
    setShowContactMenu(false);
    setShowSearch(false);
  }, [location]);

  // Instant responsive scroll handler
  useEffect(() => {
    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollYRef.current;
      
      // Update scrolled state
      const shouldBeScrolled = currentScrollY > 50;
      if (isScrolled !== shouldBeScrolled) {
        setIsScrolled(shouldBeScrolled);
      }

      // Instant response to any scroll direction after initial threshold
      if (currentScrollY > 100) { // Only start hiding/showing after 100px
        if (scrollDifference > 10) {
          // Scrolling down - hide instantly
          if (isVisible) {
            setIsVisible(false);
          }
        } else if (scrollDifference < -10) {
          // Scrolling up - show instantly
          if (!isVisible) {
            setIsVisible(true);
          }
        }
      } else {
        // Always show when near top
        if (!isVisible) {
          setIsVisible(true);
        }
      }

      lastScrollYRef.current = currentScrollY;
      ticking.current = false;
    };

    const handleScroll = () => {
      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Immediate response with minimal throttling
      if (!ticking.current) {
        ticking.current = true;
        updateHeader();
        
        // Very short timeout for final cleanup
        timeoutRef.current = setTimeout(() => {
          if (!ticking.current) {
            updateHeader();
          }
        }, 8); // Faster response
      }
    };

    // Add passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isScrolled, isVisible]); // Add dependencies to ensure proper updates

  return (
    <>
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ease-out ${
          isScrolled ? 'bg-[#f9f2e8] shadow-md py-2' : 'bg-[#f9f2e8] py-12'
        } ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
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
              <NavLink to="/" className="nav-link lg:-mr-0">Home</NavLink>
              <div 
                className="relative "
                onMouseEnter={() => setShowCategoryMenu(true)}
                onMouseLeave={() => setShowCategoryMenu(false)}
              >
                <button className="nav-link flex items-center lg:mr-[80%]">
                  Shop
                  <svg className="w-2.5 h-2.5 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                  </svg>
                </button>
                {showCategoryMenu && <CategoryMenu />}
              </div>
            </div>
            <div className="flex gap-8  ">
              <NavLink to="/about" className="nav-link lg:ml-[130%]">About</NavLink>
              <div 
                className="relative "
                onMouseEnter={() => setShowContactMenu(true)}
                onMouseLeave={() => setShowContactMenu(false)}
              >
                <button className="nav-link flex items-center lg:mr-[80%]">
                  Contact
                  <svg className="w-2.5 h-2.5 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                  </svg>
                </button>
                {showContactMenu && <ContactMenu />}
              </div>
            </div>
          </nav>

          {/* Logo */}
          <Link to="/" className={`absolute left-1/2 transform -translate-x-1/2 mx-auto transition-all duration-300 ${
            isScrolled ? '-mt-[14%] lg:-mt-[5%]' : ''
          }`}>
            <Logo />
          </Link>

          {/* Account and Cart */}
          <div className="flex items-center space-x-4">
            <Link to="/account" className="p-2" aria-label="Account">
              <User size={20} />
            </Link>
            <Link to="/cart" className="p-2 relative" aria-label="Cart">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-gold text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-cream absolute top-full left-0 w-full shadow-md z-50">
            <nav className="flex flex-col p-4 space-y-3">
              <NavLink to="/" className="nav-link py-2">Home</NavLink>
              <button 
                className="flex items-center justify-between w-full py-2 nav-link"
                onClick={() => setShowCategoryMenu(!showCategoryMenu)}
              >
                Shop
                <svg className={`w-2.5 h-2.5 transform transition-transform ${showCategoryMenu ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>
              {showCategoryMenu && (
                <div className="pl-4 space-y-2">
                  <NavLink to="/collection/lehenga" className="block py-1 text-sm hover:text-gold">Lehenga</NavLink>
                  <NavLink to="/collection/saree" className="block py-1 text-sm hover:text-gold">Saree</NavLink>
                  <NavLink to="/collection/cape" className="block py-1 text-sm hover:text-gold">Cape</NavLink>
                  <NavLink to="/collection/palazzo" className="block py-1 text-sm hover:text-gold">Palazzo</NavLink>
                  <NavLink to="/collection/kaftan" className="block py-1 text-sm hover:text-gold">Kaftan</NavLink>
                  <NavLink to="/collection/jacket" className="block py-1 text-sm hover:text-gold">Jacket</NavLink>
                  <NavLink to="/collection/sharara" className="block py-1 text-sm hover:text-gold">Sharara</NavLink>
                </div>
              )}
              <NavLink to="/about" className="nav-link py-2">About</NavLink>
              <NavLink to="/contact" className="nav-link py-2">Contact</NavLink>
            </nav>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {showSearch && <SearchBar onClose={() => setShowSearch(false)} />}
    </>
  );
};

export default Header;