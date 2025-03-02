
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Header } from "@/components/layout/Header";
import { StudentFilters } from "@/components/students/StudentFilters";
import { StudentTable, Student } from "@/components/students/StudentTable";
import { AddStudentModal } from "@/components/students/AddStudentModal";
import { StatCard, StatCardGrid } from "@/components/ui/CardStats";
import { Users, FileCheck, UserPlus, AlertCircle } from "lucide-react";

// Sample student data
const studentsData: Student[] = [
  {
    id: "1",
    name: "Aanya Sharma",
    rollNumber: "101",
    class: "5",
    section: "A",
    admissionNumber: "AKS-2023-101",
    parentContact: "+91 9876543210",
    feeStatus: "Paid",
    attendance: 95,
  },
  {
    id: "2",
    name: "Rahul Kumar",
    rollNumber: "102",
    class: "5",
    section: "A",
    admissionNumber: "AKS-2023-102",
    parentContact: "+91 9876543211",
    feeStatus: "Pending",
    attendance: 82,
  },
  {
    id: "3",
    name: "Priya Patel",
    rollNumber: "103",
    class: "5",
    section: "B",
    admissionNumber: "AKS-2023-103",
    parentContact: "+91 9876543212",
    feeStatus: "Partial",
    attendance: 90,
  },
  {
    id: "4",
    name: "Arjun Singh",
    rollNumber: "104",
    class: "5",
    section: "B",
    admissionNumber: "AKS-2023-104",
    parentContact: "+91 9876543213",
    feeStatus: "Paid",
    attendance: 98,
  },
  {
    id: "5",
    name: "Zara Khan",
    rollNumber: "105",
    class: "5",
    section: "C",
    admissionNumber: "AKS-2023-105",
    parentContact: "+91 9876543214",
    feeStatus: "Paid",
    attendance: 92,
  },
  {
    id: "6",
    name: "Vikram Mehta",
    rollNumber: "106",
    class: "4",
    section: "A",
    admissionNumber: "AKS-2023-106",
    parentContact: "+91 9876543215",
    feeStatus: "Pending",
    attendance: 78,
  },
  {
    id: "7",
    name: "Neha Verma",
    rollNumber: "107",
    class: "4",
    section: "A",
    admissionNumber: "AKS-2023-107",
    parentContact: "+91 9876543216",
    feeStatus: "Paid",
    attendance: 88,
  },
  {
    id: "8",
    name: "Ishaan Gupta",
    rollNumber: "108",
    class: "4",
    section: "B",
    admissionNumber: "AKS-2023-108",
    parentContact: "+91 9876543217",
    feeStatus: "Partial",
    attendance: 85,
  },
];

export default function StudentManagement() {
  const [students, setStudents] = useState<Student[]>(studentsData);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(studentsData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
  
  const handleFilterChange = (filters: { class: string; section: string; query: string }) => {
    let result = [...students];
    
    if (filters.class) {
      result = result.filter((student) => student.class === filters.class);
    }
    
    if (filters.section) {
      result = result.filter((student) => student.section === filters.section);
    }
    
    if (filters.query) {
      const lowerQuery = filters.query.toLowerCase();
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(lowerQuery) ||
          student.rollNumber.toLowerCase().includes(lowerQuery) ||
          student.admissionNumber.toLowerCase().includes(lowerQuery)
      );
    }
    
    setFilteredStudents(result);
  };
  
  const handleAddStudent = () => {
    setStudentToEdit(null);
    setShowAddModal(true);
  };
  
  const handleEditStudent = (student: Student) => {
    setStudentToEdit(student);
    setShowAddModal(true);
  };
  
  const handleCloseModal = () => {
    setShowAddModal(false);
    setStudentToEdit(null);
  };
  
  const handleSubmitStudent = (data: any) => {
    if (studentToEdit) {
      // Edit existing student logic
      const updatedStudents = students.map((student) =>
        student.id === studentToEdit.id ? { ...student, ...data } : student
      );
      setStudents(updatedStudents);
      setFilteredStudents(updatedStudents);
    } else {
      // Add new student logic
      const newStudent: Student = {
        id: String(students.length + 1),
        name: data.name,
        rollNumber: data.rollNumber,
        class: data.class,
        section: data.section,
        admissionNumber: data.admissionNumber,
        parentContact: data.parentContact,
        feeStatus: "Pending",
        attendance: 0,
      };
      
      const updatedStudents = [...students, newStudent];
      setStudents(updatedStudents);
      setFilteredStudents(updatedStudents);
    }
  };
  
  return (
    <Layout>
      <Header 
        title="Student Management" 
        subtitle="Manage all students, their profiles, and academic information" 
      />
      
      <div className="px-6 py-6">
        <StatCardGrid>
          <StatCard
            title="Total Students"
            value={students.length}
            icon={<Users className="h-5 w-5" />}
            change={{ value: 4.5, trend: "up", text: "from last month" }}
          />
          <StatCard
            title="Attendance Rate"
            value="88.5%"
            icon={<FileCheck className="h-5 w-5" />}
            change={{ value: 2.1, trend: "up", text: "from last month" }}
          />
          <StatCard
            title="New Admissions"
            value="24"
            icon={<UserPlus className="h-5 w-5" />}
            change={{ value: 12.5, trend: "up", text: "from last month" }}
          />
          <StatCard
            title="Fee Defaulters"
            value="37"
            icon={<AlertCircle className="h-5 w-5" />}
            change={{ value: 2.3, trend: "down", text: "from last month" }}
          />
        </StatCardGrid>
        
        <div className="mt-8">
          <StudentFilters
            onAddStudent={handleAddStudent}
            onFilterChange={handleFilterChange}
          />
          
          <StudentTable
            students={filteredStudents}
            onEditStudent={handleEditStudent}
          />
        </div>
        
        <AddStudentModal
          open={showAddModal}
          onClose={handleCloseModal}
          onSubmit={handleSubmitStudent}
        />
      </div>
    </Layout>
  );
}
