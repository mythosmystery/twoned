import { router, protectedProcedure } from '../trpc'
import { z } from 'zod'

export const userRouter = router({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const clerkId = ctx.auth.userId
    const user = await ctx.prisma.user.findUnique({ where: { clerkId } })
    if (user) return user
    return await ctx.prisma.user.create({ data: { clerkId } })
  }),

  getMe: protectedProcedure.query(async ({ ctx }) => {
    const clerkId = ctx.auth.userId
    const user = await ctx.prisma.user.findUnique({
      where: { clerkId },
      include: { profile: { include: { favoriteSongs: true, images: true } } },
    })
    if (!user) throw new Error('User not found')
    if (!user.profile) throw new Error('Profile not found')
    return user
  }),
})
