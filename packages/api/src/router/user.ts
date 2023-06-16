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
        age: z.number().min(18, 'You must be 18 or older to use this app'),
        favoriteSongs: z.array(
          z.object({
            title: z.string(),
            artist: z.string(),
            album: z.string(),
            id: z.string(),
            artUrl: z.string().url(),
          }),
        ),
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
})
