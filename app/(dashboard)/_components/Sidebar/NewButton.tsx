"use client";
import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";
import { Hint } from "@/components/hint";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-aquare">
          <Hint
            label="Create organization"
            side="right"
            // align="start"
            sideOffset={15}
          >
            <button className="bg-white/25 h-full w-full rounded-lg flex items-center justify-center opacity-60 hover:opacity-100 transition p-2">
              <Plus className="text-white"></Plus>
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0  bg-transparent  border-none shadow-none min-w-[480px]">
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};
