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

// should we merge Maps too?
// eslint-disable-next-line @typescript-eslint/ban-types
const isObject = (obj: any): obj is object => obj && typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Object]';

export const mergeDefaults = <T>(target: T, source: PartialFields<T>): void => {
  Object
    .entries(removeUndefinedFields(source))
    .forEach((sourceEntry) => {
      const key = sourceEntry[0] as keyof T;

      const targetValue = target[key] as T[keyof T];
      const sourceValue = sourceEntry[1] as T[keyof T];

      if (typeof sourceValue === 'function') {
        return;
      }

      if (isObject(targetValue) && isObject(sourceValue)) {
        mergeDefaults(targetValue, sourceValue);
      } else {
        Object.assign(target, { [key]: sourceValue });
      }
    });
};