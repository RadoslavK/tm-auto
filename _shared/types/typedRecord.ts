import { Record } from 'immutable';

export interface ITypedRecord<TParameters> {
  with: (parameters: Partial<TParameters>) => TParameters & ITypedRecord<TParameters>;
  withDeep: (parameters: Partial<TParameters>) => TParameters & ITypedRecord<TParameters>;
  toJS: () => TParameters;
}

// inspired by https://spin.atomicobject.com/2016/11/30/immutable-js-records-in-typescript/c
export function TypedRecord<TParameters>(defaultValues: TParameters) {
  class TypedRecordClass extends Record(defaultValues) implements ITypedRecord<TParameters> {
    // Constructor with parameter of type TParameters must be specified,
    // otherwise you can call it with any object possible and properties not defined on defaultRecord will be ignored
    constructor(parameters?: Partial<TParameters>) {
      if (parameters) {
        super(parameters);
      }
      else {
        super();
      }
    }

    // use when only first-level properties are being updated
    with(parameters: Partial<TParameters>): TParameters & ITypedRecord<TParameters> {
      return this.merge(parameters) as any as TParameters & ITypedRecord<TParameters>;
    }

    // use when you would use 'setIn()' e.g.
    withDeep(parameters: Partial<TParameters>): TParameters & ITypedRecord<TParameters> {
      return this.mergeDeep(parameters) as any as TParameters & ITypedRecord<TParameters>;
    }
  }

  return TypedRecordClass;
}
