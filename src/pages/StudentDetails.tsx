
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Header } from "@/components/layout/Header";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Calendar, 
  ChevronLeft, 
  Download, 
  FileText, 
  MoreHorizontal, 
  PhoneCall, 
  Printer, 
  User 
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Student } from "@/components/students/StudentTable";
import { cn } from "@/lib/utils";

// Sample data for demonstration
const studentData: Student = {
  id: "1",
  name: "Aanya Sharma",
  rollNumber: "101",
  class: "5",
  section: "A",
  admissionNumber: "AKS-2023-101",
  parentContact: "+91 9876543210",
  feeStatus: "Paid",
  attendance: 95,
};

const attendanceData = [
  { month: "January", percentage: 98 },
  { month: "February", percentage: 95 },
  { month: "March", percentage: 92 },
  { month: "April", percentage: 88 },
  { month: "May", percentage: 96 },
  { month: "June", percentage: 94 },
];

const feeData = [
  { term: "Term 1", amount: "₹25,000", status: "Paid", date: "15 Apr 2023" },
  { term: "Term 2", amount: "₹25,000", status: "Paid", date: "15 Jul 2023" },
  { term: "Term 3", amount: "₹25,000", status: "Paid", date: "15 Oct 2023" },
  { term: "Term 4", amount: "₹25,000", status: "Pending", date: "15 Jan 2024" },
];

const academicData = [
  { subject: "Mathematics", marks: 92, grade: "A", classAverage: 78, status: "Excellent" },
  { subject: "Science", marks: 88, grade: "A", classAverage: 75, status: "Good" },
  { subject: "English", marks: 95, grade: "A+", classAverage: 80, status: "Excellent" },
  { subject: "Social Studies", marks: 85, grade: "B+", classAverage: 76, status: "Good" },
  { subject: "Hindi", marks: 90, grade: "A", classAverage: 82, status: "Good" },
  { subject: "Computer Science", marks: 94, grade: "A", classAverage: 79, status: "Excellent" },
];

const behaviorData = [
  { date: "12 May 2023", title: "Excellent classroom participation", type: "Positive", description: "Actively participated in group discussions and provided valuable insights." },
  { date: "24 June 2023", title: "Leadership in group project", type: "Positive", description: "Took initiative to lead the science project team and ensured timely completion." },
  { date: "10 July 2023", title: "Late submission of assignment", type: "Improvement needed", description: "Submitted the mathematics assignment 2 days after the deadline." },
];

export default function StudentDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  
  useEffect(() => {
    // In a real application, you would fetch the student data based on the id
    // For now, we'll use the sample data
    setStudent(studentData);
  }, [id]);
  
  if (!student) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <p>Loading student information...</p>
        </div>
      </Layout>
    );
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-emerald-100 text-emerald-700";
      case "Pending":
        return "bg-red-100 text-red-700";
      case "Partial":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  
  const getProgressColor = (value: number) => {
    if (value >= 90) return "bg-emerald-500";
    if (value >= 75) return "bg-amber-500";
    return "bg-red-500";
  };
  
  const getRemarkColor = (type: string) => {
    switch (type) {
      case "Positive":
        return "bg-emerald-100 text-emerald-700";
      case "Improvement needed":
        return "bg-amber-100 text-amber-700";
      case "Concern":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  
  return (
    <Layout>
      <Header
        title="Student Profile"
        subtitle="Detailed student information and reports"
      />
      
      <div className="p-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/students')}
          className="mb-6"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Students
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Student Information</CardTitle>
              <CardDescription>Personal & contact details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="https://github.com/shadcn.png" alt={student.name} />
                  <AvatarFallback className="text-xl">{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{student.name}</h3>
                <p className="text-muted-foreground">Roll No: {student.rollNumber}</p>
                <Badge className="mt-2">Class {student.class} - Section {student.section}</Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Admission No</span>
                  </div>
                  <span className="font-medium">{student.admissionNumber}</span>
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <PhoneCall className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Parent Contact</span>
                  </div>
                  <span className="font-medium">{student.parentContact}</span>
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Fee Status</span>
                  </div>
                  <Badge className={getStatusColor(student.feeStatus)}>
                    {student.feeStatus}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Attendance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{student.attendance}%</span>
                    <Progress 
                      value={student.attendance} 
                      max={100} 
                      className={cn("h-2 w-12", getProgressColor(student.attendance))}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" />
                  ID Card
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Reports
                </Button>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <Tabs defaultValue="academic">
              <CardHeader className="pb-0">
                <div className="flex justify-between items-center">
                  <CardTitle>Student Performance</CardTitle>
                  <TabsList>
                    <TabsTrigger value="academic">Academic</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    <TabsTrigger value="fee">Fee</TabsTrigger>
                    <TabsTrigger value="behavior">Behavior</TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>
              
              <TabsContent value="academic" className="m-0">
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead className="text-right">Marks</TableHead>
                        <TableHead className="text-right">Grade</TableHead>
                        <TableHead className="text-right">Class Avg</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {academicData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.subject}</TableCell>
                          <TableCell className="text-right">{item.marks}</TableCell>
                          <TableCell className="text-right">{item.grade}</TableCell>
                          <TableCell className="text-right">{item.classAverage}</TableCell>
                          <TableCell className="text-right">
                            <Badge className={
                              item.status === "Excellent" 
                                ? "bg-emerald-100 text-emerald-700" 
                                : "bg-amber-100 text-amber-700"
                            }>
                              {item.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="mt-4 flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Class Rank</p>
                      <p className="text-xl font-semibold">3 / 42</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Average Marks</p>
                      <p className="text-xl font-semibold">90.67%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Performance</p>
                      <p className="text-xl font-semibold text-emerald-600">Excellent</p>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="attendance" className="m-0">
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead>Percentage</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendanceData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.month}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress 
                                value={item.percentage} 
                                max={100} 
                                className={cn("h-2 w-[100px]", getProgressColor(item.percentage))}
                              />
                              <span>{item.percentage}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge className={
                              item.percentage >= 90 
                                ? "bg-emerald-100 text-emerald-700" 
                                : item.percentage >= 75 
                                  ? "bg-amber-100 text-amber-700" 
                                  : "bg-red-100 text-red-700"
                            }>
                              {item.percentage >= 90 ? "Excellent" : item.percentage >= 75 ? "Good" : "Needs Improvement"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="mt-4 flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Present Days</p>
                      <p className="text-xl font-semibold">112 / 120</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Average Attendance</p>
                      <p className="text-xl font-semibold">93.33%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="text-xl font-semibold text-emerald-600">Excellent</p>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="fee" className="m-0">
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Term</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {feeData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.term}</TableCell>
                          <TableCell>{item.amount}</TableCell>
                          <TableCell>{item.date}</TableCell>
                          <TableCell className="text-right">
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="mt-4 flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Fee</p>
                      <p className="text-xl font-semibold">₹1,00,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Paid Amount</p>
                      <p className="text-xl font-semibold">₹75,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Balance</p>
                      <p className="text-xl font-semibold text-amber-600">₹25,000</p>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="behavior" className="m-0">
                <CardContent>
                  <div className="space-y-4">
                    {behaviorData.map((item, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{item.title}</h4>
                          <Badge className={getRemarkColor(item.type)}>
                            {item.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Positive Remarks</p>
                      <p className="text-xl font-semibold">8</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Improvements</p>
                      <p className="text-xl font-semibold">2</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Overall</p>
                      <p className="text-xl font-semibold text-emerald-600">Excellent</p>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        
        {/* Additional reports sections would go here */}
      </div>
    </Layout>
  );
}
