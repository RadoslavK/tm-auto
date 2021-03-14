import {
  objectType,
  inputObjectType,
  enumType,
} from 'nexus';
import { join } from 'path';
import { Tribe } from '../../_models/enums/tribe';
import { TaskType } from '../../_models/misc/taskType';

export const CoolDown = objectType({
  name: 'CoolDown',
  definition(t) {
    t.field('min', { type: Duration });
    t.field('max', { type: Duration });
  },
});

export const Coords = objectType({
  name: 'Coords',
  definition(t) {
    t.int('x');
    t.int('y');
  },
});

export const Duration = objectType({
  name: 'Duration',
  definition(t) {
    t.int('days');
    t.int('hours');
    t.int('minutes');
    t.int('seconds');
  },
});

export const Resources = objectType({
  name: 'Resources',
  definition(t) {
    t.int('wood');
    t.int('clay');
    t.int('iron');
    t.int('crop');
    t.int('freeCrop');
    t.int('total', {
      resolve: (res) => res.getTotal(),
    });
  },
  sourceType: {
    module: join(__dirname, '../../_models/misc/resources.ts'),
    export: 'Resources',
  },
});

export const Timestamp = objectType({
  name: 'Timestamp',
  definition(t) {
    t.int('totalSeconds');
  },
});

export const CoolDownInput = inputObjectType({
  name: 'CoolDownInput',
  definition(t) {
    t.field('min', { type: DurationInput });
    t.field('max', { type: DurationInput });
  },
});

export const DurationInput = inputObjectType({
  name: 'DurationInput',
  definition(t) {
    t.int('days');
    t.int('hours');
    t.int('minutes');
    t.int('seconds');
  },
});

export const TimestampInput = inputObjectType({
  name: 'TimestampInput',
  definition(t) {
    t.int('totalSeconds');
  },
});

export const TaskTypeEnum = enumType({
  name: 'TaskType',
  members: TaskType,
});

export const TribeEnum = enumType({
  name: 'Tribe',
  members: Tribe,
});