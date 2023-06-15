import { prisma } from '@tnd/db'
import { type inferAsyncReturnType } from '@trpc/server'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { getAuth } from '@clerk/nextjs/server'
import type { SignedInAuthObject, SignedOutAuthObject } from '@clerk/nextjs/api'
import { getClient } from './utils/redis'
import { Redis } from '@upstash/redis'

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type AuthContextProps = {
  auth: SignedInAuthObject | SignedOutAuthObject
  redis: Redis
}

/** Use this helper for:
 *  - testing, where we dont have to Mock Next.js' req/res
 *  - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://beta.create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
export const createContextInner = async ({ auth, redis }: AuthContextProps) => {
  return {
    auth,
    prisma,
    redis,
  }
}

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const redis = await getClient()
  return await createContextInner({ auth: getAuth(opts.req), redis })
}

export type Context = inferAsyncReturnType<typeof createContext>
