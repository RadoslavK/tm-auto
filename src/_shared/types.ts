export type Boxed<T> = {
  [P in keyof T]: T[P];
}

export interface IComparable<T> {
  readonly isGreaterOrEqualThan: (other: T) => boolean;
  readonly isLowerThan: (other: T) => boolean;
}