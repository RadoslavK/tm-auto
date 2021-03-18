import {
  arg,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';
import { getAccountContext } from '../../../../accountContext.js';
import { BotEvent } from '../../../../events/botEvent.js';
import { subscribeToEvent } from '../../../../pubSub.js';

export const HeroLevelUpItem = objectType({
  name: 'HeroLevelUpItem',
  definition: t => {
    t.id('name');
    t.int('offensiveStrength')
    t.int('offBonus');
    t.int('defBonus');
    t.int('resources');
  },
});

export const HeroLevelUpItemInput = inputObjectType({
  name: 'HeroLevelUpItemInput',
  definition: t => {
    t.id('name');
    t.int('offensiveStrength');
    t.int('offBonus');
    t.int('defBonus');
    t.int('resources');
  },
});

export const HeroLevelUpSettings = objectType({
  name: 'HeroLevelUpSettings',
  definition: t => {
    t.list.field('levelUpItems', { type: HeroLevelUpItem });
  },
});

const getSettingsService = () =>
  getAccountContext().settingsService.hero.heroLevelUp;

export const HeroLevelUpSettingsQuery = queryField(t => {
  t.field('heroLevelUpSettings', {
    type: HeroLevelUpSettings,
    resolve: () => {
      const res = getSettingsService().get();

      return {
        levelUpItems: [...res.levelUpItems],
      };
    },
  });
});

export const IsHeroLevelUpItemNameUsedQuery = queryField(t => {
  t.boolean('isHeroLevelUpItemNameUsed', {
    args: {
      name: 'ID',
    },
    resolve: (_, { name }) =>
      getSettingsService()
        .get()
        .levelUpItems.map((x) => x.name)
        .includes(name),
  });
});

export const AddHeroLevelUpItemMutation = mutationField(t => {
  t.field('addHeroLevelUpItem', {
    type: HeroLevelUpItem,
    args: {
      item: arg({ type: HeroLevelUpItemInput }),
    },
    resolve: (_, { item }) => {
      const service = getSettingsService();
      const settings = service.get();

      service.merge({
        levelUpItems: settings.levelUpItems.concat([item]),
      });

      return item;
    },
  });
});

export const UpdateHeroLevelUpItemMutation = mutationField(t => {
  t.field('updateHeroLevelUpItem', {
    type: HeroLevelUpItem,
    args: {
      previousName: 'ID',
      item: HeroLevelUpItemInput,
    },
    resolve: (_, { previousName, item }) => {
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
  });
});

export const RemoveHeroLevelUpItemMutation = mutationField(t => {
  t.field('removeHeroLevelUpItem', {
    type: HeroLevelUpItem,
    args: {
      name: 'ID',
    },
    resolve: (_, { name }) => {
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
  });
});

export const HeroLevelUpSettingsChangedSubscription = subscriptionField(t => {
  t.field('heroLevelUpSettingsChanged', {
    type: HeroLevelUpSettings,
    ...subscribeToEvent(
      BotEvent.HeroLevelUpSettingsChanged,
      {
        resolve: (p) => ({
          levelUpItems: [...p.settings.levelUpItems],
        }),
      },
    ),
  });
});
