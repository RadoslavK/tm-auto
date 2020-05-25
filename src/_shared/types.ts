export type Boxed<T> = {
  [P in keyof T]: T[P];
};

export type Comparable<T> = {
  readonly isGreaterOrEqualThan: (other: T) => boolean;
  readonly isLowerThan: (other: T) => boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type FunctionPropertyKeys<T> = { [P in keyof T]: T[P] extends Function ? P : never }[keyof T];

export type Fields<T> = Readonly<Omit<T, FunctionPropertyKeys<T>>>;