
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileUp, FileText, X, Download, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface BulkImportFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (file: File) => Promise<void>;
}

export function BulkImportForm({ open, onOpenChange, onImport }: BulkImportFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    const allowedTypes = [
      'application/vnd.ms-excel', 
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];
    const fileType = selectedFile.type;
    
    if (!allowedTypes.includes(fileType)) {
      toast.error("Invalid file format", {
        description: "Please upload an Excel file (.xls, .xlsx) or CSV file"
      });
      return;
    }
    
    setFile(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const downloadSampleTemplate = () => {
    toast.info("Sample template downloaded", {
      description: "Check your downloads folder for the sample Excel template"
    });
    // In a real app, this would trigger an actual download of a template
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("No file selected", {
        description: "Please select an Excel file to import"
      });
      return;
    }

    setIsUploading(true);
    try {
      await onImport(file);
      setFile(null);
      onOpenChange(false);
    } catch (error) {
      console.error("Import failed:", error);
      toast.error("Import failed", {
        description: "There was an error importing the student data"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Bulk Import Students</DialogTitle>
          <DialogDescription>
            Upload an Excel file (.xlsx, .xls) or CSV file with student data to import multiple students at once.
          </DialogDescription>
        </DialogHeader>

        <div className="my-6 space-y-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging ? "border-primary bg-primary/5" : "border-gray-200"
            } transition-colors`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900 truncate max-w-[250px]">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB • {file.type.split('/')[1].toUpperCase()}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={removeFile}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <FileUp className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                <p className="text-sm font-medium mb-1">
                  Drag and drop an Excel file or click to browse
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Supported formats: .xlsx, .xls, .csv
                </p>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  Browse files
                </Button>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileSelect}
                />
              </>
            )}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">Important:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>The first row must contain column headers.</li>
                  <li>Required fields: Name, Roll Number, Class, Section, Admission Number.</li>
                  <li>Each student must have a unique Roll Number and Admission Number.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={downloadSampleTemplate}
              className="text-sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Sample Template
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isUploading}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!file || isUploading}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            {isUploading ? "Importing..." : "Import Students"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
