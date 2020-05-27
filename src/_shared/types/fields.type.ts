// eslint-disable-next-line @typescript-eslint/ban-types
import { DeepPartial } from '../merge';

// eslint-disable-next-line @typescript-eslint/ban-types
type FunctionPropertyKeys<T> = { [P in keyof T]: T[P] extends Function ? P : never }[keyof T];

// eslint-disable-next-line @typescript-eslint/ban-types
type InnerFields<T> = Readonly<Omit<T, FunctionPropertyKeys<T>>>;

// eslint-disable-next-line @typescript-eslint/ban-types
type InnerDeepFields<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]: T[P] extends object ? InnerDeepFields<InnerFields<T[P]>> : T[P];
};

export type Fields<T> = InnerDeepFields<InnerFields<T>>;
export type PartialFields<T> = DeepPartial<Fields<T>>;