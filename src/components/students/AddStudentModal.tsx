
import React, { useState, useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Student } from "./StudentTable";
import { TransportationDetails } from "./TransportationDetails";

interface AddStudentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  student: Student | null;
  transportSection?: boolean;
}

export function AddStudentModal({ 
  open, 
  onClose, 
  onSubmit, 
  student,
  transportSection = false
}: AddStudentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    admissionNumber: "",
    class: "",
    section: "",
    fatherName: "",
    motherName: "",
    fatherContact: "",
    motherContact: "",
    parentContact: "",
    address: "",
    emergencyContact: "",
    bloodGroup: "",
    medicalInfo: "",
    dob: "",
    previousSchool: "",
    admissionDate: "",
    documents: "",
    remarks: "",
    transportNeeded: false,
    busRoute: "",
    busStop: "",
    pickupTime: "",
    dropTime: "",
    monthlyFee: "",
    busNumber: "",
    distance: "",
    busMonitor: "",
    driverName: "",
    driverContact: ""
  });

  useEffect(() => {
    if (student) {
      // Populate form with student data for editing
      setFormData({
        name: student.name || "",
        rollNumber: student.rollNumber || "",
        admissionNumber: student.admissionNumber || "",
        class: student.class || "",
        section: student.section || "",
        parentContact: student.parentContact || "",
        fatherName: "",
        motherName: "",
        fatherContact: "",
        motherContact: "",
        address: "",
        emergencyContact: "",
        bloodGroup: "",
        medicalInfo: "",
        dob: "",
        previousSchool: "",
        admissionDate: "",
        documents: "",
        remarks: "",
        transportNeeded: student.transportDetails?.transportNeeded || false,
        busRoute: student.transportDetails?.busRoute || "",
        busStop: student.transportDetails?.busStop || "",
        pickupTime: student.transportDetails?.pickupTime || "",
        dropTime: student.transportDetails?.dropTime || "",
        monthlyFee: student.transportDetails?.monthlyFee || "",
        busNumber: student.transportDetails?.busNumber || "",
        distance: student.transportDetails?.distance || "",
        busMonitor: student.transportDetails?.busMonitor || "",
        driverName: student.transportDetails?.driverName || "",
        driverContact: student.transportDetails?.driverContact || ""
      });
    } else {
      // Reset form for new student
      setFormData({
        name: "",
        rollNumber: "",
        admissionNumber: "",
        class: "",
        section: "",
        fatherName: "",
        motherName: "",
        fatherContact: "",
        motherContact: "",
        parentContact: "",
        address: "",
        emergencyContact: "",
        bloodGroup: "",
        medicalInfo: "",
        dob: "",
        previousSchool: "",
        admissionDate: "",
        documents: "",
        remarks: "",
        transportNeeded: false,
        busRoute: "",
        busStop: "",
        pickupTime: "",
        dropTime: "",
        monthlyFee: "",
        busNumber: "",
        distance: "",
        busMonitor: "",
        driverName: "",
        driverContact: ""
      });
    }
  }, [student, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTransportNeededChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, transportNeeded: checked }));
  };

  const handleTransportDetailsChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{student ? "Edit Student" : "Add New Student"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rollNumber">Roll Number *</Label>
              <Input
                id="rollNumber"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="admissionNumber">Admission Number *</Label>
              <Input
                id="admissionNumber"
                name="admissionNumber"
                value={formData.admissionNumber}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="class">Class *</Label>
                <Input
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="section">Section *</Label>
                <Input
                  id="section"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fatherName">Father's Name</Label>
              <Input
                id="fatherName"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="motherName">Mother's Name</Label>
              <Input
                id="motherName"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fatherContact">Father's Contact</Label>
              <Input
                id="fatherContact"
                name="fatherContact"
                value={formData.fatherContact}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="motherContact">Mother's Contact</Label>
              <Input
                id="motherContact"
                name="motherContact"
                value={formData.motherContact}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bloodGroup">Blood Group</Label>
              <Input
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="medicalInfo">Medical Information</Label>
              <Textarea
                id="medicalInfo"
                name="medicalInfo"
                value={formData.medicalInfo}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="admissionDate">Admission Date</Label>
              <Input
                id="admissionDate"
                name="admissionDate"
                type="date"
                value={formData.admissionDate}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="previousSchool">Previous School</Label>
              <Input
                id="previousSchool"
                name="previousSchool"
                value={formData.previousSchool}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="documents">Documents Submitted</Label>
              <Input
                id="documents"
                name="documents"
                value={formData.documents}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="remarks">Additional Remarks</Label>
              <Textarea
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
          </div>
          
          {transportSection && (
            <div className="pt-4 border-t">
              <TransportationDetails
                transportNeeded={formData.transportNeeded}
                onTransportChange={handleTransportNeededChange}
                transportDetails={{
                  busRoute: formData.busRoute,
                  busStop: formData.busStop,
                  pickupTime: formData.pickupTime,
                  dropTime: formData.dropTime,
                  monthlyFee: formData.monthlyFee,
                  busNumber: formData.busNumber,
                  distance: formData.distance,
                  busMonitor: formData.busMonitor,
                  driverName: formData.driverName,
                  driverContact: formData.driverContact,
                }}
                onDetailsChange={handleTransportDetailsChange}
              />
            </div>
          )}
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {student ? "Update" : "Create"} Student
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
