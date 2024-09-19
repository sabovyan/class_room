import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { editSpace } from "../../space.action";

export default function EditPage({
  params,
  searchParams,
}: {
  params: { spaceId: string };
  searchParams: { name: string; description: string };
}) {
  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new space</DialogTitle>
        </DialogHeader>
        <form action={editSpace}>
          <input type="hidden" name="id" value={params.spaceId} />
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                required
                minLength={3}
                className="col-span-3"
                defaultValue={searchParams.name}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                description
              </Label>
              <Textarea
                id="description"
                name="description"
                className="col-span-3"
                defaultValue={searchParams.description}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
