
import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { 
  Play, 
  FileText, 
  Users, 
  MessageSquare, 
  Clock, 
  BarChart, 
  AlertTriangle,
  CheckCircle,
  User,
  Upload,
  Pencil,
  Award,
  UserPlus 
} from "lucide-react";
import { toast } from "sonner";
import { 
  getReports, 
  updateReport, 
  addReportAction, 
  assignReport, 
  updateReportStatus, 
  Report 
} from "@/lib/reports";
import { getCurrentUser, DEMO_USERS } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedInvestigator, setSelectedInvestigator] = useState<string>("");
  
  const currentUser = getCurrentUser();
  const investigators = DEMO_USERS.filter(user => user.role === "investigator");
  
  // Load report data
  useEffect(() => {
    const reports = getReports();
    const foundReport = reports.find(r => r.id === id);
    if (foundReport) {
      setReport(foundReport);
    }
  }, [id]);
  
  // If no report is found, redirect to the dashboard
  if (!report) {
    return <Navigate to="/dashboard" replace />;
  }

  const addNoteToReport = () => {
    if (!note.trim()) {
      toast.error("Please enter a note before submitting");
      return;
    }
    
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

  const handleUpdateStatus = (newStatus: string) => {
    if (!currentUser) {
      toast.error("You must be logged in to update status");
      return;
    }
    
    const validStatus = newStatus as "new" | "under_review" | "escalated" | "resolved";
    const updatedReports = updateReportStatus(report.id, validStatus);
    const updatedReport = updatedReports.find(r => r.id === report.id);
    if (updatedReport) {
      setReport(updatedReport);
    }
    
    toast.success(`Case status updated to ${newStatus.replace('_', ' ').toUpperCase()}`);
  };
  
  const openAssignDialog = () => {
    setAssignDialogOpen(true);
    if (report.assignedTo) {
      const assignedUser = DEMO_USERS.find(u => u.name === report.assignedTo);
      if (assignedUser) {
        setSelectedInvestigator(assignedUser.id);
      }
    }
  };
  
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
    
    setAssignDialogOpen(false);
    toast.success(`Report assigned to ${investigator.name}`);
  };

  const sendReward = () => {
    toast.success("Reward process initiated");
    // In a real application, this would trigger the reward workflow
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-500";
      case "under_review": return "bg-yellow-500";
      case "escalated": return "bg-red-500";
      case "resolved": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{report.title}</h1>
              <Badge className={getStatusClass(report.status)}>
                {report.status.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
            <div className="text-gray-500 mt-1">Case #{report.id} • Reported on {report.date}</div>
          </div>
          
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
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Case details */}
          <div className="lg:col-span-2 space-y-6">
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
          </div>
          
          {/* Right column - Case metadata and actions */}
          <div className="space-y-6">
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
          </div>
        </div>
      </main>
      
      {/* Assign Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
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
              onClick={() => setAssignDialogOpen(false)}
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
      
      <Footer />
    </div>
  );
};

export default CaseDetail;
