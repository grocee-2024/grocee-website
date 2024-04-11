import { Input } from 'ui'
import { action } from './actions'
import { CustomSelect } from './CustomSelect'

export default function Home() {
  return (
    <form action={action}>
      <Input
        type='text'
        name='some-name'
        ariaLabel='input'
        leadingComplex={{ start: 'Search', end: <CustomSelect /> }}
      />
      <select name='some-name2' defaultValue='value1'>
        <option value='value1'>val1</option>
        <option value='value2'>val2</option>
      </select>
      <button type='submit'>Click</button>
    </form>
  )
}
