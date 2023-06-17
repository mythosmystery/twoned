import Link from 'next/link'
import { HorizontalCenterLayout } from '../layouts/horizontal-center'

const HomePage = () => {
  return (
    <HorizontalCenterLayout>
      <h1 className="my-12 text-6xl text-white">twoned</h1>
      <h4 className="my-2 text-2xl font-thin text-gray-100">
        make connections
      </h4>
      <h4 className="my-2 text-2xl font-thin text-gray-100">
        meet people who share your music taste
      </h4>
      <Link
        className="my-12 text-2xl text-yellow-200 hover:text-blue-300"
        href="/feed"
      >
        get started!
      </Link>
    </HorizontalCenterLayout>
  )
}

export default HomePage
