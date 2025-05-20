
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
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const vapiAgent = useRef<any>(null);
  const scriptAttempts = useRef(0);

  // Load VAPI script with improved error handling
  useEffect(() => {
    const loadVAPIScript = () => {
      if (window.VAPI) {
        setScriptLoaded(true);
        console.log("VAPI already available in window");
        return;
      }

      const existingScript = document.querySelector('script[src="https://cdn.vapi.ai/vapi.js"]');
      if (existingScript) {
        console.log("VAPI script already exists in DOM, waiting for load");
        return;
      }

      const script = document.createElement('script');
      script.src = "https://cdn.vapi.ai/vapi.js";
      script.async = true;
      
      script.onload = () => {
        console.log("VAPI script loaded successfully");
        setScriptLoaded(true);
      };
      
      script.onerror = (error) => {
        console.error("Error loading VAPI script:", error);
        scriptAttempts.current += 1;
        
        if (scriptAttempts.current < 3) {
          console.log(`Retrying script load, attempt ${scriptAttempts.current + 1}`);
          setTimeout(loadVAPIScript, 1500);
        } else {
          toast.error("Failed to load voice reporting system. Please check your connection.");
        }
      };
      
      document.body.appendChild(script);
    };

    loadVAPIScript();

    return () => {
      // Cleanup if needed
      if (vapiAgent.current) {
        vapiAgent.current.destroy();
      }
    };
  }, []);

  // Check if VAPI is loaded after script is loaded
  useEffect(() => {
    if (scriptLoaded) {
      // Wait a bit to ensure VAPI is initialized
      const checkVAPI = setTimeout(() => {
        if (!window.VAPI) {
          console.warn("VAPI not available after script load, retrying...");
          setScriptLoaded(false);
          scriptAttempts.current += 1;
          
          if (scriptAttempts.current < 3) {
            // Force reload the script
            const existingScript = document.querySelector('script[src="https://cdn.vapi.ai/vapi.js"]');
            if (existingScript) {
              existingScript.remove();
            }
          }
        } else {
          console.log("VAPI is available and ready to use");
        }
      }, 1000);
      
      return () => clearTimeout(checkVAPI);
    }
  }, [scriptLoaded]);

  const connectToVAPIAgent = async () => {
    setIsConnecting(true);
    
    try {
      if (!window.VAPI) {
        toast.error("Voice reporting system not loaded. Trying to reload script...");
        setScriptLoaded(false);
        scriptAttempts.current = 0;
        
        // Force reload the script
        const existingScript = document.querySelector('script[src="https://cdn.vapi.ai/vapi.js"]');
        if (existingScript) {
          existingScript.remove();
        }
        
        setIsConnecting(false);
        return;
      }

      // Initialize VAPI agent
      vapiAgent.current = new window.VAPI({
        agentId: agentId,
        publicKey: "6b3e7486-6bd4-4521-b010-4d4ea7bf2f48", // Using the public key provided
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
      vapiAgent.current.stop();
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
