
import { useState } from "react";
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
  Edit, 
  FileText, 
  MessageSquare, 
  MoreHorizontal, 
  Printer, 
  RefreshCcw 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
}

export function StudentTable({ students, onEditStudent }: StudentTableProps) {
  const [sortField, setSortField] = useState<keyof Student>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

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
      ? a[sortField].localeCompare(b[sortField])
      : b[sortField].localeCompare(a[sortField]);
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

  return (
    <div className="bg-white rounded-lg border overflow-hidden animate-fade-in shadow-sm">
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
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No students found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            ) : (
              sortedStudents.map((student) => (
                <TableRow 
                  key={student.id} 
                  className="transition-colors hover:bg-gray-50"
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
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => onEditStudent(student)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>Send Message</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Printer className="mr-2 h-4 w-4" />
                          <span>Generate ID Card</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>View Report Card</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
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
    </div>
  );
}
