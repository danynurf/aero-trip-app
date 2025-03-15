"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ActionResult } from "@/app/auth/login/form/actions";
import { useActionState, useEffect } from "react";
import { saveAirplane } from "../lib/actions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
const initialState: ActionResult = {
  errorTitle: undefined,
  errorMessage: undefined,
};

export default function FormAirplane() {
  const [state, formAction, pending] = useActionState(saveAirplane, initialState);

  useEffect(() => {
    if (state.errorTitle) {
      toast.error(state.errorTitle, {
        description: state.errorMessage,
      });
    }
  }, [state]);

  return (
    <form className="space-y-4 max-w-md" action={formAction}>
      <div className="space-y-2">
        <Label htmlFor="code">Code</Label>
        <Input
          id="code"
          name="code"
          placeholder="Enter code"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Upload Image</Label>
        <Input
          id="image"
          name="image"
          type="file"
          required
        />
      </div>
      <Button type="submit" disabled={pending}>
        {pending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {pending ? "Creating..." : "Create"}
      </Button>
    </form>
  );
}
