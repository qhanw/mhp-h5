"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useHexToAvatarUrl } from "@/hooks/use-avatar-url";

export function Account({ info }: { info: any }) {
  
  const url = useHexToAvatarUrl(info.avatar);

  return (
    <>
      <Avatar>
        <AvatarImage src={url} />
        <AvatarFallback>
          {info?.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {info?.username}
    </>
  );
}
