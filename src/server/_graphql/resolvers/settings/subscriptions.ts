import { Resolvers } from '../../_types';
import { BotEvent } from '../../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';

export default <Resolvers>{
  Subscription: {
    autoAdventureSettingsChanged: subscribeToEvent(BotEvent.AutoAdventureSettingsChanged, {
      resolve: payload => payload.settings,
    }),

    autoBuildSettingsChanged: subscribeToEvent(BotEvent.AutoBuildSettingsChanged, {
      filter: (payload, args) => payload.villageId === args.villageId,
      resolve: payload => payload.settings,
    }),

    autoPartySettingsChanged: subscribeToEvent(BotEvent.AutoPartySettingsChanged, {
      filter: (payload, args) => payload.villageId === args.villageId,
      resolve: payload => payload.settings,
    }),

    autoUnitsSettingsChanged: subscribeToEvent(BotEvent.AutoUnitsSettingsChanged, {
      filter: (payload, args) => payload.villageId === args.villageId,
      resolve: payload => payload.settings,
    }),

    generalSettingsChanged: subscribeToEvent(BotEvent.GeneralSettingsChanged, {
      resolve: payload => payload.settings,
    }),

    generalVillageSettingsChanged: subscribeToEvent(BotEvent.GeneralVillageSettingsChanged, {
      filter: (payload, args) => payload.villageId === args.villageId,
      resolve: payload => payload.settings,
    }),
  },
};