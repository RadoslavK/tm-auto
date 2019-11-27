const removeUndefinedFields = <T extends object>(obj: T): Partial<T> => {
  return Object
    .entries(obj)
    .filter(([, value]) => value !== undefined)
    .reduce((newObj, [key, value]) => ({
      ...newObj,
      [key]: value,
    }), {}) as Partial<T>;
};

type CustomPartial<T> = {
  [TKey in keyof T]?: T[TKey];
}

export const merge = <T extends object>(defaultValues: T, values: CustomPartial<T>): T => ({
  ...defaultValues,
  ...removeUndefinedFields(values),
});
