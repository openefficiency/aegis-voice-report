
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, User, UserPlus } from "lucide-react";
import { Report } from "@/lib/reports";

interface CaseDetailsProps {
  report: Report;
  openAssignDialog: () => void;
  handleUpdateStatus: (status: string) => void;
}

const CaseDetails: React.FC<CaseDetailsProps> = ({ report, openAssignDialog, handleUpdateStatus }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Case Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Priority</p>
          <p className="font-medium flex items-center">
            <AlertTriangle className="h-4 w-4 mr-1 text-red-500" />
            {report.priority || "Medium"}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Reported By</p>
          <p className="font-medium flex items-center">
            <User className="h-4 w-4 mr-1 text-gray-600" />
            {report.reportedBy || "Anonymous Whistleblower"}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Assigned To</p>
          {report.assignedTo ? (
            <p className="font-medium flex items-center">
              <User className="h-4 w-4 mr-1 text-aegis-blue" />
              {report.assignedTo}
            </p>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-1 text-aegis-blue border-aegis-blue"
              onClick={openAssignDialog}
            >
              <UserPlus className="h-4 w-4 mr-1" />
              Assign Case
            </Button>
          )}
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Categories</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {report.categories.map((category, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-aegis-lightGray text-gray-700"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
        
        {report.tags && (
          <div>
            <p className="text-sm text-gray-500">Tags</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {report.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-gray-100"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="pt-2">
          <p className="text-sm text-gray-500 mb-1">Update Status</p>
          <Select defaultValue={report.status} onValueChange={handleUpdateStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="escalated">Escalated</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseDetails;
