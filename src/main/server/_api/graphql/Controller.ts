import {
  idArg,
  enumType,
  mutationField,
  subscriptionField,
  queryField,
} from 'nexus';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';
import {
  BotState,
  controllerService,
} from '../../services/controllerService';

export const SignInMutation = mutationField(t => {
  t.nullable.boolean('signIn', {
    args: {
      accountId: idArg(),
    },
    resolve(_p, args) {
      controllerService.signIn(args.accountId);

      return null;
    },
  });
});

export const SignOutMutation = mutationField(t => {
  t.nullable.boolean('signOut', {
    resolve() {
      controllerService.signOut();

      return null;
    },
  });
});

export const StartBotMutation = mutationField(t => {
  t.nullable.boolean('startBot', {
    resolve() {
      controllerService.start();

      return null;
    },
  });
});

export const StopBotMutation = mutationField(t => {
  t.nullable.boolean('stopBot', {
    resolve() {
      controllerService.stop();

      return null;
    },
  });
});

export const IsBotActiveQuery = queryField(t => {
  t.boolean('isBotActive', {
    resolve: () => controllerService.isActive(),
  });
});

export const BotStateQuery = queryField(t => {
  t.field('botState', {
    type: BotStateEnum,
    resolve: () => controllerService.state(),
  });
});

export const BotActivityChangedSubscription = subscriptionField(t => {
  t.boolean('botActivityChanged', {
    ...subscribeToEvent(BotEvent.BotActivityChanged, {
      resolve: (p) => p.isActive,
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