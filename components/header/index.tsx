"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { Logo } from "./logo";
import { Sign } from "./sign";
import { Navbar } from "./navbar";

export function Header() {
  const pathname = usePathname();

  if (["/sign"].some((c) => pathname.startsWith(c))) return null;

  return (
    <header className="flex gap-2 bg-background sticky top-0 z-50 w-full px-6">
      <Logo />
      <Navbar />
      <div className="flex flex-1 items-center justify-end">
        <Sign />
      </div>
    </header>
  );
}
