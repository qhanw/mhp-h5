"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useHexToAvatarUrl } from "@/hooks/use-avatar-url";

export type UserBarProps = {
  user?: { username?: string; email?: string; avatar?: string };
};

export function UserBar({ user }: UserBarProps) {
  const url = useHexToAvatarUrl(user?.avatar!);

  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={url} alt={user?.username} />
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user?.username}</span>
        <span className="truncate text-xs">{user?.email}</span>
      </div>
    </>
  );
}
