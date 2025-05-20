
import React from "react";
import { Report } from "@/lib/reports";
import StatCard from "./StatCard";
import { AlertCircle, Clock, FileCheck, Flag } from "lucide-react";

interface DashboardStatsProps {
  reports: Report[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ reports }) => {
  // Calculate stats for dashboard cards
  const newReports = reports.filter(r => r.status === "new").length;
  const underReviewReports = reports.filter(r => r.status === "under_review").length;
  const escalatedReports = reports.filter(r => r.status === "escalated").length;
  const resolvedReports = reports.filter(r => r.status === "resolved").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <StatCard 
        title="New Reports" 
        count={newReports} 
        bgColor="bg-aegis-lightBlue" 
        borderColor="border-aegis-blue"
        icon={Flag}
      />
      <StatCard 
        title="Under Review" 
        count={underReviewReports} 
        bgColor="bg-yellow-50" 
        borderColor="border-yellow-500"
        icon={Clock}
      />
      <StatCard 
        title="Escalated" 
        count={escalatedReports} 
        bgColor="bg-red-50" 
        borderColor="border-red-500"
        icon={AlertCircle}
      />
      <StatCard 
        title="Resolved" 
        count={resolvedReports} 
        bgColor="bg-green-50" 
        borderColor="border-green-500"
        icon={FileCheck}
      />
    </div>
  );
};

export default DashboardStats;
