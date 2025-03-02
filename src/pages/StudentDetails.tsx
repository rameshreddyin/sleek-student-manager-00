
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Header } from "@/components/layout/Header";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  AlertTriangle,
  BookOpen,
  Calendar,
  ChevronLeft, 
  Download, 
  Edit,
  FileText, 
  Mail,
  MoreHorizontal,
  Phone,
  PhoneCall, 
  PieChart,
  Printer, 
  RefreshCw,
  School,
  ShieldAlert,
  Star,
  Trophy,
  User,
  UserCog,
  Verified
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Student } from "@/components/students/StudentTable";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";

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

// Enhanced student data with additional information
const enhancedStudentData = {
  ...studentData,
  gender: "Female",
  dateOfBirth: "12/05/2012",
  age: "11 years",
  bloodGroup: "O+",
  address: "123 Gandhi Road, Koramangala, Bangalore - 560034",
  email: "parent.sharma@example.com",
  fatherName: "Rajesh Sharma",
  motherName: "Priya Sharma",
  parentOccupation: "Software Engineer",
  emergencyContact: "+91 9876543211",
  admissionDate: "04/04/2023",
  religion: "Hindu",
  nationality: "Indian",
  aadharNumber: "XXXX-XXXX-1234",
  category: "General",
  previousSchool: "Delhi Public School",
  transportMode: "School Bus",
  busRoute: "Route 7B - Koramangala",
  busStopLocation: "7th Block Junction",
  medicalConditions: "Mild Asthma",
  allergies: "Dust",
};

const attendanceData = [
  { month: "January", percentage: 98, present: 24, absent: 0, leave: 1, total: 25 },
  { month: "February", percentage: 95, present: 21, absent: 1, leave: 0, total: 22 },
  { month: "March", percentage: 92, present: 23, absent: 2, leave: 0, total: 25 },
  { month: "April", percentage: 88, present: 22, absent: 3, leave: 0, total: 25 },
  { month: "May", percentage: 96, present: 24, absent: 0, leave: 1, total: 25 },
  { month: "June", percentage: 94, present: 17, absent: 1, leave: 0, total: 18 },
];

const feeData = [
  { 
    term: "Term 1", 
    amount: "₹25,000", 
    status: "Paid", 
    date: "15 Apr 2023",
    dueDate: "10 Apr 2023",
    paymentMethod: "Online Transfer",
    receiptNo: "REC-23-0475",
    transactionId: "TXN789456123"
  },
  { 
    term: "Term 2", 
    amount: "₹25,000", 
    status: "Paid", 
    date: "15 Jul 2023",
    dueDate: "10 Jul 2023",
    paymentMethod: "Online Transfer",
    receiptNo: "REC-23-0892",
    transactionId: "TXN789456124"
  },
  { 
    term: "Term 3", 
    amount: "₹25,000", 
    status: "Paid", 
    date: "15 Oct 2023",
    dueDate: "10 Oct 2023",
    paymentMethod: "Credit Card",
    receiptNo: "REC-23-1254",
    transactionId: "TXN789456125"
  },
  { 
    term: "Term 4", 
    amount: "₹25,000", 
    status: "Pending", 
    date: "-",
    dueDate: "10 Jan 2024",
    paymentMethod: "-",
    receiptNo: "-",
    transactionId: "-"
  },
];

