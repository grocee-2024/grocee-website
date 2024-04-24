import payload from 'payload'

export const createUsers = async () => {
  await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        email: 'oleksii.lavka.dev@gmail.com',
        password: process.env.PAYLOAD_SEED_ADMIN_PASSWORD,
        name: 'Oleksii',
        roles: ['admin'],
      },
    }),
    payload.create({
      collection: 'users',
      data: {
        email: 'customer@gmail.com',
        password: process.env.PAYLOAD_SEED_USER_PASSWORD,
        name: 'Customer',
        roles: ['customer'],
      },
    }),
  ])

  payload.logger.info('> Created users')
}
