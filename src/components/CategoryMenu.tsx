import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoryMenu: React.FC = () => {
  return (
    <motion.div 
      className="absolute top-full left-0 bg-[#f9f2e8] shadow-lg p-6 min-w-[300px] z-50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="grid grid-cols-2 gap-x-20 gap-y-8">
        <div>
          <h3 className="text-2xl font-heading font-medium font-bold text-nowrap mb-3">Category</h3>
          <ul className="space-y-2">
            <li><NavLink to="/collection/lehenga" className="text-sm hover:text-gold">Lehenga</NavLink></li>
            <li><NavLink to="/collection/saree" className="text-sm hover:text-gold">Saree</NavLink></li>
            <li><NavLink to="/collection/cape" className="text-sm hover:text-gold">Cape</NavLink></li>
            <li><NavLink to="/collection/palazzo" className="text-sm hover:text-gold">Palazzo</NavLink></li>
            <li><NavLink to="/collection/kaftan" className="text-sm hover:text-gold">Kaftan</NavLink></li>
            <li><NavLink to="/collection/jacket" className="text-sm hover:text-gold">Jacket</NavLink></li>
            <li><NavLink to="/collection/sharara" className="text-sm hover:text-gold">Sharara</NavLink></li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-heading font-medium font-bold text-nowrap mb-3">Occasion</h3>
          <ul className="space-y-2">
            <li><NavLink to="/occasion/wedding" className="text-sm hover:text-gold">Wedding</NavLink></li>
            <li><NavLink to="/occasion/party" className="text-sm hover:text-gold">Party</NavLink></li>
            <li><NavLink to="/occasion/festive" className="text-sm hover:text-gold">Festive</NavLink></li>
            <li><NavLink to="/occasion/casual" className="text-sm hover:text-gold">Casual</NavLink></li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryMenu;