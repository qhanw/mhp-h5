"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { hexToBlob } from "@/lib/utils";

export function Account({ info }: { info: any }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const blob = hexToBlob(info.avatar, "image/webp");
    const objectUrl = URL.createObjectURL(blob);
    setUrl(objectUrl);

    // 清理 URL
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [info.avatar]);

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
