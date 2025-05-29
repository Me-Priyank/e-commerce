import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and about */}
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Elegance is India's premium ethnic wear destination, offering exquisite 
              handcrafted pieces that blend traditional craftsmanship with contemporary designs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gold" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-gold text-sm">Home</Link></li>
              <li><Link to="/collection/saree" className="text-gray-300 hover:text-gold text-sm">Shop Sarees</Link></li>
              <li><Link to="/collection/lehenga" className="text-gray-300 hover:text-gold text-sm">Shop Lehengas</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-gold text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-gold text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-heading mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/shipping" className="text-gray-300 hover:text-gold text-sm">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-gray-300 hover:text-gold text-sm">Returns & Exchanges</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-gold text-sm">FAQs</Link></li>
              <li><Link to="/size-guide" className="text-gray-300 hover:text-gold text-sm">Size Guide</Link></li>
              <li><Link to="/care" className="text-gray-300 hover:text-gold text-sm">Product Care</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-heading mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-gold" />
                <span className="text-sm text-gray-300">789 Fashion Street, Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-gold" />
                <span className="text-sm text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-gold" />
                <span className="text-sm text-gray-300">contact@elegance.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Book an Appointment */}
        <div className="border-t border-gray-700 pt-8 pb-4">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Calendar size={24} className="text-gold mr-2" />
              <h3 className="text-xl font-heading">Book Your Appointment</h3>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Visit our studio for personalized styling and custom fittings. 
              Book your appointment today for an exclusive shopping experience.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="text-sm text-gray-300">
                <p>Available: Monday - Saturday</p>
                <p>11:00 AM - 7:00 PM IST</p>
              </div>
              <Link 
                to="/book-appointment" 
                className="bg-gold hover:bg-gold/90 text-white px-6 py-2 inline-flex items-center"
              >
                <Calendar size={18} className="mr-2" />
                Schedule Now
              </Link>
            </div>
          </div>
        </div>

        

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Elegance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;