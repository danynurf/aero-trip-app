"use client";

import { ActionResult } from "@/app/auth/login/form/actions";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect } from "react";
import { logout } from "../actions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
const initialState: ActionResult = {
  errorTitle: undefined,
  errorMessage: undefined,
};

export default function BtnLogout() {
  const [state, formAction, pending] = useActionState(logout, initialState);

  useEffect(() => {
    if (state.errorTitle) {
      toast.error(state.errorTitle, {
        description: state.errorMessage,
      });
    }
  }, [state]);

  return (
    <form action={formAction} className="w-full">
      <Button
        variant={"destructive"}
        type="submit"
        className="w-full"
      >
        {pending && <Loader2 className="w-4 h-4 animate-spin" />}
        Logout
      </Button>
    </form>
  );
}
