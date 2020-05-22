// Enum keys can not be numeric
const filterStringKeys = (key: number | string): boolean => Number.isNaN(+key);

export const getAllEnumValues = <TEnum>(enumObject: TEnum): ReadonlyArray<TEnum[keyof TEnum]> => {
  const keys = Object.keys(enumObject).filter(x => filterStringKeys(x));

  return keys.map(key => enumObject[key as keyof TEnum]);
};
