import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts } from '../data/products';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const featured = await getFeaturedProducts();
        setFeaturedProducts(featured);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, []);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <LazyLoadImage
            src="https://images.pexels.com/photos/2878761/pexels-photo-2878761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Elegant ethnic wear"
            effect="blur"
            className="w-full lg:w-[100vw] h-full object-cover"
          />
          <div className="absolute inset-0 bg-dark/40"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-heading font-medium text-white mb-4">
              Elegance in Every Thread
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Discover our exquisite collection of handcrafted ethnic wear
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/collection/lehenga" className="btn-primary">Shop Lehengas</Link>
              <Link to="/collection/saree" className="btn-secondary">Shop Sarees</Link>
            </div>
          </motion.div>
        </div>
      </section>
      <div className='h-[40vh] w-full lg:h-[40vh] lg:w-[100vw] bg-white flex flex-col justify-center items-center text-center lg:px-80 gap-8'>
        <h1 className='text-3xl lg:text-4xl'>
        SAAH by Pankti Chheda
        </h1>
        <p className='text-sm lg:text-xl'>
        This collection breathes life into Indian fashion by fusing tradition with modern elegance. What set’s SAAH apart is its thoughtful curation of intricate handpainting and embroidery, blending artistic motifs with a contemporary twist to celebrate Indian culture and craftsmanship.
        </p>
      </div>

      {/* Categories Section */}
      <section className="py-16 container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading">Shop By Category</h2>
          <div className="w-20 h-[2px] bg-gold mx-auto mt-3 mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Explore our exquisite range of ethnic wear, each piece handcrafted with love and tradition
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8  duration-700 ease-in-out">
          {/* Category Card 1 */}
          <Link to="/collection/saree" className="group relative overflow-hidden h-[600px]  duration-700 ease-in-out">
            <LazyLoadImage
              src="https://images.pexels.com/photos/7772528/pexels-photo-7772528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Sarees"
              effect="blur"
              className="h-[100vh] w-[100vw] object-cover transition-transform duration-700 group-hover:scale-110 duration-300 ease-in-out"
            />
            <div className="absolute inset-0 bg-dark/30 group-hover:bg-dark/40 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-2xl font-heading text-white">Sarees</h3>
              <div className="w-12 h-[1px] bg-gold my-3"></div>
              <span className="text-white/90 text-sm">Explore Collection</span>
            </div>
          </Link>
          
          {/* Category Card 2 */}
          <Link to="/collection/lehenga" className="group relative overflow-hidden h-[600px]">
            <LazyLoadImage
              src="https://images.pexels.com/photos/2950650/pexels-photo-2950650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Lehengas"
              effect="blur"
              className="h-[100vh] w-[100vw] object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-dark/30 group-hover:bg-dark/40 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-2xl font-heading text-white">Lehengas</h3>
              <div className="w-12 h-[1px] bg-gold my-3"></div>
              <span className="text-white/90 text-sm">Explore Collection</span>
            </div>
          </Link>
          
          {/* Category Card 3 */}
          <Link to="/collection/kaftan" className="group relative overflow-hidden h-[600px]">
            <LazyLoadImage
              src="https://images.pexels.com/photos/2797086/pexels-photo-2797086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Kaftans"
              effect="blur"
              className="h-[100vh] w-[100vw] object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-dark/30 group-hover:bg-dark/40 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-2xl font-heading text-white">Kaftans</h3>
              <div className="w-12 h-[1px] bg-gold my-3"></div>
              <span className="text-white/90 text-sm">Explore Collection</span>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Category Card 1 */}
          <Link to="/collection/saree" className="group relative overflow-hidden h-[600px]">
            <LazyLoadImage
              src="https://images.pexels.com/photos/7772528/pexels-photo-7772528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Sarees"
              effect="blur"
              className="h-[100vh] w-[100vw] object-cover transition-transform duration-700 duration-300 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-dark/30 group-hover:bg-dark/40 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-2xl font-heading text-white">Sarees</h3>
              <div className="w-12 h-[1px] bg-gold my-3"></div>
              <span className="text-white/90 text-sm">Explore Collection</span>
            </div>
          </Link>
          
          {/* Category Card 2 */}
          <Link to="/collection/lehenga" className="group relative overflow-hidden h-[600px]">
            <LazyLoadImage
              src="https://images.pexels.com/photos/2950650/pexels-photo-2950650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Lehengas"
              effect="blur"
              className="h-[100vh] w-[100vw] object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-dark/30 group-hover:bg-dark/40 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-2xl font-heading text-white">Lehengas</h3>
              <div className="w-12 h-[1px] bg-gold my-3"></div>
              <span className="text-white/90 text-sm">Explore Collection</span>
            </div>
          </Link>
          
          {/* Category Card 3 */}
          <Link to="/collection/kaftan" className="group relative overflow-hidden h-[600px]">
            <LazyLoadImage
              src="https://images.pexels.com/photos/2797086/pexels-photo-2797086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Kaftans"
              effect="blur"
              className="h-[100vh] w-[100vw] object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-dark/30 group-hover:bg-dark/40 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-2xl font-heading text-white">Kaftans</h3>
              <div className="w-12 h-[1px] bg-gold my-3"></div>
              <span className="text-white/90 text-sm">Explore Collection</span>
            </div>
          </Link>
        </div>
        
        <div className="text-center">
          <Link to="/all" className="btn-secondary">View All Categories</Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-light">
    <div className="container-custom">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-heading">Featured Collection</h2>
        <div className="w-20 h-[2px] bg-gold mx-auto mt-3 mb-4"></div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-[3/4] rounded-md"></div>
              <div className="h-4 bg-gray-200 mt-2 w-3/4"></div>
              <div className="h-4 bg-gray-200 mt-1 w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  </section>

      {/* Testimonials Section */}
      <section className="py-16 container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading">Customer Love</h2>
          <div className="w-20 h-[2px] bg-gold mx-auto mt-3 mb-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white p-8 shadow-md border-t-2 border-gold">
            <div className="flex items-center mb-4">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-gray-600 italic mb-4">
              "The lehenga I purchased exceeded my expectations. The quality of the fabric and the intricate embroidery work is absolutely stunning. I received countless compliments at my sister's wedding!"
            </p>
            <div className="font-medium">Priya Sharma</div>
          </div>
          
          {/* Testimonial 2 */}
          <div className="bg-white p-8 shadow-md border-t-2 border-gold">
            <div className="flex items-center mb-4">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-gray-600 italic mb-4">
              "I ordered a saree for my engagement ceremony and was amazed by the exquisite craftsmanship. The delivery was prompt and the packaging was impressive. Will definitely shop again!"
            </p>
            <div className="font-medium">Anita Desai</div>
          </div>
          
          {/* Testimonial 3 */}
          <div className="bg-white p-8 shadow-md border-t-2 border-gold">
            <div className="flex items-center mb-4">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-gray-600 italic mb-4">
              "The customer service is exceptional! When I needed to exchange my kaftan for a different size, the process was seamless. The replacement arrived within days. Highly recommend!"
            </p>
            <div className="font-medium">Rahul Kapoor</div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-16 bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <LazyLoadImage
                src="https://images.pexels.com/photos/11679918/pexels-photo-11679918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Craftsman working on embroidery"
                effect="blur"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <span className="text-gold uppercase tracking-wider text-sm">Our Heritage</span>
              <h2 className="text-3xl md:text-4xl font-heading mt-2 mb-6">Handcrafted Excellence</h2>
              <p className="text-gray-700 mb-6">
                Each piece in our collection is meticulously handcrafted by skilled artisans, 
                preserving centuries-old techniques passed down through generations. 
                We collaborate with master craftspeople across India to bring you authentic, 
                high-quality ethnic wear that celebrates our rich cultural heritage.
              </p>
              <p className="text-gray-700 mb-8">
                From intricate embroidery to delicate beadwork, every detail is 
                carefully executed to create unique pieces that tell a story of tradition, 
                craftsmanship, and artistry.
              </p>
              <Link to="/about" className="btn-secondary">Our Story</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading">Follow Us on Instagram</h2>
          <div className="w-20 h-[2px] bg-gold mx-auto mt-3 mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            @elegance_ethnic
          </p>
        </div>
        
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <div className="group relative aspect-square overflow-hidden">
            <LazyLoadImage
              src="https://images.pexels.com/photos/2058386/pexels-photo-2058386.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Instagram post"
              effect="blur"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Instagram size={24} className="text-white" />
            </div>
          </div>
          <div className="group relative aspect-square overflow-hidden">
            <LazyLoadImage
              src="https://images.pexels.com/photos/10889793/pexels-photo-10889793.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Instagram post"
              effect="blur"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Instagram size={24} className="text-white" />
            </div>
          </div>
          <div className="group relative aspect-square overflow-hidden">
            <LazyLoadImage
              src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Instagram post"
              effect="blur"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Instagram size={24} className="text-white" />
            </div>
          </div>
          <div className="group relative aspect-square overflow-hidden">
            <LazyLoadImage
              src="https://images.pexels.com/photos/7389033/pexels-photo-7389033.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Instagram post"
              effect="blur"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Instagram size={24} className="text-white" />
            </div>
          </div>
          <div className="group relative aspect-square overflow-hidden">
            <LazyLoadImage
              src="https://images.pexels.com/photos/2950650/pexels-photo-2950650.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Instagram post"
              effect="blur"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Instagram size={24} className="text-white" />
            </div>
          </div>
          <div className="group relative aspect-square overflow-hidden">
            <LazyLoadImage
              src="https://images.pexels.com/photos/3075797/pexels-photo-3075797.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Instagram post"
              effect="blur"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Instagram size={24} className="text-white" />
            </div>
          </div>
        </div> */}
      </section>
    </div>
  );
};

export default Home;