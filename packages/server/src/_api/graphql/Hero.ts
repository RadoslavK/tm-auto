import {
  enumType,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';
import { join } from 'path';
import { getDirname } from 'shared/utils/getDirname.js';

import { HeroState } from '../../_models/hero/hero.js';
import { BotEvent } from '../../events/botEvent.js';
import { subscribeToEvent } from '../../pubSub.js';

const __dirname = process.env.shouldGenerateArtifacts && getDirname(import.meta) || '';

export const HeroStateEnum = enumType({
  name: "HeroState",
  members: HeroState,
});

export const HeroInformation = objectType({
  name: 'HeroInformation',
  definition(t) {
    t.int('health');
    t.field('state', {
      type: HeroStateEnum,
    });
    t.field('resources', { type: 'Resources' });
    t.nullable.field('village', {
      type: 'Village',
      resolve: (hero, _args, ctx) =>
        hero.villageId
          ? ctx.villageService.village(hero.villageId)
          : null,
    });
  },
  sourceType: {
    module: join(__dirname, '../../_models/hero/hero.ts'),
    export: 'Hero',
  },
});

export const HeroInformationQuery = queryField(t => {
  t.field('heroInformation', {
    type: HeroInformation,
    resolve: (_, _args, ctx) => ctx.hero,
  });
});

export const HeroInformationUpdateSubscription = subscriptionField(t => {
  t.field('heroInformationUpdated', {
    type: HeroInformation,
    ...subscribeToEvent(BotEvent.HeroInformationUpdated, {
      resolve: (_, _args, ctx) => ctx.hero,
    }),
  });
});