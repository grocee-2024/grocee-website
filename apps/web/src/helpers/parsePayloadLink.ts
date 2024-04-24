import { pageToUrl } from '@/cms/helpers'

type PayloadLink = {
  type?: 'reference' | 'custom' | null
  reference?: {
    relationTo: string
    value: any
  } | null
  url?: string | null
}

export const parsePayloadLink = (link?: PayloadLink) => {
  if (!link) {
    return ''
  }

  const url =
    link.type === 'custom' ? (link?.url as string) : (pageToUrl(link.reference?.value) as string)

  return url ?? ''
}
