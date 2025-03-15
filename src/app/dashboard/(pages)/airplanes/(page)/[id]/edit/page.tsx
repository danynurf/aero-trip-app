
import { getAirplaneById } from "../../../lib/actions";
import FormAirplane from "../../../components/form-airplane";

export default async function EditAirplanePage({ params }: { params: { id: string } }) {
  const airplane = await getAirplaneById(params.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Edit Airplane</h1>
      </div>
      <FormAirplane airplane={airplane} /> 
    </div>
  );
}
