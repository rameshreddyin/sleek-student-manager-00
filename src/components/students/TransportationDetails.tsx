
import { useState } from "react";
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Control } from "react-hook-form";

interface TransportationDetailsProps {
  control: Control<any>;
  disabled?: boolean;
}

export function TransportationDetails({ control, disabled = false }: TransportationDetailsProps) {
  const [usesTransport, setUsesTransport] = useState(false);

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <FormField
          control={control}
          name="usesTransport"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    setUsesTransport(checked === true);
                  }}
                  disabled={disabled}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Opt for School Transportation</FormLabel>
                <FormDescription>
                  Select if the student will use the school transportation service
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>

      {usesTransport && (
        <div className="bg-gray-50 p-4 rounded-lg border space-y-4">
          <FormField
            control={control}
            name="transportRoute"
            rules={{ required: usesTransport ? "Transport route is required" : false }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Route Number</FormLabel>
                <Select
                  disabled={disabled}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a route" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="R1">Route 1 - North City</SelectItem>
                    <SelectItem value="R2">Route 2 - South City</SelectItem>
                    <SelectItem value="R3">Route 3 - East City</SelectItem>
                    <SelectItem value="R4">Route 4 - West City</SelectItem>
                    <SelectItem value="R5">Route 5 - Central Area</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the bus route for the student
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="pickupPoint"
              rules={{ required: usesTransport ? "Pickup point is required" : false }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Point</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={disabled} placeholder="e.g. Green Park, Bus Stop #12" />
                  </FormControl>
                  <FormDescription>
                    Specific location where the student will be picked up
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="dropPoint"
              rules={{ required: usesTransport ? "Drop point is required" : false }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Drop Point</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={disabled} placeholder="e.g. Green Park, Bus Stop #12" />
                  </FormControl>
                  <FormDescription>
                    Specific location where the student will be dropped off
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="distance"
              rules={{
                pattern: {
                  value: /^[0-9]*\.?[0-9]+$/,
                  message: "Please enter a valid number"
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distance (km)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step="0.1" min="0" disabled={disabled} placeholder="e.g. 5.2" />
                  </FormControl>
                  <FormDescription>
                    Distance from school in kilometers
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="busNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bus Number</FormLabel>
                  <Select
                    disabled={disabled}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a bus" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="B001">Bus 001</SelectItem>
                      <SelectItem value="B002">Bus 002</SelectItem>
                      <SelectItem value="B003">Bus 003</SelectItem>
                      <SelectItem value="B004">Bus 004</SelectItem>
                      <SelectItem value="B005">Bus 005</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Bus assigned to the student
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="transportFee"
            rules={{
              pattern: {
                value: /^[0-9]*\.?[0-9]+$/,
                message: "Please enter a valid amount"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transport Fee</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="number" 
                    min="0" 
                    disabled={disabled} 
                    placeholder="e.g. 2500"
                    className="w-full md:w-1/2" 
                  />
                </FormControl>
                <FormDescription>
                  Monthly transportation fee in local currency
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
}
