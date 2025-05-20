
import React from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  count: number;
  bgColor: string;
  borderColor: string;
  icon?: LucideIcon;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  count, 
  bgColor, 
  borderColor,
  icon: Icon 
}) => {
  return (
    <Card className={`p-4 ${bgColor} border-l-4 ${borderColor}`}>
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5 text-gray-500" />}
        <p className="text-sm font-medium text-gray-500">{title}</p>
      </div>
      <h3 className="text-3xl font-bold">{count}</h3>
    </Card>
  );
};

export default StatCard;
