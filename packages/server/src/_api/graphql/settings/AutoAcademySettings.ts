import {
  arg,
  idArg,
  inputObjectType,
  intArg,
  list,
  mutationField,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';
import path from 'path';
import { getDirname } from 'shared/utils/getDirname.js';

import { Resources } from '../../../_models/misc/resources.js';
import { BotEvent } from '../../../events/botEvent.js';
import { subscribeToEvent } from '../../../pubSub.js';

export const AutoAcademySettingsObject = objectType({
  name: 'AutoAcademySettings',
  definition: t => {
    t.boolean('allow');
    t.boolean('useHeroResources');
    t.field('coolDown', { type: 'CoolDown' });
    t.list.int('units');
    t.field('totalCost', {
      type: 'Resources',
      resolve: (settings, _, ctx) => {
        let cost = new Resources();

        for (const uIndex of settings.units) {
          const additionalCost = ctx.unitUpgradeCostService.getUpgradeCost(uIndex, 0);

          cost = cost.add(additionalCost);
        }

        return cost;
      },
    });
  },
  sourceType: process.env.shouldGenerateArtifacts && {
    module: path.join(getDirname(import.meta), '../../../_models/settings/tasks/autoAcademySettings.ts'),
    export: 'AutoAcademySettings',
  },
});

export const AutoAcademySettingsQuery = queryField(t => {
  t.field('autoAcademySettings', {
    type: AutoAcademySettingsObject,
    args: {
      villageId: idArg(),
    },
    resolve: (_, { villageId }, ctx) =>
      ctx.settingsService.village(villageId).autoAcademy.get(),
  });
});

export const AutoAcademySettingsInput = inputObjectType({
  name: 'AutoAcademySettingsInput',
  definition: t => {
    t.boolean('allow');
    t.boolean('useHeroResources');
    t.field('coolDown', { type: 'CoolDownInput' });
  },
});

export const UpdateAutoAcademySettingsMutation = mutationField(t => {
  t.field('updateAutoAcademySettings', {
    type: AutoAcademySettingsObject,
    args: {
      villageId: idArg(),
      settings: arg({ type: AutoAcademySettingsInput }),
    },
    resolve: (_, { villageId, settings }, ctx) => {
      const service = ctx.settingsService.village(villageId).autoAcademy;

      return service.merge(settings);
    },
  });
});

export const ResetAutoAcademySettingsMutation = mutationField(t => {
  t.field('resetAutoAcademySettings', {
    type: AutoAcademySettingsObject,
    args: {
      villageId: idArg(),
    },
    resolve: (_, { villageId }, ctx) => {
      const service = ctx.settingsService.village(villageId).autoAcademy;

      service.reset();

      return service.get();
    },
  });
});

export const SetAutoAcademySettingsUnitsMutation = mutationField(t => {
  t.field('setAutoAcademySettingsUnits', {
    type: AutoAcademySettingsObject,
    args: {
      villageId: idArg(),
      units: list(intArg()),
    },
    resolve: (_, { villageId, units }, ctx) => {
      const service = ctx.settingsService.village(villageId).autoAcademy;
      const uniqueUnits = new Set(units);

      return service.merge({ units: Array.from(uniqueUnits) });
    },
  });
});

export const AutoAcademySettingsSubscription = subscriptionField(t => {
  t.field('autoAcademySettingsUpdated', {
    type: AutoAcademySettingsObject,
    args: {
      villageId: idArg(),
    },
    ...subscribeToEvent(BotEvent.AutoAcademySettingsUpdated, {
      filter: (p, args) => p.villageId === args.villageId,
      resolve: (p) => p.settings,
    }),
  });
});