import { GlobalTypography } from 'cms-types'
import { create } from 'zustand'

export const useGlobalTypography = create<Omit<GlobalTypography, 'id' | 'createdAt' | 'updatedAt'>>(
  () => ({}),
)
