import {
  arg,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
  subscriptionField,
} from 'nexus';
import { mergeDefaults } from '../../../../../_shared/merge.js';
import { getAccountContext } from '../../../accountContext.js';
import { BotEvent } from '../../../events/botEvent.js';
import { subscribeToEvent } from '../../../pubSub.js';
import { unitInfoService } from '../../../services/info/unitInfoService.js';

export const AutoUnitsUnitSettings = objectType({
  name: 'AutoUnitsUnitSettings',
  definition: t => {
    t.int('index');
    t.boolean('autoBuild');
    t.boolean('trainForever');
    t.int('targetAmount');
  },
});

export const UpdateAutoUnitsUnitSettingsInput = inputObjectType({
  name: 'UpdateAutoUnitsUnitSettingsInput',
  definition: t => {
    t.int('index');
    t.boolean('autoBuild');
    t.boolean('trainForever');
    t.int('targetAmount');
  }
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

const getService = (villageId: string) =>
  getAccountContext().settingsService.village(villageId).autoUnits;

export const AutoUnitsSettingsQuery = queryField(t => {
  t.field('autoUnitsSettings', {
    type: AutoUnitsSettings,
    args: {
      villageId: 'ID',
    },
    resolve: (_, args) => getService(args.villageId).get(),
  });
});

export const UpdateAutoUnitsSettingsMutation = mutationField(t => {
  t.field('updateAutoUnitsSettings', {
    type: AutoUnitsSettings,
    args: {
      villageId: 'ID',
      settings: arg({ type: UpdateAutoUnitsSettingsInput }),
    },
    resolve: (_, args) =>
      getService(args.villageId).merge(args.settings),
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
    resolve: (_, args) => {
      const service = getService(args.villageId);
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
    resolve: (_, args) => {
      const service = getService(args.villageId);
      const settings = service.get();
      const unitInfo = unitInfoService.getUnitInfo(args.settings.index);
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
    resolve: (_, args) => getService(args.villageId).reset(),
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
