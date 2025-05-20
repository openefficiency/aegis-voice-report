
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Report } from "@/lib/reports";

interface CaseTabsProps {
  report: Report;
}

const CaseTabs: React.FC<CaseTabsProps> = ({ report }) => {
  return (
    <Tabs defaultValue="transcript">
      <TabsList className="w-full">
        <TabsTrigger value="transcript" className="flex-1">Full Transcript</TabsTrigger>
        <TabsTrigger value="evidence" className="flex-1">Evidence</TabsTrigger>
        <TabsTrigger value="timeline" className="flex-1">Timeline</TabsTrigger>
      </TabsList>
      
      <TabsContent value="transcript" className="mt-4">
        <Card>
          <CardContent className="pt-6">
            <div className="bg-gray-50 p-4 rounded-md text-gray-700">
              <p className="whitespace-pre-line">
                {report.fullTranscript || 
                 "No full transcript is available for this report yet. The AI is still processing the voice recording."}
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="evidence" className="mt-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center items-center h-48 border-2 border-dashed border-gray-300 rounded-md bg-gray-50">
              <div className="text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No evidence files uploaded yet</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Upload Evidence
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="timeline" className="mt-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {report.actions && report.actions.length > 0 ? (
                report.actions.map((action, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-aegis-lightBlue rounded-full p-1 mr-3 mt-1">
                      <Clock className="h-4 w-4 text-aegis-blue" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{action.timestamp}</p>
                      <p className="font-medium">{action.action}</p>
                      {action.note && (
                        <p className="text-gray-700 text-sm mt-1 bg-gray-50 p-2 rounded">{action.note}</p>
                      )}
                      <p className="text-sm text-gray-600 mt-1">By: {action.user}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No activity recorded yet.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default CaseTabs;
