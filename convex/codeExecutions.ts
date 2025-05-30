import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const saveExecution = mutation({
    args:{
        language: v.string(),
        output: v.optional(v.string()),
        error: v.optional(v.string()),
        code: v.string(),

    },
    handler: async (ctx, args) => {
        const identity=await ctx.auth.getUserIdentity();
        if(!identity){
            throw new ConvexError("You must be logged in to save code executions.");
        }
        const user=await ctx.db.query("users").withIndex("by_user_id")
        .filter(q => q.eq(q.field("userId"), identity.subject)).first();

        if(!user?.isPro ){
            throw new ConvexError("You must be a Pro user to save code executions.");
        }
        await ctx.db.insert("codeExecutions", {
            ...args,
            userId: identity.subject,
        });

    }
})