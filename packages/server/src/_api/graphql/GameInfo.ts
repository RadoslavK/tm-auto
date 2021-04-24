import {
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';

import { BotEvent } from '../../events/botEvent.js';
import { subscribeToEvent } from '../../pubSub.js';

export const GameInfo = objectType({
  name: 'GameInfo',
  definition(t) {
    t.field('tribe', { type: 'Tribe' });
    t.boolean('factions');
    t.int('mapSize');
  },
});

export const GameInfoQuery = queryField(t => {
  t.field('gameInfo', {
    type: GameInfo,
    resolve: (_, _args, ctx) => ctx.gameInfo,
  });
});

export const GameInfoSubscription = subscriptionField(t => {
  t.field('onGameInfoUpdated', {
    type: GameInfo,
    ...subscribeToEvent(BotEvent.GameInfoUpdated, {
      resolve: p => p.gameInfo,
    }),
  });
});