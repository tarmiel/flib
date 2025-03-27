import { ReactNode } from 'react';

type ComponentWithValueProps<T> = {
  value: T;
};

type MatchProps<T extends string | number | symbol> = Record<T, () => ReactNode> &
  ComponentWithValueProps<T>;

export function Match<T extends string | number | symbol>(props: MatchProps<T>) {
  const render = props[props.value];

  return <>{render()}</>;
}
