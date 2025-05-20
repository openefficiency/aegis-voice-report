
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertTriangle, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { DEMO_USERS } from "@/lib/auth";
import { assignReport, Report } from "@/lib/reports";

interface AssignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: Report;
  setReport: (report: Report) => void;
}

const AssignDialog: React.FC<AssignDialogProps> = ({ 
  open, 
  onOpenChange, 
  report, 
  setReport 
}) => {
  const [selectedInvestigator, setSelectedInvestigator] = React.useState<string>("");
  const investigators = DEMO_USERS.filter(user => user.role === "investigator");
  
  React.useEffect(() => {
    if (open && report.assignedTo) {
      const assignedUser = DEMO_USERS.find(u => u.name === report.assignedTo);
      if (assignedUser) {
        setSelectedInvestigator(assignedUser.id);
      }
    }
  }, [open, report.assignedTo]);

  const handleAssignReport = () => {
    if (!selectedInvestigator) {
      toast.error("Please select an investigator");
      return;
    }
    
    const investigator = DEMO_USERS.find(u => u.id === selectedInvestigator);
    if (!investigator) return;
    
    const updatedReports = assignReport(report.id, investigator.name);
    const updatedReport = updatedReports.find(r => r.id === report.id);
    if (updatedReport) {
      setReport(updatedReport);
    }
    
    onOpenChange(false);
    toast.success(`Report assigned to ${investigator.name}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            onClick={() => onOpenChange(false)}
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

export default AssignDialog;
