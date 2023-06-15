import { CenterLayout } from '@/layouts/center'
import Link from 'next/link'
import { CreateUser } from '@/components/headless/create-user'
import { Loader } from '@/components/loader'

const CreateUserPage = () => {
  return (
    <CenterLayout>
      <Loader text="Creating your account..." />
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
