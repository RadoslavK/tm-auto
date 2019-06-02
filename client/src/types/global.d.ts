declare type LeftOverProps<TAllProps, TInjectedProps> = Pick<TAllProps, Exclude<keyof TAllProps, keyof TInjectedProps>>;
