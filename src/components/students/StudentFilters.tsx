
import { useState, useEffect, useCallback } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, FileUp, Plus, RefreshCw, Search } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface StudentFiltersProps {
  onAddStudent: () => void;
  onFilterChange: (filters: { class: string; section: string; query: string }) => void;
  onImport?: () => void;
  onExport?: () => void;
  isLoading?: boolean;
}

export function StudentFilters({ 
  onAddStudent, 
  onFilterChange, 
  onImport, 
  onExport, 
  isLoading = false 
}: StudentFiltersProps) {
  const [classFilter, setClassFilter] = useState("all");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  // Debounced filter change
  const debouncedFilterChange = useCallback(
    (filters: { class: string; section: string; query: string }) => {
      setIsFiltering(true);
      const handler = setTimeout(() => {
        onFilterChange(filters);
        setIsFiltering(false);
      }, 300);
      
      return () => {
        clearTimeout(handler);
      };
    },
    [onFilterChange]
  );

  useEffect(() => {
    const filters = { class: classFilter, section: sectionFilter, query: searchQuery };
    debouncedFilterChange(filters);
    
    return () => {};
  }, [classFilter, sectionFilter, searchQuery, debouncedFilterChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClassChange = (value: string) => {
    setClassFilter(value);
  };

  const handleSectionChange = (value: string) => {
    setSectionFilter(value);
  };

  const handleReset = () => {
    setClassFilter("all");
    setSectionFilter("all");
    setSearchQuery("");
  };

  const handleImport = () => {
    if (onImport) {
      onImport();
    } else {
      toast.error("Bulk import functionality not implemented");
    }
  };

  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      toast.error("Export functionality not implemented");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 animate-slide-in">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students..."
            className="pl-9 pr-4"
            value={searchQuery}
            onChange={handleSearchChange}
            disabled={isLoading}
          />
        </div>
        
        <Select value={classFilter} onValueChange={handleClassChange} disabled={isLoading}>
          <SelectTrigger className="w-28">
            <SelectValue placeholder="Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="1">Class 1</SelectItem>
            <SelectItem value="2">Class 2</SelectItem>
            <SelectItem value="3">Class 3</SelectItem>
            <SelectItem value="4">Class 4</SelectItem>
            <SelectItem value="5">Class 5</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={sectionFilter} onValueChange={handleSectionChange} disabled={isLoading}>
          <SelectTrigger className="w-28">
            <SelectValue placeholder="Section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sections</SelectItem>
            <SelectItem value="A">Section A</SelectItem>
            <SelectItem value="B">Section B</SelectItem>
            <SelectItem value="C">Section C</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="flex-shrink-0" 
          onClick={handleReset}
          title="Reset filters"
          disabled={isLoading || (classFilter === "all" && sectionFilter === "all" && searchQuery === "")}
        >
          <RefreshCw className={cn("h-4 w-4", isFiltering && "animate-spin")} />
        </Button>
      </div>
      
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        <Button 
          variant="outline" 
          className="flex-shrink-0" 
          onClick={handleImport}
          disabled={isLoading}
        >
          <FileUp className="mr-2 h-4 w-4" />
          Bulk Import
        </Button>
        <Button 
          variant="outline" 
          className="flex-shrink-0" 
          onClick={handleExport}
          disabled={isLoading}
        >
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button 
          onClick={onAddStudent} 
          className="bg-primary hover:bg-primary/90 text-white"
          disabled={isLoading}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>
    </div>
  );
}
