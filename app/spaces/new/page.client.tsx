"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { addSpace } from "../space.action";

export function AddNewSpace() {
  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new space</DialogTitle>
        </DialogHeader>
        <Form action={addSpace} />
      </DialogContent>
    </Dialog>
  );
}

function Form({ action }: { action: (formData: FormData) => void }) {
  return (
    <form action={action}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" name="name" className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            description
          </Label>
          <Textarea
            id="description"
            name="description"
            className="col-span-3"
          />
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
}

// function Spinner() {
//   return (
//     <div role="status">
//       <svg
//         className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//       >
//         <circle
//           className="opacity-25"
//           cx="12"
//           cy="12"
//           r="10"
//           stroke="currentColor"
//           stroke-width="4"
//         ></circle>
//         <path
//           className="opacity-75"
//           fill="currentColor"
//           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//         ></path>
//       </svg>
//       <span className="sr-only">Loading...</span>
//     </div>
//   );
// }
