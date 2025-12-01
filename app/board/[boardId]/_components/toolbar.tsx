import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import ToolButton from "./tool-button";
import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";

export const Toolbar = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-2 flex gap-y-1 flex-col items-center shadow-md">
        <ToolButton
          label="选择"
          icon={MousePointer2}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="文本"
          icon={Type}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="便签"
          icon={StickyNote}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="矩形"
          icon={Square}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="椭圆"
          icon={Circle}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="画笔"
          icon={Pencil}
          onClick={() => {}}
          isActive={false}
        />
      </div>
      <div className="bg-white rounded-md p-2 flex flex-col itemscenter shadow-md">
        <ToolButton
          label="撤销"
          icon={Undo2}
          onClick={() => {}}
          isDisabled={true}
        />
        <ToolButton
          label="重做"
          icon={Redo2}
          onClick={() => {}}
          isDisabled={true}
        />
      </div>
    </div>
  );
};

export const ToolbarSkeleton = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 h-[360px] w-[52px] shadow-md rounded-md bg-white"></div>
  );
};
