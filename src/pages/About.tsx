import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const About: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <LazyLoadImage
            src="https://images.pexels.com/photos/2285485/pexels-photo-2285485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Elegant ethnic wear craftsmanship"
            effect="blur"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-dark/30"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-heading font-medium text-white mb-4">
              Our Story
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Preserving tradition, embracing modernity
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading mb-6">Our Mission</h2>
          <div className="w-20 h-[2px] bg-gold mx-auto mb-8"></div>
          <p className="text-gray-700 mb-6 leading-relaxed">
            At Elegance, we are dedicated to preserving the rich heritage of Indian craftsmanship 
            while embracing contemporary design sensibilities. Our mission is to create exquisite 
            ethnic wear that honors tradition, celebrates artistry, and empowers the artisans 
            who bring these magnificent creations to life.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We believe in the power of handcrafted luxury and are committed to creating 
            pieces that not only make you look beautiful but also tell a story of cultural 
            richness and artistic excellence.
          </p>
        </div>
      </section>

      {/* Journey */}
      <section className="py-16 bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold uppercase tracking-wider text-sm">Our Journey</span>
              <h2 className="text-3xl font-heading mt-2 mb-6">From Heritage to Modern Elegance</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our journey began in 2015 with a vision to revive traditional Indian craftsmanship 
                and make it relevant to the modern fashion landscape. Founded by Meera Patel, a 
                textile design graduate with a deep appreciation for India's rich textile heritage, 
                Elegance started as a small studio in Mumbai collaborating with a handful of artisans.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Over the years, we have grown into a recognized name in luxury ethnic wear, working 
                with over 200 master craftspeople across different regions of India. Each collection 
                we create is a labor of love, combining age-old techniques with contemporary designs 
                to create pieces that are timeless yet relevant.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, Elegance stands as a testament to the enduring beauty of Indian craftsmanship 
                and our commitment to preserving this cultural legacy for generations to come.
              </p>
            </div>
            <div>
              <LazyLoadImage
                src="https://images.pexels.com/photos/1456642/pexels-photo-1456642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Craftsman working on embroidery"
                effect="blur"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading">Our Values</h2>
          <div className="w-20 h-[2px] bg-gold mx-auto mt-3 mb-6"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-gold text-2xl">01</span>
            </div>
            <h3 className="text-xl font-heading mb-4">Artisanal Craftsmanship</h3>
            <p className="text-gray-600">
              We honor the skilled artisans who create our pieces, ensuring their craft is preserved 
              and celebrated. Each product is made with meticulous attention to detail, reflecting 
              generations of expertise.
            </p>
          </div>
          <div className="text-center p-8 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-gold text-2xl">02</span>
            </div>
            <h3 className="text-xl font-heading mb-4">Ethical Practices</h3>
            <p className="text-gray-600">
              We are committed to ethical manufacturing processes, fair wages for our artisans, 
              and responsible sourcing of materials. We believe in creating beautiful products 
              in a way that respects both people and the planet.
            </p>
          </div>
          <div className="text-center p-8 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-gold text-2xl">03</span>
            </div>
            <h3 className="text-xl font-heading mb-4">Timeless Design</h3>
            <p className="text-gray-600">
              We create designs that transcend trends, focusing on timeless elegance and versatility. 
              Our pieces are meant to be cherished and worn for years to come, representing a 
              sustainable approach to luxury fashion.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading">Our Team</h2>
            <div className="w-20 h-[2px] bg-gold mx-auto mt-3 mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Meet the passionate minds behind Elegance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-full w-40 h-40 mx-auto">
                <LazyLoadImage
                  src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Meera Patel - Founder & Creative Director"
                  effect="blur"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-heading mb-1">Meera Patel</h3>
              <p className="text-gray-500 mb-3">Founder & Creative Director</p>
              <p className="text-gray-600 max-w-xs mx-auto">
                With a background in textile design, Meera brings a deep understanding of fabrics 
                and traditional craftsmanship to Elegance.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-full w-40 h-40 mx-auto">
                <LazyLoadImage
                  src="https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Raj Sharma - Head of Production"
                  effect="blur"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-heading mb-1">Raj Sharma</h3>
              <p className="text-gray-500 mb-3">Head of Production</p>
              <p className="text-gray-600 max-w-xs mx-auto">
                Raj oversees our production processes, working closely with artisan communities 
                to maintain our high standards of quality.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-full w-40 h-40 mx-auto">
                <LazyLoadImage
                  src="https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Anjali Desai - Design Lead"
                  effect="blur"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-heading mb-1">Anjali Desai</h3>
              <p className="text-gray-500 mb-3">Design Lead</p>
              <p className="text-gray-600 max-w-xs mx-auto">
                With an eye for detail and color, Anjali creates designs that honor tradition 
                while incorporating contemporary elements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-heading mb-4">Experience the Elegance Difference</h2>
          <p className="max-w-2xl mx-auto mb-8 text-white/80">
            Discover our exquisite collections and experience the perfect blend of tradition and modern design.
          </p>
          <a href="/collections" className="inline-block bg-gold text-white px-8 py-3 hover:bg-gold/90 transition-colors">
            Explore Our Collections
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;