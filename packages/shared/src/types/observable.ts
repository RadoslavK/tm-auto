export type Observer<T> = {
  readonly complete: () => void;
  readonly error: (error: Error) => void;
  readonly next: (result: T) => void;
};

export type Unsubscribable = {
  readonly unsubscribe: () => void;
}

export type Observable<T> = {
  readonly subscribe: (observer: Observer<T>) => Unsubscribable;
};