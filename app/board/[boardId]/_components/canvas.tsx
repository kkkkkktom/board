"use client";

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

import { useSelf } from "@liveblocks/react/suspense";

interface CanvasProps {
  boardId: string;
}

export default function Canvas({ boardId }: CanvasProps) {
  const info = useSelf((me) => me.info);
  console.log(info);
  return (
    <main
      className="h-full w-full relative bg-neutral-100 touch-none"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <Info boardId={boardId} />
      <Participants />
      <Toolbar />
    </main>
  );
}
