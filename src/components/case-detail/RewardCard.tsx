
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";
import { toast } from "sonner";

const RewardCard: React.FC = () => {
  const sendReward = () => {
    toast.success("Reward process initiated");
    // In a real application, this would trigger the reward workflow
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Award className="h-5 w-5 mr-2 text-aegis-blue" /> 
          Reward Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          Send an anonymous crypto reward to the whistleblower for valid disclosure.
        </p>
        <Button 
          className="w-full bg-aegis-blue hover:bg-blue-600"
          onClick={sendReward}
        >
          Initiate Reward
        </Button>
      </CardContent>
    </Card>
  );
};

export default RewardCard;
