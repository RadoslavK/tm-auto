import {
  objectType,
  queryField,
} from 'nexus';

export const GameInfo = objectType({
  name: 'GameInfo',
  definition(t) {
    t.field('tribe', { type: 'Tribe' });
  },
});

export const GameInfoQuery = queryField(t => {
  t.field('gameInfo', {
    type: GameInfo,
    resolve: (_, _args, ctx) => ctx.gameInfo,
  });
});