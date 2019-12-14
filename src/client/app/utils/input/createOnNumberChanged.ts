import React from 'react';

interface IParams {
  readonly callback: (name: string, value: number) => void;
  readonly maxValue?: number;
  readonly minValue?: number;
}

export const createOnNumberChanged = (params: IParams) => {
  const {
    callback,
    maxValue,
    minValue,
  } = params;

  return (e: React.FormEvent<HTMLInputElement>): void => {
    const { name } = e.currentTarget;
    const value = +e.currentTarget.value;

    if ((minValue !== undefined && value < minValue)
      || (maxValue !== undefined && value > maxValue)
    ) {
      return;
    }

    callback(name, value);
  };
};
