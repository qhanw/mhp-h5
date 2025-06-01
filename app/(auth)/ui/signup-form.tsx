"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";

import { signup } from "@/app/actions/auth";
import { Input } from "@/components/ui/input";

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);
  return (
    <div className="mx-auto w-96 pt-24">
      <div className="login-logo w-16 h-16 bg-contain mb-4" />
      <h1 className="text-4xl">Welcome Back!</h1>
      <div>Enter to get unlimited access to data & information.</div>

      <form action={action} className="space-y-6 mt-8">
        <div>
          <label
            htmlFor="name"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Name
          </label>
          <div className="mt-2">
            <Input
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              required
            />
          </div>
        </div>
        {state?.errors?.name && <p>{state.errors.name}</p>}
        <div>
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <Input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
            />
          </div>
        </div>
        {state?.errors?.email && <p>{state.errors.email}</p>}

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Password
            </label>
            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-primary hover:text-primary/90"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <Input
              type="password"
              name="password"
              id="password"
              required
              autoComplete="current-password"
            />
          </div>
        </div>
        {state?.errors?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <Button>Sign Up</Button>
        </div>
      </form>
    </div>
  );
}
