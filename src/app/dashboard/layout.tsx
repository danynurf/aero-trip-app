import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import BtnLogout from "./components/btn-logout";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { session, user } = await getUser();

  if (!session || user?.role != "ADMIN") {
    redirect("/auth/login");
  }

  return (
    <div className="flex h-screen w-screen">
      <header className="w-full h-[80px] bg-white border-b-1 border-gray-200 absolute top-0 left-0 z-10 flex items-center px-4">
        <Button
          asChild
          variant={"ghost"}
        >
          <Link href={`/dashboard/`}>Aero Trip Dashboard</Link>
        </Button>
      </header>
      <aside className="w-[250px] h-full bg-white border-r-1 border-gray-200 absolute top-0 left-0 pt-[80px] flex flex-col justify-between">
        <nav className="flex flex-col gap-2">
          <Button
            asChild
            variant={"ghost"}
          >
            <Link href={`/dashboard/`}>Dashboard</Link>
          </Button>
          <Button
            asChild
            variant={"ghost"}
          >
            <Link href={`/dashboard/airplanes`}>Airplanes</Link>
          </Button>
          <Button
            asChild
            variant={"ghost"}
          >
            <Link href={`/dashboard/flights`}>Flights</Link>
          </Button>
          <Button
            asChild
            variant={"ghost"}
          >
            <Link href={`/dashboard/users`}>Users</Link>
          </Button>
          <Button
            asChild
            variant={"ghost"}
          >
            <Link href={`/dashboard/tickets`}>Tickets</Link>
          </Button>
        </nav>
        <BtnLogout />
      </aside>
      <main className="flex-1 p-[2rem] pt-[calc(80px+1.5rem)] ml-[250px]">{children}</main>
    </div>
  );
}
