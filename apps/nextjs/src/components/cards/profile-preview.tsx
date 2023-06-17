'use client'

import { useAtom } from 'jotai'
import { profileCreateAtom } from '@/state'

export const ProfilePreview = () => {
  const [profileCreate] = useAtom(profileCreateAtom)

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full flex-col items-center gap-4">
        <p>{profileCreate?.name}</p>
        <p>{profileCreate?.age}</p>
        <p>{profileCreate?.bio}</p>
        <p>{profileCreate?.location}</p>
      </div>
    </div>
  )
}
