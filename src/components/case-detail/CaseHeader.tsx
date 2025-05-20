
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Report } from "@/lib/reports";

interface CaseHeaderProps {
  report: Report;
}

const CaseHeader: React.FC<CaseHeaderProps> = ({ report }) => {
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
    <div>
      <div className="flex items-center gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{report.title}</h1>
        <Badge className={getStatusClass(report.status)}>
          {report.status.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>
      <div className="text-gray-500 mt-1">Case #{report.id} • Reported on {report.date}</div>
    </div>
  );
};

export default CaseHeader;
