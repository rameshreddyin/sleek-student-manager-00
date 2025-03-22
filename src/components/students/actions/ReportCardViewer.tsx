
import { useState } from "react";
import { Student } from "../StudentTable";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Download, Mail, Printer } from "lucide-react";

interface ReportCardViewerProps {
  student: Student;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock data for the report card
const termData = {
  "term1": {
    name: "First Term",
    subjects: [
      { name: "Mathematics", marks: 85, grade: "A", teacherRemarks: "Excellent performance. Keep it up!" },
      { name: "Science", marks: 78, grade: "B+", teacherRemarks: "Good grasp of concepts. Work on practical applications." },
      { name: "English", marks: 88, grade: "A", teacherRemarks: "Excellent written and verbal skills." },
      { name: "Social Studies", marks: 76, grade: "B+", teacherRemarks: "Good understanding of historical contexts." },
      { name: "Computer Science", marks: 92, grade: "A+", teacherRemarks: "Outstanding performance in programming." }
    ],
    attendance: 92,
    conductGrade: "A",
    classTeacherRemarks: "A diligent student with excellent academic performance. Shows leadership qualities."
  },
  "term2": {
    name: "Second Term",
    subjects: [
      { name: "Mathematics", marks: 82, grade: "A-", teacherRemarks: "Good progress. Work on problem-solving skills." },
      { name: "Science", marks: 85, grade: "A", teacherRemarks: "Impressive improvement in practical work." },
      { name: "English", marks: 90, grade: "A+", teacherRemarks: "Exceptional writing skills and vocabulary." },
      { name: "Social Studies", marks: 79, grade: "B+", teacherRemarks: "Improved analytical skills." },
      { name: "Computer Science", marks: 94, grade: "A+", teacherRemarks: "Excellent coding skills and problem-solving ability." }
    ],
    attendance: 94,
    conductGrade: "A",
    classTeacherRemarks: "Continues to excel academically. Very active in class discussions and extra-curricular activities."
  },
  "term3": {
    name: "Final Term",
    subjects: [
      { name: "Mathematics", marks: 88, grade: "A", teacherRemarks: "Excellent progress throughout the year." },
      { name: "Science", marks: 90, grade: "A+", teacherRemarks: "Outstanding grasp of scientific concepts." },
      { name: "English", marks: 92, grade: "A+", teacherRemarks: "Excellent communication and writing skills." },
      { name: "Social Studies", marks: 85, grade: "A", teacherRemarks: "Great improvement in analytical skills." },
      { name: "Computer Science", marks: 95, grade: "A+", teacherRemarks: "Exceptional programming skills." }
    ],
    attendance: 96,
    conductGrade: "A+",
    classTeacherRemarks: "A model student with excellent academic achievements and exemplary conduct."
  }
};

export function ReportCardViewer({ student, open, onOpenChange }: ReportCardViewerProps) {
  const [selectedTerm, setSelectedTerm] = useState("term3");
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePrint = () => {
    toast.success("Printing Report Card", {
      description: "The report card has been sent to the printer."
    });
    // In a real app, window.print() would be used here
  };
  
  const handleDownload = () => {
    setIsLoading(true);
    
    // Simulate download process
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Report Card Downloaded", {
        description: `The report card for ${student.name} has been downloaded.`
      });
    }, 1000);
  };
  
  const handleSendEmail = () => {
    setIsLoading(true);
    
    // Simulate email sending
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Report Card Sent", {
        description: `The report card has been emailed to ${student.name}'s parents.`
      });
    }, 1500);
  };
  
  const calculateTotal = () => {
    const subjects = termData[selectedTerm as keyof typeof termData].subjects;
    const total = subjects.reduce((sum, subject) => sum + subject.marks, 0);
    const percentage = (total / (subjects.length * 100)) * 100;
    return {
      total,
      percentage: percentage.toFixed(2)
    };
  };
  
  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return "text-emerald-600";
    if (grade.startsWith('B')) return "text-blue-600";
    if (grade.startsWith('C')) return "text-amber-600";
    return "text-red-600";
  };

  const currentTermData = termData[selectedTerm as keyof typeof termData];
  const { total, percentage } = calculateTotal();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Student Report Card</DialogTitle>
          <DialogDescription>
            Viewing academic performance for {student.name} - Class {student.class}-{student.section}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto px-1 py-2">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="space-y-2 w-full sm:w-60">
                <label htmlFor="term" className="text-sm font-medium">Select Term</label>
                <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                  <SelectTrigger id="term">
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="term1">First Term</SelectItem>
                    <SelectItem value="term2">Second Term</SelectItem>
                    <SelectItem value="term3">Final Term</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={handlePrint}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" onClick={handleDownload} disabled={isLoading}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button onClick={handleSendEmail} disabled={isLoading}>
                  <Mail className="mr-2 h-4 w-4" />
                  Email to Parents
                </Button>
              </div>
            </div>
            
            <div className="rounded-lg border overflow-hidden">
              {/* Report Card Header */}
              <div className="bg-primary p-4 text-white">
                <div className="text-center mb-2">
                  <h2 className="text-xl font-bold">ACADEMIC REPORT CARD</h2>
                  <p className="text-sm opacity-90">{currentTermData.name}, Academic Year 2023-24</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><span className="font-semibold">Name:</span> {student.name}</p>
                    <p><span className="font-semibold">Class:</span> {student.class} - {student.section}</p>
                    <p><span className="font-semibold">Roll Number:</span> {student.rollNumber}</p>
                  </div>
                  <div>
                    <p><span className="font-semibold">Admission No:</span> {student.admissionNumber}</p>
                    <p><span className="font-semibold">Attendance:</span> {currentTermData.attendance}%</p>
                    <p><span className="font-semibold">Conduct Grade:</span> {currentTermData.conductGrade}</p>
                  </div>
                </div>
              </div>
              
              {/* Subject Marks */}
              <div className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Subject</TableHead>
                      <TableHead className="text-center">Maximum Marks</TableHead>
                      <TableHead className="text-center">Marks Obtained</TableHead>
                      <TableHead className="text-center">Grade</TableHead>
                      <TableHead>Teacher's Remarks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentTermData.subjects.map((subject, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{subject.name}</TableCell>
                        <TableCell className="text-center">100</TableCell>
                        <TableCell className="text-center">{subject.marks}</TableCell>
                        <TableCell className="text-center">
                          <span className={getGradeColor(subject.grade)}>{subject.grade}</span>
                        </TableCell>
                        <TableCell className="text-sm">{subject.teacherRemarks}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-gray-50 font-medium">
                      <TableCell>Total</TableCell>
                      <TableCell className="text-center">{currentTermData.subjects.length * 100}</TableCell>
                      <TableCell className="text-center">{total}</TableCell>
                      <TableCell className="text-center" colSpan={2}>
                        Percentage: <span className="text-primary">{percentage}%</span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              {/* Class Teacher Remarks */}
              <div className="p-4 border-t">
                <h3 className="font-semibold mb-2">Class Teacher's Remarks:</h3>
                <p className="text-gray-700 p-3 bg-gray-50 rounded">{currentTermData.classTeacherRemarks}</p>
              </div>
              
              {/* Signatures */}
              <div className="grid grid-cols-3 gap-4 p-4 text-center text-sm border-t">
                <div>
                  <div className="h-12 border-b mb-1"></div>
                  <p>Class Teacher Signature</p>
                </div>
                <div>
                  <div className="h-12 border-b mb-1"></div>
                  <p>Principal Signature</p>
                </div>
                <div>
                  <div className="h-12 border-b mb-1"></div>
                  <p>Parent Signature</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
