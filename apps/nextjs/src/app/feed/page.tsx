import { auth } from '@clerk/nextjs'
import { prisma } from '@/utils'
import { redirect } from 'next/navigation'

const FeedPage = async () => {
  const { userId } = auth()
  const user = await prisma.user.findUnique({
    where: { clerkId: userId! },
    include: { profile: { include: { favoriteSongs: true } } },
  })
  // const matches = await prisma.user.findMany({
  //   where: {
  //     profile: {
  //       favoriteSongs: {
  //         some: {
  //           spotifyId: {
  //             in: user?.profile?.favoriteSongs.map((song) => song.spotifyId),
  //           },
  //         },
  //       },
  //     },
  //   },
  // })
  const matches = await prisma.user.findMany({ take: 10 })
  if (!user) redirect('/user/create')
  if (!user.profile) redirect('/user/profile/create')

  console.log('user', user)

  return (
    <div>
      <h1>Welcome to feed!</h1>
    </div>
  )
}

export default FeedPage
