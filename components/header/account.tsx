"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";

function hexToBlob(
  hexString: string,
  mimeType = "application/octet-stream"
): Blob {
  // 1. 移除 \x 前缀
  if (hexString.startsWith("\\x")) {
    hexString = hexString.slice(2);
  }

  // 2. 创建 Uint8Array
  const bytes = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hexString.slice(i * 2, i * 2 + 2), 16);
  }

  // 3. 转为 Blob
  return new Blob([bytes], { type: mimeType });
}

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
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={url} />
        <AvatarFallback>
          {info?.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {info?.username}
    </div>
  );
}
