import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FlightColumn } from "./columns-flights";
import { formatRupiah, mappingSeats } from "@/lib/utils";
import { useMemo } from "react";
export default function ColumnSeatPrice({ price, flightSeats }: FlightColumn) {
  const {
    economySeatsAvailable,
    businessSeatsAvailable,
    firstSeatsAvailable,
    economySeatsTotal,
    businessSeatsTotal,
    firstSeatsTotal,
  } = useMemo(() => mappingSeats(flightSeats), [flightSeats]);

  return (
    <Accordion
      type="single"
      defaultValue="economy"
    >
      <AccordionItem
        value="economy"
        className="w-full"
      >
        <AccordionTrigger>Economy</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p>Price</p>
              <p>{formatRupiah(price)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Avail. Seats</p>
              <p>
                {economySeatsAvailable}/{economySeatsTotal}
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="business"
        className="w-full"
      >
        <AccordionTrigger>Business</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p>Price</p>
              <p>{formatRupiah(price + 500000)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Avail. Seats</p>
              <p>
                {businessSeatsAvailable}/{businessSeatsTotal}
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="first"
        className="w-full"
      >
        <AccordionTrigger>First</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p>Price</p>
              <p>{formatRupiah(price + 750000)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Avail. Seats</p>
              <p>
                {firstSeatsAvailable}/{firstSeatsTotal}
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
