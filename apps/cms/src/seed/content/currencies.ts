import payload from 'payload'

export const createCurrencies = async () => {
  const uah = await payload.create({
    collection: 'currencies',
    data: {
      label: 'uah',
      text: 'UAH',
    },
  })

  payload.logger.info('> Created currencies')

  return {
    uahId: uah.id,
  }
}

export type Currencies = Awaited<ReturnType<typeof createCurrencies>>
