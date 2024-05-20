import payload from 'payload'

type FetchedCountry = {
  flags: {
    png: string
    svg: string
    alt: string
  }
  name: {
    common: string
    official: string
  }
  cca2: string
}

export const createCountries = async () => {
  try {
    const countries = (
      (await (
        await fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca2')
      ).json()) as FetchedCountry[]
    ).filter(({ cca2 }) => cca2.toLowerCase() !== 'ru')

    const createdCountries = await Promise.all(
      countries.map(({ name, cca2, flags }) =>
        payload.create({
          collection: 'countries',
          data: {
            slug: cca2.toLowerCase(),
            label: name.common,
            flag: {
              ...flags,
            },
          },
        }),
      ),
    )

    payload.logger.info('> Created countries')

    return createdCountries
  } catch (err) {
    return []
  }
}

export type Countries = Awaited<ReturnType<typeof createCountries>>
