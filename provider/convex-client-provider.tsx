"use client";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {
  AuthLoading,
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { Loading } from "../components/auth/Loading";
import { SignInButton } from "@clerk/nextjs";
interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convexUrl = "https://warmhearted-dodo-926.convex.cloud";
const convex = new ConvexReactClient(convexUrl);
export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => {
  return (
    <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
      <Authenticated>{children}</Authenticated>
      <AuthLoading>
        <Loading />
      </AuthLoading>
      <Unauthenticated>
        <div
          style={{ padding: "50px", textAlign: "center", background: "yellow" }}
        >
          <h1>请登录以查看内容</h1>
          <SignInButton />
        </div>
      </Unauthenticated>
    </ConvexProviderWithClerk>
  );
};
