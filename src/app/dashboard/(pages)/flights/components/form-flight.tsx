"use client";

import { BtnSubmit } from "@/app/dashboard/components/btn-submit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Airplane } from "@prisma/client";
import { useActionState, useEffect } from "react";
import { createFlight } from "../lib/actions";
import { toast } from "sonner";
import { ActionResult } from "@/app/auth/login/form/actions";

const initialState: ActionResult = {
  errorTitle: undefined,
  errorMessage: undefined,
};

export default function FormFlight({ airplanes }: { airplanes: Airplane[] }) {
  const [state, formAction, pending] = useActionState(createFlight, initialState);

  useEffect(() => {
    if (state?.errorTitle) {
      toast.error(state.errorTitle, { description: state.errorMessage });
    }
  }, [state]);
  
  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 w-full">
          <Label htmlFor="airplaneId">Airplane</Label>
          <Select name="airplaneId">
            <SelectTrigger
              id="airplaneId"
              className="w-full cursor-pointer"
            >
              <SelectValue placeholder="Select Airplane" />
            </SelectTrigger>
            <SelectContent>
              {airplanes.length === 0 && (
                <p className="text-muted-foreground text-xs">No airplanes found</p>
              )}
              {airplanes.map((airplane) => (
                <SelectItem key={airplane.id} value={airplane.id}>
                  {airplane.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <div>
            <Input
              id="price"
              name="price"
              type="number"
              min={0}
              placeholder="Enter price"
              required
            />
            <small className="text-muted-foreground">
              Prices for business class increased by IDR 500,000 and first class increased by IDR 750,000.
            </small>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="departureCity">Departure City</Label>
          <Input
            id="departureCity"
            name="departureCity"
            placeholder="Enter departure city"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="departureDate">Departure Date</Label>
          <Input
            id="departureDate"
            name="departureDate"
            type="datetime-local"
            className="block"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="departureCityCode">Departure City Code</Label>
          <Input
            id="departureCityCode"
            name="departureCityCode"
            placeholder="Enter departure city code"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="destinationCity">Destination City</Label>
          <Input
            id="destinationCity"
            name="destinationCity"
            placeholder="Enter destination city"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="arrivalDate">Arrival Date</Label>
          <Input
            id="arrivalDate"
            name="arrivalDate"
            type="datetime-local"
            className="block"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="destinationCityCode">Destination City Code</Label>
          <Input
            id="destinationCityCode"
            name="destinationCityCode"
            placeholder="Enter destination city code"
            required
          />
        </div>
      </div>
      <BtnSubmit pending={pending} />
    </form>
  );
}
