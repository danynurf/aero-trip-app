"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect } from "react";
import { ActionResult, login } from "./actions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const initialState: ActionResult = {
  errorTitle: undefined,
  errorMessage: undefined,
};

export default function AuthForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  useEffect(() => {
    if (state.errorTitle) {
      toast.error(state.errorTitle, {
        description: state.errorMessage,
      });
    }
  }, [state]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Login</h1>
      <form action={formAction}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Button type="submit">
          {pending && <Loader2 className="animate-spin" />}
          Login
        </Button>
      </form>
    </div>
  );
}
