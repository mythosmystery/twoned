'use client'

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { trpc } from '@/utils/trpc'

export const CreateUser = () => {
  const { userId } = useAuth()
  const router = useRouter()
  const { mutate, isSuccess } = trpc.user.create.useMutation()

  useEffect(() => {
    if (userId) {
      mutate()
    }
  }, [userId, mutate])

  useEffect(() => {
    if (isSuccess) {
      router.push('/')
    }
  }, [isSuccess, router])
  return null
}
