type FunctionPropertyKeys<T> = {
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];

type InnerFields<T> = Readonly<Omit<T, FunctionPropertyKeys<T>>>;

export type InnerDeepFields<T> = {
  [P in keyof T]: T[P] extends object
    ? InnerDeepFields<InnerFields<T[P]>>
    : T[P];
};

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
export type Fields<T> = InnerDeepFields<InnerFields<T>>;
export type PartialFields<T> = DeepPartial<Fields<T>>;

// Something extends infer I ? RecursiveType<I> : never is a hack to defer recursion to prevent type instantiation exceeding some limit
// https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437