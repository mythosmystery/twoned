import type { RouterInputs } from '../utils/trpc'

export type ProfileCreateState = Partial<RouterInputs['user']['profileCreate']>

import { atomWithStorage } from 'jotai/utils'
export const profileCreateAtom = atomWithStorage<ProfileCreateState | null>(
  'profileCreate',
  null,
)
