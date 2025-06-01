"use client";
import { Loader2Icon } from "lucide-react";

import { startTransition, useActionState, useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { signup } from "@/app/actions/auth";
import { SignupFormSchema } from "@/app/lib/definitions";

// https://dev.to/emmanuel_xs/how-to-use-react-hook-form-with-useactionstate-hook-in-nextjs15-1hja

export function SignupForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(signup, undefined);

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onInvalid = () => {
    startTransition(() => action(new FormData(formRef.current!)));
  };

  return (
    <div className="mx-auto w-96 pt-24">
      <div className="login-logo w-16 h-16 bg-contain mb-4" />
      <h1 className="text-4xl">Welcome Back!</h1>
      <div>Enter to get unlimited access to data & information.</div>

      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(onInvalid)}
          className="space-y-6 mt-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input placeholder="Email address" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-primary hover:text-primary/90"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/*          
          {state?.errors?.password && (
            <div>
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )} */}

          <div>
            <Button disabled={pending}>
              {pending && <Loader2Icon className="animate-spin" />}
              Sign Up
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
