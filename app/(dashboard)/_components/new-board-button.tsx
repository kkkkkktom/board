"use client";

import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import useApiMutation from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { Plus } from "lucide-react";
import { totalmem } from "os";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

export default function NewBoardButton({
  orgId,
  disabled,
}: NewBoardButtonProps) {
  const { mutate, pending } = useApiMutation(api.board.create);
  const onClick = () => {
    mutate({
      orgId,
      title: "Untitle",
    })
      .then((id) => {
        toast.success("Board created");
        //TODO:Redirect to /board/{id}
      })
      .catch(() => toast.error("Failed to create board"));
  };

  return (
    <button
      disabled={disabled || pending}
      onClick={onClick}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        (pending || disabled) &&
          "opacity-75 hover:bg-blue-600 cursor-not-allowed"
      )}
    >
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">new </p>
    </button>
  );
}
