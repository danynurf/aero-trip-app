import { dateFormat } from "@/lib/utils";
import { Flight } from "@prisma/client";
import { ArrowRight } from "lucide-react";

export default function ColumnRouteFlight({
  departureCity,
  departureCityCode,
  departureDate,
  destinationCity,
  destinationCityCode,
  arrivalDate,
}: Flight) {
  return (
    <div className="flex gap-5 items-center">
      <div className="text-center">
        <h3 className="font-semibold">{departureCityCode}</h3>
        <h3 className="text-lg font-semibold">{departureCity}</h3>
        <small className="text-sm text-gray-500">{dateFormat(departureDate)}</small>
      </div>
      <ArrowRight className="size-5 text-gray-500" />
      <div className="text-center">
        <h3 className="font-semibold">{destinationCityCode}</h3>
        <h3 className="text-lg font-semibold">{destinationCity}</h3>
        <small className="text-sm text-gray-500">{dateFormat(arrivalDate)}</small>
      </div>
    </div>
  );
}
