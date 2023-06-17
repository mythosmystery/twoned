'use client'

import { useAtom } from 'jotai'
import Image from 'next/image'
import { useState } from 'react'
import { profileCreateAtom } from '@/state'
import { trpc } from '@/utils/trpc'

export const ImageCard = ({ image }: { image: string }) => {
  const [selected, setSelected] = useState(false)
  const [, setProfileCreate] = useAtom(profileCreateAtom)
  const { mutate } = trpc.upload.delete.useMutation()

  const handleDelete = () => {
    mutate({ fileKey: image.split('/').pop() || '' })
    setProfileCreate((p) => ({
      ...p,
      images: p?.images?.filter((i) => i !== image),
    }))
  }

  return (
    <div
      className={
        'relative flex flex-col items-center justify-center rounded-2xl p-3 ' +
        (selected ? 'bg-blue-400/40' : '')
      }
      onClick={() => setSelected((s) => !s)}
    >
      <Image src={image} alt={`profile image`} width={200} height={200} />
      {selected && (
        <button
          className="relative mt-2 rounded-full bg-red-500 p-2 text-white"
          onClick={handleDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  )
}
