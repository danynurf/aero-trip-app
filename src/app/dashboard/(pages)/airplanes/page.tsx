import { columns } from "./components/columns-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { getAirplanes } from "./lib/data";

export default async function AirplanesPage() {
  const planes = await getAirplanes();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Airplanes</h1>
        <Button asChild>
          <Link href="/dashboard/airplanes/create">
            <PlusIcon />
            Create
          </Link>
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={planes}
      />
    </div>
  );
}
