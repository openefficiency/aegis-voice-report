
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { Report, addReportAction } from "@/lib/reports";
import { getCurrentUser } from "@/lib/auth";

interface NoteEditorProps {
  report: Report;
  setReport: (report: Report) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ report, setReport }) => {
  const [note, setNote] = useState("");
  
  const addNoteToReport = () => {
    if (!note.trim()) {
      toast.error("Please enter a note before submitting");
      return;
    }
    
    const currentUser = getCurrentUser();
    if (!currentUser) {
      toast.error("You must be logged in to add notes");
      return;
    }
    
    const currentTime = new Date().toLocaleString();
    const newAction = {
      action: "Note added",
      timestamp: currentTime,
      user: currentUser.name,
      note: note
    };
    
    const updatedReports = addReportAction(report.id, newAction);
    const updatedReport = updatedReports.find(r => r.id === report.id);
    if (updatedReport) {
      setReport(updatedReport);
    }
    
    toast.success("Note added to case");
    setNote("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-aegis-blue" />
          Add Note
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Add a note or update about this case..."
          className="min-h-[120px] mb-4"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <Button
          className="bg-aegis-blue hover:bg-blue-600"
          onClick={addNoteToReport}
        >
          Add Note
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoteEditor;
