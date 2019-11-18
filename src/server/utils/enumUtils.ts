// Enum keys can not be numeric
const filterStringKeys = (key: number | string): boolean => Number.isNaN(+key);

export const getAllEnumValues = <TEnum>(enumObject: TEnum): ReadonlyArray<TEnum[keyof TEnum]> => {
  const keys = Object.keys(enumObject).filter(filterStringKeys);

  // @ts-ignore
  return keys.map(key => enumObject[key]);
};
