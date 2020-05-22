export const mapRecord = <TKey extends keyof any, TValue, TNewValue>(record: Record<TKey, TValue>, mapper: (value: TValue) => TNewValue): Record<TKey, TNewValue> => Object
  .entries(record)
  .reduce((reduced, [key, value]) => ({
    ...reduced,
    [key]: mapper(value as TValue),
  }), {}) as any as Record<TKey, TNewValue>;