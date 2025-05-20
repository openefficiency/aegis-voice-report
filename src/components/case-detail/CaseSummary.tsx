
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertTriangle } from "lucide-react";
import { Report } from "@/lib/reports";

interface CaseSummaryProps {
  report: Report;
}

const CaseSummary: React.FC<CaseSummaryProps> = ({ report }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <FileText className="h-5 w-5 mr-2 text-aegis-blue" />
          Case Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">{report.summary}</p>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-medium mb-2 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
            Key Concerns
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {report.categories.map((category, index) => (
              <li key={index}>{category} related concern identified</li>
            ))}
            {report.status === "escalated" && (
              <li className="text-red-600">High priority case requiring immediate attention</li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseSummary;
