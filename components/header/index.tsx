import { HeaderWrapper } from "./header";
import { Logo } from "./logo";
import { Sign } from "./sign";
import { Navbar } from "./navbar";
import { NavbarM } from "./navbar-m";

export function Header() {
  return (
    <HeaderWrapper>
      <Logo />

      <div className="hidden md:flex gap-6">
        <Navbar />
      </div>

      <div className="flex flex-1 items-center justify-end">
        <Sign />
      </div>

      <div className="md:hidden">
        <NavbarM />
      </div>
    </HeaderWrapper>
  );
}
