"use client";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { deleteSpace } from "../space.action";
import { useState } from "react";

export function DeleteSpace({ spaceId }: { spaceId: number }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new space</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this space?</p>
        <DialogFooter>
          <form
            action={async (formData) => {
              const response = await deleteSpace(formData);

              if (response.status === "error") {
                return;
              }

              setOpen(false);
            }}
          >
            <input type="hidden" name="id" value={spaceId} />
            <Button variant={"destructive"}>Delete</Button>
          </form>
          <Button variant={"outline"} onClick={handleClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
