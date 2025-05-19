
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, MessageSquare, Award, Users, Eye } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">About Aegis Whistle</h1>
          <p className="text-center text-xl text-gray-600 mb-12">
            A secure, voice-driven whistleblower platform designed to protect truth-tellers.
          </p>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Aegis Whistle was founded with a simple but powerful mission: to create a safe environment 
              where individuals can report wrongdoing without fear of retaliation. We believe that 
              organizational integrity starts with transparency, and those who speak up to protect ethical 
              standards deserve both protection and recognition.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <Lock className="h-8 w-8 text-aegis-blue mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Security & Anonymity</h3>
                    <p className="text-gray-700">
                      Our platform employs end-to-end encryption and blockchain technology to ensure
                      whistleblower identities remain protected. Reports are stored with 
                      tamper-proof logging to maintain integrity.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <MessageSquare className="h-8 w-8 text-aegis-blue mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Voice-Driven Experience</h3>
                    <p className="text-gray-700">
                      Our AI-powered voice agent makes reporting intuitive and accessible. Simply
                      speak naturally about your concerns, and our system will transcribe, categorize,
                      and process your report.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <Users className="h-8 w-8 text-aegis-blue mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Transparent Investigation</h3>
                    <p className="text-gray-700">
                      Ethics officers and investigators can collaborate securely while maintaining
                      whistleblower confidentiality. All actions are logged with a timestamp for
                      complete accountability.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <Award className="h-8 w-8 text-aegis-blue mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Reward System</h3>
                    <p className="text-gray-700">
                      We believe in recognizing integrity. Our platform includes an anonymous
                      crypto-based reward system for valid disclosures that help organizations
                      address ethical issues.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-aegis-lightBlue rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-semibold mb-4 text-center">How It Works</h2>
            <ol className="space-y-6">
              <li className="flex items-start">
                <div className="bg-aegis-blue text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-lg">Make a Voice Report</h4>
                  <p className="text-gray-700">
                    Click the "Make a Report" button and speak naturally to our AI agent about your concerns.
                    The system will guide you through providing necessary details.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-aegis-blue text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-lg">Secure Processing</h4>
                  <p className="text-gray-700">
                    Your report is automatically transcribed, summarized, and categorized by our AI system.
                    All data is encrypted and stored securely.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-aegis-blue text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-lg">Ethics Officer Review</h4>
                  <p className="text-gray-700">
                    Ethics officers receive notification of new reports and can review the AI summary,
                    listen to audio, or read the full transcript.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-aegis-blue text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-medium text-lg">Investigation & Resolution</h4>
                  <p className="text-gray-700">
                    Reports are assigned to appropriate investigators who can securely collaborate on case resolution.
                    Valid reports may qualify for anonymous rewards.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
