"use client";

import Image from "next/image";
import { useMutation } from "convex/react";

import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useOrganization } from "@clerk/nextjs";
import useApiMutation from "@/hooks/use-api-mutation";
import { useRouter } from "next/navigation";

export const EmptyBoard = () => {
  const router = useRouter();
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = () => {
    // console.log("click");
    if (!organization) return;

    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("创建成功");
        router.push(`/board/${id}`);
      })
      .catch(() => toast.error("Failed to create board"));
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" height={110} width={110} alt="Empty" />
      <h2 className="text-2xl font-semibold mt-6">创造你的第一个模版吧～</h2>
      <p className="text-muted-foregrounf text-sm mt-2">
        Start by creating a board for your orgnization
      </p>
      <div className="mt-6">
        <Button disabled={pending} onClick={onClick} size="lg">
          Create
        </Button>
      </div>
    </div>
  );
};
