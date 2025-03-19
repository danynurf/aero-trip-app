import { Metadata } from "next";
import FormFlight from "../../components/form-flight";
import { getAirplanes } from "../../../airplanes/lib/data";

export const metadata: Metadata = {
  title: "Create Flight",
  description: "Create Flight",
};

export default async function CreateFlightPage() {
  const airplanes = await getAirplanes();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Create Flight</h1>
      </div>
      <FormFlight airplanes={airplanes} />
    </div>
  );
}

