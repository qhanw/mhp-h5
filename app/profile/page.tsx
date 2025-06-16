// import Link from "next/link";
// import { redirect } from "next/navigation";

import { Settings } from "lucide-react";

import { verifySession } from "@/app/lib/dal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default async function Profile() {
  await verifySession();
  //   const userRole = session?.user?.role || "user"; // Assuming 'role' is part of the session object

  //   console.log("userRole", userRole);
  return (
    <main className="flex flex-1 flex-col container max-w-3xl mx-auto">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 font-semibold">
          Profile
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
        <Separator />
        <div>
          <div className="my-2">Profile picture</div>
          <div className="flex gap-2 items-center">
            <Avatar className="mr-3 size-16">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              Upload photo
            </Button>
            <Button variant="destructive" size="sm">
              Remove
            </Button>
          </div>
        </div>
        <Separator />
        <div>
          <div className="my-2">Full name</div>
          <div className="max-w-88 flex-1">
            <Input type="text" placeholder="Full name" />
          </div>
        </div>
        <Separator />
        <div>
          <div className="my-2">Email Address</div>
          <div className="flex gap-2">
            <div className="max-w-88 flex-1">
              <Input type="text" placeholder="Email Address" />
            </div>
            <div className="flex-1 flex gap-2 items-center justify-end">
              <Button variant="ghost" size="sm">
                Cancel
              </Button>
              <Button variant="default" size="sm">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
        <Separator />
        <div>
          <div className="my-2">Phone number</div>
          <div className="max-w-88 flex-1">
            <Input type="text" placeholder="Phone number" />
          </div>
        </div>
        <Separator />
        <div>
          <div className="my-2 font-semibold">Social media</div>
          <div className="flex items-center">
            <div className="flex-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </div>
            <Button variant="outline" size="sm">
              Add Link
            </Button>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <div className="rounded-md border px-4 py-2 font-mono text-sm flex items-center">
            <div className="flex-1 flex items-center gap-2 [&>svg]:size-4">
              <Settings size={16} /> Titter
            </div>
            Disconnect ...
          </div>
          <div className="rounded-md border px-4 py-2 font-mono text-sm flex items-center">
            <div className="flex-1 flex items-center gap-2 [&>svg]:size-4">
              <Settings /> Instagram
            </div>
            Disconnect ...
          </div>
        </div>
      </div>
    </main>
  );
}
