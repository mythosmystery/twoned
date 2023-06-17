import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'

export const profileCreateValidator = z.object({
  name: z.string(),
  bio: z.string(),
  age: z.number().min(18, 'You must be 18 or older to use this app'),
  location: z.string(),
  images: z.array(z.string().url()),
  favoriteSongs: z.array(
    z.object({
      title: z.string(),
      artist: z.string(),
      album: z.string(),
      id: z.string(),
      artUrl: z.string().url(),
    }),
  ),
})

export const profileRouter = router({
  create: protectedProcedure
    .input(profileCreateValidator)
    .mutation(async ({ ctx, input }) => {
      const clerkId = ctx.auth.userId
      const favoriteSongs = input.favoriteSongs.map(({ id, ...rest }) => ({
        ...rest,
        spotifyId: id,
      }))

      await ctx.prisma.song.createMany({
        data: favoriteSongs,
        skipDuplicates: true,
      })

      return await ctx.prisma.user.update({
        where: { clerkId },
        data: {
          profile: {
            create: {
              bio: input.bio,
              name: input.name,
              location: input.location,
              age: input.age,
              favoriteSongs: {
                connect: favoriteSongs.map(({ spotifyId }) => ({ spotifyId })),
              },
              images: {
                create: input.images.map((url) => ({ url })),
              },
            },
          },
        },
      })
    }),
})
