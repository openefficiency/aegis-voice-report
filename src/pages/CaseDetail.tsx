
import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getReports, updateReportStatus, Report } from "@/lib/reports";
import { getCurrentUser } from "@/lib/auth";
import { toast } from "sonner";

// Import refactored components
import CaseHeader from "@/components/case-detail/CaseHeader";
import CaseActions from "@/components/case-detail/CaseActions";
import CaseSummary from "@/components/case-detail/CaseSummary";
import CaseTabs from "@/components/case-detail/CaseTabs";
import NoteEditor from "@/components/case-detail/NoteEditor";
import CaseDetails from "@/components/case-detail/CaseDetails";
import RewardCard from "@/components/case-detail/RewardCard";
import RiskAssessment from "@/components/case-detail/RiskAssessment";
import AssignDialog from "@/components/case-detail/AssignDialog";

const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  
  const currentUser = getCurrentUser();
  
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
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CaseHeader report={report} />
          <CaseActions openAssignDialog={openAssignDialog} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Case details */}
          <div className="lg:col-span-2 space-y-6">
            <CaseSummary report={report} />
            <CaseTabs report={report} />
            <NoteEditor report={report} setReport={setReport} />
          </div>
          
          {/* Right column - Case metadata and actions */}
          <div className="space-y-6">
            <CaseDetails 
              report={report} 
              openAssignDialog={openAssignDialog} 
              handleUpdateStatus={handleUpdateStatus} 
            />
            <RewardCard />
            <RiskAssessment />
          </div>
        </div>
      </main>
      
      <AssignDialog 
        open={assignDialogOpen} 
        onOpenChange={setAssignDialogOpen} 
        report={report} 
        setReport={setReport} 
      />
      
      <Footer />
    </div>
  );
};

export default CaseDetail;
