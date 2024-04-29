import { GlobalTypography } from 'cms-types'
import { create } from 'zustand'

export const useGlobalTypography = create<Omit<GlobalTypography, 'id' | 'createdAt' | 'updatedAt'>>(
  () => ({
    orderDeliveryForm: {
      firstName: {
        label: '',
        placeholder: '',
      },
      lastName: {
        label: '',
        placeholder: '',
      },
      phoneNumber: {
        label: '',
        placeholder: '',
      },
      shippingAddress: {
        label: '',
        placeholder: '',
      },
      date: {
        label: '',
        placeholder: '',
      },
      time: {
        label: '',
        placeholder: '',
      },
    },
  }),
)
