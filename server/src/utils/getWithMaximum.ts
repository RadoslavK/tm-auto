export const getWithMaximum = <T>(values: T[], getMaximum: (value: T) => number) => {
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
