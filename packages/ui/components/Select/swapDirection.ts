import { SelectProps } from '.'

type AnimationOrigin<T> = NonNullable<SelectProps<T>['animationOrigin']>

export function swapDirection<T>(
  direction: AnimationOrigin<T>,
  replaceFrom: AnimationOrigin<T>,
  replaceTo: AnimationOrigin<T>,
): NonNullable<SelectProps<T>['animationOrigin']> {
  return direction.replace(replaceFrom, replaceTo) as NonNullable<SelectProps<T>['animationOrigin']>
}
