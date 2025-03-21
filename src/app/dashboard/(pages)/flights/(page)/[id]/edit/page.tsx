import { getAirplanes } from "@/app/dashboard/(pages)/airplanes/lib/data";
import { Metadata } from "next";
import FormFlight from "../../../components/form-flight";
import { getFlightById } from "../../../lib/data";
export const metadata: Metadata = {
  title: "Edit Flight",
  description: "Edit Flight",
};

export default async function EditFlightPage({ params }: { params: { id: string } }) {
  const airplanes = await getAirplanes();
  const flight = await getFlightById(params.id);

  console.log(flight);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Edit Flight</h1>
      </div>
      <FormFlight airplanes={airplanes} value={flight} />
    </div>
  );
}

