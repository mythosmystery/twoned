import Link from 'next/link'
import { HorizontalCenterLayout } from '../layouts/horizontal-center'

const HomePage = () => {
  return (
    <HorizontalCenterLayout>
      <h1 className="my-12 text-5xl font-thin text-blue-500">twoned</h1>
      <h4 className="my-2 text-2xl font-thin text-gray-500">
        make connections
      </h4>
      <h4 className="my-2 text-2xl font-thin text-gray-500">
        meet people who share your music taste
      </h4>
      <Link
        className="my-12 text-2xl text-purple-600 hover:text-blue-500"
        href="/feed"
      >
        get started!
      </Link>
    </HorizontalCenterLayout>
  )
}

export default HomePage
