'use client'

import type { NextPage, NextPageContext } from 'next'
import { HorizontalCenterLayout } from '@/layouts/horizontal-center'
import { BsFillCloudDrizzleFill } from 'react-icons/bs'
import { useEffect } from 'react'

const ErrorPage: NextPage<{ error: Error; reset: () => void }> = ({
  error,
}) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <HorizontalCenterLayout>
      <BsFillCloudDrizzleFill size={100} className="my-12 text-blue-300" />
      <h1 className="text-4xl font-thin text-white">Oopies!</h1>
      <h4 className="pt-2 text-white">Something went wrong</h4>
    </HorizontalCenterLayout>
  )
}

export default ErrorPage
