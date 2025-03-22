
import React from "react";
import { Bus, MapPin, Clock, IndianRupee, User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

interface TransportationDetailsProps {
  transportNeeded: boolean;
  onTransportChange: (value: boolean) => void;
  transportDetails: {
    busRoute: string;
    busStop: string;
    pickupTime: string;
    dropTime: string;
    monthlyFee: string;
    busNumber: string;
    distance: string;
    busMonitor: string;
    driverName: string;
    driverContact: string;
  };
  onDetailsChange: (field: string, value: string) => void;
}

export function TransportationDetails({
  transportNeeded,
  onTransportChange,
  transportDetails,
  onDetailsChange,
}: TransportationDetailsProps) {
  return (
    <div className="space-y-6 py-4">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="transportNeeded" 
          checked={transportNeeded}
          onCheckedChange={(checked) => onTransportChange(checked as boolean)}
        />
        <Label htmlFor="transportNeeded" className="font-medium">
          Student requires school transportation
        </Label>
      </div>

      {transportNeeded && (
        <div className="space-y-4 mt-4 animate-in fade-in-50 duration-300">
          <h3 className="text-lg font-semibold mb-4">Transportation Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="busRoute" className="text-sm font-medium">
                Bus Route
              </Label>
              <div className="relative">
                <Bus className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="busRoute"
                  placeholder="e.g. Route 7B - Koramangala"
                  className="pl-10"
                  value={transportDetails.busRoute}
                  onChange={(e) => onDetailsChange("busRoute", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="busStop" className="text-sm font-medium">
                Bus Stop
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="busStop"
                  placeholder="e.g. 7th Block Junction"
                  className="pl-10"
                  value={transportDetails.busStop}
                  onChange={(e) => onDetailsChange("busStop", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pickupTime" className="text-sm font-medium">
                Pickup Time
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="pickupTime"
                  type="time"
                  className="pl-10"
                  value={transportDetails.pickupTime}
                  onChange={(e) => onDetailsChange("pickupTime", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dropTime" className="text-sm font-medium">
                Drop Time
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="dropTime"
                  type="time"
                  className="pl-10"
                  value={transportDetails.dropTime}
                  onChange={(e) => onDetailsChange("dropTime", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyFee" className="text-sm font-medium">
                Monthly Fee (₹)
              </Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="monthlyFee"
                  type="number"
                  placeholder="e.g. 2500"
                  className="pl-10"
                  value={transportDetails.monthlyFee}
                  onChange={(e) => onDetailsChange("monthlyFee", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="busNumber" className="text-sm font-medium">
                Bus Number
              </Label>
              <div className="relative">
                <Bus className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="busNumber"
                  placeholder="e.g. KA-01-F-5678"
                  className="pl-10"
                  value={transportDetails.busNumber}
                  onChange={(e) => onDetailsChange("busNumber", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="distance" className="text-sm font-medium">
                Distance (km)
              </Label>
              <Input
                id="distance"
                type="number"
                step="0.1"
                placeholder="e.g. 3.5"
                value={transportDetails.distance}
                onChange={(e) => onDetailsChange("distance", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="busMonitor" className="text-sm font-medium">
                Bus Monitor
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="busMonitor"
                  placeholder="e.g. Mrs. Lakshmi"
                  className="pl-10"
                  value={transportDetails.busMonitor}
                  onChange={(e) => onDetailsChange("busMonitor", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <h4 className="text-md font-medium">Driver Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="driverName" className="text-sm font-medium">
                    Driver Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="driverName"
                      placeholder="e.g. Mr. Raju Singh"
                      className="pl-10"
                      value={transportDetails.driverName}
                      onChange={(e) => onDetailsChange("driverName", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driverContact" className="text-sm font-medium">
                    Driver Contact
                  </Label>
                  <Input
                    id="driverContact"
                    placeholder="e.g. +91 9876543222"
                    value={transportDetails.driverContact}
                    onChange={(e) => onDetailsChange("driverContact", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
