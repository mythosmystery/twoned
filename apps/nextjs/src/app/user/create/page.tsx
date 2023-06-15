import { CenterLayout } from '@/layouts/center'
import Link from 'next/link'
import { RingLoader } from 'react-spinners'
import { CreateUser } from '@/components/headless/create-user'

const CreateUserPage = () => {
  return (
    <CenterLayout>
      <h1 className="text-4xl font-thin">Creating your account...</h1>
      <RingLoader size={150} className="my-32" />
      <span>
        You should be automatically redirected, if not{' '}
        <Link className="text-purple-700 hover:text-blue-600" href="/">
          Click here
        </Link>
      </span>
      <CreateUser />
    </CenterLayout>
  )
}

export default CreateUserPage
