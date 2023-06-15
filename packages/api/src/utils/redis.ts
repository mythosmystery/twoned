import { Redis } from '@upstash/redis'

export const getClient = async () => {
  const redis = new Redis({
    url: process.env.REDIS_URL!,
    token: process.env.REDIS_TOKEN!,
  })
  return redis
}
