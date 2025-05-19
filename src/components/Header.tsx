import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import Logo from './Logo';
import CategoryMenu from './CategoryMenu';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  // Close menus when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setShowCategoryMenu(false);
    setShowSearch(false);
  }, [location]);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled past threshold
      setIsScrolled(currentScrollY > 50);
      
      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past initial threshold
        setIsVisible(false);
      } else {
        // Scrolling up or at the top
        setIsVisible(true);
      }
      
      // Update last scroll position
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-cream shadow-md py-2' : 'bg-cream/95 py-12'
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
          <NavLink to="/contact" className="nav-link">Contact</NavLink>
          </div>
        </nav>

        {/* Logo */}
        <Link to="/" className={`absolute left-1/2 transform -translate-x-1/2 mx-auto ${
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