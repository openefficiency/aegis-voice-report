
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentUser, logout, DEMO_USERS } from "@/lib/auth";
import { getReports, assignReport, Report } from "@/lib/reports";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Import our refactored components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import SearchFilters from "@/components/dashboard/SearchFilters";
import CasesList from "@/components/dashboard/CasesList";
import AssignCaseDialog from "@/components/dashboard/AssignCaseDialog";

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
        <DashboardHeader 
          currentUser={currentUser} 
          onLogout={handleLogout} 
          onRefresh={handleRefresh}
        />
        
        <DashboardStats reports={reports} />
        
        <SearchFilters 
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          setSearchTerm={setSearchTerm}
          setStatusFilter={setStatusFilter}
        />
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Cases</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="assigned">Assigned to Me</TabsTrigger>
          </TabsList>
          
          <CasesList 
            filteredReports={filteredReports}
            currentUser={currentUser}
            openAssignDialog={openAssignDialog}
            handleViewCase={handleViewCase}
          />
        </Tabs>
      </main>
      
      <AssignCaseDialog
        open={assignDialogOpen}
        setOpen={setAssignDialogOpen}
        selectedInvestigator={selectedInvestigator}
        setSelectedInvestigator={setSelectedInvestigator}
        investigators={investigators}
        handleAssignReport={handleAssignReport}
      />
      
      <Footer />
    </div>
  );
};

export default Dashboard;
