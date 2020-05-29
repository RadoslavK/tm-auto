import { PartialFields } from './types/fields.type';

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

const removeUndefinedFields = <T>(obj: T): Partial<T> => Object
  .entries(obj)
  .filter(([, value]) => value !== undefined)
  .reduce((newObj, [key, value]) => ({
    ...newObj,
    [key]: value,
  }), {}) as Partial<T>;

// also ignore dates because there is nothing to merge
// eslint-disable-next-line @typescript-eslint/ban-types
const isObject = (obj: any): obj is object => obj && typeof obj === 'object' && !(obj instanceof Date);

export const mergeDefaults = <T>(target: T, source: PartialFields<T>): T => {
  Object.entries(removeUndefinedFields(source)).forEach((sourceEntry) => {
    const key = sourceEntry[0] as keyof T;

    const targetValue = target[key] as T[keyof T];
    const sourceValue = sourceEntry[1] as T[keyof T];

    // TODO compute updated object first and use Objec.assign
    if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeDefaults(Object.create(targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });

  return target;
};