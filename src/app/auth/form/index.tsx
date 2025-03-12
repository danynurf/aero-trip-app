"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import { ActionResult, login } from './actions';

const initialState: ActionResult = {
  errorTitle: undefined,
  errorMessage: undefined,
};

export default function AuthForm() {
  const [state, formAction] = useActionState(login, initialState);
  
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
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
