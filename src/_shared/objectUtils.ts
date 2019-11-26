export const mapRecord = <TKey extends keyof any, TValue, TNewValue>(record: Record<TKey, TValue>, mapper: (value: TValue) => TNewValue): Record<TKey, TNewValue> => {
  return Object
    .entries(record)
    .reduce((reduced, [key, value]) => {
      return {
        ...reduced,
        [key]: mapper(value as TValue),
      };
    }, {}) as any as Record<TKey, TNewValue>;
};