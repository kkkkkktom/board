import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

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
        const board = await ctx.db.insert("boards", {
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
    args: { id: v.id("boards") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorizaed");
        }
        //todo:later check to delete favorite realtion as well

        const userId = identity.subject;
        const existingFavorite = await ctx.db.query("userFavorites")
            .withIndex("by_user_board", (q) =>
                q
                    .eq("userId", userId)
                    .eq("boardId", args.id)
            )
            .unique();
        if (existingFavorite) {
            await ctx.db.delete(existingFavorite._id)
        }

        await ctx.db.delete(args.id)
    }
})

export const update = mutation({
    args: { id: v.id("boards"), title: v.string() },
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

export const favorite = mutation({
    args: { id: v.id("boards"), orgId: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("用户未登录")
        }
        const board = await ctx.db.get(args.id);
        if (!board) {
            throw new Error("Board not found")
        }
        const userId = identity.subject;
        const existingFavorite = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_board", (q) => q
                .eq("userId", userId)
                .eq("boardId", board._id)
            )
            .unique();

        if (existingFavorite) {
            throw new Error("该模版已经收藏")
        }
        await ctx.db.insert("userFavorites", {
            userId,
            boardId: board._id,
            orgId: args.orgId
        })

        return board;
    }
})


export const unfavorite = mutation({
    args: { id: v.id("boards"), orgId: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("用户未登录")
        }
        const board = await ctx.db.get(args.id);
        if (!board) {
            throw new Error("Board not found")
        }
        const userId = identity.subject;
        const existingFavorite = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_board", (q) => q
                .eq("userId", userId)
                .eq("boardId", board._id)
                //检查时都需要orgId
            )
            .unique();


        if (!existingFavorite) {
            throw new Error("没有找到收藏的模版")
        }
        await ctx.db.delete(existingFavorite._id)

        return board;
    }
})

export const get = query({
    args: { id: v.id("boards") },
    handler: async (ctx, args) => {
        const board = ctx.db.get(args.id)
        return board;
    }

})