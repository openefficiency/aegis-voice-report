
import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Award 
} from "lucide-react";
import { toast } from "sonner";

// Mock data for a single case
const MOCK_CASES = [
  {
    id: "AW-2023-001",
    title: "Financial Reporting Discrepancy",
    summary: "AI-generated summary: Potential misstatement of quarterly earnings by ~$2.3M. Complainant provided evidence of irregular accounting practices in the Q3 reporting cycle.",
    fullTranscript: "I've been working in the accounting department for three years now, and I've noticed something concerning in our quarterly reports. For the past Q3 cycle, it appears that earnings have been overstated by approximately $2.3 million. I've observed irregular journal entries that don't follow standard accounting practices. Specifically, there are several transactions coded to deferred revenue that should be recognized in future periods according to GAAP principles. I've collected screenshots of these entries from our system and notes from meetings where these decisions were made. This appears to be deliberate to meet quarterly targets and not a simple oversight.",
    date: "May 15, 2025",
    time: "14:32:41",
    reportedBy: "Anonymous Whistleblower",
    categories: ["Fraud", "Financial", "Accounting"],
    tags: ["Q3 Reporting", "Revenue Recognition", "GAAP Violation"],
    status: "under_review",
    assignedTo: "Jennifer Martinez",
    priority: "High",
    audioUrl: "#", // In a real application, this would be a URL to the audio file
    actions: [
      {
        action: "Report Created",
        timestamp: "May 15, 2025 14:32:41",
        user: "System"
      },
      {
        action: "Status changed to Under Review",
        timestamp: "May 15, 2025 15:10:22",
        user: "Daniel Wong"
      },
      {
        action: "Assigned to Jennifer Martinez",
        timestamp: "May 16, 2025 09:15:33",
        user: "Daniel Wong"
      },
      {
        action: "Note added",
        timestamp: "May 16, 2025 11:42:15",
        user: "Jennifer Martinez",
        note: "Requesting additional documentation from Finance department. Need to verify Q3 journal entries."
      }
    ]
  },
  // More mock cases would go here
];

const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("under_review");
  
  // Find the case with the matching ID from our mock data
  const caseItem = MOCK_CASES.find(c => c.id === id);
  
  // If no case is found, redirect to the dashboard
  if (!caseItem) {
    return <Navigate to="/dashboard" replace />;
  }

  const addNote = () => {
    if (!note.trim()) {
      toast.error("Please enter a note before submitting");
      return;
    }
    
    toast.success("Note added to case");
    setNote("");
    // In a real application, this would update the case data
  };

  const updateStatus = (newStatus: string) => {
    setStatus(newStatus);
    toast.success(`Case status updated to ${newStatus.replace('_', ' ').toUpperCase()}`);
    // In a real application, this would update the case data
  };

  const sendReward = () => {
    toast.success("Reward process initiated");
    // In a real application, this would trigger the reward workflow
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{caseItem.title}</h1>
              <Badge 
                className={
                  caseItem.status === "new" ? "bg-blue-500" :
                  caseItem.status === "under_review" ? "bg-yellow-500" :
                  caseItem.status === "escalated" ? "bg-red-500" : "bg-green-500"
                }
              >
                {caseItem.status.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
            <div className="text-gray-500 mt-1">Case #{caseItem.id} • Reported on {caseItem.date}</div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-1">
              <Play className="h-4 w-4" /> Play Audio
            </Button>
            <Button variant="outline" className="flex items-center gap-1">
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
                <p className="text-gray-700 mb-4">{caseItem.summary}</p>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                    Key Concerns
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Potential misstatement of quarterly earnings (~$2.3M)</li>
                    <li>Irregular accounting practices identified</li>
                    <li>Possible deliberate GAAP violations</li>
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
                      <p className="whitespace-pre-line">{caseItem.fullTranscript}</p>
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
                      {caseItem.actions.map((action, index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-aegis-lightBlue rounded-full p-1 mr-3 mt-1">
                            <Clock className="h-4 w-4 text-aegis-blue" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">{action.timestamp}</p>
                            <p className="font-medium">{action.action}</p>
                            {action.note && <p className="text-gray-700 text-sm mt-1 bg-gray-50 p-2 rounded">{action.note}</p>}
                            <p className="text-sm text-gray-600 mt-1">By: {action.user}</p>
                          </div>
                        </div>
                      ))}
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
                  onClick={addNote}
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
                    {caseItem.priority}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Reported By</p>
                  <p className="font-medium flex items-center">
                    <User className="h-4 w-4 mr-1 text-gray-600" />
                    {caseItem.reportedBy}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Assigned To</p>
                  <p className="font-medium flex items-center">
                    <User className="h-4 w-4 mr-1 text-aegis-blue" />
                    {caseItem.assignedTo}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Categories</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {caseItem.categories.map((category, index) => (
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
                
                <div>
                  <p className="text-sm text-gray-500">Tags</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {caseItem.tags.map((tag, index) => (
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
                
                <div className="pt-2">
                  <p className="text-sm text-gray-500 mb-1">Update Status</p>
                  <Select value={status} onValueChange={updateStatus}>
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
      
      <Footer />
    </div>
  );
};

export default CaseDetail;
