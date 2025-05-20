
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import CaseCard from "@/components/CaseCard";
import { UserPlus } from "lucide-react";
import { Report } from "@/lib/reports";
import { User } from "@/lib/auth";

interface CasesListProps {
  filteredReports: Report[];
  currentUser: User | null;
  openAssignDialog: (reportId: string) => void;
  handleViewCase: (id: string) => void;
}

const CasesList: React.FC<CasesListProps> = ({ 
  filteredReports, 
  currentUser, 
  openAssignDialog, 
  handleViewCase 
}) => {
  return (
    <>
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
    </>
  );
};

export default CasesList;
