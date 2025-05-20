
import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Users } from "lucide-react";

interface CaseActionsProps {
  openAssignDialog: () => void;
}

const CaseActions: React.FC<CaseActionsProps> = ({ openAssignDialog }) => {
  return (
    <div className="flex gap-3">
      <Button variant="outline" className="flex items-center gap-1">
        <Play className="h-4 w-4" /> Play Audio
      </Button>
      <Button 
        variant="outline" 
        className="flex items-center gap-1"
        onClick={openAssignDialog}
      >
        <Users className="h-4 w-4" /> Assign Case
      </Button>
      <Button variant="default" className="bg-aegis-blue hover:bg-blue-600">
        Export Report
      </Button>
    </div>
  );
};

export default CaseActions;
