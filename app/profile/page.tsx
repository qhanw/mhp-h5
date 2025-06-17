import { Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { ProfileForm, type UserInfo } from "./ui/profile-form";

import { getUserinfo } from "./actions";

export default async function Profile() {
  const userinfo = await getUserinfo();

  console.log(userinfo);

  return (
    <main className="flex flex-1 flex-col container max-w-3xl mx-auto">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 font-semibold">
          Profile
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
        <Separator />
        <ProfileForm userinfo={userinfo as UserInfo} />

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
