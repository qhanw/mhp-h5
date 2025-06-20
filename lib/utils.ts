import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hexToBlob(
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
