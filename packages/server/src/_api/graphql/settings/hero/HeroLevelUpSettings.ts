import {
  arg,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';
import { generateId } from 'shared/utils/generateId.js';
import { getAccountContext } from '../../../../accountContext.js';
import { BotEvent } from '../../../../events/botEvent.js';
import { subscribeToEvent } from '../../../../pubSub.js';

export const HeroLevelUpItem = objectType({
  name: 'HeroLevelUpItem',
  definition: t => {
    t.id('id');
    t.string('name');
    t.int('offensiveStrength')
    t.int('offBonus');
    t.int('defBonus');
    t.int('resources');
  },
});

export const HeroLevelUpItemInput = inputObjectType({
  name: 'HeroLevelUpItemInput',
  definition: t => {
    t.string('name');
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

export const AddHeroLevelUpItemMutation = mutationField(t => {
  t.field('addHeroLevelUpItem', {
    type: HeroLevelUpItem,
    args: {
      item: arg({ type: HeroLevelUpItemInput }),
    },
    resolve: (_, { item }) => {
      const service = getSettingsService();
      const settings = service.get();
      const newItem = { ...item, id: generateId() };

      service.merge({
        levelUpItems: settings.levelUpItems.concat([newItem]),
      });

      return newItem;
    },
  });
});

export const UpdateHeroLevelUpItemMutation = mutationField(t => {
  t.field('updateHeroLevelUpItem', {
    type: HeroLevelUpItem,
    args: {
      id: 'ID',
      item: HeroLevelUpItemInput,
    },
    resolve: (_, { id, item }) => {
      const service = getSettingsService();
      const settings = service.get();
      const index = settings.levelUpItems.findIndex(
        (x) => x.id === id,
      );

      if (index === -1) {
        throw new Error(
          `Did not find hero level up item with id: ${id}`,
        );
      }

      const updatedItems = settings.levelUpItems.slice();
      updatedItems[index] = { ...item, id };

      service.merge({
        levelUpItems: updatedItems,
      });

      return updatedItems[index];
    },
  });
});

export const RemoveHeroLevelUpItemMutation = mutationField(t => {
  t.field('removeHeroLevelUpItem', {
    type: HeroLevelUpItem,
    args: {
      id: 'ID',
    },
    resolve: (_, { id }) => {
      const service = getSettingsService();
      const settings = service.get();
      const index = settings.levelUpItems.findIndex((x) => x.id === id);

      if (index === -1) {
        throw new Error(`Did not find hero level up item with id: ${id}`);
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
