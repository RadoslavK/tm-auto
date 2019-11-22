export type Boxed<T> = {
  [P in keyof T]: T[P];
}