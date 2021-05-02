import {
  arg,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';
import { mergeDefaults } from 'shared/utils/merge.js';

import { BotEvent } from '../../../events/botEvent.js';
import { subscribeToEvent } from '../../../pubSub.js';

export const AutoUnitsUnitSettings = objectType({
  name: 'AutoUnitsUnitSettings',
  definition: t => {
    t.int('index');
    t.boolean('autoBuild');
    t.boolean('trainForever');
    t.int('targetAmount');
    t.int('minimumBatch');
  },
});

export const UpdateAutoUnitsUnitSettingsInput = inputObjectType({
  name: 'UpdateAutoUnitsUnitSettingsInput',
  definition: t => {
    t.int('index');
    t.boolean('autoBuild');
    t.boolean('trainForever');
    t.int('targetAmount');
    t.int('minimumBatch');
  },
});

export const AutoUnitsBuildingSettings = objectType({
  name: 'AutoUnitsBuildingSettings',
  definition: t => {
    t.boolean('allow');
    t.field('maxBuildTime', { type: 'Duration' });
    t.list.field('units', { type: AutoUnitsUnitSettings });
  },
});

export const UpdateAutoUnitsBuildingSettingsInput = inputObjectType({
  name: 'UpdateAutoUnitsBuildingSettingsInput',
  definition: t => {
    t.boolean('allow');
    t.field('maxBuildTime', { type: 'DurationInput' });
  },
});

export const AutoUnitsSettings = objectType({
  name: 'AutoUnitsSettings',
  definition: t => {
    t.boolean('allow');
    t.field('coolDown', { type: 'CoolDown' });
    t.boolean('useHeroResources');

    t.int('minCrop');
    t.field('barracks', { type: AutoUnitsBuildingSettings });
    t.field('stable', { type: AutoUnitsBuildingSettings });
    t.field('workshop', { type: AutoUnitsBuildingSettings });
    t.field('residence', { type: AutoUnitsBuildingSettings });
  },
});

export const UpdateAutoUnitsSettingsInput = inputObjectType({
  name: 'UpdateAutoUnitsSettingsInput',
  definition: t => {
    t.boolean('allow');
    t.field('coolDown', { type: 'CoolDownInput' });
    t.boolean('useHeroResources');

    t.int('minCrop');
  },
});

export const AutoUnitsSettingsQuery = queryField(t => {
  t.field('autoUnitsSettings', {
    type: AutoUnitsSettings,
    args: {
      villageId: 'ID',
    },
    resolve: (_, args, ctx) => ctx.settingsService.village(args.villageId).autoUnits.get(),
  });
});

export const UpdateAutoUnitsSettingsMutation = mutationField(t => {
  t.field('updateAutoUnitsSettings', {
    type: AutoUnitsSettings,
    args: {
      villageId: 'ID',
      settings: arg({ type: UpdateAutoUnitsSettingsInput }),
    },
    resolve: (_, args, ctx) =>
      ctx.settingsService.village(args.villageId).autoUnits.merge(args.settings),
  });
});

export const UpdateAutoUnitsBuildingSettingsMutation = mutationField(t => {
  t.field('updateAutoUnitsBuildingSettings', {
    type: AutoUnitsSettings,
    args: {
      villageId: 'ID',
      buildingType: 'Int',
      settings: arg({ type: UpdateAutoUnitsBuildingSettingsInput }),
    },
    resolve: (_, args, ctx) => {
      const service = ctx.settingsService.village(args.villageId).autoUnits;
      const settings = service.get();
      const buildingSettings = settings.forBuilding(args.buildingType);

      mergeDefaults(buildingSettings, args.settings);
      service.update(settings);

      return settings;
    },
  });
});

export const UpdateAutoUnitsUnitSettingsMutation = mutationField(t => {
  t.field('updateAutoUnitsUnitSettings', {
    type: AutoUnitsSettings,
    args: {
      villageId: 'ID',
      settings: arg({ type: UpdateAutoUnitsUnitSettingsInput }),
    },
    resolve: (_, args, ctx) => {
      const service = ctx.settingsService.village(args.villageId).autoUnits;
      const settings = service.get();
      const unitInfo = ctx.unitInfoService.getUnitInfo(args.settings.index);
      const buildingSettings = settings.forBuilding(unitInfo.buildingType);
      const unitSettings = buildingSettings.units.find(
        (u) => u.index === args.settings.index,
      );

      mergeDefaults(unitSettings, args.settings);
      service.update(settings);

      return settings;
    },
  });
});

export const ResetAutoUnitsSettingsMutation = mutationField(t => {
  t.field('resetAutoUnitsSettings', {
    type: AutoUnitsSettings,
    args: {
      villageId: 'ID',
    },
    resolve: (_, args, ctx) => ctx.settingsService.village(args.villageId).autoUnits.reset(),
  });
});

export const AutoUnitsSettingsUpdatedSubscription = subscriptionField(t => {
  t.field('autoUnitsSettingsUpdated', {
    type: AutoUnitsSettings,
    args: {
      villageId: 'ID',
    },
    ...subscribeToEvent(
      BotEvent.AutoUnitsSettingsUpdated,
      {
        filter: (p, args) => p.villageId === args.villageId,
        resolve: (p) => p.settings,
      },
    ),
  });
});
