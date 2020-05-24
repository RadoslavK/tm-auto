export const areShallowEqual = <T>(newObj: T, prevObj: T): boolean => {
  const newObjKeys = Object.keys(newObj);
  const prevObjKeys = Object.keys(prevObj);
  const mergedKeys = new Set(newObjKeys.concat(prevObjKeys));

  if (mergedKeys.size !== newObjKeys.length) {
    return false;
  }

  return newObjKeys.every((key) => newObj[key as keyof T] === prevObj[key as keyof T]);
};