const academicData = [
  { 
    subject: "Mathematics", 
    marks: 92, 
    grade: "A", 
    classAverage: 78, 
    status: "Excellent",
    teacher: "Dr. Patel",
    highestMark: 96,
    lowestMark: 45,
    examType: "Mid-term",
    comments: "Excellent problem-solving skills. Can improve on time management."
  },
  { 
    subject: "Science", 
    marks: 88, 
    grade: "A", 
    classAverage: 75, 
    status: "Good",
    teacher: "Mrs. Gupta",
    highestMark: 94,
    lowestMark: 42,
    examType: "Mid-term",
    comments: "Good understanding of concepts. Needs to improve practical experiments."
  },
  { 
    subject: "English", 
    marks: 95, 
    grade: "A+", 
    classAverage: 80, 
    status: "Excellent",
    teacher: "Mr. Sharma",
    highestMark: 97,
    lowestMark: 50,
    examType: "Mid-term",
    comments: "Excellent writing skills and vocabulary. Active participation in class discussions."
  },
  { 
    subject: "Social Studies", 
    marks: 85, 
    grade: "B+", 
    classAverage: 76, 
    status: "Good",
    teacher: "Mrs. Verma",
    highestMark: 92,
    lowestMark: 48,
    examType: "Mid-term",
    comments: "Good knowledge of facts. Needs to improve on map work and historical analysis."
  },
  { 
    subject: "Hindi", 
    marks: 90, 
    grade: "A", 
    classAverage: 82, 
    status: "Good",
    teacher: "Mr. Kapoor",
    highestMark: 95,
    lowestMark: 55,
    examType: "Mid-term",
    comments: "Good grammar and composition. Can improve on literature analysis."
  },
  { 
    subject: "Computer Science", 
    marks: 94, 
    grade: "A", 
    classAverage: 79, 
    status: "Excellent",
    teacher: "Ms. Reddy",
    highestMark: 98,
    lowestMark: 52,
    examType: "Mid-term",
    comments: "Excellent programming skills and logical thinking. Very enthusiastic in class."
  },
];

const behaviorData = [
  { 
    date: "12 May 2023", 
    title: "Excellent classroom participation", 
    type: "Positive", 
    description: "Actively participated in group discussions and provided valuable insights.",
    recordedBy: "Mrs. Gupta",
    action: "Merit Points +5"
  },
  { 
    date: "24 June 2023", 
    title: "Leadership in group project", 
    type: "Positive", 
    description: "Took initiative to lead the science project team and ensured timely completion.",
    recordedBy: "Ms. Reddy",
    action: "Merit Points +10"
  },
  { 
    date: "10 July 2023", 
    title: "Late submission of assignment", 
    type: "Improvement needed", 
    description: "Submitted the mathematics assignment 2 days after the deadline.",
    recordedBy: "Dr. Patel",
    action: "Warning Issued"
  },
];

const transportData = {
  mode: "School Bus",
  route: "Route 7B - Koramangala",
  stopName: "7th Block Junction",
  pickupTime: "7:30 AM",
  dropTime: "3:45 PM",
  driverName: "Mr. Raju Singh",
  driverContact: "+91 9876543222",
  busNumber: "KA-01-F-5678",
  busMonitor: "Mrs. Lakshmi",
  monthlyFee: "₹2,500",
  distance: "3.5 km"
};

const recentActivities = [
  { date: "02 Nov 2023", activity: "Participated in Annual Science Fair", category: "Academic" },
  { date: "15 Oct 2023", activity: "Term 3 Fee Payment", category: "Administrative" },
  { date: "28 Sep 2023", activity: "Awarded 'Star of the Month'", category: "Achievement" },
  { date: "10 Sep 2023", activity: "Parent-Teacher Meeting Attended", category: "Communication" },
  { date: "05 Aug 2023", activity: "Selected for School Cricket Team", category: "Sports" }
];

const healthData = {
  bloodGroup: "O+",
  height: "140 cm",
  weight: "35 kg",
  bmi: "17.9",
  vision: "6/6 (Normal)",
  dentalHealth: "Good",
  immunization: "Complete",
  medicalConditions: "Mild Asthma",
  allergies: "Dust",
  medications: "Inhaler as needed",
  lastCheckup: "15 Aug 2023",
  doctorName: "Dr. Agarwal",
  doctorContact: "+91 9876543233"
};

