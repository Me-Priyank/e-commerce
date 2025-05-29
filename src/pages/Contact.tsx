import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-[#f9f2e8] py-12">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-heading mb-2">Contact Us</h1>
          <div className="w-20 h-[2px] bg-gold mx-auto mt-3 mb-4"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Home &nbsp;&nbsp; &gt;&nbsp;&nbsp; Contact
          </p>
        </div>
      </div>

      {/* Contact Information & Form */}
      <div className="py-16 container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-heading mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Whether you have a question about our products, need styling advice, or want to 
              discuss a custom order, our team is here to help. Feel free to reach out to us 
              using any of the contact methods below.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-gold/10 p-3 rounded-full mr-4">
                  <MapPin className="text-gold" size={24} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Our Store</h3>
                  <p className="text-gray-600">789 Fashion Street, Mumbai, Maharashtra, India</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-gold/10 p-3 rounded-full mr-4">
                  <Phone className="text-gold" size={24} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Phone</h3>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-gold/10 p-3 rounded-full mr-4">
                  <Mail className="text-gold" size={24} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p className="text-gray-600">contact@elegance.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-gold/10 p-3 rounded-full mr-4">
                  <Clock className="text-gold" size={24} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Working Hours</h3>
                  <p className="text-gray-600">Monday - Saturday: 10:00 AM - 8:00 PM</p>
                  <p className="text-gray-600">Sunday: 11:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-heading mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full p-3 border border-gray-300 focus:border-gold focus:ring-0 outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full p-3 border border-gray-300 focus:border-gold focus:ring-0 outline-none"
                    placeholder="Your email address"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full p-3 border border-gray-300 focus:border-gold focus:ring-0 outline-none"
                  placeholder="Subject of your message"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium">Message</label>
                <textarea 
                  id="message" 
                  rows={6}
                  className="w-full p-3 border border-gray-300 focus:border-gold focus:ring-0 outline-none"
                  placeholder="Your message"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="btn-primary w-full"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>


      {/* FAQ Section */}
      {/* <div className="py-16 container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading">Frequently Asked Questions</h2>
          <div className="w-20 h-[2px] bg-gold mx-auto mt-3 mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Find answers to common questions about our products and services
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium mb-2">How long does shipping take?</h3>
              <p className="text-gray-600">
                Standard shipping within India takes 3-5 business days. Express shipping is available 
                at an additional cost and delivers within 1-2 business days.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium mb-2">Do you ship internationally?</h3>
              <p className="text-gray-600">
                Yes, we ship to select countries worldwide. International shipping typically takes 
                7-14 business days depending on the destination.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium mb-2">What is your return policy?</h3>
              <p className="text-gray-600">
                We offer a 14-day return policy for unused items in their original packaging. 
                Custom-made pieces are non-returnable.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium mb-2">Do you offer alterations?</h3>
              <p className="text-gray-600">
                Yes, we offer alteration services for all our products. Please contact our customer 
                service team to arrange for alterations.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium mb-2">Can I place a custom order?</h3>
              <p className="text-gray-600">
                Absolutely! We specialize in creating custom pieces tailored to your preferences. 
                Please contact us with your requirements and our design team will work with you.
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Contact;