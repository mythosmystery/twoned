import type { RouterInputs } from '../utils/trpc'

type ProfileCreate = Partial<RouterInputs['user']['profileCreate']>

import { atomWithStorage } from 'jotai/utils'
export const profileCreateAtom = atomWithStorage<ProfileCreate | null>(
  'profileCreate',
  null,
)
