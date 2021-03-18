import { DeepPartial } from '../merge.js';

type FunctionPropertyKeys<T> = {
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];

type InnerFields<T> = Readonly<Omit<T, FunctionPropertyKeys<T>>>;

type InnerDeepFields<T> = {
  [P in keyof T]: T[P] extends object
    ? InnerDeepFields<InnerFields<T[P]>>
    : T[P];
};

export type Fields<T> = InnerDeepFields<InnerFields<T>>;
export type PartialFields<T> = DeepPartial<Fields<T>>;
