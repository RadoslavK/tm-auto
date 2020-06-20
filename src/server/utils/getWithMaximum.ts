const getWithMaximumInternal = <T>(
  values: readonly T[],
  getMaximum: (value: T) => number,
): T => {
  let [foundMaximum] = values;
  let maximum = getMaximum(foundMaximum);

  values.forEach((value) => {
    const currentMaximum = getMaximum(value);

    if (currentMaximum <= maximum) {
      return;
    }

    maximum = currentMaximum;
    foundMaximum = value;
  });

  return foundMaximum;
};

export const getWithMaximumSafe = <T>(
  values: readonly T[],
  getMaximum: (value: T) => number,
): T => {
  if (!values.length) {
    throw new Error('Empty collection provided');
  }

  return getWithMaximumInternal(values, getMaximum);
};

export const getMaximumSafe = (values: readonly number[]): number =>
  getWithMaximumSafe(values, (value) => value);

export const getWithMaximum = <T>(
  values: readonly T[],
  getMaximum: (value: T) => number,
): T | undefined => {
  if (!values.length) {
    return;
  }

  return getWithMaximumInternal(values, getMaximum);
};

export const getMaximum = (values: readonly number[]): number | undefined =>
  getWithMaximum(values, (value) => value);

const getWithMinimumInternal = <T>(
  values: readonly T[],
  getMinimum: (value: T) => number,
): T => {
  let [foundMinimum] = values;
  let minimum = getMinimum(foundMinimum);

  values.forEach((value) => {
    const currentMinimum = getMinimum(value);

    if (currentMinimum >= minimum) {
      return;
    }

    minimum = currentMinimum;
    foundMinimum = value;
  });

  return foundMinimum;
};

export const getWithMinimum = <T>(
  values: readonly T[],
  getMinimum: (value: T) => number,
): T | null => {
  if (!values.length) {
    return null;
  }

  return getWithMinimumInternal(values, getMinimum);
};

export const getWithMinimumSafe = <T>(
  values: readonly T[],
  getMinimum: (value: T) => number,
): T => {
  if (!values.length) {
    throw new Error('Empty collection provided');
  }

  return getWithMinimumInternal(values, getMinimum);
};
