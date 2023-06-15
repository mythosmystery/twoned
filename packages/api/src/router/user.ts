import { router, protectedProcedure } from '../trpc'
import { z } from 'zod'

export const userRouter = router({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const clerkId = ctx.auth.userId
    const user = await ctx.prisma.user.findUnique({ where: { clerkId } })
    if (user) return user
    return await ctx.prisma.user.create({ data: { clerkId } })
  }),

  profileCreate: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        bio: z.string(),
        songs: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const clerkId = ctx.auth.userId
      const user = await ctx.prisma.user.findUnique({ where: { clerkId } })
      if (!user) throw new Error('User not found')
      return await ctx.prisma.user.update({
        where: { clerkId },
        data: { profile: { create: { bio: input.bio, name: input.name } } },
      })
    }),

  saveProfileState: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        bio: z.string().optional(),
        songs: z.array(z.string().optional()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.userId
      await ctx.redis.set(userId, input)
      return input
    }),
})
