
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import VAPIAgent from "@/components/VAPIAgent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, CheckCircle, Lock, Volume2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-aegis-lightBlue to-white py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Shield className="h-16 w-16 text-aegis-blue" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Aegis Whistle
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Empower voices. Protect truth. Reward integrity.
            </p>
            
            <div className="my-12">
              <VAPIAgent agentId="17195059-600b-4a2e-90b3-ab63c05a6837" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              How It Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-aegis-lightGray rounded-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Volume2 className="h-10 w-10 text-aegis-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Voice-Powered Reporting</h3>
                <p className="text-gray-600">
                  Submit complaints through natural voice conversations. Our AI transcribes and summarizes in real-time.
                </p>
              </div>
              
              <div className="bg-aegis-lightGray rounded-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Lock className="h-10 w-10 text-aegis-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Secure & Anonymous</h3>
                <p className="text-gray-600">
                  Your identity remains protected with our tamper-proof logging and anonymous reporting system.
                </p>
              </div>
              
              <div className="bg-aegis-lightGray rounded-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-10 w-10 text-aegis-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Reward Integrity</h3>
                <p className="text-gray-600">
                  Valid disclosures are eligible for anonymous crypto rewards through our incentive system.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-aegis-blue py-16 px-4 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to make a difference?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Your voice matters. Help create a more transparent and ethical environment.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                variant="default"
                className="bg-white text-aegis-blue hover:bg-gray-100"
              >
                Make a Report
              </Button>
              <Link to="/dashboard">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
