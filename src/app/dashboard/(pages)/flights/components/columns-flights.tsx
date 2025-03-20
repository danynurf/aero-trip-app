"use client";

import { Button } from "@/components/ui/button";
import { getUrlImage } from "@/lib/supabase";
import type { Airplane, Flight, FlightSeat } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ColumnRouteFlight from "./column-route-flight";
import ColumnSeatPrice from "./column-seat-price";

export type FlightColumn = Flight & {
  airplane: Airplane;
  flightSeats: FlightSeat[];
};

export const columns: ColumnDef<FlightColumn>[] = [
  {
    header: "Pesawat",
    accessorKey: "airplaneId",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex items-center gap-2">
          <Image
            src={getUrlImage(data.airplane.image.toString())}
            alt={data.airplane.name}
            width={100}
            height={100}
            className="rounded-xl"
          />
          <p>{data.airplane.name}</p>
        </div>
      );
    },
  },
  {
    header: "Route",
    accessorKey: "departureCity",
    cell: ({ row }) => {
      return <ColumnRouteFlight {...row.original} />;
    },
  },
  {
    header: "Price",
    accessorKey: "price",
    cell: ({ row }) => {
      const data = row.original;

      return <ColumnSeatPrice {...data} />;
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
            className="size-10"
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
