import type { RouterInputs } from '../utils/trpc'

export type ProfileCreateState = Partial<RouterInputs['profile']['create']>

import { atomWithStorage } from 'jotai/utils'
export const profileCreateAtom = atomWithStorage<ProfileCreateState | null>(
  'profileCreate',
  null,
)
