import { Liveblocks } from "@liveblocks/node";

import { auth, currentUser } from '@clerk/nextjs/server'

import { ConvexHttpClient } from "convex/browser";

import { api } from "@/convex/_generated/api";

const liveblocks = new Liveblocks({
    secret: "sk_dev_aRs_x8OzuPleXD8DsAw-iLaSET91VHxSmafKDLoZ1qbKVTKvhjmh_pV_Vxa-7EvG",
});

export async function POST(request: Request) {
    const authorization = await auth()
    const user = await currentUser()

    if (!authorization.isAuthenticated || !user) {
        return new Response("没有权限!!! (未登录)", { status: 403 })
    }

    const { room } = await request.json();
    const convex = new ConvexHttpClient(
        process.env.NEXT_PUBLIC_CONVEX_URL!
    )
    const board = await convex.query(api.board.get, { id: room });
    if (!board) {
        return new Response("Board 不存在", { status: 404 });
    }

    if (board?.orgId !== authorization.orgId) {
        return new Response("没有权限!!! (组织不匹配)", { status: 403 });
    }

    const userInfo = {
        name: user.firstName || "队员",
        picture: user.imageUrl
    }

    const session = liveblocks.prepareSession(
        authorization.userId,
        { userInfo }
    )

    if (room) {
        session.allow(room, session.FULL_ACCESS);
    }

    const { status, body } = await session.authorize();
    return new Response(body, { status });
}