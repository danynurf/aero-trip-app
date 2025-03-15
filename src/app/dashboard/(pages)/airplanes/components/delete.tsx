import { Button } from "@/components/ui/button";
import { deleteAirplane } from "@/app/dashboard/(pages)/airplanes/lib/actions";
import { Loader2, Trash } from "lucide-react";
import { useFormStatus } from "react-dom";

const DeleteBtn = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="destructive"
      disabled={pending}
    >
      {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash className="w-4 h-4" />}
    </Button>
  );
};

export default function DeleteAirplane({ id }: { id: string }) {
  return (
    <form
      action={async () => {
        await deleteAirplane(id);
      }}
    >
      <DeleteBtn />
    </form>
  );
}
