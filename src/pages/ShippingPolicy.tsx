import React from 'react';
import { Package, Clock, MapPin, Truck, AlertTriangle, Home, Globe, HelpCircle } from 'lucide-react';

const Ship: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Package className="w-8 h-8 text-pink-500" />
          <h1 className="text-3xl font-bold text-gray-800">Shipping Policy – Queens and Dolls</h1>
        </div>
        <p className="text-gray-600 text-lg">
          At Queens and Dolls, we're all about delivering joy, fast, safe, and with care. Here's what to expect when you shop with us.
        </p>
      </div>

      {/* Shipping Time */}
      <div className="mb-8 p-6 bg-orange-50 rounded-lg border-l-4 border-orange-400">
        <div className="flex items-center gap-3 mb-3">
          <Clock className="w-6 h-6 text-orange-500" />
          <h2 className="text-xl font-semibold text-gray-800">🚚 Shipping Time</h2>
        </div>
        <p className="text-gray-700">
          We aim to <strong>ship your order within 7–10 business days</strong> from the date of purchase.
        </p>
      </div>

      {/* Shipping Rates & Methods */}
      <div className="mb-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-400">
        <div className="flex items-center gap-3 mb-4">
          <Truck className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">🚢 Shipping Rates & Methods</h2>
        </div>
        <p className="text-gray-700 mb-4">Shipping costs are calculated at checkout based on:</p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-500" />
            <span>Your location</span>
          </li>
          <li className="flex items-center gap-2">
            <Package className="w-4 h-4 text-purple-500" />
            <span>Chosen delivery method</span>
          </li>
        </ul>
        <p className="text-gray-600 mt-4">
          We partner with trusted couriers to ensure smooth and secure delivery.
        </p>
      </div>

      {/* Order Processing */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg border-l-4 border-gray-400">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-6 h-6 text-gray-500" />
          <h2 className="text-xl font-semibold text-gray-800">🔍 Order Processing</h2>
        </div>
        <p className="text-gray-700 mb-2">
          Your order will be processed within <strong>1–2 business days</strong>.
        </p>
        <div className="flex items-start gap-2 text-gray-600">
          <Package className="w-4 h-4 mt-1 text-blue-500" />
          <span>Once shipped, you'll receive a confirmation email with tracking details.</span>
        </div>
      </div>

      {/* Delays & Exceptions */}
      <div className="mb-8 p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-yellow-500" />
          <h2 className="text-xl font-semibold text-gray-800">⚠️ Delays & Exceptions</h2>
        </div>
        <p className="text-gray-700 mb-4">Sometimes delays can happen due to:</p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Weather conditions</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Public holidays</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Courier delays</span>
          </li>
        </ul>
        <p className="text-gray-600 mt-4">
          If your order takes longer than expected, reach out to us — we're here to help.
        </p>
      </div>

      {/* Address Accuracy */}
      <div className="mb-8 p-6 bg-red-50 rounded-lg border-l-4 border-red-400">
        <div className="flex items-center gap-3 mb-4">
          <Home className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-semibold text-gray-800">🏠 Address Accuracy</h2>
        </div>
        <p className="text-gray-700">
          Please make sure your <strong>shipping address is correct</strong> before completing your order. 
          We are not responsible for lost packages due to incorrect address details.
        </p>
      </div>

      {/* International Shipping */}
      <div className="mb-8 p-6 bg-teal-50 rounded-lg border-l-4 border-teal-400">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-6 h-6 text-teal-500" />
          <h2 className="text-xl font-semibold text-gray-800">🌍 International Shipping</h2>
        </div>
        <p className="text-gray-700 mb-2">
          We currently ship within <strong>India only</strong>.
        </p>
        <div className="flex items-start gap-2 text-gray-600">
          <Globe className="w-4 h-4 mt-1 text-teal-500" />
          <span>For international shipping inquiries, email us and we'll see what we can do.</span>
        </div>
      </div>

      {/* Need Help */}
      <div className="p-6 bg-purple-50 rounded-lg border-l-4 border-purple-400">
        <div className="flex items-center gap-3 mb-4">
          <HelpCircle className="w-6 h-6 text-purple-500" />
          <h2 className="text-xl font-semibold text-gray-800">🙋 Need Help?</h2>
        </div>
        <p className="text-gray-700 mb-2">Got questions & feedback? We are listening.</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <a 
            href="mailto:support@queensndolls.com" 
            className="text-purple-600 hover:text-purple-800 font-medium underline"
          >
            support@queensndolls.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Ship;