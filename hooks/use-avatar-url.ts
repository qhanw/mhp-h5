import { useState, useEffect } from "react";

import { hexToBlob } from "@/lib/utils";

export function useHexToAvatarUrl(hex: string, mimeType = "image/webp") {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const objUrl = hex ? URL.createObjectURL(hexToBlob(hex, mimeType)) : null;
    if (objUrl) setUrl(objUrl);
    // 清理 URL
    return () => {
      objUrl && URL.revokeObjectURL(objUrl);
    };
  }, [hex]);

  return url;
}
