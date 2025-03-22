
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { X, Info, Upload, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface AddStudentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  student?: any | null;
}

// Define the schema for the form
const formSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required."),
  gender: z.string().min(1, "Gender is required."),
  dob: z.string().min(1, "Date of birth is required."),
  nationality: z.string().min(1, "Nationality is required."),
  casteCategory: z.string().optional(),
  bloodGroup: z.string().optional(),
  aadharNumber: z.string().optional(),
  motherTongue: z.string().min(1, "Mother tongue is required."),
  photo: z.any().optional(),
  
  // Parent/Guardian Information
  fatherName: z.string().min(2, "Father's name is required."),
  fatherOccupation: z.string().optional(),
  fatherContact: z.string().min(10, "Contact number must be at least 10 digits."),
  fatherEmail: z.string().email("Invalid email format.").optional(),
  motherName: z.string().min(2, "Mother's name is required."),
  motherOccupation: z.string().optional(),
  motherContact: z.string().min(10, "Contact number must be at least 10 digits."),
  motherEmail: z.string().email("Invalid email format.").optional(),
  guardianName: z.string().optional(),
  guardianContact: z.string().optional(),
  guardianRelationship: z.string().optional(),
  guardianEmail: z.string().email("Invalid email format.").optional(),
  
  // Address Information
  permanentAddress: z.object({
    houseNo: z.string().min(1, "House number is required."),
    city: z.string().min(1, "City is required."),
    state: z.string().min(1, "State is required."),
    pinCode: z.string().min(6, "PIN code must be at least 6 digits."),
  }),
  sameAsPermAddress: z.boolean().default(true),
  correspondenceAddress: z.object({
    houseNo: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    pinCode: z.string().optional(),
  }).optional(),
  emergencyContact: z.string().min(10, "Emergency contact must be at least 10 digits."),
  
  // Educational Information
  previousSchool: z.string().optional(),
  previousSchoolAddress: z.string().optional(),
  classLastAttended: z.string().optional(),
  marksObtained: z.string().optional(),
  board: z.string().optional(),
  previousRollNumber: z.string().optional(),
  subjectsTaken: z.string().optional(),
  
  // Fee Payment Setup
  feeCategories: z.array(z.string()).min(1, "At least one fee category is required."),
  paymentTerm: z.string().min(1, "Payment term is required."),
  customTerms: z.string().optional(),
  
  // Documents
  birthCertificate: z.any().optional(),
  aadharCard: z.any().optional(),
  previousMarksheets: z.any().optional(),
  passportPhoto: z.any().optional(),
  transferCertificate: z.any().optional(),
  
  // Terms & Conditions
  consentSchoolPolicies: z.boolean().refine(val => val === true, {
    message: "You must agree to the school policies.",
  }),
  parentalConsent: z.boolean().refine(val => val === true, {
    message: "Parental consent is required.",
  }),
  
  // Class & Section Information
  class: z.string().min(1, "Class is required."),
  section: z.string().min(1, "Section is required."),
  rollNumber: z.string().min(1, "Roll number is required."),
  admissionNumber: z.string().min(1, "Admission number is required."),
  
  // Parent App Access
  createParentAccount: z.boolean().default(true),
  parentEmail: z.string().email("Invalid email format.").optional(),
  parentPassword: z.string().min(8, "Password must be at least 8 characters.").optional(),
  sendCredentials: z.boolean().default(false),
});

