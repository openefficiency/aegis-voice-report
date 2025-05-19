
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-aegis-lightGray px-4">
      <div className="text-center max-w-md">
        <Shield className="h-16 w-16 text-aegis-blue mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4 text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! We couldn't find the page you're looking for.
        </p>
        <Link to="/">
          <Button 
            size="lg" 
            className="bg-aegis-blue hover:bg-blue-600"
          >
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
