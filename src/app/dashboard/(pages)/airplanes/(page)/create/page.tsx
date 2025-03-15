import FormAirplane from "../../components/form-airplane";

export default function CreateAirplanePage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Airplanes</h1>
      </div>
      <FormAirplane /> 
    </div>
  );
}
