import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface CategoryMenuProps {
  categories: string[];
  occasions: string[];
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ categories, occasions }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.div 
      className="absolute top-full left-0 bg-[#f9f2e8] shadow-lg min-w-[250px] z-50 border border-gray-200"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="py-2">
        {/* All Products Link */}
        <NavLink
          to="/collection/all"
          className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
        >
          All Products
        </NavLink>

        {/* Shop By Category */}
        <div 
          className="relative"
          onMouseEnter={() => setHoveredItem('category')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 cursor-pointer group">
            <span className="text-gray-700 group-hover:text-black transition-colors">
              Shop By Category
            </span>
            <ChevronRight size={16} className="text-gray-400 group-hover:text-black transition-colors" />
          </div>
          
          {/* Category Submenu */}
          <AnimatePresence>
            {hoveredItem === 'category' && (
              <motion.div
                className="absolute left-full top-0 bg-[#f9f2e8] shadow-lg min-w-[200px] border border-gray-200 ml-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
              >
                <div className="py-2">
                  {categories.map((category) => (
                    <NavLink
                      key={category}
                      to={`/collection/all?category=${encodeURIComponent(category.toLowerCase())}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition-colors capitalize"
                    >
                      {category}
                    </NavLink>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Shop By Occasion */}
        <div 
          className="relative"
          onMouseEnter={() => setHoveredItem('occasion')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 cursor-pointer group">
            <span className="text-gray-700 group-hover:text-black transition-colors">
              Shop By Occasion
            </span>
            <ChevronRight size={16} className="text-gray-400 group-hover:text-black transition-colors" />
          </div>
          
          {/* Occasion Submenu */}
          <AnimatePresence>
            {hoveredItem === 'occasion' && (
              <motion.div
                className="absolute left-full top-0 bg-[#f9f2e8] shadow-lg min-w-[200px] border border-gray-200 ml-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
              >
                <div className="py-2">
                  {occasions.map((occasion) => (
                    <NavLink
                      key={occasion}
                      to={`/collection/all?occasion=${encodeURIComponent(occasion.toLowerCase())}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition-colors capitalize"
                    >
                      {occasion}
                    </NavLink>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryMenu;