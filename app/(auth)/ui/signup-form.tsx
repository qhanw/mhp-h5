"use client";
import Link from "next/link";
import { Loader2Icon } from "lucide-react";

import { startTransition, useActionState, useEffect, useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";

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
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onInvalid = () => {
    startTransition(() => action(new FormData(formRef.current!)));
  };

  useEffect(() => {
    if (state?.message) {
      toast.error(state?.message, {
        className: "!text-destructive",
        position: "top-center",
      });
    }
  }, [state]);

  return (
    <div className="mx-auto w-96 pt-24">
      <div className="login-logo w-16 h-16 bg-contain mb-4" />
      <h1 className="text-4xl">Sign up to MHP</h1>

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
                <FormLabel>Password</FormLabel>

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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
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
            <Button className="w-full" disabled={pending}>
              {pending && <Loader2Icon className="animate-spin" />}
              Sign Up
            </Button>
          </div>
          <div>
            Already have an account? <Link href="/signin">Sign In</Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
