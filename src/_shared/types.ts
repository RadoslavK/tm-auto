export type Boxed<T> = {
  [P in keyof T]: T[P];
}

export interface IComparable<T> {
  readonly isGreaterOrEqualThan: (other: T) => boolean;
  readonly isLowerThan: (other: T) => boolean;
}

type FunctionPropertyKeys<T> = { [P in keyof T]: T[P] extends Function ? P : never }[keyof T];

export type Fields<T> = Readonly<Omit<T, FunctionPropertyKeys<T>>>;