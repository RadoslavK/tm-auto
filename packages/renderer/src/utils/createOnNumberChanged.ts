import type {
  EventHandler,
  FormEvent, 
} from 'react';

type Params = {
  readonly callback: (name: string, value: number) => void;
  readonly maxValue?: number;
  readonly minValue?: number;
};

export const createOnNumberChanged = (
  params: Params,
): EventHandler<any> => {
  const { callback, maxValue, minValue } = params;

  return (e: FormEvent<HTMLInputElement>): void => {
    const { name } = e.currentTarget;
    const value = +e.currentTarget.value;

    if (
      (minValue !== undefined && value < minValue) ||
      (maxValue !== undefined && value > maxValue)
    ) {
      return;
    }

    callback(name, value);
  };
};
