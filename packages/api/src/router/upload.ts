import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import { utapi } from 'uploadthing/server'

export const uploadRouter = router({
  delete: protectedProcedure
    .input(z.object({ fileKey: z.string() }))
    .mutation(async ({ input }) => {
      const { success } = await utapi.deleteFiles(input.fileKey)
      return success
    }),
})
