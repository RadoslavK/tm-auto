import {
  enumType,
  idArg,
  mutationField,
  queryField,
  subscriptionField,
} from 'nexus';

import { BotEvent } from '../../events/botEvent.js';
import { subscribeToEvent } from '../../pubSub.js';
import { BotState } from '../../services/controllerService.js';

export const SignInMutation = mutationField(t => {
  t.nullable.boolean('signIn', {
    args: {
      accountId: idArg(),
    },
    resolve(_p, args, ctx) {
      ctx.controllerService.signIn(args.accountId);

      return null;
    },
  });
});

export const SignOutMutation = mutationField(t => {
  t.nullable.boolean('signOut', {
    resolve(_p, _args, ctx) {
      ctx.controllerService.signOut();

      return null;
    },
  });
});

export const StartBotMutation = mutationField(t => {
  t.nullable.boolean('startBot', {
    resolve(_p, _args, ctx) {
      ctx.controllerService.start();

      return null;
    },
  });
});

export const StopBotMutation = mutationField(t => {
  t.nullable.boolean('stopBot', {
    resolve(_p, _args, ctx) {
      ctx.controllerService.stop();

      return null;
    },
  });
});

export const BotActivityQuery = queryField(t => {
  t.string('botActivity', {
    resolve: (_p, _args, ctx) => ctx.activityService.getActivity(),
  });
});

export const BotStateQuery = queryField(t => {
  t.field('botState', {
    type: BotStateEnum,
    resolve: (_p, _args, ctx) => ctx.controllerService.state(),
  });
});

export const BotActivityChangedSubscription = subscriptionField(t => {
  t.string('botActivityChanged', {
    ...subscribeToEvent(BotEvent.BotActivityChanged, {
      resolve: (p) => p.botActivity,
    }),
  });
});

export const BotStateChangedSubscription = subscriptionField(t => {
  t.field('botStateChanged', {
    type: BotStateEnum,
    ...subscribeToEvent(BotEvent.BotRunningChanged, {
      resolve: (p) => p.state,
    }),
  });
});

export const BotStateEnum = enumType({
  name: 'BotState',
  members: BotState,
});