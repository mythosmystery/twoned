import { router, protectedProcedure } from '../trpc'
import { z } from 'zod'

export const userRouter = router({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const clerkId = ctx.auth.userId
    const user = await ctx.prisma.user.findUnique({ where: { clerkId } })
    if (user) return user
    return await ctx.prisma.user.create({ data: { clerkId } })
  }),
})
