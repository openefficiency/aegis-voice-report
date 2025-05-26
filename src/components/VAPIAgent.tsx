
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mic, MicOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
  const [vapiLoaded, setVapiLoaded] = useState(false);
  const vapiAgent = useRef<any>(null);

  useEffect(() => {
    // Load VAPI script if not already loaded
    const loadVAPIScript = () => {
      if (window.VAPI) {
        console.log("VAPI already available");
        setVapiLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js';
      script.async = true;
      script.onload = () => {
        console.log("VAPI script loaded successfully");
        setVapiLoaded(true);
      };
      script.onerror = () => {
        console.error("Failed to load VAPI script");
        toast.error("Failed to load voice system. Please refresh and try again.");
      };
      
      document.head.appendChild(script);
    };

    loadVAPIScript();

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

  const saveReportToDatabase = async (callData: any) => {
    try {
      console.log("Saving report to database with call data:", callData);
      
      const { data, error } = await supabase
        .from('reports')
        .insert({
          title: callData.title || "Voice Report",
          summary: callData.summary || "AI-generated summary: Voice report submitted. Awaiting AI transcription and analysis.",
          full_transcript: callData.transcript || null,
          categories: callData.categories || ["Unclassified"],
          status: "new",
          priority: "Medium",
          vapi_call_id: callData.call_id || null,
          audio_url: callData.audio_url || null,
        })
        .select()
        .single();

      if (error) {
        console.error("Error saving to database:", error);
        throw error;
      }

      console.log("Report saved successfully:", data);
      return data;
    } catch (error) {
      console.error("Failed to save report to database:", error);
      // Fallback to localStorage for offline functionality
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
      return newReport;
    }
  };

  const connectToVAPIAgent = async () => {
    if (!vapiLoaded) {
      toast.error("Voice system is still loading. Please wait a moment and try again.");
      return;
    }

    if (!window.VAPI) {
      toast.error("Voice system not available. Please refresh the page and try again.");
      return;
    }

    setIsConnecting(true);
    
    try {
      console.log("Initializing VAPI agent with agent ID:", agentId);

      // Initialize VAPI agent with proper configuration
      vapiAgent.current = new window.VAPI({
        agentId: agentId,
        publicKey: "6b3e7486-6bd4-4521-b010-4d4ea7bf2f48",
        callbacks: {
          onStart: () => {
            console.log("VAPI recording started");
            setIsRecording(true);
            setIsConnecting(false);
            toast.success("Connected! You can now speak your report.");
          },
          onStop: async (callData: any) => {
            console.log("VAPI recording stopped with data:", callData);
            setIsRecording(false);
            
            try {
              await saveReportToDatabase(callData);
              toast.success("Report submitted successfully!");
            } catch (error) {
              console.error("Error saving report:", error);
              toast.success("Report submitted! (Saved locally)");
            }
          },
          onError: (error: any) => {
            console.error("VAPI error:", error);
            setIsRecording(false);
            setIsConnecting(false);
            toast.error("Voice system error: " + (error.message || "Please try again"));
          },
          onMessage: (message: any) => {
            console.log("VAPI message:", message);
          }
        },
      });

      // Start the conversation
      console.log("Starting VAPI conversation...");
      await vapiAgent.current.start();
    } catch (error) {
      console.error("Error initializing VAPI:", error);
      setIsConnecting(false);
      toast.error("Failed to start voice recording. Please try again.");
    }
  };

  const stopRecording = () => {
    if (vapiAgent.current) {
      try {
        console.log("Stopping VAPI recording...");
        vapiAgent.current.stop();
      } catch (error) {
        console.error("Error stopping VAPI:", error);
        setIsRecording(false);
        toast.error("Error stopping recording");
      }
    } else {
      setIsRecording(false);
      toast.error("Voice system not properly initialized");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {!isRecording ? (
        <Button 
          size="lg" 
          className="bg-aegis-blue hover:bg-blue-600 text-white py-6 px-8 text-lg rounded-full"
          onClick={connectToVAPIAgent}
          disabled={isConnecting || !vapiLoaded}
        >
          {isConnecting ? (
            <>
              <span className="mr-2 animate-pulse">Connecting...</span>
              <Mic className="ml-2 h-5 w-5" />
            </>
          ) : !vapiLoaded ? (
            <>
              <span className="mr-2">Loading...</span>
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
          <p className="font-medium">🎤 Recording in progress...</p>
          <p className="text-sm text-gray-600 mt-1">
            Speak clearly about the incident you wish to report.
          </p>
        </div>
      )}

      {!vapiLoaded && (
        <div className="mt-4 text-sm text-gray-500">
          Loading voice system...
        </div>
      )}
    </div>
  );
};

export default VAPIAgent;
