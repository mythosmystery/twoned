import { router } from '../trpc'
import { authRouter } from './auth'
import { userRouter } from './user'
import { profileRouter } from './profile'
import { uploadRouter } from './upload'

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  profile: profileRouter,
  upload: uploadRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
