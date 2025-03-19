"use client";

import { Button } from "@/components/ui/button";
import type { Airplane, Flight, FlightSeat,  } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Link from "next/link";

export type FlightColumn = Flight & {
  airplane: Airplane;
  seats: FlightSeat[];
};

export const columns: ColumnDef<FlightColumn>[] = [
  {
    header: "Pesawat",
    accessorKey: "airplaneId",
    cell: ({ row }) => {
      return row.original.airplane.name;
    },
  },
  {
    header: "Route",
    accessorKey: "departureCity",
    cell: ({ row }) => {
      return `${row.original.departureCity} - ${row.original.destinationCity}`;
    },
  },
  {
    header: "Price",
    accessorKey: "price",
    cell: ({ row }) => {
      return `Rp. ${row.original.price}`;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const flight = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            asChild
          >
            <Link href={`/dashboard/flights/${flight.id}/edit`}>
              <Pencil />
            </Link>
          </Button>
          {/* <DeleteFlight id={flight.id} /> */}
        </div>
      );
    },
  },
];

