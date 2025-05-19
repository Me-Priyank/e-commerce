import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Announcement from './Announcement';
import { AnimatePresence, motion } from 'framer-motion';

const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {showAnnouncement && (
        <Announcement 
          message="Free Delivery all over India" 
          onClose={() => setShowAnnouncement(false)} 
        />
      )}
      <Header />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;