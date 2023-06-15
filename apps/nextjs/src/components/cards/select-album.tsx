'use client'

import { useAtom } from 'jotai'
import Image from 'next/image'
import { profileCreateAtom } from '@/state'
import { RouterInputs } from '@/utils/trpc'

type Props = RouterInputs['user']['profileCreate']['songs'][0]

export const SelectAlbumCard = ({
  artUrl,
  album,
  artist,
  title,
  id,
}: Props) => {
  const [profileCreate, setProfile] = useAtom(profileCreateAtom)

  const handleClick = () => {
    const song = { artUrl, album, artist, title, id }
    if (!song) return

    setProfile((p) => {
      if (!p?.songs) return { ...p, songs: [song] }
      if (p.songs.find((i) => i.id === id))
        return { ...p, songs: p.songs.filter((i) => i.id !== id) }
      return { ...p, songs: [...p.songs, song] }
    })
  }

  return (
    <div
      onClick={handleClick}
      className={
        'flex cursor-pointer flex-col items-center p-2 ' +
        (!!profileCreate?.songs?.find((s) => s.id === id)
          ? 'rounded-md border-2 border-blue-700'
          : 'border-2 border-transparent')
      }
    >
      <Image src={artUrl} width={200} height={200} alt="Album image" />
      <p className="text-lg">{title}</p>
      <p className="text-sm">{artist}</p>
    </div>
  )
}
