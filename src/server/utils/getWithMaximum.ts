export const getWithMaximum = <T>(values: readonly T[], getMaximum: (value: T) => number): T => {
  let maximum = Number.MIN_VALUE;
  let foundMaximum: T = null as any;

  values.forEach(value => {
    const currentMaximum = getMaximum(value);

    if (currentMaximum <= maximum) {
      return;
    }

    maximum = currentMaximum;
    foundMaximum = value;
  });

  return foundMaximum;
};

export const getWithMinimum = <T>(values: readonly T[], getMinimum: (value: T) => number): T => {
  let minimum = Number.MAX_VALUE;
  let foundMinimum: T = null as any;

  values.forEach(value => {
    const currentMinimum = getMinimum(value);

    if (currentMinimum >= minimum) {
      return;
    }

    minimum = currentMinimum;
    foundMinimum = value;
  });

  return foundMinimum;
};
