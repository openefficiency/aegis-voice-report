
import React from "react";
import { AlertTriangle, UserPlus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/lib/auth";

interface AssignCaseDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedInvestigator: string;
  setSelectedInvestigator: (id: string) => void;
  investigators: User[];
  handleAssignReport: () => void;
}

const AssignCaseDialog: React.FC<AssignCaseDialogProps> = ({
  open,
  setOpen,
  selectedInvestigator,
  setSelectedInvestigator,
  investigators,
  handleAssignReport
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <UserPlus className="h-5 w-5 mr-2 text-aegis-blue" /> 
            Assign Report to Investigator
          </DialogTitle>
          <DialogDescription>
            Select an investigator to handle this report.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Select value={selectedInvestigator} onValueChange={setSelectedInvestigator}>
            <SelectTrigger>
              <SelectValue placeholder="Select Investigator" />
            </SelectTrigger>
            <SelectContent>
              {investigators.map(investigator => (
                <SelectItem key={investigator.id} value={investigator.id}>
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={investigator.avatar} />
                      <AvatarFallback>{investigator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {investigator.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="mt-4 p-3 bg-blue-50 rounded flex items-start">
            <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              Assigning a case will notify the investigator and change the status to "Under Review".
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            className="bg-aegis-blue hover:bg-blue-600" 
            onClick={handleAssignReport}
            disabled={!selectedInvestigator}
          >
            Assign Case
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignCaseDialog;
