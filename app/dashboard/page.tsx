import Link from "next/link";
import { redirect } from "next/navigation";
import { verifySession } from "@/app/lib/dal";

export default async function Dashboard() {
  const session = await verifySession();
  const userRole = session?.userId ? "user" : "admin"; // Assuming 'role' is part of the session object

  if (userRole === "admin") {
    return (
      <div>
        <nav>
          <Link href="/profile">link</Link>
        </nav>
        admin
      </div>
    );
  } else if (userRole === "user") {
    return (
      <div>
        <nav>
          <Link href="/profile">link</Link>
        </nav>
        user
      </div>
    );
  } else {
    redirect("/login");
  }
}
