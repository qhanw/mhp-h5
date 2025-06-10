"use client";
import Link from "next/link";
import { Loader2Icon } from "lucide-react";

import { startTransition, useActionState, useEffect, useRef } from "react";

import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { signin } from "@/app/actions/auth";
import { SigninFormSchema } from "@/app/lib/definitions";

// https://dev.to/emmanuel_xs/how-to-use-react-hook-form-with-useactionstate-hook-in-nextjs15-1hja

export function SigninForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(signin, undefined);

  const form = useForm<z.infer<typeof SigninFormSchema>>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: { email: "", password: "" },
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
                    <a href="#" className="font-semibold">
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

          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    onCheckedChange={field.onChange}
                    checked={field.value}
                  />
                  <Label htmlFor="terms">Remember me</Label>
                </div>

                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button className="w-full" disabled={pending}>
              {pending && <Loader2Icon className="animate-spin" />}
              Sign In
            </Button>
          </div>
          <div>
            Don't have an account? <Link href="/signup">Sign up</Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
