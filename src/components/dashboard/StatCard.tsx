
import React from "react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  count: number;
  bgColor: string;
  borderColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, count, bgColor, borderColor }) => {
  return (
    <Card className={`p-4 ${bgColor} border-l-4 ${borderColor}`}>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="text-3xl font-bold">{count}</h3>
    </Card>
  );
};

export default StatCard;
