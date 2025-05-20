
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart2, LogOut, RefreshCw } from "lucide-react";
import { User } from "@/lib/auth";

interface DashboardHeaderProps {
  currentUser: User | null;
  onLogout: () => void;
  onRefresh: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  currentUser, 
  onLogout, 
  onRefresh 
}) => {
  return (
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
            <Button variant="ghost" size="icon" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
        <Button 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={onRefresh}
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
  );
};

export default DashboardHeader;
