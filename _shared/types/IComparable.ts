export interface IComparable<T> {
  readonly isGreaterOrEqualThan: (other: T) => boolean;
  readonly isLowerThan: (other: T) => boolean;
}
