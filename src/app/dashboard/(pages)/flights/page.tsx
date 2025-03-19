import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns-flights";
import { getFlights } from "./lib/data";

export const metadata: Metadata = {
  title: "Flights",
  description: "Flights",
};

export default async function FlightsPage() {
  const flights = await getFlights();
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Flights</h1>
        <Button asChild>
          <Link href="/dashboard/flights/create">
            <PlusIcon />
            Create
          </Link>
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={flights}
      />
    </div>
  );
}
