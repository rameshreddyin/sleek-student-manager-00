
import { useLocation, Link } from "react-router-dom";
import {
  Users,
  LayoutDashboard,
  BookOpen,
  Calendar,
  FileText,
  Clock,
  Wallet,
  CalendarDays,
  MessageSquare,
  LogOut,
  Menu,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const mainMenuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
    },
    {
      title: "Students",
      icon: Users,
      href: "/students",
    },
    {
      title: "Staff",
      icon: Users,
      href: "/staff",
    },
  ];

  const academicMenuItems = [
    {
      title: "Classes",
      icon: BookOpen,
      href: "/classes",
    },
    {
      title: "Subjects",
      icon: FileText,
      href: "/subjects",
    },
    {
      title: "Attendance",
      icon: Calendar,
      href: "/attendance",
    },
    {
      title: "Exams",
      icon: FileText,
      href: "/exams",
    },
    {
      title: "Timetable",
      icon: Clock,
      href: "/timetable",
    },
  ];

  const administrationMenuItems = [
    {
      title: "Finance",
      icon: Wallet,
      href: "/finance",
    },
    {
      title: "Events",
      icon: CalendarDays,
      href: "/events",
    },
    {
      title: "Messages",
      icon: MessageSquare,
      href: "/messages",
    },
  ];

  const NavItem = ({ item }: { item: { title: string; icon: any; href: string } }) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.href;

    return (
      <Link 
        to={item.href}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
          isActive 
            ? "bg-sidebar-accent text-sidebar-primary font-medium" 
            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        )}
      >
        <Icon className="w-5 h-5" />
        {!collapsed && <span>{item.title}</span>}
      </Link>
    );
  };

  const NavSection = ({ title, items }: { title: string; items: any[] }) => {
    return (
      <div className="mb-6">
        {!collapsed && (
          <h3 className="mb-2 ml-3 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/70">
            {title}
          </h3>
        )}
        <div className="space-y-1.5">
          {items.map((item) => (
            <NavItem key={item.title} item={item} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <aside 
      className={cn(
        "bg-sidebar h-screen transition-all duration-300 flex flex-col border-r border-sidebar-border relative",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute -right-3 top-6 h-6 w-6 rounded-full bg-sidebar-accent border border-sidebar-border shadow-md text-sidebar-foreground z-10"
        onClick={toggleSidebar}
      >
        {collapsed ? <ChevronLeft className="h-3 w-3" /> : <Menu className="h-3 w-3" />}
      </Button>
      
      <div className="p-4 flex items-center gap-3 h-16 border-b border-sidebar-border">
        <div className="font-semibold text-lg text-sidebar-foreground">
          {collapsed ? "EM" : "EduManager"}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 scrollbar-none">
        <NavSection title="MAIN" items={mainMenuItems} />
        <NavSection title="ACADEMIC" items={academicMenuItems} />
        <NavSection title="ADMINISTRATION" items={administrationMenuItems} />
      </div>
      
      <div className="p-3 border-t border-sidebar-border">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
