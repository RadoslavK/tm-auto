declare module 'ini' {
  export const parse: <T = unknown>(content: string) => T;
}