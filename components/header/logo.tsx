import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import logo from "@/app/(auth)/images/logo.png";

export const Logo = () => (
  <Button variant="ghost" asChild size="icon">
    <Link href="/">
      <Image src={logo} width={32} height={32} alt="logo" />
    </Link>
  </Button>
);
