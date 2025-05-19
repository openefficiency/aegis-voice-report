
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mic, MicOff } from "lucide-react";

interface VAPIAgentProps {
  agentId: string;
}

const VAPIAgent: React.FC<VAPIAgentProps> = ({ agentId }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectToVAPIAgent = () => {
    setIsConnecting(true);
    
    // Simulating connection delay
    setTimeout(() => {
      setIsConnecting(false);
      setIsRecording(true);
      toast.success("Connected to secure voice reporting system");
      
      // For development purposes, we'll add a simulated timeout for recording
      // In production, this would be handled by the VAPI SDK
      console.log(`Connecting to VAPI agent with ID: ${agentId}`);
    }, 1500);
  };

  const stopRecording = () => {
    setIsRecording(false);
    toast.info("Report submitted successfully!");
    
    // In a real implementation, this is where we'd handle the VAPI response
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
