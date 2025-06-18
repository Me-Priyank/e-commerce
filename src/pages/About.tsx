import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-[#f9f2e8]">
      {/* Hero Section */}
      <section className="relative h-[40vh] overflow-hidden">
        
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-serif font-medium  mb-4">
              About Us
            </h1>
            <p className="text-lg md:text-xl ">
              Where international fashion meets Indian elegance
            </p>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif mb-6">Welcome to Queens and Dolls</h2>
          <div className="w-20 h-[2px] bg-amber-400 mx-auto mb-8"></div>
          <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed text-lg">
            Welcome to Queens and Dolls — where international fashion meets Indian elegance, all at an affordable price.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 mb-6 leading-relaxed">
            We are a premium fashion brand proudly owned by <strong>Marigold Exports into PVT LTD</strong>, a leading 
            name in export-oriented garment manufacturing. With a legacy of producing high-quality 
            apparel for top global brands like <strong>ZARA, H&M, Boohoo, ASOS</strong>, and more, we bring decades of 
            craftsmanship and global fashion experience to the Indian market.
          </p>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-16 bg-[#f9f2e8]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-600 uppercase tracking-wider text-md font-medium">Brand Story</span>
              <h2 className="text-5xl font-serif mt-2 mb-6">Our Legacy</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Backed by years of experience working with globally recognised fashion houses, Marigold 
                Exports has mastered:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">World-class garment production</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">High-quality fabric selection</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">On-trend design execution</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Now, that same excellence powers Queens and Dolls — your homegrown brand that delivers 
                international quality fashion, made for India.
              </p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/1456642/pexels-photo-1456642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Fashion craftsmanship"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Global Fashion Section */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-serif mb-4">🌍 Global Fashion, Now in India</h2>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            While serving global brands, we were asking ourselves: 
            <em className="text-amber-600"> Why shouldn't Indian consumers enjoy the same level of fashion excellence?</em>
          </p>
        </div>
        
        <div className="bg-amber-50 p-8 rounded-lg">
          <p className="text-gray-700 text-center leading-relaxed mb-4">
            Queens and Dolls was born from this very idea — to make global fashion trends and top-tier 
            craftsmanship accessible to fashion-forward Indians. From workwear to weekend wear, every 
            piece is thoughtfully created to reflect your unique personality and lifestyle.
          </p>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="py-16 bg-[#f9f2e8]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif">💎 What We Stand For</h2>
            <div className="w-20 h-[2px] bg-amber-400 mx-auto mt-3 mb-6"></div>
            <p className="text-gray-700 max-w-3xl mx-auto">
              At Queens and Dolls, fashion is more than clothing. It's confidence, individuality, and 
              self-expression. And we believe it should be:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-amber-600 text-2xl font-bold">★</span>
              </div>
              <h3 className="text-xl font-serif mb-4">Premium in Quality</h3>
              <p className="text-gray-600">
                Every piece meets international standards, crafted with precision and attention to detail.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-amber-600 text-2xl font-bold">✨</span>
              </div>
              <h3 className="text-xl font-serif mb-4">Effortlessly Stylish</h3>
              <p className="text-gray-600">
                Designs that seamlessly blend global trends with Indian sensibilities for modern elegance.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-amber-600 text-2xl font-bold">♥</span>
              </div>
              <h3 className="text-xl font-serif mb-4">Comfortable to Wear</h3>
              <p className="text-gray-600">
                Fashion that feels as good as it looks, designed for your active lifestyle.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow md:col-start-2">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-amber-600 text-2xl font-bold">💰</span>
              </div>
              <h3 className="text-xl font-serif mb-4">Affordable for All</h3>
              <p className="text-gray-600">
                Luxury-level garments without the luxury price tag through optimized supply chain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif">🤔 Why Choose Us?</h2>
          <div className="w-20 h-[2px] bg-amber-400 mx-auto mt-3 mb-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Global Standards, Local Touch</h3>
                <p className="text-gray-600">We use the same processes and expertise as we do for international brands — now tailored for Indian tastes.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Affordable Luxury</h3>
                <p className="text-gray-600">You shouldn't have to choose between quality and price. With us, you get both.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Exclusive & On-Trend Designs</h3>
                <p className="text-gray-600">Inspired by the latest global runways, our collections are always fresh, modern, and versatile.</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Customer First</h3>
                <p className="text-gray-600">We're committed to delivering quality, transparency, and satisfaction with every single order.</p>
              </div>
            </div>
            
            <div className="bg-amber-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">✨ Experience the Queens and Dolls Difference</h3>
              <p className="text-gray-700 mb-4">
                Whether you're dressing for a casual brunch, a boardroom meeting, or a night to remember, 
                our garments are designed to elevate your style and celebrate who you are.
              </p>
              <p className="text-gray-700 font-medium">
                Welcome to the new era of Indian fashion.<br />
                Welcome to Queens and Dolls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-4">Experience the Queens and Dolls Difference</h2>
          <p className="text-white/80 mb-8 text-lg">
            Discover our exquisite collections and experience the perfect blend of global fashion and Indian elegance.
          </p>
          
          <Link to="/collection/all" className="bg-amber-400 text-stone-900 px-8 py-3 rounded-md font-medium hover:bg-amber-300 transition-colors">Explore Our Collections</Link>
            
        </div>
      </section>
    </div>
  );
};

export default About;