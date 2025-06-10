import { redirect } from "next/navigation";
import { verifySession } from "@/app/lib/dal";

export default async function Dashboard() {
  const session = await verifySession();
  const userRole = session?.userId ? "user" : "admin"; // Assuming 'role' is part of the session object

  if (userRole === "admin") {
    return <div>This page is dashboard, current role: admin</div>;
  } else if (userRole === "user") {
    return <div>This page is dashboard, current role: user</div>;
  } else {
    redirect("/signin");
  }
}
