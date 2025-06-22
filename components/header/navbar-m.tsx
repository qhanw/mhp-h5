"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Menu } from "lucide-react";

import { Logo } from "./logo";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function NavbarM() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="w-8 h-8" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="gap-0 px-3">
        <SheetHeader className="p-0">
          <SheetTitle className="pt-1.5">
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <Accordion type="single" collapsible>
          <AccordionItem value="home">
            <AccordionTrigger>Home</AccordionTrigger>
            <AccordionContent>
              <ListItem href="/docs" title="shadcn/ui">
                Beautifully designed components built with Tailwind CSS.
              </ListItem>

              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="components">
            <AccordionTrigger>Components</AccordionTrigger>
            <AccordionContent>
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </AccordionContent>
          </AccordionItem>

          <Link
            href="/docs"
            className="
            border-b last:border-b-0
            focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180
           "
          >
            Docs
          </Link>

          <AccordionItem value="List">
            <AccordionTrigger>List</AccordionTrigger>
            <AccordionContent>
              <ListItem className="list-none" href="/docs" title="Components">
                Browse all components in the library.
              </ListItem>
              <ListItem
                className="list-none"
                href="/docs"
                title="Documentation"
              >
                Learn how to use the library.
              </ListItem>
              <ListItem className="list-none" href="/docs" title="Blog">
                Read our latest blog posts.
              </ListItem>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="Simple">
            <AccordionTrigger>Simple</AccordionTrigger>
            <AccordionContent>
              <ListItem className="list-none" href="/docs" title="Components" />
              <ListItem
                className="list-none"
                href="/docs"
                title="Documentation"
              />
              <ListItem className="list-none" href="/docs" title="Blog" />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="WithIcon">
            <AccordionTrigger>With Icon</AccordionTrigger>
            <AccordionContent>
              <Link
                href="#"
                className="data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex gap-2 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4
               items-center"
              >
                <CircleHelpIcon />
                Backlog
              </Link>
              <Link
                href="#"
                className="data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex gap-2 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4
               items-center"
              >
                <CircleIcon />
                To Do
              </Link>

              <Link
                href="#"
                className="data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex gap-2 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4
               items-center"
              >
                <CircleCheckIcon />
                Done
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SheetContent>
    </Sheet>
  );
}

type ListItemProps = React.PropsWithChildren & {
  href: string;
  title: React.ReactNode;
  className?: string;
};

function ListItem({
  title,
  children,
  href,
  className,
  ...props
}: ListItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <div className="text-sm leading-none font-medium">{title}</div>
      {children && (
        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
          {children}
        </p>
      )}
    </Link>
  );
}
