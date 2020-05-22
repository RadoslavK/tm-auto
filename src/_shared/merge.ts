// eslint-disable-next-line @typescript-eslint/ban-types
const removeUndefinedFields = <T extends object>(obj: T): Partial<T> => Object
  .entries(obj)
  .filter(([, value]) => value !== undefined)
  .reduce((newObj, [key, value]) => ({
    ...newObj,
    [key]: value,
  }), {}) as Partial<T>;

type CustomPartial<T> = {
  [TKey in keyof T]?: T[TKey];
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const merge = <T extends object>(getDefaultValues: () => T, values: CustomPartial<T>): T => ({
  ...getDefaultValues(),
  ...removeUndefinedFields(values),
});
