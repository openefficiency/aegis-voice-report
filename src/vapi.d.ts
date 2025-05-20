
// Type definitions for VAPI
declare global {
  interface Window {
    VAPI: any;
  }
}

export interface VAPICallbacks {
  onStart?: () => void;
  onStop?: () => void;
  onError?: (error: any) => void;
  onTranscript?: (transcript: string) => void;
}

export interface VAPIConfig {
  agentId: string;
  publicKey: string;
  callbacks?: VAPICallbacks;
}
