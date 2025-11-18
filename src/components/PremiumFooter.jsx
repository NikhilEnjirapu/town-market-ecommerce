import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useState } from 'react';

export default function PremiumFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      {/* Compact Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-green-400">Town Market</h4>
            <p className="text-gray-400 text-sm">
              Fresh groceries delivered in 11 minutes
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4 text-green-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4 text-green-400" />
                <span>support@townmarket.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-300">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                About Us
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                Categories
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                Contact
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                FAQ
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-300">Our Location</h4>
            <div className="flex items-start gap-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>
                123 Market Street, Bangalore<br />
                Karnataka 560001, India
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div>
              © 2024 Town Market. All rights reserved.
            </div>
            <div className="flex items-center gap-2">
              <span>Made with</span>
              <span className="text-green-400">♥</span>
              <span>in India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-40"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </footer>
  );
}
