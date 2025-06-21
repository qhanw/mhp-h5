import { useState, useEffect } from "react";

import { hexToBlob } from "@/lib/utils";

export function useHexToAvatarUrl(hex: string, mimeType = "image/webp") {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    const objUrl = hex ? URL.createObjectURL(hexToBlob(hex, mimeType)) : undefined;
    setUrl(objUrl);
    // 清理 URL
    return () => {
      objUrl && URL.revokeObjectURL(objUrl);
    };
  }, [hex]);

  return url;
}
