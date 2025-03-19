import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function BtnSubmit({ pending }: { pending?: boolean }) {
  return (
    <Button
      type="submit"
      disabled={pending}
    >
      {pending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
