
// Report types and shared state management

export interface Report {
  id: string;
  title: string;
  summary: string;
  fullTranscript?: string;
  date: string;
  time?: string;
  reportedBy?: string;
  categories: string[];
  tags?: string[];
  status: "new" | "under_review" | "escalated" | "resolved";
  assignedTo?: string;
  priority?: "Low" | "Medium" | "High";
  audioUrl?: string;
  actions?: ReportAction[];
}

export interface ReportAction {
  action: string;
  timestamp: string;
  user: string;
  note?: string;
}

// Initial mock reports
const INITIAL_REPORTS: Report[] = [
  {
    id: "AW-2023-001",
    title: "Financial Reporting Discrepancy",
    summary: "AI-generated summary: Potential misstatement of quarterly earnings by ~$2.3M. Complainant provided evidence of irregular accounting practices in the Q3 reporting cycle.",
    fullTranscript: "I've been working in the accounting department for three years now, and I've noticed something concerning in our quarterly reports. For the past Q3 cycle, it appears that earnings have been overstated by approximately $2.3 million. I've observed irregular journal entries that don't follow standard accounting practices. Specifically, there are several transactions coded to deferred revenue that should be recognized in future periods according to GAAP principles. I've collected screenshots of these entries from our system and notes from meetings where these decisions were made. This appears to be deliberate to meet quarterly targets and not a simple oversight.",
    date: "May 15, 2025",
    time: "14:32:41",
    reportedBy: "Anonymous Whistleblower",
    categories: ["Fraud", "Financial", "Accounting"],
    tags: ["Q3 Reporting", "Revenue Recognition", "GAAP Violation"],
    status: "under_review",
    assignedTo: "Jennifer Martinez",
    priority: "High",
    audioUrl: "#",
    actions: [
      {
        action: "Report Created",
        timestamp: "May 15, 2025 14:32:41",
        user: "System"
      },
      {
        action: "Status changed to Under Review",
        timestamp: "May 15, 2025 15:10:22",
        user: "Daniel Wong"
      },
      {
        action: "Assigned to Jennifer Martinez",
        timestamp: "May 16, 2025 09:15:33",
        user: "Daniel Wong"
      },
      {
        action: "Note added",
        timestamp: "May 16, 2025 11:42:15",
        user: "Jennifer Martinez",
        note: "Requesting additional documentation from Finance department. Need to verify Q3 journal entries."
      }
    ]
  },
  {
    id: "AW-2023-002",
    title: "Workplace Harassment Complaint",
    summary: "AI-generated summary: Senior manager allegedly creating hostile work environment through inappropriate comments and favoritism. Multiple incidents reported over past 3 months.",
    date: "May 12, 2025",
    categories: ["Harassment", "HR", "Management"],
    status: "escalated",
  },
  {
    id: "AW-2023-003",
    title: "Data Privacy Breach Concern",
    summary: "AI-generated summary: Customer data potentially exposed due to inadequate security protocols. Whistleblower reports systematic bypassing of encryption requirements.",
    date: "May 10, 2025",
    categories: ["Privacy", "Security", "Compliance"],
    status: "new",
  },
  {
    id: "AW-2023-004",
    title: "Supply Chain Ethics Violation",
    summary: "AI-generated summary: Evidence of supplier using child labor in manufacturing facilities. Documentation includes photos and testimony from recent factory visit.",
    date: "May 8, 2025",
    categories: ["Ethics", "Supply Chain", "Legal"],
    status: "resolved",
  }
];

// Load reports from localStorage or use initial data
export const getReports = (): Report[] => {
  const storedReports = localStorage.getItem('aegis_whistleblower_reports');
  if (storedReports) {
    try {
      const parsedReports = JSON.parse(storedReports);
      return [...INITIAL_REPORTS, ...parsedReports];
    } catch (e) {
      console.error('Error parsing stored reports:', e);
      return INITIAL_REPORTS;
    }
  }
  return INITIAL_REPORTS;
};

// Save reports to localStorage
export const saveReports = (reports: Report[]): void => {
  localStorage.setItem('aegis_whistleblower_reports', JSON.stringify(reports));
};

// Update an existing report
export const updateReport = (updatedReport: Report): Report[] => {
  const reports = getReports();
  const updatedReports = reports.map(report => 
    report.id === updatedReport.id ? updatedReport : report
  );
  saveReports(updatedReports);
  return updatedReports;
};

// Add action to a report
export const addReportAction = (reportId: string, action: ReportAction): Report[] => {
  const reports = getReports();
  const updatedReports = reports.map(report => {
    if (report.id === reportId) {
      const actions = report.actions || [];
      return {
        ...report,
        actions: [...actions, action]
      };
    }
    return report;
  });
  saveReports(updatedReports);
  return updatedReports;
};

// Assign a report to a user
export const assignReport = (reportId: string, userName: string): Report[] => {
  const reports = getReports();
  const currentTime = new Date().toLocaleString();
  
  const updatedReports = reports.map(report => {
    if (report.id === reportId) {
      const actions = report.actions || [];
      return {
        ...report,
        assignedTo: userName,
        status: "under_review" as const,
        actions: [...actions, {
          action: `Assigned to ${userName}`,
          timestamp: currentTime,
          user: "System"
        }]
      };
    }
    return report;
  });
  
  saveReports(updatedReports);
  return updatedReports;
};

// Update report status
export const updateReportStatus = (reportId: string, status: "new" | "under_review" | "escalated" | "resolved"): Report[] => {
  const reports = getReports();
  const currentTime = new Date().toLocaleString();
  
  const updatedReports = reports.map(report => {
    if (report.id === reportId) {
      const actions = report.actions || [];
      return {
        ...report,
        status,
        actions: [...actions, {
          action: `Status changed to ${status.replace('_', ' ')}`,
          timestamp: currentTime,
          user: "System"
        }]
      };
    }
    return report;
  });
  
  saveReports(updatedReports);
  return updatedReports;
};
