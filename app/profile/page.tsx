// import Link from "next/link";
// import { redirect } from "next/navigation";

import { verifySession } from "@/app/lib/dal";

export default async function Profile() {
  await verifySession();
  //   const userRole = session?.user?.role || "user"; // Assuming 'role' is part of the session object

  //   console.log("userRole", userRole);
  return (
    <>
     This page is user.
    </>
  );
}
