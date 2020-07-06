import { Resolvers } from '../../../_types/resolvers.type';
import { getAccountContext } from '../../../accountContext';
import { BotEvent } from '../../../events/botEvent';
import { subscribeToEvent } from '../../../pubSub';

const getSettingsService = () =>
  getAccountContext().settingsService.hero.heroLevelUp;

export default <Resolvers>{
  Query: {
    heroLevelUpSettings: () => getSettingsService().get(),
    isHeroLevelUpItemNameUsed: (_, { name }) =>
      getSettingsService()
        .get()
        .levelUpItems.map((x) => x.name)
        .includes(name),
  },

  Mutation: {
    addHeroLevelUpItem: (_, { item }) => {
      const service = getSettingsService();
      const settings = service.get();

      service.merge({
        levelUpItems: settings.levelUpItems.concat([item]),
      });

      return item;
    },

    updateHeroLevelUpItem: (_, { previousName, item }) => {
      const service = getSettingsService();
      const settings = service.get();
      const index = settings.levelUpItems.findIndex(
        (x) => x.name === previousName,
      );

      if (index === -1) {
        throw new Error(
          `Did not find hero level up item with name: ${previousName}`,
        );
      }

      const updatedItems = settings.levelUpItems.slice();
      updatedItems[index] = item;

      service.merge({
        levelUpItems: updatedItems,
      });

      return item;
    },

    removeHeroLevelUpItem: (_, { name }) => {
      const service = getSettingsService();
      const settings = service.get();
      const index = settings.levelUpItems.findIndex((x) => x.name === name);

      if (index === -1) {
        throw new Error(`Did not find hero level up item with name: ${name}`);
      }

      const updatedSettings = settings.levelUpItems.slice();
      const [item] = updatedSettings.splice(index, 1);

      service.merge({
        levelUpItems: updatedSettings,
      });

      return item;
    },
  },

  Subscription: {
    heroLevelUpSettingsChanged: subscribeToEvent(
      BotEvent.HeroLevelUpSettingsChanged,
      {
        resolve: (p) => p.settings,
      },
    ),
  },
};
