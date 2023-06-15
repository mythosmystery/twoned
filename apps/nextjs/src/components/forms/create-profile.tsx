'use client'

import { useAtom } from 'jotai'
import { profileCreateAtom, ProfileCreateState } from '@/state'
import { SelectAlbumCard } from '../cards/select-album'
import { useEffect } from 'react'
import { trpc } from '../../utils/trpc'

type Props = {
  tracks: {
    artUrl: string
    name: string
    artist: string
    album: string
    id: string
  }[]
  dehydratedState: ProfileCreateState | null
}

export const CreateProfileForm = ({ tracks, dehydratedState }: Props) => {
  const [profileCreate, setProfile] = useAtom(profileCreateAtom)
  const { mutate } = trpc.user.saveProfileState.useMutation()

  if (typeof window !== 'undefined') {
    window.onbeforeunload = () => {
      if (profileCreate) mutate(profileCreate)
    }
  }

  const handleClick = (id: string) => {
    setProfile((p) => {
      if (!p?.songs) return { ...p, songs: [id] }
      if (p.songs.includes(id))
        return { ...p, songs: p.songs.filter((i) => i !== id) }
      return { ...p, songs: [...p.songs, id] }
    })
  }

  if (!tracks) return null
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-thin">Create your profile</h1>
      <div className="my-10 flex w-1/2 flex-col items-center gap-4">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={profileCreate?.name || dehydratedState?.name || ''}
          onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
          className="w-full appearance-none border-b border-blue-500 py-2 px-3 leading-tight text-gray-700 focus:outline-none"
        />
        <textarea
          className="w-full resize-none appearance-none border-b border-blue-500 py-2 px-3 leading-tight text-gray-700 focus:outline-none"
          placeholder="Bio"
          value={profileCreate?.bio || dehydratedState?.bio || ''}
          onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
          name="bio"
        />
      </div>
      <h4 className="mb-4 text-xl font-thin">Select your favorite tracks</h4>
      <div className="flex gap-6">
        {tracks.map((item) => (
          <SelectAlbumCard
            key={item.id}
            selected={
              !!(profileCreate
                ? profileCreate?.songs?.find((s) => s === item.id)
                : dehydratedState?.songs?.find((s) => s === item.id))
            }
            onClick={(id) => handleClick(id)}
            {...item}
          />
        ))}
      </div>
    </div>
  )
}
