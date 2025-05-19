
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-aegis-gray shadow-sm py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-aegis-blue" />
          <Link to="/" className="text-xl font-semibold text-gray-800">
            Aegis Whistle
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-aegis-blue transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="text-gray-600 hover:text-aegis-blue transition-colors">
            Dashboard
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-aegis-blue transition-colors">
            About
          </Link>
        </div>
        <Button variant="outline" className="border-aegis-blue text-aegis-blue hover:bg-aegis-lightBlue">
          Ethics Officer Access
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
