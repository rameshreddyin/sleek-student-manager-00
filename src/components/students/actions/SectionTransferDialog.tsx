
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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SectionTransferDialogProps {
  student: Student;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SectionTransferDialog({ student, open, onOpenChange }: SectionTransferDialogProps) {
  const [selectedClass, setSelectedClass] = useState(student.class);
  const [selectedSection, setSelectedSection] = useState("");
  const [transferReason, setTransferReason] = useState("");
  const [transferType, setTransferType] = useState("section");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleTransfer = () => {
    if ((transferType === "section" && !selectedSection) || 
        (transferType === "class" && (!selectedClass || !selectedSection))) {
      toast.error("Please complete all required fields");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
      
      const transferDetails = transferType === "section" 
        ? `from Section ${student.section} to Section ${selectedSection}` 
        : `from Class ${student.class}-${student.section} to Class ${selectedClass}-${selectedSection}`;
      
      toast.success("Transfer Successful", {
        description: `${student.name} has been transferred ${transferDetails}`
      });
      
      // Reset form
      setSelectedSection("");
      setTransferReason("");
    }, 1500);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Transfer Student</DialogTitle>
          <DialogDescription>
            Transfer {student.name} to a different class or section.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-5 py-4">
          <RadioGroup 
            value={transferType} 
            onValueChange={setTransferType}
            className="flex flex-col space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="section" id="section" />
              <Label htmlFor="section">Transfer to Different Section (Same Class)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="class" id="class" />
              <Label htmlFor="class">Transfer to Different Class</Label>
            </div>
          </RadioGroup>
          
          {transferType === "class" && (
            <div className="space-y-2">
              <label htmlFor="class" className="text-sm font-medium">Select New Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger id="class">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Class 1</SelectItem>
                  <SelectItem value="2">Class 2</SelectItem>
                  <SelectItem value="3">Class 3</SelectItem>
                  <SelectItem value="4">Class 4</SelectItem>
                  <SelectItem value="5">Class 5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="section" className="text-sm font-medium">Select New Section</label>
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger id="section">
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Section A</SelectItem>
                <SelectItem value="B">Section B</SelectItem>
                <SelectItem value="C">Section C</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="reason" className="text-sm font-medium">Transfer Reason (optional)</label>
            <Textarea 
              id="reason" 
              value={transferReason}
              onChange={(e) => setTransferReason(e.target.value)}
              placeholder="Enter reason for transfer..."
              className="h-20"
            />
          </div>
          
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              This action will transfer the student and update all class records. Fee structure and class-specific 
              activities may change based on the new assignment.
            </AlertDescription>
          </Alert>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button 
            onClick={handleTransfer} 
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? "Processing..." : "Confirm Transfer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