export function AddStudentModal({ open, onClose, onSubmit, student }: AddStudentModalProps) {
  const [activeTab, setActiveTab] = useState("personal");
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Personal Information
      firstName: student?.firstName || "",
      middleName: student?.middleName || "",
      lastName: student?.lastName || "",
      gender: student?.gender || "",
      dob: student?.dob || "",
      nationality: student?.nationality || "Indian",
      casteCategory: student?.casteCategory || "",
      bloodGroup: student?.bloodGroup || "",
      aadharNumber: student?.aadharNumber || "",
      motherTongue: student?.motherTongue || "",
      
      // Parent/Guardian Information
      fatherName: student?.fatherName || "",
      fatherOccupation: student?.fatherOccupation || "",
      fatherContact: student?.fatherContact || "",
      fatherEmail: student?.fatherEmail || "",
      motherName: student?.motherName || "",
      motherOccupation: student?.motherOccupation || "",
      motherContact: student?.motherContact || "",
      motherEmail: student?.motherEmail || "",
      guardianName: student?.guardianName || "",
      guardianContact: student?.guardianContact || "",
      guardianRelationship: student?.guardianRelationship || "",
      guardianEmail: student?.guardianEmail || "",
      
      // Address Information
      permanentAddress: {
        houseNo: student?.permanentAddress?.houseNo || "",
        city: student?.permanentAddress?.city || "",
        state: student?.permanentAddress?.state || "",
        pinCode: student?.permanentAddress?.pinCode || "",
      },
      sameAsPermAddress: true,
      correspondenceAddress: {
        houseNo: "",
        city: "",
        state: "",
        pinCode: "",
      },
      emergencyContact: student?.emergencyContact || "",
      
      // Educational Information
      previousSchool: student?.previousSchool || "",
      previousSchoolAddress: student?.previousSchoolAddress || "",
      classLastAttended: student?.classLastAttended || "",
      marksObtained: student?.marksObtained || "",
      board: student?.board || "",
      previousRollNumber: student?.previousRollNumber || "",
      subjectsTaken: student?.subjectsTaken || "",
      
      // Fee Payment Setup
      feeCategories: student?.feeCategories || ["Tuition Fee"],
      paymentTerm: student?.paymentTerm || "Quarterly",
      
      // Class & Section Information
      class: student?.class || "",
      section: student?.section || "",
      rollNumber: student?.rollNumber || "",
      admissionNumber: student?.admissionNumber || "",
      
      // Terms & Conditions
      consentSchoolPolicies: false,
      parentalConsent: false,
      
      // Parent App Access
      createParentAccount: true,
      parentEmail: "",
      parentPassword: "",
      sendCredentials: false,
    },
  });
  
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    // Format the name to combine first, middle and last name
    const fullName = `${data.firstName} ${data.middleName ? data.middleName + ' ' : ''}${data.lastName}`;
    
    // Prepare the data
    const studentData = {
      name: fullName,
      ...data,
    };
    
    onSubmit(studentData);
    toast({
      title: student ? "Student Updated" : "Student Added",
      description: student 
        ? "Student information has been updated successfully." 
        : "New student has been added successfully.",
    });
    form.reset();
  };
  
  const nextTab = () => {
    if (activeTab === "personal") {
      const result = form.trigger([
        "firstName", "lastName", "gender", "dob", "nationality", "motherTongue"
      ]);
      if (result) setActiveTab("parent");
    } else if (activeTab === "parent") {
      const result = form.trigger([
        "fatherName", "fatherContact", "motherName", "motherContact"
      ]);
      if (result) setActiveTab("address");
    } else if (activeTab === "address") {
      const result = form.trigger([
        "permanentAddress.houseNo", "permanentAddress.city", 
        "permanentAddress.state", "permanentAddress.pinCode",
        "emergencyContact"
      ]);
      if (result) setActiveTab("education");
    } else if (activeTab === "education") {
      setActiveTab("fee");
    } else if (activeTab === "fee") {
      const result = form.trigger(["feeCategories", "paymentTerm"]);
      if (result) setActiveTab("documents");
    } else if (activeTab === "documents") {
      setActiveTab("terms");
    } else if (activeTab === "terms") {
      const result = form.trigger([
        "consentSchoolPolicies", "parentalConsent"
      ]);
      if (result) setActiveTab("class");
    } else if (activeTab === "class") {
      const result = form.trigger([
        "class", "section", "rollNumber", "admissionNumber"
      ]);
      if (result) setActiveTab("parentapp");
    }
  };
  
  const prevTab = () => {
    if (activeTab === "parent") setActiveTab("personal");
    else if (activeTab === "address") setActiveTab("parent");
    else if (activeTab === "education") setActiveTab("address");
    else if (activeTab === "fee") setActiveTab("education");
    else if (activeTab === "documents") setActiveTab("fee");
    else if (activeTab === "terms") setActiveTab("documents");
    else if (activeTab === "class") setActiveTab("terms");
    else if (activeTab === "parentapp") setActiveTab("class");
  };
  
  const tabSteps = [
    { id: "personal", label: "Personal Info" },
    { id: "parent", label: "Parent Info" },
    { id: "address", label: "Address" },
    { id: "education", label: "Education" },
    { id: "fee", label: "Fee Setup" },
    { id: "documents", label: "Documents" },
    { id: "terms", label: "Terms" },
    { id: "class", label: "Class Info" },
    { id: "parentapp", label: "Parent App" },
  ];
  
  const sameAddressHandler = (checked: boolean) => {
    form.setValue("sameAsPermAddress", checked);
    if (checked) {
      form.setValue("correspondenceAddress", {
        houseNo: "",
        city: "",
        state: "",
        pinCode: "",
      });
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white shadow-lg border border-border/50 max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mb-2">
            <DialogTitle className="text-xl font-semibold">
              {student ? "Edit Student" : "Add New Student"}
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            Fill out the form below to {student ? "update the" : "add a new"} student to the system.
          </DialogDescription>
        </DialogHeader>
        
        {/* Progress indicator */}
        <div className="w-full mb-6">
          <div className="flex justify-between mb-2">
            {tabSteps.map((step, index) => (
              <div 
                key={step.id}
                className={cn(
                  "flex flex-col items-center w-8",
                  index > 0 && "relative"
                )}
              >
                <div 
                  className={cn(
                    "rounded-full w-8 h-8 flex items-center justify-center text-xs font-medium",
                    activeTab === step.id ? "bg-primary text-white" : 
                    tabSteps.indexOf({ id: activeTab, label: "" }) > index ? 
                    "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
                  )}
                >
                  {tabSteps.indexOf({ id: activeTab, label: "" }) > index ? <Check className="h-4 w-4" /> : index + 1}
                </div>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 h-1 relative">
            <div 
              className="h-1 bg-primary absolute left-0 top-0 transition-all duration-300"
              style={{ width: `${(tabSteps.findIndex(s => s.id === activeTab) / (tabSteps.length - 1)) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            {tabSteps.map((step) => (
              <div key={`label-${step.id}`} className="w-8 text-center overflow-hidden">
                {step.id === activeTab && step.label}
              </div>
            ))}
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Personal Information */}
              <TabsContent value="personal" className="space-y-4 animate-fade-in mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Enter first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="middleName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Middle Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter middle name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Enter last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender <span className="text-red-500">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nationality <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Enter nationality" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="casteCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Caste Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select caste category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="obc">OBC</SelectItem>
                            <SelectItem value="sc">SC</SelectItem>
                            <SelectItem value="st">ST</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="bloodGroup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blood Group</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select blood group" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="aadharNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Aadhar Card Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Aadhar number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="motherTongue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mother Tongue <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Enter mother tongue" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="photo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student's Photograph</FormLabel>
                        <FormControl>
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="dropzone-file"
                              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-3 text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500">
                                  <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">PNG, JPG (MAX. 1MB)</p>
                              </div>
                              <input id="dropzone-file" type="file" className="hidden" />
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button 
                    type="button" 
                    className="bg-primary hover:bg-primary/90 text-white" 
                    onClick={nextTab}
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>
              
              {/* Parent/Guardian Information */}
              <TabsContent value="parent" className="space-y-4 animate-fade-in mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fatherName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Father's Name <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Enter father's name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="fatherOccupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Father's Occupation</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter father's occupation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fatherContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Father's Contact Number <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Enter contact number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="fatherEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Father's Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Separator className="my-4" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="motherName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mother's Name <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Enter mother's name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="motherOccupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mother's Occupation</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter mother's occupation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="motherContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mother's Contact Number <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Enter contact number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="motherEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mother's Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Separator className="my-4" />
                
                <div className="bg-gray-50 p-3 rounded-md mb-4">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">
                      Guardian information is optional. Please fill this only if the guardian is different from parents.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="guardianName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guardian's Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter guardian's name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="guardianRelationship"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relationship to Student</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g. Uncle, Grandparent" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="guardianContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guardian's Contact Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter contact number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="guardianEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guardian's Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={prevTab}>
                    Previous
                  </Button>
                  <Button 
                    type="button" 
                    className="bg-primary hover:bg-primary/90 text-white" 
                    onClick={nextTab}
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>
              
              {/* Address Information */}
              <TabsContent value="address" className="space-y-4 animate-fade-in mt-0">
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Permanent Address</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="permanentAddress.houseNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>House No./Street <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="Enter house no./street" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="permanentAddress.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="Enter city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <FormField
                      control={form.control}
                      name="permanentAddress.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="Enter state" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="permanentAddress.pinCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PIN Code <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="Enter PIN code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-1">
                  <Checkbox 
                    id="sameAddress" 
                    checked={form.watch("sameAsPermAddress")} 
                    onCheckedChange={sameAddressHandler}
                  />
                  <label
                    htmlFor="sameAddress"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Correspondence address is same as permanent address
                  </label>
                </div>
                
                {!form.watch("sameAsPermAddress") && (
                  <div className="bg-gray-50 p-4 rounded-lg mt-4">
                    <h3 className="font-medium text-gray-900 mb-2">Correspondence Address</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="correspondenceAddress.houseNo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>House No./Street</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter house no./street" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="correspondenceAddress.city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter city" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <FormField
                        control={form.control}
                        name="correspondenceAddress.state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter state" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="correspondenceAddress.pinCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>PIN Code</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter PIN code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
                
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="emergencyContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Contact Number <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Enter emergency contact number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={prevTab}>
                    Previous
                  </Button>
                  <Button 
                    type="button" 
                    className="bg-primary hover:bg-primary/90 text-white" 
                    onClick={nextTab}
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>
              
              {/* Educational Information */}
              <TabsContent value="education" className="space-y-4 animate-fade-in mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="previousSchool"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Previous School Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter previous school name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="previousSchoolAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Previous School Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter previous school address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="classLastAttended"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class Last Attended</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter class last attended" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="marksObtained"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marks Obtained in Last Exam</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter marks obtained" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="board"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Board</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select board" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="cbse">CBSE</SelectItem>
                            <SelectItem value="icse">ICSE</SelectItem>
                            <SelectItem value="state">State Board</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="previousRollNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Previous Roll Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter previous roll number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subjectsTaken"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subjects Previously Taken</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter subjects (comma separated)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={prevTab}>
                    Previous
                  </Button>
                  <Button 
                    type="button" 
                    className="bg-primary hover:bg-primary/90 text-white" 
                    onClick={nextTab}
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>
              
              {/* Fee Payment Setup */}
              <TabsContent value="fee" className="space-y-4 animate-fade-in mt-0">
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <h3 className="font-medium text-gray-900 mb-4">Step 1: Fee Category</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="tuition-fee" />
                      <label
                        htmlFor="tuition-fee"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Tuition Fee
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="admission-fee" />
                      <label
                        htmlFor="admission-fee"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Admission Fee
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="transport-fee" />
                      <label
                        htmlFor="transport-fee"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Transport Fee
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="other-fee" />
                      <label
                        htmlFor="other-fee"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Other Fees (e.g., Laboratory, Sports Fee)
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mt-4">
                  <h3 className="font-medium text-gray-900 mb-4">Step 2: Select Payment Term</h3>
                  
                  <FormField
                    control={form.control}
                    name="paymentTerm"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yearly" id="yearly" />
                              <Label htmlFor="yearly">Yearly (Pay entire fee in one installment)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="quarterly" id="quarterly" />
                              <Label htmlFor="quarterly">Quarterly (Pay fee in 4 installments)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="monthly" id="monthly" />
                              <Label htmlFor="monthly">Monthly (Pay fee in 12 installments)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="custom" id="custom" />
                              <Label htmlFor="custom">Custom Terms</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {form.watch("paymentTerm") === "custom" && (
                    <FormField
                      control={form.control}
                      name="customTerms"
                      render={({ field }) => (
                        <FormItem className="mt-4 ml-6">
                          <FormLabel>Number of Installments</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" placeholder="Enter number of installments" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mt-4">
                  <h3 className="font-medium text-gray-900 mb-4">Step 3: Fee Calculation</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-sm">Tuition Fee</span>
                      <span className="font-medium">₹24,000</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-sm">Admission Fee</span>
                      <span className="font-medium">₹5,000</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-sm">Transport Fee</span>
                      <span className="font-medium">₹12,000</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-sm">Other Fees</span>
                      <span className="font-medium">₹3,000</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold">₹44,000</span>
                    </div>
                  </div>
                  
                  {form.watch("paymentTerm") === "yearly" && (
                    <div className="mt-4 bg-gray-50 p-3 rounded-md">
                      <p className="text-sm font-medium">Payment Schedule</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm">Full Payment (Due: 10-Apr-2023)</span>
                        <span className="font-medium">₹44,000</span>
                      </div>
                    </div>
                  )}
                  
                  {form.watch("paymentTerm") === "quarterly" && (
                    <div className="mt-4 bg-gray-50 p-3 rounded-md">
                      <p className="text-sm font-medium">Payment Schedule</p>
                      <div className="space-y-2 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">1st Installment (Due: 10-Apr-2023)</span>
                          <span className="font-medium">₹11,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">2nd Installment (Due: 10-Jul-2023)</span>
                          <span className="font-medium">₹11,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">3rd Installment (Due: 10-Oct-2023)</span>
                          <span className="font-medium">₹11,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">4th Installment (Due: 10-Jan-2024)</span>
                          <span className="font-medium">₹11,000</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {form.watch("paymentTerm") === "monthly" && (
                    <div className="mt-4 bg-gray-50 p-3 rounded-md">
                      <p className="text-sm font-medium">Payment Schedule</p>
                      <p className="text-xs text-gray-500 mt-1">12 monthly installments of ₹3,667 each</p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={prevTab}>
                    Previous
                  </Button>
                  <Button 
                    type="button" 
                    className="bg-primary hover:bg-primary/90 text-white" 
                    onClick={nextTab}
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>
              
              {/* Document Upload */}
              <TabsContent value="documents" className="space-y-4 animate-fade-in mt-0">
                <div className="grid grid-cols-1 gap-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h3 className="font-medium">Birth Certificate <span className="text-red-500">*</span></h3>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="dropzone-file-birth"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PDF, PNG, JPG (MAX. 2MB)</p>
                          </div>
                          <input id="dropzone-file-birth" type="file" className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h3 className="font-medium">Aadhar Card</h3>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="dropzone-file-aadhar"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PDF, PNG, JPG (MAX. 2MB)</p>
                          </div>
                          <input id="dropzone-file-aadhar" type="file" className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h3 className="font-medium">Previous Marksheets/Report Cards</h3>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="dropzone-file-marksheets"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PDF, PNG, JPG (MAX. 5MB)</p>
                          </div>
                          <input id="dropzone-file-marksheets" type="file" className="hidden" multiple />
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h3 className="font-medium">Transfer Certificate</h3>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="dropzone-file-transfer"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PDF, PNG, JPG (MAX. 2MB)</p>
                          </div>
                          <input id="dropzone-file-transfer" type="file" className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={prevTab}>
                    Previous
                  </Button>
                  <Button 
                    type="button" 
                    className="bg-primary hover:bg-primary/90 text-white" 
                    onClick={nextTab}
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>
              
              {/* Terms & Conditions */}
              <TabsContent value="terms" className="space-y-4 animate-fade-in mt-0">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">Terms & Conditions</h3>
                  
                  <div className="prose prose-sm max-w-none text-gray-600 mb-6">
                    <p>By enrolling your child in Akshara School, you agree to abide by the following terms and conditions:</p>
                    <ol className="list-decimal ml-4 space-y-2 mt-2">
                      <li>The school reserves the right to make changes to its curriculum, faculty, and fee structure.</li>
                      <li>Students are expected to maintain a minimum attendance of 75% to be eligible for examinations.</li>
                      <li>The school is not responsible for any personal belongings of the students.</li>
                      <li>Parents are expected to attend parent-teacher meetings regularly.</li>
                      <li>The school has a zero-tolerance policy towards bullying, harassment, and discrimination.</li>
                      <li>The decision of the school authorities in all matters shall be final and binding.</li>
                    </ol>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="consentSchoolPolicies"
                    render={({ field }) => (
                      <FormItem className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange} 
                              id="consent-policies"
                            />
                          </FormControl>
                          <label
                            htmlFor="consent-policies"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I agree to the school policies and terms of service <span className="text-red-500">*</span>
                          </label>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="parentalConsent"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange} 
                              id="parental-consent"
                            />
                          </FormControl>
                          <label
                            htmlFor="parental-consent"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I am the parent/legal guardian of the student and I provide consent for this enrollment <span className="text-red-500">*</span>
                          </label>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={prevTab}>
                    Previous
                  </Button>
                  <Button 
                    type="button" 
                    className="bg-primary hover:bg-primary/90 text-white" 
                    onClick={nextTab}
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>
              
              {/* Class Information */}
              <TabsContent value="class" className="space-y-4 animate-fade-in mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="class"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class <span className="text-red-500">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Class 1</SelectItem>
                            <SelectItem value="2">Class 2</SelectItem>
                            <SelectItem value="3">Class 3</SelectItem>
                            <SelectItem value="4">Class 4</SelectItem>
                            <SelectItem value="5">Class 5</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="section"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section <span className="text-red-500">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select section" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="A">Section A</SelectItem>
                            <SelectItem value="B">Section B</SelectItem>
                            <SelectItem value="C">Section C</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="rollNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Roll Number <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Enter roll number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="admissionNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Admission Number <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Enter admission number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={prevTab}>
                    Previous
                  </Button>
                  <Button 
                    type="button" 
                    className="bg-primary hover:bg-primary/90 text-white" 
                    onClick={nextTab}
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>
              
              {/* Parent App Setup */}
              <TabsContent value="parentapp" className="space-y-4 animate-fade-in mt-0">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">Parent App Access</h3>
                  
                  <FormField
                    control={form.control}
                    name="createParentAccount"
                    render={({ field }) => (
                      <FormItem className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange} 
                              id="create-parent-account"
                            />
                          </FormControl>
                          <label
                            htmlFor="create-parent-account"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Create parent account for accessing the Parent App
                          </label>
                        </div>
                        <FormDescription className="ml-6">
                          Parents can use the Parent App to track attendance, fees, and academic progress.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {form.watch("createParentAccount") && (
                    <div className="ml-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="parentEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Parent Email <span className="text-red-500">*</span></FormLabel>
                              <FormControl>
                                <Input placeholder="Enter parent email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="parentPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password <span className="text-red-500">*</span></FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Enter password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="sendCredentials"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange} 
                                  id="send-credentials"
                                />
                              </FormControl>
                              <label
                                htmlFor="send-credentials"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Send login credentials to parent's email
                              </label>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
                
                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={prevTab}>
                    Previous
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Submit & Enroll Student
                  </Button>
                </DialogFooter>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
