import {
  enumType,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';
import { HeroState } from '../../_models/hero/hero';
import { getAccountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';
import { join } from 'path';

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
    t.nullable.field('village', {
      type: 'Village',
      resolve: (hero) =>
        hero.villageId
          ? getAccountContext().villageService.village(hero.villageId)
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
    resolve: () => getAccountContext().hero,
  });
});

export const HeroInformationUpdateSubscription = subscriptionField(t => {
  t.field('heroInformationUpdated', {
    type: HeroInformation,
    ...subscribeToEvent(BotEvent.HeroInformationUpdated, {
      resolve: () => getAccountContext().hero,
    }),
  });
});