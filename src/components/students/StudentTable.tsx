
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  ChevronUp, 
  Download,
  Edit, 
  Eye,
  FileText, 
  MessageSquare, 
  MoreHorizontal, 
  Printer,
  RefreshCcw,
  RefreshCw,
  Upload,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SendMessageDialog } from "./actions/SendMessageDialog";
import { IdCardGenerator } from "./actions/IdCardGenerator";
import { ReportCardViewer } from "./actions/ReportCardViewer";
import { SectionTransferDialog } from "./actions/SectionTransferDialog";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  admissionNumber: string;
  parentContact: string;
  feeStatus: "Paid" | "Pending" | "Partial";
  attendance: number;
}

interface StudentTableProps {
  students: Student[];
  onEditStudent: (student: Student) => void;
  isLoading?: boolean;
  isRefreshing?: boolean;
  isImporting?: boolean;
  isExporting?: boolean;
  onRefresh?: () => void;
  onImport?: () => void;
  onExport?: () => void;
}

export function StudentTable({ 
  students, 
  onEditStudent,
  isLoading = false,
  isRefreshing = false,
  isImporting = false,
  isExporting = false,
  onRefresh,
  onImport,
  onExport
}: StudentTableProps) {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<keyof Student>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  // State for action dialogs
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [idCardDialogOpen, setIdCardDialogOpen] = useState(false);
  const [reportCardDialogOpen, setReportCardDialogOpen] = useState(false);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Reset dialogs when component unmounts
  useEffect(() => {
    return () => {
      setMessageDialogOpen(false);
      setIdCardDialogOpen(false);
      setReportCardDialogOpen(false);
      setTransferDialogOpen(false);
      setSelectedStudent(null);
    };
  }, []);

  const handleSort = (field: keyof Student) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedStudents = [...students].sort((a, b) => {
    if (sortField === "attendance") {
      return sortDirection === "asc" 
        ? a[sortField] - b[sortField] 
        : b[sortField] - a[sortField];
    }
    
    return sortDirection === "asc" 
      ? String(a[sortField]).localeCompare(String(b[sortField]))
      : String(b[sortField]).localeCompare(String(a[sortField]));
  });

  const renderSortIcon = (field: keyof Student) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 ml-1" />
    );
  };

  const getFeeStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-emerald-100 text-emerald-700 hover:bg-emerald-200";
      case "Pending":
        return "bg-red-100 text-red-700 hover:bg-red-200";
      case "Partial":
        return "bg-amber-100 text-amber-700 hover:bg-amber-200";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-200";
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-emerald-600";
    if (percentage >= 75) return "text-amber-600";
    return "text-red-600";
  };

  const handleViewStudent = (student: Student) => {
    navigate(`/students/${student.id}`);
  };

  // Action handlers
  const handleSendMessage = (student: Student, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedStudent(student);
    setMessageDialogOpen(true);
  };

  const handleGenerateIdCard = (student: Student, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedStudent(student);
    setIdCardDialogOpen(true);
  };

  const handleViewReportCard = (student: Student, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedStudent(student);
    setReportCardDialogOpen(true);
  };

  const handleTransferSection = (student: Student, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedStudent(student);
    setTransferDialogOpen(true);
  };
  
  // Refresh, import and export handlers
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      toast.error("Refresh functionality not implemented");
    }
  };
  
  const handleImport = () => {
    if (onImport) {
      onImport();
    } else {
      toast.error("Import functionality not implemented");
    }
  };
  
  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      toast.error("Export functionality not implemented");
    }
  };

  // Render loading skeletons
  if (isLoading && students.length === 0) {
    return (
      <div className="bg-white rounded-lg border overflow-hidden animate-fade-in shadow-sm">
        <div className="p-4 border-b flex justify-between items-center">
          <Skeleton className="h-6 w-40" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
        
        <div className="p-8">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border overflow-hidden animate-fade-in shadow-sm">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold">Student Records</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleImport}
            disabled={isImporting}
          >
            <Upload className="h-4 w-4 mr-2" />
            {isImporting ? "Importing..." : "Import"}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExport}
            disabled={isExporting}
          >
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? "Exporting..." : "Export"}
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead 
                className="w-[250px] cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Name {renderSortIcon("name")}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort("rollNumber")}
              >
                <div className="flex items-center">
                  Roll No {renderSortIcon("rollNumber")}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort("class")}
              >
                <div className="flex items-center">
                  Class & Section {renderSortIcon("class")}
                </div>
              </TableHead>
              <TableHead>Admission No.</TableHead>
              <TableHead>Parent Contact</TableHead>
              <TableHead>Fee Status</TableHead>
              <TableHead 
                className="cursor-pointer hover:text-primary transition-colors text-right"
                onClick={() => handleSort("attendance")}
              >
                <div className="flex items-center justify-end">
                  Attendance {renderSortIcon("attendance")}
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-[300px] text-center py-8">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <AlertCircle className="h-12 w-12 mb-4 text-gray-400" />
                    <p className="text-lg font-medium">No students found</p>
                    <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or add a new student</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              sortedStudents.map((student) => (
                <TableRow 
                  key={student.id} 
                  className="transition-colors hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleViewStudent(student)}
                >
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>{student.class} - {student.section}</TableCell>
                  <TableCell>{student.admissionNumber}</TableCell>
                  <TableCell className="whitespace-nowrap">{student.parentContact}</TableCell>
                  <TableCell>
                    <Badge className={cn("font-normal", getFeeStatusColor(student.feeStatus))}>
                      {student.feeStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className={cn("text-right font-medium", getAttendanceColor(student.attendance))}>
                    {student.attendance}%
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => handleViewStudent(student)}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEditStudent(student)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => handleSendMessage(student, e)}>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>Send Message</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => handleGenerateIdCard(student, e)}>
                          <Printer className="mr-2 h-4 w-4" />
                          <span>Generate ID Card</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => handleViewReportCard(student, e)}>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>View Report Card</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => handleTransferSection(student, e)}>
                          <RefreshCcw className="mr-2 h-4 w-4" />
                          <span>Transfer Section</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Action Dialogs */}
      {selectedStudent && (
        <>
          <SendMessageDialog 
            student={selectedStudent}
            open={messageDialogOpen}
            onOpenChange={setMessageDialogOpen}
          />
          
          <IdCardGenerator
            student={selectedStudent}
            open={idCardDialogOpen}
            onOpenChange={setIdCardDialogOpen}
          />
          
          <ReportCardViewer
            student={selectedStudent}
            open={reportCardDialogOpen}
            onOpenChange={setReportCardDialogOpen}
          />
          
          <SectionTransferDialog
            student={selectedStudent}
            open={transferDialogOpen}
            onOpenChange={setTransferDialogOpen}
          />
        </>
      )}
    </div>
  );
}
