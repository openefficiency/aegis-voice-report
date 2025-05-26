
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import SearchFilters from "@/components/dashboard/SearchFilters";
import CasesList from "@/components/dashboard/CasesList";
import AssignCaseDialog from "@/components/dashboard/AssignCaseDialog";
import { toast } from "sonner";
import { Search } from "lucide-react";
import { Report as LocalReport } from "@/lib/reports";

interface Report {
  id: string;
  title: string;
  summary: string;
  full_transcript?: string;
  date_reported: string;
  categories: string[];
  status: string;
  assigned_to?: string;
  priority?: string;
  audio_url?: string;
}

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      fetchReports();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform the data to match our Report interface
      const transformedReports = (data || []).map(report => ({
        ...report,
        date_reported: report.date_reported || report.created_at,
        categories: report.categories || [],
        status: report.status || 'new',
        priority: report.priority || 'Medium'
      }));

      setReports(transformedReports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast.error('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out");
    }
  };

  const openAssignDialog = (reportId: string) => {
    setSelectedReportId(reportId);
    setAssignDialogOpen(true);
  };

  const handleViewCase = (id: string) => {
    navigate(`/case/${id}`);
  };

  // Transform reports to match the format expected by other components
  const transformToLocalReports = (reports: Report[]): LocalReport[] => {
    return reports.map(report => ({
      ...report,
      date: report.date_reported,
      fullTranscript: report.full_transcript,
      audioUrl: report.audio_url,
      status: report.status as "new" | "under_review" | "escalated" | "resolved"
    }));
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.summary?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || 
                           (report.categories && report.categories.includes(categoryFilter));
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader 
          currentUser={userProfile}
          onLogout={handleLogout}
          onRefresh={fetchReports}
        />
        
        <DashboardStats reports={transformToLocalReports(reports)} />
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <SearchFilters
              searchTerm={searchTerm}
              statusFilter={statusFilter}
              setSearchTerm={setSearchTerm}
              setStatusFilter={setStatusFilter}
            />
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="all">All Reports ({filteredReports.length})</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="assigned">Assigned to Me</TabsTrigger>
            </TabsList>

            <CasesList
              filteredReports={filteredReports}
              currentUser={userProfile}
              openAssignDialog={openAssignDialog}
              handleViewCase={handleViewCase}
            />
          </Tabs>
        </div>

        <AssignCaseDialog
          open={assignDialogOpen}
          setOpen={setAssignDialogOpen}
          reportId={selectedReportId || ""}
          onAssigned={fetchReports}
        />
      </div>
    </div>
  );
};

export default Dashboard;
