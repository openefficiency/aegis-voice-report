
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import CaseCard from "@/components/CaseCard";
import { UserPlus } from "lucide-react";

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

interface CasesListProps {
  filteredReports: Report[];
  currentUser: UserProfile | null;
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
                  id={report.id}
                  title={report.title}
                  summary={report.summary}
                  date={report.date_reported}
                  categories={report.categories}
                  status={report.status}
                  assignedTo={report.assigned_to}
                  priority={report.priority}
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
                id={report.id}
                title={report.title}
                summary={report.summary}
                date={report.date_reported}
                categories={report.categories}
                status={report.status}
                assignedTo={report.assigned_to}
                priority={report.priority}
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
            {filteredReports.filter(r => r.assigned_to === currentUser.full_name).length > 0 ? (
              filteredReports
                .filter(r => r.assigned_to === currentUser.full_name)
                .map(report => (
                  <CaseCard 
                    key={report.id} 
                    id={report.id}
                    title={report.title}
                    summary={report.summary}
                    date={report.date_reported}
                    categories={report.categories}
                    status={report.status}
                    assignedTo={report.assigned_to}
                    priority={report.priority}
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
