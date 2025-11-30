import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const Participants = () => {
  return (
    <div
      className="absolute h-12 top-2 xs bg-white rounded-md p-3 flex items-center shadow-md"
      style={{ right: "8px" }}
    >
      List of user
    </div>
  );
};
Participants.Skeleton = function ParticipantsSkeleton() {
  return (
    <div
      className="absolute h-12 top-2 xs bg-white rounded-md p-3 flex items-center shadow-md w-[100px]"
      style={{ right: "8px" }}
    ></div>
  );
};
