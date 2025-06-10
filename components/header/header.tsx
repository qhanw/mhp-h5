"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

export function HeaderWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (["/sign"].some((c) => pathname.startsWith(c))) return null;

  return (
    <header className="flex gap-2 bg-background sticky top-0 z-50 w-full px-6">
      {children}
    </header>
  );
}
