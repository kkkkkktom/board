"use client";

import { ReactNode } from "react";
import { ClientSideSuspense, LiveblocksProvider } from "@liveblocks/react";

import { RoomProvider } from "@liveblocks/react";

interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}

export const Room = ({ children, roomId, fallback }: RoomProps) => {
  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_dev_dWQ5kOWeJPZdaCqlDZGW-kTcFhJWijKlQk2J6GldilP6TZVJSfCzr6R6aEw5GJ6c"
      }
    >
      <RoomProvider id="my-room">
        <ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};
