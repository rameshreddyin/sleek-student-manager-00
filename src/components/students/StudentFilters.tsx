
import { useState } from "react";
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

interface StudentFiltersProps {
  onAddStudent: () => void;
  onFilterChange: (filters: { class: string; section: string; query: string }) => void;
}

export function StudentFilters({ onAddStudent, onFilterChange }: StudentFiltersProps) {
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onFilterChange({ class: classFilter, section: sectionFilter, query: e.target.value });
  };

  const handleClassChange = (value: string) => {
    setClassFilter(value);
    onFilterChange({ class: value, section: sectionFilter, query: searchQuery });
  };

  const handleSectionChange = (value: string) => {
    setSectionFilter(value);
    onFilterChange({ class: classFilter, section: value, query: searchQuery });
  };

  const handleReset = () => {
    setClassFilter("");
    setSectionFilter("");
    setSearchQuery("");
    onFilterChange({ class: "", section: "", query: "" });
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
          />
        </div>
        
        <Select value={classFilter} onValueChange={handleClassChange}>
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
        
        <Select value={sectionFilter} onValueChange={handleSectionChange}>
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
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        <Button variant="outline" className="flex-shrink-0">
          <FileUp className="mr-2 h-4 w-4" />
          Import
        </Button>
        <Button variant="outline" className="flex-shrink-0">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button onClick={onAddStudent} className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>
    </div>
  );
}
