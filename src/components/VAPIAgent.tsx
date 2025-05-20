
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mic, MicOff } from "lucide-react";

interface VAPIAgentProps {
  agentId: string;
}

declare global {
  interface Window {
    VAPI: any;
  }
}

const VAPIAgent: React.FC<VAPIAgentProps> = ({ agentId }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const vapiAgent = useRef<any>(null);

  useEffect(() => {
    // Check if VAPI is already available in the global window object
    if (window.VAPI) {
      console.log("VAPI already available in window");
    } else {
      console.log("Waiting for VAPI to initialize...");
      
      // Set up a check interval to detect when VAPI becomes available
      const checkInterval = setInterval(() => {
        if (window.VAPI) {
          console.log("VAPI detected and ready to use");
          clearInterval(checkInterval);
        }
      }, 500);
      
      // Clear interval after 10 seconds to prevent infinite checking
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!window.VAPI) {
          console.warn("VAPI still not available after timeout");
        }
      }, 10000);
    }

    return () => {
      // Cleanup if needed
      if (vapiAgent.current) {
        try {
          vapiAgent.current.destroy();
        } catch (e) {
          console.error("Error cleaning up VAPI agent:", e);
        }
      }
    };
  }, []);

  const connectToVAPIAgent = async () => {
    setIsConnecting(true);
    
    try {
      if (!window.VAPI) {
        toast.error("Voice reporting system not available. Please try again in a moment.");
        setIsConnecting(false);
        return;
      }

      // Initialize VAPI agent
      vapiAgent.current = new window.VAPI({
        agentId: agentId,
        publicKey: "6b3e7486-6bd4-4521-b010-4d4ea7bf2f48",
        callbacks: {
          onStart: () => {
            console.log("Recording started");
            setIsRecording(true);
            setIsConnecting(false);
            toast.success("Connected to secure voice reporting system");
          },
          onStop: () => {
            console.log("Recording stopped");
            setIsRecording(false);
            toast.info("Report submitted successfully!");
            
            // Add report to localStorage for persistence
            const existingReports = JSON.parse(localStorage.getItem('aegis_whistleblower_reports') || '[]');
            const newReport = {
              id: `AW-2023-${existingReports.length + 5}`,
              title: "New Voice Report",
              summary: "AI-generated summary: Voice report submitted. Awaiting AI transcription and analysis.",
              date: new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }),
              categories: ["Unclassified"],
              status: "new",
            };
            
            localStorage.setItem('aegis_whistleblower_reports', JSON.stringify([...existingReports, newReport]));
          },
          onError: (error: any) => {
            console.error("VAPI error:", error);
            setIsRecording(false);
            setIsConnecting(false);
            toast.error("Error: " + (error.message || "Unknown error occurred"));
          }
        },
      });

      // Start the conversation
      await vapiAgent.current.start();
    } catch (error) {
      console.error("Error initializing VAPI:", error);
      setIsConnecting(false);
      toast.error("Failed to initialize voice reporting system");
    }
  };

  const stopRecording = () => {
    if (vapiAgent.current) {
      try {
        vapiAgent.current.stop();
      } catch (error) {
        console.error("Error stopping VAPI:", error);
        setIsRecording(false);
        toast.error("Error stopping recording");
      }
    } else {
      setIsRecording(false);
      toast.error("Voice agent not properly initialized");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {!isRecording ? (
        <Button 
          size="lg" 
          className="bg-aegis-blue hover:bg-blue-600 text-white py-6 px-8 text-lg rounded-full"
          onClick={connectToVAPIAgent}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <>
              <span className="mr-2 animate-pulse">Connecting...</span>
              <Mic className="ml-2 h-5 w-5" />
            </>
          ) : (
            <>
              Make a Report
              <Mic className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      ) : (
        <Button 
          variant="destructive" 
          size="lg"
          className="py-6 px-8 text-lg rounded-full animate-pulse"
          onClick={stopRecording}
        >
          Stop Recording
          <MicOff className="ml-2 h-5 w-5" />
        </Button>
      )}
      
      {isRecording && (
        <div className="mt-6 p-4 bg-aegis-lightBlue rounded-lg text-center max-w-md">
          <p className="font-medium">Secure voice recording in progress...</p>
          <p className="text-sm text-gray-600 mt-1">
            Speak clearly and provide details about the incident you wish to report.
          </p>
        </div>
      )}
    </div>
  );
};

export default VAPIAgent;
