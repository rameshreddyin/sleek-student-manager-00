
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Download, Eye, Printer } from "lucide-react";

interface IdCardGeneratorProps {
  student: Student;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function IdCardGenerator({ student, open, onOpenChange }: IdCardGeneratorProps) {
  const [theme, setTheme] = useState("standard");
  const [includeParentInfo, setIncludeParentInfo] = useState(true);
  const [includeBarcodes, setIncludeBarcodes] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  const handleGenerate = () => {
    setIsLoading(true);
    
    // Simulate ID card generation
    setTimeout(() => {
      setIsLoading(false);
      
      toast.success("ID Card Generated", {
        description: `ID Card for ${student.name} has been generated successfully.`
      });
      
      // Switch to preview mode
      setIsPreviewMode(true);
    }, 1500);
  };
  
  const handlePrint = () => {
    toast.success("Printing ID Card", {
      description: "The ID card has been sent to the printer."
    });
    // In a real app, you would use window.print() with CSS media queries
  };
  
  const handleDownload = () => {
    toast.success("Downloading ID Card", {
      description: "The ID card has been downloaded."
    });
    // In a real app, you would generate a PDF and trigger a download
  };
  
  const handleClose = () => {
    onOpenChange(false);
    // Reset states for next use
    setIsPreviewMode(false);
    setTheme("standard");
  };
  
  const getThemeColor = () => {
    switch (theme) {
      case "modern": return "bg-blue-500";
      case "professional": return "bg-purple-500";
      case "minimal": return "bg-gray-800";
      case "colorful": return "bg-gradient-to-r from-blue-500 to-purple-500";
      default: return "bg-green-600";
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {!isPreviewMode ? (
          <>
            <DialogHeader>
              <DialogTitle>Generate ID Card</DialogTitle>
              <DialogDescription>
                Customize the ID card for {student.name} before generating.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-5 py-4">
              <div className="space-y-2">
                <label htmlFor="theme" className="text-sm font-medium">Card Theme</label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="colorful">Colorful</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="parent-info">Include Parent Information</Label>
                  <p className="text-sm text-gray-500">Contact details of parents</p>
                </div>
                <Switch 
                  id="parent-info" 
                  checked={includeParentInfo} 
                  onCheckedChange={setIncludeParentInfo} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="barcodes">Include Barcodes/QR Codes</Label>
                  <p className="text-sm text-gray-500">For digital scanning of ID</p>
                </div>
                <Switch 
                  id="barcodes" 
                  checked={includeBarcodes} 
                  onCheckedChange={setIncludeBarcodes} 
                />
              </div>
            </div>
            
            <DialogFooter className="flex space-x-2 sm:space-x-0">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleGenerate} disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate ID Card"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>ID Card Preview</DialogTitle>
              <DialogDescription>
                Preview the generated ID card for {student.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              {/* ID Card Preview */}
              <div className="w-full aspect-[85/54] mx-auto border rounded-lg overflow-hidden shadow-lg relative">
                {/* Card Header */}
                <div className={`${getThemeColor()} text-white p-3 flex justify-between items-center`}>
                  <div className="text-lg font-semibold">School Name</div>
                  <div className="text-xs">Academic Year 2023-24</div>
                </div>
                
                {/* Card Content */}
                <div className="p-4 flex flex-col sm:flex-row gap-4 bg-white">
                  {/* Photo Placeholder */}
                  <div className="w-20 h-24 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                    Photo
                  </div>
                  
                  {/* Student Information */}
                  <div className="space-y-1 flex-1">
                    <h3 className="font-bold text-lg">{student.name}</h3>
                    <div className="grid grid-cols-2 gap-x-2 text-sm">
                      <div>
                        <span className="text-gray-500">Class:</span> {student.class}-{student.section}
                      </div>
                      <div>
                        <span className="text-gray-500">Roll No:</span> {student.rollNumber}
                      </div>
                      <div>
                        <span className="text-gray-500">Admission No:</span> {student.admissionNumber}
                      </div>
                      {includeParentInfo && (
                        <div>
                          <span className="text-gray-500">Parent:</span> {student.parentContact}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Card Footer */}
                <div className="bg-gray-100 p-2 text-center text-xs">
                  {includeBarcodes && (
                    <div className="text-center mb-1 bg-gray-200 py-1 px-2 rounded text-gray-500">
                      Barcode / QR Code Placeholder
                    </div>
                  )}
                  <div>Valid until: March 31, 2024</div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setIsPreviewMode(false)} className="w-full sm:w-auto">
                <Eye className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button onClick={handlePrint} className="w-full sm:w-auto">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button onClick={handleDownload} className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
