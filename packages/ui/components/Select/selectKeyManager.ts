import { SelectOptionType } from './SelectOption'
import { Node as StatelyNode } from 'react-stately'

export function selectKeyManager<T>(option: SelectOptionType<T>, collectionItem?: StatelyNode<T>) {
  const create = () => `${option?.label}-${option?.value}`
  const compare = () => create() === collectionItem?.key

  return {
    create,
    compare,
  }
}
