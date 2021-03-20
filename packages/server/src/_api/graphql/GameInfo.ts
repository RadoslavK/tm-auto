import {
  objectType,
  queryField,
} from 'nexus';
import { getAccountContext } from '../../accountContext.js';

export const GameInfo = objectType({
  name: 'GameInfo',
  definition(t) {
    t.field('tribe', { type: 'Tribe' });
  },
});

export const GameInfoQuery = queryField(t => {
  t.field('gameInfo', {
    type: GameInfo,
    resolve: () => {
      return getAccountContext().gameInfo;
    },
  });
});