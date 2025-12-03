"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Link from "next/link";
import { Hint } from "@/components/hint";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";

import { Button } from "@/components/ui/button";
import { useRenameModel } from "@/store/use-rename-modal";
import Actions from "@/components/actions";
import { Menu } from "lucide-react";

interface InfoProps {
  boardId: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSeparator = () => {
  return (
    <div className="text-netural-300 px-1.5" style={{ color: "#f3f3f3" }}>
      |
    </div>
  );
};

export const Info = ({ boardId }: InfoProps) => {
  const { onOpen } = useRenameModel();

  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  if (!data) return <InfoSkeleton />;

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="返回主界面" side="bottom" sideOffset={10}>
        <Button asChild variant="board" className="p-2">
          <Link href="/">
            <Image src="/logo.png" alt="Board logo" height={40} width={40} />
            <span
              className={cn(
                "font-semibold text-xl ml-2 text-black",
                font.className
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="修改标题" side="bottom" sideOffset={10}>
        <Button
          variant="board"
          className="text-base font-normal px-2"
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
        <div>
          <Hint label="主菜单" side="bottom" sideOffset={10}>
            <Button size="icon" variant="board">
              <Menu></Menu>
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]"></div>
  );
};
