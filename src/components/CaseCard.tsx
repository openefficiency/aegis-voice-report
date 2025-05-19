
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Play, CheckCircle, AlertTriangle, Clock } from "lucide-react";

interface CaseCardProps {
  id: string;
  title: string;
  summary: string;
  date: string;
  categories: string[];
  status: "new" | "under_review" | "escalated" | "resolved";
}

const CaseCard: React.FC<CaseCardProps> = ({
  id,
  title,
  summary,
  date,
  categories,
  status,
}) => {
  const getStatusBadge = () => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500">New</Badge>;
      case "under_review":
        return <Badge className="bg-yellow-500">Under Review</Badge>;
      case "escalated":
        return <Badge className="bg-red-500">Escalated</Badge>;
      case "resolved":
        return <Badge className="bg-green-500">Resolved</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "new":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "under_review":
        return <Pencil className="h-4 w-4 text-yellow-500" />;
      case "escalated":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {getStatusBadge()}
        </div>
        <div className="text-sm text-gray-500 flex items-center mt-1">
          {getStatusIcon()}
          <span className="ml-1">Case #{id} • {date}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 line-clamp-3">{summary}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {categories.map((category, index) => (
            <Badge key={index} variant="outline" className="bg-aegis-lightGray text-gray-700">
              {category}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button variant="ghost" size="sm" className="text-aegis-blue">
          <Play className="h-4 w-4 mr-1" /> Listen
        </Button>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CaseCard;