export default function StudentDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Create form for edit mode
  const form = useForm({
    defaultValues: {
      name: enhancedStudentData.name,
      rollNumber: enhancedStudentData.rollNumber,
      class: enhancedStudentData.class,
      section: enhancedStudentData.section,
      parentContact: enhancedStudentData.parentContact,
      email: enhancedStudentData.email
    }
  });
  
  useEffect(() => {
    // In a real application, you would fetch the student data based on the id
    // For now, we'll use the sample data and simulate loading
    const timer = setTimeout(() => {
      setStudent(studentData);
      setLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate a refresh by waiting for a bit and then setting refreshing to false
    setTimeout(() => {
      setRefreshing(false);
      toast.success("Student information refreshed successfully");
    }, 1000);
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    form.reset();
  };
  
  const handleSaveEdit = () => {
    // In a real application, you would save the edited data to the database
    setIsEditing(false);
    toast.success("Student information updated successfully");
  };
  
  const handlePrintDetails = () => {
    toast.info("Preparing to print student details...");
    // In a real application, this would trigger printing functionality
    setTimeout(() => {
      toast.success("Student details printed successfully");
    }, 1500);
  };
  
  const handleDownloadReport = () => {
    toast.info("Preparing student report for download...");
    // In a real application, this would trigger a download
    setTimeout(() => {
      toast.success("Student report downloaded successfully");
    }, 1500);
  };
  
  const handleExportData = () => {
    toast.info("Exporting student data...");
    // In a real application, this would trigger an export
    setTimeout(() => {
      toast.success("Student data exported successfully");
    }, 1500);
  };
  
  const handleDeleteRequest = () => {
    toast.error("This action requires administrator approval", {
      description: "Please contact the system administrator to proceed with student deletion."
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-emerald-100 text-emerald-700";
      case "Pending":
        return "bg-amber-100 text-amber-700";
      case "Overdue":
        return "bg-red-100 text-red-700";
      case "Partial":
        return "bg-blue-100 text-blue-700";
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
  
  const getActivityIcon = (category: string) => {
    switch (category) {
      case "Academic":
        return <BookOpen className="h-4 w-4" />;
      case "Administrative":
        return <FileText className="h-4 w-4" />;
      case "Achievement":
        return <Trophy className="h-4 w-4" />;
      case "Communication":
        return <Mail className="h-4 w-4" />;
      case "Sports":
        return <Star className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Loading student information...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!student) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 mx-auto text-amber-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Student Not Found</h2>
            <p className="text-muted-foreground mb-4">The student you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/students')}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Students
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Header
        title="Student Profile"
        subtitle="Detailed student information and performance data"
      />
      
      <div className="p-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/students')}
            className="mb-2 sm:mb-0"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Students
          </Button>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={cn("mr-2 h-4 w-4", refreshing && "animate-spin")} />
              {refreshing ? "Refreshing..." : "Refresh"}
            </Button>
            
            <Button 
              onClick={handlePrintDetails}
              variant="outline"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            
            <Button 
              onClick={handleDownloadReport}
              variant="outline"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Student
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportData}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDeleteRequest} className="text-red-600">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Request Deletion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-1">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Student Information</CardTitle>
                  <CardDescription>Personal & contact details</CardDescription>
                </div>
                {!isEditing && (
                  <Button variant="ghost" size="sm" onClick={handleEdit}>
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Form {...form}>
                  <div className="flex flex-col items-center mb-6">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="https://github.com/shadcn.png" alt={enhancedStudentData.name} />
                      <AvatarFallback className="text-xl">{enhancedStudentData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-4 w-full">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="class"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Class</FormLabel>
                              <Select 
                                defaultValue={field.value} 
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select class" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((cls) => (
                                    <SelectItem key={cls} value={cls.toString()}>
                                      Class {cls}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="section"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Section</FormLabel>
                              <Select 
                                defaultValue={field.value} 
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select section" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {["A", "B", "C", "D"].map((section) => (
                                    <SelectItem key={section} value={section}>
                                      Section {section}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="rollNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Roll Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="parentContact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Parent Contact</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveEdit}>
                      Save Changes
                    </Button>
                  </div>
                </Form>
              ) : (
                <>
                  <div className="flex flex-col items-center mb-6">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="https://github.com/shadcn.png" alt={student.name} />
                      <AvatarFallback className="text-xl">{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold">{student.name}</h3>
                    <p className="text-muted-foreground">Roll No: {student.rollNumber}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge className="bg-primary">Class {student.class}</Badge>
                      <Badge className="bg-secondary">Section {student.section}</Badge>
                    </div>
                    <Badge className="mt-2" variant="outline">
                      <Calendar className="h-3 w-3 mr-1" />
                      {enhancedStudentData.admissionDate}
                    </Badge>
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
                        <School className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Previous School</span>
                      </div>
                      <span className="font-medium">{enhancedStudentData.previousSchool}</span>
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Parent Contact</span>
                      </div>
                      <span className="font-medium">{student.parentContact}</span>
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Email</span>
                      </div>
                      <span className="font-medium">{enhancedStudentData.email}</span>
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
                </>
              )}
            </CardContent>
            <CardFooter className="flex flex-col">
              <Separator className="mb-4" />
              <div className="grid grid-cols-2 gap-2 w-full">
                <div>
                  <h4 className="text-xs text-muted-foreground mb-1">Parents</h4>
                  <p className="text-sm font-medium">{enhancedStudentData.fatherName}</p>
                  <p className="text-sm font-medium">{enhancedStudentData.motherName}</p>
                </div>
                <div>
                  <h4 className="text-xs text-muted-foreground mb-1">Address</h4>
                  <p className="text-sm">{enhancedStudentData.address}</p>
                </div>
              </div>
            </CardFooter>
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
                    <TabsTrigger value="transport">Transport</TabsTrigger>
                    <TabsTrigger value="health">Health</TabsTrigger>
                  </TabsList>
                </div>
                <CardDescription className="mt-2">Comprehensive performance metrics and data</CardDescription>
              </CardHeader>
              
              <TabsContent value="academic" className="m-0">
                <CardContent>
                  <div className="rounded-md border mb-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead className="text-right">Marks</TableHead>
                          <TableHead className="text-right">Grade</TableHead>
                          <TableHead className="text-right">Class Avg</TableHead>
                          <TableHead className="text-right">Status</TableHead>
                          <TableHead className="text-right">Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {academicData.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              <div>
                                {item.subject}
                                <div className="text-xs text-muted-foreground">
                                  {item.teacher}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">{item.marks}</TableCell>
                            <TableCell className="text-right font-semibold">{item.grade}</TableCell>
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
                            <TableCell className="text-right">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                  <div className="space-y-2">
                                    <h4 className="font-medium">{item.subject} Details</h4>
                                    <div className="grid grid-cols-2 gap-1 text-sm">
                                      <span className="text-muted-foreground">Exam Type:</span>
                                      <span>{item.examType}</span>
                                      <span className="text-muted-foreground">Highest Mark:</span>
                                      <span>{item.highestMark}</span>
                                      <span className="text-muted-foreground">Lowest Mark:</span>
                                      <span>{item.lowestMark}</span>
                                    </div>
                                    <div className="pt-2 text-sm">
                                      <span className="text-muted-foreground">Teacher's Comments:</span>
                                      <p className="mt-1">{item.comments}</p>
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Class Rank</p>
                            <p className="text-xl font-semibold">3 / 42</p>
                          </div>
                          <PieChart className="h-8 w-8 text-primary opacity-80" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Average Marks</p>
                            <p className="text-xl font-semibold">90.67%</p>
                          </div>
                          <BookOpen className="h-8 w-8 text-primary opacity-80" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Performance</p>
                            <p className="text-xl font-semibold text-emerald-600">Excellent</p>
                          </div>
                          <Trophy className="h-8 w-8 text-emerald-500 opacity-80" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="attendance" className="m-0">
                <CardContent>
                  <div className="rounded-md border mb-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Month</TableHead>
                          <TableHead>Present Days</TableHead>
                          <TableHead>Absent Days</TableHead>
                          <TableHead>Leave</TableHead>
                          <TableHead>Total Days</TableHead>
                          <TableHead>Percentage</TableHead>
                          <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attendanceData.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.month}</TableCell>
                            <TableCell>{item.present}</TableCell>
                            <TableCell>{item.absent}</TableCell>
                            <TableCell>{item.leave}</TableCell>
                            <TableCell>{item.total}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress 
                                  value={item.percentage} 
                                  max={100} 
                                  className={cn("h-2 w-[60px]", getProgressColor(item.percentage))}
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
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Total Present Days</p>
                            <p className="text-xl font-semibold">112 / 120</p>
                          </div>
                          <Calendar className="h-8 w-8 text-primary opacity-80" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Average Attendance</p>
                            <p className="text-xl font-semibold">93.33%</p>
                          </div>
                          <Verified className="h-8 w-8 text-primary opacity-80" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Status</p>
                            <p className="text-xl font-semibold text-emerald-600">Excellent</p>
                          </div>
                          <Trophy className="h-8 w-8 text-emerald-500 opacity-80" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="fee" className="m-0">
                <CardContent>
                  <div className="rounded-md border mb-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Term</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Payment Date</TableHead>
                          <TableHead>Receipt No</TableHead>
                          <TableHead className="text-right">Status</TableHead>
                          <TableHead className="text-right">Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {feeData.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.term}</TableCell>
                            <TableCell>{item.amount}</TableCell>
                            <TableCell>{item.dueDate}</TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.receiptNo}</TableCell>
                            <TableCell className="text-right">
                              <Badge className={getStatusColor(item.status)}>
                                {item.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              {item.status === "Paid" ? (
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-80">
                                    <div className="space-y-2">
                                      <h4 className="font-medium">Payment Details</h4>
                                      <div className="grid grid-cols-2 gap-1 text-sm">
                                        <span className="text-muted-foreground">Payment Method:</span>
                                        <span>{item.paymentMethod}</span>
                                        <span className="text-muted-foreground">Transaction ID:</span>
                                        <span>{item.transactionId}</span>
                                        <span className="text-muted-foreground">Receipt No:</span>
                                        <span>{item.receiptNo}</span>
                                        <span className="text-muted-foreground">Payment Date:</span>
                                        <span>{item.date}</span>
                                      </div>
                                      <div className="pt-2">
                                        <Button variant="outline" size="sm" className="w-full">
                                          <Download className="h-4 w-4 mr-2" />
                                          Download Receipt
                                        </Button>
                                      </div>
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              ) : (
                                <Button variant="outline" size="sm">
                                  Pay Now
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Total Fee</p>
                            <p className="text-xl font-semibold">₹1,00,000</p>
                          </div>
                          <FileText className="h-8 w-8 text-primary opacity-80" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Paid Amount</p>
                            <p className="text-xl font-semibold">₹75,000</p>
                          </div>
                          <Verified className="h-8 w-8 text-primary opacity-80" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Balance</p>
                            <p className="text-xl font-semibold text-amber-600">₹25,000</p>
                          </div>
                          <AlertTriangle className="h-8 w-8 text-amber-600 opacity-80" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="behavior" className="m-0">
                <CardContent>
                  <div className="space-y-4 mb-4">
                    {behaviorData.map((item, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-xs text-muted-foreground">Recorded by: {item.recordedBy}</p>
                          </div>
                          <Badge className={getRemarkColor(item.type)}>
                            {item.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>{item.date}</span>
                          <span>{item.action}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Positive Remarks</p>
                            <p className="text-xl font-semibold">8</p>
                          </div>
                          <Trophy className="h-8 w-8 text-primary opacity-80" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Improvements</p>
                            <p className="text-xl font-semibold">2</p>
                          </div>
                          <AlertTriangle className="h-8 w-8 text-amber-500 opacity-80" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Overall</p>
                            <p className="text-xl font-semibold text-emerald-600">Excellent</p>
                          </div>
                          <ShieldAlert className="h-8 w-8 text-emerald-500 opacity-80" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="transport" className="m-0">
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Transport Mode</h3>
                      <div className="flex items-center">
                        <Badge className="bg-blue-100 text-blue-700">
                          {transportData.mode}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Bus Route</h3>
                      <p className="font-medium">{transportData.route}</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Bus Stop</h3>
                      <p className="font-medium">{transportData.stopName}</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Pickup Time</h3>
                      <p className="font-medium">{transportData.pickupTime}</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Drop Time</h3>
                      <p className="font-medium">{transportData.dropTime}</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Monthly Fee</h3>
                      <p className="font-medium">{transportData.monthlyFee}</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Bus Number</h3>
                      <p className="font-medium">{transportData.busNumber}</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Distance</h3>
                      <p className="font-medium">{transportData.distance}</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Bus Monitor</h3>
                      <p className="font-medium">{transportData.busMonitor}</p>
                    </div>
                  </div>
                  
                  <Card className="mb-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Driver Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <Avatar className="h-16 w-16">
                          <AvatarFallback>RS</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{transportData.driverName}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{transportData.driverContact}</p>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Phone className="h-4 w-4 mr-2" />
                              Call Driver
                            </Button>
                            <Button variant="outline" size="sm">
                              <Mail className="h-4 w-4 mr-2" />
                              Message
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-end">
                    <Button>
                      <FileText className="h-4 w-4 mr-2" />
                      View Transport Pass
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="health" className="m-0">
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Blood Group</h3>
                      <div className="flex items-center">
                        <Badge className="bg-red-100 text-red-700">
                          {healthData.bloodGroup}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Height</h3>
                      <p className="font-medium">{healthData.height}</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Weight</h3>
                      <p className="font-medium">{healthData.weight}</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">BMI</h3>
                      <p className="font-medium">{healthData.bmi}</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Vision</h3>
                      <p className="font-medium">{healthData.vision}</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Dental Health</h3>
                      <p className="font-medium">{healthData.dentalHealth}</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Immunization</h3>
                      <Badge className="bg-emerald-100 text-emerald-700">
                        {healthData.immunization}
                      </Badge>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Medical Conditions</h3>
                      <p className="font-medium">{healthData.medicalConditions}</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Allergies</h3>
                      <p className="font-medium">{healthData.allergies}</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Medications</h3>
                      <p className="font-medium">{healthData.medications}</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Last Checkup</h3>
                      <p className="font-medium">{healthData.lastCheckup}</p>
                    </div>
                  </div>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Doctor Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <h3 className="font-medium">{healthData.doctorName}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{healthData.doctorContact}</p>
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Doctor
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest student activities and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                    <div className="mt-1">
                      {getActivityIcon(activity.category)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.activity}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{activity.date}</span>
                        <Badge variant="outline" className="text-xs py-0 px-1">
                          {activity.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activities
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Detailed student background information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Student Details</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Full Name</span>
                      <span className="text-sm font-medium">{enhancedStudentData.name}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Gender</span>
                      <span className="text-sm font-medium">{enhancedStudentData.gender}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Date of Birth</span>
                      <span className="text-sm font-medium">{enhancedStudentData.dateOfBirth}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Age</span>
                      <span className="text-sm font-medium">{enhancedStudentData.age}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Religion</span>
                      <span className="text-sm font-medium">{enhancedStudentData.religion}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Nationality</span>
                      <span className="text-sm font-medium">{enhancedStudentData.nationality}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Parent Details</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Father's Name</span>
                      <span className="text-sm font-medium">{enhancedStudentData.fatherName}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Mother's Name</span>
                      <span className="text-sm font-medium">{enhancedStudentData.motherName}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Occupation</span>
                      <span className="text-sm font-medium">{enhancedStudentData.parentOccupation}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Contact</span>
                      <span className="text-sm font-medium">{enhancedStudentData.parentContact}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Email</span>
                      <span className="text-sm font-medium">{enhancedStudentData.email}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Emergency</span>
                      <span className="text-sm font-medium">{enhancedStudentData.emergencyContact}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Academic Details</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Admission No</span>
                      <span className="text-sm font-medium">{enhancedStudentData.admissionNumber}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Admission Date</span>
                      <span className="text-sm font-medium">{enhancedStudentData.admissionDate}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Class</span>
                      <span className="text-sm font-medium">{enhancedStudentData.class}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Section</span>
                      <span className="text-sm font-medium">{enhancedStudentData.section}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Roll Number</span>
                      <span className="text-sm font-medium">{enhancedStudentData.rollNumber}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Previous School</span>
                      <span className="text-sm font-medium">{enhancedStudentData.previousSchool}</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Address</h3>
                <p className="text-sm">{enhancedStudentData.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="fixed bottom-6 right-6 bg-white dark:bg-gray-800 shadow-lg rounded-full p-4 border">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => navigate('/students')}
              title="Back to Students"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleEdit}
              title="Edit Student"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={handlePrintDetails}
              title="Print Details"
            >
              <Printer className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleDownloadReport}
              title="Download Report"
            >
              <Download className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  title="More Options"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <UserCog className="mr-2 h-4 w-4" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Parent
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={handleDeleteRequest}>
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Delete Student
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </Layout>
  );
}

