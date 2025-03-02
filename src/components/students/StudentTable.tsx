
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
        return "bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30";
      case "Pending":
        return "bg-red-500/20 text-red-500 hover:bg-red-500/30";
      case "Partial":
        return "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30";
      default:
        return "bg-gray-500/20 text-gray-500 hover:bg-gray-500/30";
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-emerald-500";
    if (percentage >= 75) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <div className="glass-card rounded-lg overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-secondary/50">
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
            {sortedStudents.map((student) => (
              <TableRow 
                key={student.id} 
                className="hover-glow hover:bg-secondary/20 transition-colors"
              >
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>{student.class} - {student.section}</TableCell>
                <TableCell>{student.admissionNumber}</TableCell>
                <TableCell>{student.parentContact}</TableCell>
                <TableCell>
                  <Badge className={cn("font-normal", getFeeStatusColor(student.feeStatus))}>
                    {student.feeStatus}
                  </Badge>
                </TableCell>
                <TableCell className={cn("text-right", getAttendanceColor(student.attendance))}>
                  {student.attendance}%
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover w-48">
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
