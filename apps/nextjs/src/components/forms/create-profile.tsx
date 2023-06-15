'use client'

import { useAtom } from 'jotai'
import { profileCreateAtom } from '@/state'
import { SelectAlbumCard } from '../cards/select-album'
import { useEffect, useState } from 'react'
import { Loader } from '../loader'
import { RouterInputs } from '../../utils/trpc'
import { Stepper } from '../stepper'

type Props = {
  tracks: RouterInputs['user']['profileCreate']['songs']
}

export const CreateProfileForm = ({ tracks }: Props) => {
  const [profileCreate, setProfile] = useAtom(profileCreateAtom)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (profileCreate) setLoading(false)
  }, [profileCreate])

  if (!tracks) throw new Error('No tracks found')
  if (loading) return <Loader />
  return (
    <div className="flex w-full flex-col items-center">
      <Stepper steps={2}>
        <div className="my-10 flex w-full flex-col items-center gap-4 md:w-2/3 lg:w-1/2">
          <h1 className="mb-10 text-3xl font-thin text-white">
            Create your profile
          </h1>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={profileCreate?.name || ''}
            onChange={(e) =>
              setProfile((p) => ({ ...p, name: e.target.value }))
            }
            className="w-full appearance-none border-b border-blue-200 bg-inherit py-2 px-3 text-lg leading-tight text-gray-200 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Age"
            name="age"
            value={profileCreate?.age || ''}
            onChange={(e) =>
              setProfile((p) => ({ ...p, age: +e.target.value }))
            }
            className="w-full appearance-none border-b border-blue-200 bg-inherit py-2 px-3 text-lg leading-tight text-gray-200 focus:outline-none"
          />

          <textarea
            className="w-full appearance-none border-b border-blue-200 bg-inherit py-2 px-3 text-lg leading-tight text-gray-200 focus:outline-none"
            placeholder="Bio"
            value={profileCreate?.bio || ''}
            onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
            name="bio"
          />
        </div>
        <div>
          <h4 className="mb-12 text-center text-3xl font-thin text-white">
            Select your favorite tracks
          </h4>
          <div className="grid gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {tracks.map((item) => (
              <SelectAlbumCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </Stepper>
    </div>
  )
}
