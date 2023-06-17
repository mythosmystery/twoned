'use client'

import { useAtom } from 'jotai'
import Image from 'next/image'
import { profileCreateAtom } from '@/state'
import { RouterInputs } from '@/utils/trpc'

type Props = RouterInputs['user']['profileCreate']['favoriteSongs'][0]

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
      if (!p?.favoriteSongs) return { ...p, favoriteSongs: [song] }
      if (p.favoriteSongs.find((i) => i.id === id))
        return {
          ...p,
          favoriteSongs: p.favoriteSongs.filter((i) => i.id !== id),
        }
      return { ...p, favoriteSongs: [...p.favoriteSongs, song] }
    })
  }

  return (
    <div
      onClick={handleClick}
      className={
        'flex cursor-pointer flex-col items-center p-4 ' +
        (!!profileCreate?.favoriteSongs?.find((s) => s.id === id)
          ? 'rounded-xl bg-blue-300/30'
          : '')
      }
    >
      <Image src={artUrl} width={200} height={200} alt="Album image" />
      <p className="text-lg">{title}</p>
      <p className="text-sm">{artist}</p>
    </div>
  )
}
