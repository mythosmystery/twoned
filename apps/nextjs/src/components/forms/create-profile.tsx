'use client'

import { useAtom } from 'jotai'
import { profileCreateAtom } from '@/state'
import { SelectAlbumCard } from '../cards/select-album'
import { useEffect, useState } from 'react'
import { Loader } from '../loader'
import { RouterInputs, trpc } from '../../utils/trpc'
import { Stepper } from '../stepper'
import { UploadDropzone } from '@uploadthing/react'
import { ImageRouter } from '../../app/api/uploadthing/core'
import '@uploadthing/react/styles.css'
import { ImageCard } from '../cards/image-card'
import { ProfilePreview } from '../cards/profile-preview'
import { useRouter } from 'next/navigation'

type Props = {
  tracks: RouterInputs['profile']['create']['favoriteSongs']
}

export const CreateProfileForm = ({ tracks }: Props) => {
  const [profileCreate, setProfile] = useAtom(profileCreateAtom)
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const { mutateAsync } = trpc.profile.create.useMutation({
    onError: (err) => {
      console.log('err', err)
    },
  })

  useEffect(() => {
    if (profileCreate || tracks) setLoading(false)
  }, [profileCreate, tracks])

  const onFinish = async () => {
    await mutateAsync(profileCreate as any)
    router.push('/feed')
  }

  if (!tracks) throw new Error('No tracks found')
  if (loading) return <Loader />
  return (
    <div className="flex w-full flex-col items-center">
      <Stepper steps={3} onFinish={onFinish}>
        <div className="mb-20 flex w-full flex-col items-center gap-4 md:w-2/3 lg:w-1/2">
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
            className="w-full appearance-none rounded-2xl bg-blue-200 py-4 px-5 text-lg leading-tight text-black focus:outline-none"
          />
          <input
            type="number"
            placeholder="Age"
            name="age"
            value={profileCreate?.age || ''}
            onChange={(e) =>
              setProfile((p) => ({ ...p, age: +e.target.value }))
            }
            className="w-full appearance-none rounded-2xl bg-blue-200 py-4 px-5 text-lg leading-tight text-black focus:outline-none"
          />

          <textarea
            className="w-full resize-none appearance-none rounded-2xl bg-blue-200 py-4 px-5 text-lg leading-tight text-black focus:outline-none"
            placeholder="Bio"
            value={profileCreate?.bio || ''}
            onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
            name="bio"
          />

          <input
            type="text"
            placeholder="Location"
            name="location"
            value={profileCreate?.location || ''}
            onChange={(e) =>
              setProfile((p) => ({ ...p, location: e.target.value }))
            }
            className="w-full appearance-none rounded-2xl bg-blue-200 py-4 px-5 text-lg leading-tight text-black focus:outline-none"
          />
        </div>
        <div className="mb-12">
          <h4 className="mb-12 text-center text-3xl font-thin text-white">
            Select your favorite tracks
          </h4>
          <div className="grid gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {tracks.map((item) => (
              <SelectAlbumCard key={item.id} {...item} />
            ))}
          </div>
        </div>
        <div className="mb-4 flex w-full flex-col items-center gap-4 md:w-2/3 lg:w-1/2">
          <h1 className="mb-6 text-3xl font-thin text-white">
            Add some photos
          </h1>
          <div className="flex w-full justify-center gap-4 px-4">
            {profileCreate?.images?.map((image, i) => (
              <ImageCard key={i} image={image} />
            ))}
          </div>
          <UploadDropzone<ImageRouter>
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res) {
                setProfile((p) => ({
                  ...p,
                  images: [...(p?.images || []), ...res.map((r) => r.fileUrl)],
                }))
              }
            }}
          />
        </div>
      </Stepper>
    </div>
  )
}
