import { FC } from 'react'

type Props = {
  query: string
}

export const SearchPage: FC<Props> = ({ query }) => {
  return <div>SearchPage: {query}</div>
}
