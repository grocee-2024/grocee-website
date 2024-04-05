import { Input, Button } from 'ui'

export default function Home() {
  return (
    <Input
      type='text'
      label='Label'
      leadingComplex={{ startIcon: 'Search', end: { icon: 'ChevronDown', text: 'Text' } }}
      trailingComplex={{ end: { icon: 'ChevronDown', text: 'Text' } }}
    />
  )
}
