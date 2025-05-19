
import React from "react";
import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-aegis-gray py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <Shield className="h-5 w-5 text-aegis-blue mr-2" />
            <span className="text-lg font-semibold text-gray-800">Aegis Whistle</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-aegis-blue transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-aegis-blue transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-aegis-blue transition-colors">
              Contact
            </a>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Aegis Whistle. All rights reserved.</p>
          <p className="mt-1">Empowering voices. Protecting truth. Rewarding integrity.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
