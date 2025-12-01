"use client";

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

import { useState } from "react";

import { CanvasMode, CanvasState } from "@/types/canvas";

import {
  useHistory,
  useSelf,
  useCanUndo,
  useCanRedo,
} from "@liveblocks/react/suspense";

interface CanvasProps {
  boardId: string;
}

export default function Canvas({ boardId }: CanvasProps) {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  return (
    <main
      className="h-full w-full relative bg-neutral-100 touch-none"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canUndo}
        canUndo={canRedo}
        undo={history.undo}
        redo={history.redo}
      />
    </main>
  );
}
