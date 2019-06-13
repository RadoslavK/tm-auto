export const getWithMaximum = <T>(values: readonly T[], getMaximum: (value: T) => number) => {
  let maximum = Number.MIN_VALUE;
  let foundMaximum: T;

  for (let i = 0; i < values.length; i++)
  {
    const value = values[i];
    const currentMaximum = getMaximum(value);

    if (currentMaximum <= maximum) {
      continue;
    }

    maximum = currentMaximum;
    foundMaximum = value;
  }

  return foundMaximum;
};

export const getWithMinimum = <T>(values: readonly T[], getMinimum: (value: T) => number) => {
  let minimum = Number.MAX_VALUE;
  let foundMinimum: T;

  for (let i = 0; i < values.length; i++)
  {
    const value = values[i];
    const currentMinimum = getMinimum(value);

    if (currentMinimum >= minimum) {
      continue;
    }

    minimum = currentMinimum;
    foundMinimum = value;
  }

  return foundMinimum;
};
