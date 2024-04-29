import payload from 'payload'

export const createGlobalTypography = async () => {
  await payload.updateGlobal({
    slug: 'globalTypography',
    data: {
      orderDeliveryForm: {
        firstName: {
          label: 'Enter your first name',
          placeholder: 'John',
        },
        lastName: {
          label: 'Enter your last name',
          placeholder: 'Doe',
        },
        phoneNumber: {
          label: 'Enter your phone number',
          placeholder: '000-000-000',
        },
        shippingAddress: {
          label: 'Enter your shipping address',
          placeholder: 'Main street, City',
        },
        date: {
          label: 'Choose a date',
          placeholder: '24/08/2024',
        },
        time: {
          label: 'Choose a time',
          placeholder: '00:00',
        },
      },
    },
  })

  payload.logger.info('> Created global typography')
}
