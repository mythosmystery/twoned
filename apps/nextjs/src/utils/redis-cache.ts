'use server'

import { Redis } from '@upstash/redis'
import { env } from '@/env/server.mjs'
import { cache } from 'react'

export const getClient = async () => {
  const redis = new Redis({
    url: env.REDIS_URL,
    token: env.REDIS_TOKEN,
  })
  return redis
}

export const setValue = async <T>(key: string, value: T) => {
  const client = await getClient()
  const result = await client.set(key, value)
  return result
}

export const getValue = cache(async <T>(key: string) => {
  const client = await getClient()
  const result = await client.get<T>(key)
  return result
})

export const parsedGetValue = cache(
  async (key: string, validator: Zod.Schema) => {
    const client = await getClient()
    const result = await client.get(key)
    return validator.parse(result)
  },
)

export const redisCached = cache(
  async <T>(key: string, fn: () => Promise<T>) => {
    const cached = await getValue<T>(key)
    if (cached) return cached
    const result = await fn()
    await setValue(key, result)
    return result
  },
)
