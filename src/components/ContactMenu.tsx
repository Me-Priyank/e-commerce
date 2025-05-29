import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const ContactMenu: React.FC = () => {
  return (
    <motion.div 
      className="absolute top-full left-0 bg-[#f9f2e8] shadow-lg p-6 min-w-[300px] z-50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="grid grid-cols-1 gap-x-20 gap-y-8">
        <div>
          <ul className="space-y-2">
            <li><NavLink to="/Contact" className="text-lg hover:text-gold">Contact</NavLink></li>
            <li><NavLink to="/book-appointment" className="text-lg hover:text-gold">Book Appointment</NavLink></li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactMenu;