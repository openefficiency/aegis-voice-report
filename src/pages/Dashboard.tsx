
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseCard from "@/components/CaseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, BarChart2, RefreshCw, LogOut } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getCurrentUser, logout } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MOCK_CASES = [
  {
    id: "AW-2023-001",
    title: "Financial Reporting Discrepancy",
    summary: "AI-generated summary: Potential misstatement of quarterly earnings by ~$2.3M. Complainant provided evidence of irregular accounting practices in the Q3 reporting cycle.",
    date: "May 15, 2025",
    categories: ["Fraud", "Financial", "Accounting"],
    status: "under_review" as const,
  },
  {
    id: "AW-2023-002",
    title: "Workplace Harassment Complaint",
    summary: "AI-generated summary: Senior manager allegedly creating hostile work environment through inappropriate comments and favoritism. Multiple incidents reported over past 3 months.",
    date: "May 12, 2025",
    categories: ["Harassment", "HR", "Management"],
    status: "escalated" as const,
  },
  {
    id: "AW-2023-003",
    title: "Data Privacy Breach Concern",
    summary: "AI-generated summary: Customer data potentially exposed due to inadequate security protocols. Whistleblower reports systematic bypassing of encryption requirements.",
    date: "May 10, 2025",
    categories: ["Privacy", "Security", "Compliance"],
    status: "new" as const,
  },
  {
    id: "AW-2023-004",
    title: "Supply Chain Ethics Violation",
    summary: "AI-generated summary: Evidence of supplier using child labor in manufacturing facilities. Documentation includes photos and testimony from recent factory visit.",
    date: "May 8, 2025",
    categories: ["Ethics", "Supply Chain", "Legal"],
    status: "resolved" as const,
  },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  
  // Filter cases based on search term and status
  const filteredCases = MOCK_CASES.filter((caseItem) => {
    const matchesSearch = 
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || caseItem.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
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
            <h3 className="text-3xl font-bold">2</h3>
          </Card>
          <Card className="p-4 bg-yellow-50 border-l-4 border-yellow-500">
            <p className="text-sm font-medium text-gray-500">Under Review</p>
            <h3 className="text-3xl font-bold">3</h3>
          </Card>
          <Card className="p-4 bg-red-50 border-l-4 border-red-500">
            <p className="text-sm font-medium text-gray-500">Escalated</p>
            <h3 className="text-3xl font-bold">1</h3>
          </Card>
          <Card className="p-4 bg-green-50 border-l-4 border-green-500">
            <p className="text-sm font-medium text-gray-500">Resolved</p>
            <h3 className="text-3xl font-bold">5</h3>
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
              {filteredCases.length > 0 ? (
                filteredCases.map((caseItem) => (
                  <CaseCard key={caseItem.id} {...caseItem} />
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
              {filteredCases.slice(0, 2).map((caseItem) => (
                <CaseCard key={caseItem.id} {...caseItem} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="assigned" className="mt-6">
            <div className="text-center py-12 bg-aegis-lightGray rounded-lg">
              <p className="text-gray-500">No reports are currently assigned to you.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
