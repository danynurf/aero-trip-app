import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { deleteFlight } from "../lib/actions";

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

export default function DeleteFlight({ id }: { id: string }) {
  return (
    <form
      action={async () => {
        await deleteFlight(id);
      }}
    >
      <DeleteBtn />
    </form>
  );
}
