// Enum keys can not be numeric
const filterStringKeys = (key: number | string): Boolean => isNaN(+key);

export const getAllEnumValues = <T>(enumObject: T): ReadonlyArray<T[keyof T]> => {
  const keys = Object.keys(enumObject).filter(filterStringKeys);

  return keys.map(key => enumObject[key]);
};
