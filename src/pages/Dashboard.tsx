
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseCard from "@/components/CaseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, BarChart2, RefreshCw, LogOut, UserPlus, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getCurrentUser, logout, DEMO_USERS } from "@/lib/auth";
import { getReports, assignReport, Report } from "@/lib/reports";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [reports, setReports] = useState<Report[]>([]);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [selectedInvestigator, setSelectedInvestigator] = useState<string>("");
  
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  
  // Load reports on component mount
  useEffect(() => {
    setReports(getReports());
  }, []);

  // Filter reports based on search term and status
  const filteredReports = reports.filter((report) => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || report.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Calculate stats for dashboard cards
  const newReports = reports.filter(r => r.status === "new").length;
  const underReviewReports = reports.filter(r => r.status === "under_review").length;
  const escalatedReports = reports.filter(r => r.status === "escalated").length;
  const resolvedReports = reports.filter(r => r.status === "resolved").length;

  // Get investigator users for assignment
  const investigators = DEMO_USERS.filter(user => user.role === "investigator");
  
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };
  
  const handleRefresh = () => {
    setReports(getReports());
    toast.success("Reports refreshed");
  };
  
  const openAssignDialog = (reportId: string) => {
    setSelectedReportId(reportId);
    setAssignDialogOpen(true);
  };
  
  const handleAssignReport = () => {
    if (!selectedReportId || !selectedInvestigator) {
      toast.error("Please select an investigator");
      return;
    }
    
    const investigator = DEMO_USERS.find(u => u.id === selectedInvestigator);
    if (!investigator) return;
    
    const updatedReports = assignReport(selectedReportId, investigator.name);
    setReports(updatedReports);
    
    setAssignDialogOpen(false);
    toast.success(`Report assigned to ${investigator.name}`);
  };
  
  const handleViewCase = (id: string) => {
    navigate(`/case/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Ethics Officer Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitor and manage whistleblower reports</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            {currentUser && (
              <div className="flex items-center gap-2 bg-aegis-lightGray px-4 py-2 rounded-md">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{currentUser.role.replace('_', ' ')}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
            >
              <BarChart2 className="h-4 w-4" /> Analytics
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-aegis-lightBlue border-l-4 border-aegis-blue">
            <p className="text-sm font-medium text-gray-500">New Reports</p>
            <h3 className="text-3xl font-bold">{newReports}</h3>
          </Card>
          <Card className="p-4 bg-yellow-50 border-l-4 border-yellow-500">
            <p className="text-sm font-medium text-gray-500">Under Review</p>
            <h3 className="text-3xl font-bold">{underReviewReports}</h3>
          </Card>
          <Card className="p-4 bg-red-50 border-l-4 border-red-500">
            <p className="text-sm font-medium text-gray-500">Escalated</p>
            <h3 className="text-3xl font-bold">{escalatedReports}</h3>
          </Card>
          <Card className="p-4 bg-green-50 border-l-4 border-green-500">
            <p className="text-sm font-medium text-gray-500">Resolved</p>
            <h3 className="text-3xl font-bold">{resolvedReports}</h3>
          </Card>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search reports by keyword, ID, or content..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Cases List */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Cases</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="assigned">Assigned to Me</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <div key={report.id} className="relative">
                    <CaseCard 
                      {...report} 
                      onAssign={() => openAssignDialog(report.id)}
                      onViewDetails={() => handleViewCase(report.id)}
                    />
                    {report.status === "new" && (
                      <Button 
                        size="sm" 
                        className="absolute -top-2 -right-2 bg-aegis-blue hover:bg-blue-600"
                        onClick={() => openAssignDialog(report.id)}
                      >
                        <UserPlus className="h-4 w-4 mr-1" />
                        Assign
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-aegis-lightGray rounded-lg">
                  <p className="text-gray-500">No reports match your criteria.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.slice(0, 5).map((report) => (
                <div key={report.id} className="relative">
                  <CaseCard 
                    {...report} 
                    onAssign={() => openAssignDialog(report.id)}
                    onViewDetails={() => handleViewCase(report.id)}
                  />
                  {report.status === "new" && (
                    <Button 
                      size="sm" 
                      className="absolute -top-2 -right-2 bg-aegis-blue hover:bg-blue-600"
                      onClick={() => openAssignDialog(report.id)}
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Assign
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="assigned" className="mt-6">
            {currentUser && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReports.filter(r => r.assignedTo === currentUser.name).length > 0 ? (
                  filteredReports
                    .filter(r => r.assignedTo === currentUser.name)
                    .map(report => (
                      <CaseCard 
                        key={report.id} 
                        {...report}
                        onViewDetails={() => handleViewCase(report.id)}
                      />
                    ))
                ) : (
                  <div className="col-span-full text-center py-12 bg-aegis-lightGray rounded-lg">
                    <p className="text-gray-500">No reports are currently assigned to you.</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
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

export default Dashboard;
