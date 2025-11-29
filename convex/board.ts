import { v } from 'convex/values';
import { mutation } from './_generated/server';

const images = [
    '/placeholders/placeholder-1.svg',
    '/placeholders/placeholder-2.svg',
    '/placeholders/placeholder-3.svg',
    '/placeholders/placeholder-4.svg',
    '/placeholders/placeholder-5.svg',
    '/placeholders/placeholder-6.svg',
    '/placeholders/placeholder-7.svg',
]

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized")
        }

        const randomImage = images[Math.floor(Math.random() * images.length)];
        const board = await ctx.db.insert("board", {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage
        })
        return board
    }
})

export const remove = mutation({
    args: { id: v.id("board") },
    handler: async (convexToJson, args) => {
        const identity = await convexToJson.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorizaed");
        }
        //todo:later check to delete favorite realtion as well
        await convexToJson.db.delete(args.id)
    }
})

export const update = mutation({
    args: { id: v.id("board"), title: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("未登录")
        }

        const title = args.title.trim();
        if (!title) {
            throw new Error("标题为必填项")
        }
        if (title.length > 60) {
            throw new Error("标题不能大于60字")
        }

        const board = await ctx.db.patch(args.id, {
            title: args.title
        })
        return board;
    }
})
