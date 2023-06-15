import { CreateProfileForm } from '@/components/forms/create-profile'
import { HorizontalCenterLayout } from '@/layouts/horizontal-center'
import { auth } from '@clerk/nextjs'
import { getSpotifyToken } from '@/utils/auth'

const ProfileCreatePage = async () => {
  const { userId } = auth()
  const token = await getSpotifyToken(userId!)

  const res = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=5', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 60,
    },
  })
  const { items } = (await res.json()) as SpotifyApi.UsersTopTracksResponse

  const trackItems = items.map((item) => ({
    artUrl: item.album.images[0]?.url || '',
    title: item.name,
    artist: item.artists[0]?.name || '',
    album: item.album.name,
    id: item.id,
  }))

  return (
    <HorizontalCenterLayout>
      <CreateProfileForm tracks={trackItems} />
    </HorizontalCenterLayout>
  )
}

export default ProfileCreatePage
