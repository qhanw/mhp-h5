"use client";

import { startTransition, useActionState } from "react";
import { CalendarIcon, Loader2Icon } from "lucide-react";

import { format } from "date-fns";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { DialogAvatarEditor } from "./dialog-avatar-editor";

import { update } from "../actions";
import { ProfileSchema } from "../actions/definitions";

export type UserInfo =
  | (z.infer<typeof ProfileSchema> & { avatar: string })
  | null;

type ProfileFormProps = { userinfo: UserInfo };

const defaultProfileValues = {
  id: "",
  // avatar: "",
  username: "",
  email: "",
  phoneNumber: "",
  gender: undefined,
  birthday: undefined,
  country: "",
  bio: "",
};

export function ProfileForm({ userinfo }: ProfileFormProps) {
  const [state, action, pending] = useActionState(update, undefined);

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: { ...defaultProfileValues, ...userinfo },
  });

  const onValid = (data: z.infer<typeof ProfileSchema>) => {
    startTransition(() => action(data));
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValid)} className="space-y-6">
          <FormItem>
            <FormLabel>Profile Picture</FormLabel>
            <FormControl>
              <DialogAvatarEditor
                avatar={userinfo?.avatar!}
                username={userinfo?.username!}
              />
            </FormControl>
          </FormItem>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl className="max-w-88">
                  <Input type="text" placeholder="Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl className="max-w-88">
                  <Input type="text" placeholder="Email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl className="max-w-88">
                  <Input type="text" placeholder="Phone number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="man">Man</SelectItem>
                    <SelectItem value="woman">Woman</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Birthday</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        // Notice: 不知道这里为什么在调用 toISOString时 结尾为时区而不是Z
                        // Reason: 是因为组件配置了时区
                        // 当在非0时区的前端调用 toISOString 时，仍然会得到减去当本地时间时区的值
                        // 因些稳妥方式是使用 date-fns 或 dayjs 进行字符串格式化处理。

                        // 存储为UTC时间
                        const d = date
                          ? format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'")
                          : undefined;
                        field.onChange(d);
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      captionLayout="dropdown"
                      // Warn: 这里如果配置了时区，那在接收到的Date对象调用toISOString()方法后，其结果也有时区值
                      // timeZone="+08:00"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl className="max-w-88">
                  <Input type="text" placeholder="Country" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl className="max-w-88">
                  <Textarea placeholder="Bio" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Separator />

          <div className="my-2">
            <Button
              type="submit"
              variant="default"
              size="sm"
              disabled={pending}
            >
              {pending && <Loader2Icon className="animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
