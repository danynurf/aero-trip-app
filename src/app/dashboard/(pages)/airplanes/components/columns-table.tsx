"use client";

import { Button } from "@/components/ui/button";
import { getUrlImage } from "@/lib/supabase";
import { Airplane } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeleteAirplane from "./delete";

export const columns: ColumnDef<Airplane>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const plane = row.original;

      return (
        <Image
          src={getUrlImage(plane.image.toString())}
          alt={plane.name}
          width={100}
          height={100}
        />
      );
    },
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "name",
    header: "Header",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const plane = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            asChild
          >
            <Link href={`/dashboard/airplanes/${plane.id}/edit`}>
              <Pencil />
            </Link>
          </Button>
          <DeleteAirplane id={plane.id} />
        </div>
      );
    },
  },
];
