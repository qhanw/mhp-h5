import { HeaderWrapper } from "./header";
import { Logo } from "./logo";
import { Sign } from "./sign";
import { Navbar } from "./navbar";

export function Header() {
  return (
    <HeaderWrapper>
      <Logo />
      <Navbar />
      <div className="flex flex-1 items-center justify-end">
        <Sign />
      </div>
    </HeaderWrapper>
  );
}
