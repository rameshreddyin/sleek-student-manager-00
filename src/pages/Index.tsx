
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Book, CalendarClock, GraduationCap, Users } from "lucide-react";
import { StatCard, StatCardGrid } from "@/components/ui/CardStats";

const features = [
  {
    title: "Student Management",
    description: "Manage all student data, attendance, and performance in one place.",
    icon: <Users className="h-5 w-5" />,
    path: "/students",
  },
  {
    title: "Staff Management",
    description: "Track all staff information, assignments, and performance.",
    icon: <Users className="h-5 w-5" />,
    path: "/staff",
  },
  {
    title: "Class Management",
    description: "Organize classes, subjects, and teaching schedules.",
    icon: <Book className="h-5 w-5" />,
    path: "/classes",
  },
  {
    title: "Attendance",
    description: "Record and monitor daily attendance for students and staff.",
    icon: <CalendarClock className="h-5 w-5" />,
    path: "/attendance",
  },
  {
    title: "Examinations",
    description: "Create and organize exams, track results, and generate report cards.",
    icon: <GraduationCap className="h-5 w-5" />,
    path: "/exams",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header 
        title="Dashboard" 
        subtitle="Welcome back, Super Admin!" 
      />
      
      <div className="p-6">
        <StatCardGrid>
          <StatCard
            title="Total Students"
            value="1,248"
            icon={<Users className="h-5 w-5" />}
            change={{ value: 4.5, trend: "up", text: "from last month" }}
          />
          <StatCard
            title="Teachers & Staff"
            value="98"
            icon={<Users className="h-5 w-5" />}
            change={{ value: 2.5, trend: "up", text: "from last month" }}
          />
          <StatCard
            title="Revenue (Monthly)"
            value="₹12.4L"
            icon={<Users className="h-5 w-5" />}
            change={{ value: 12.5, trend: "up", text: "from last month" }}
          />
          <StatCard
            title="Leads (Monthly)"
            value="124"
            icon={<Users className="h-5 w-5" />}
            change={{ value: 8.2, trend: "up", text: "from last month" }}
          />
        </StatCardGrid>
        
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass-card rounded-lg p-6 hover-glow hover-scale cursor-pointer"
                onClick={() => navigate(feature.path)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-md bg-secondary/80 p-2 text-foreground">
                    {feature.icon}
                  </div>
                  <h3 className="font-medium">{feature.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {feature.description}
                </p>
                <Button 
                  variant="ghost" 
                  className="text-sidebar-primary gap-1.5 pl-0 hover:pl-1 transition-all"
                  onClick={() => navigate(feature.path)}
                >
                  <span>Access</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
