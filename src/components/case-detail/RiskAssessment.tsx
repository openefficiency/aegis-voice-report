
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";

const RiskAssessment: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <BarChart className="h-5 w-5 mr-2 text-aegis-blue" />
          Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Financial Impact</span>
          <span className="text-sm text-red-500 font-medium">High</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-red-500 h-2 rounded-full" style={{ width: "85%" }}></div>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Legal Risk</span>
          <span className="text-sm text-yellow-500 font-medium">Medium</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "60%" }}></div>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Reputational Risk</span>
          <span className="text-sm text-orange-500 font-medium">High</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-orange-500 h-2 rounded-full" style={{ width: "75%" }}></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAssessment;
