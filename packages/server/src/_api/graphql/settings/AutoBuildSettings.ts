import {
  arg,
  enumType,
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
import { dualQueuePreferences } from 'shared/enums/DualQueuePreference.js';
import { getDirname } from 'shared/utils/getDirname.js';

import { BotEvent } from '../../../events/botEvent.js';
import { subscribeToEvent } from '../../../pubSub.js';

export const AutoStorageOptionSettings = objectType({
  name: 'AutoStorageOptionSettings',
  definition: t => {
    t.boolean('allow');
    t.int('overflowLevel');
  },
});

export const UpdateAutoStorageOptionSettingsInput = inputObjectType({
  name: 'UpdateAutoStorageOptionSettingsInput',
  definition: t => {
    t.boolean('allow');
    t.int('overflowLevel');
  },
});

export const AutoStorageSettings = objectType({
  name: 'AutoStorageSettings',
  definition: t => {
    t.boolean('allowFreeSpots');
    t.field('granary', { type: AutoStorageOptionSettings });
    t.field('warehouse', { type: AutoStorageOptionSettings });
  },
});

export const UpdateAutoStorageSettingsInput = inputObjectType({
  name: 'UpdateAutoStorageSettingsInput',
  definition: t => {
    t.boolean('allowFreeSpots');
    t.field('granary', { type: UpdateAutoStorageOptionSettingsInput });
    t.field('warehouse', { type: UpdateAutoStorageOptionSettingsInput });
  },
});

const DualQueuePreferenceEnum = enumType({
  name: "DualQueuePreference",
  members: dualQueuePreferences,
});

export const DualQueueSettings = objectType({
  name: 'DualQueueSettings',
  definition: t => {
    t.boolean('allow');
    t.field('preference', { type: DualQueuePreferenceEnum });
  },
});

export const DualQueueSettingsInput = inputObjectType({
  name: 'DualQueueSettingsInput',
  definition: t => {
    t.boolean('allow');
    t.field('preference', { type: DualQueuePreferenceEnum });
  },
});

export const BuildingDemolitionSettingsObject = objectType({
  name: 'BuildingDemolitionSettings',
  definition: t => {
    t.int('fieldId');
    t.int('type');
    t.string('name', {
      resolve: (b, _args, ctx) =>
        ctx.buildingInfoService.getBuildingInfo(b.type).name,
    });
    t.int('targetLevel');
  },
  sourceType: process.env.shouldGenerateArtifacts && {
    module: path.join(getDirname(import.meta), '../../../_models/settings/tasks/autoBuildSettings/index.ts'),
    export: 'BuildingDemolitionSettings',
  },
});

export const AutoBuildSettings = objectType({
  name: 'AutoBuildSettings',
  definition: t => {
    t.boolean('allow');
    t.field('coolDown', { type: 'CoolDown' });
    t.boolean('autoCropFields');
    t.int('minCrop');
    t.boolean('useHeroResources');
    t.field('dualQueue', { type: DualQueueSettings });
    t.field('autoStorage', { type: AutoStorageSettings });
    t.list.field('buildingsDemolition', { type: BuildingDemolitionSettingsObject });
  },
});

export const UpdateAutoBuildSettingsInput = inputObjectType({
  name: 'UpdateAutoBuildSettingsInput',
  definition: t => {
    t.boolean('allow');
    t.field('coolDown', { type: 'CoolDownInput' });
    t.boolean('autoCropFields');
    t.int('minCrop');
    t.boolean('useHeroResources');
    t.field('dualQueue', { type: DualQueueSettingsInput });

    t.field('autoStorage', { type: UpdateAutoStorageSettingsInput });
  },
});

export const AutoBuildSettingQuery = queryField(t => {
  t.field('autoBuildSettings', {
    type: AutoBuildSettings,
    args: {
      villageId: 'ID',
    },
    resolve: (_, args, ctx) => ctx.settingsService.village(args.villageId).autoBuild.get(),
  });
});

export const UpdateAutoBuildSettingsMutation = mutationField(t => {
  t.field('updateAutoBuildSettings', {
    type: AutoBuildSettings,
    args: {
      villageId: 'ID',
      settings: arg({ type: UpdateAutoBuildSettingsInput }),
    },
    resolve: (_, args, ctx) =>
      ctx.settingsService.village(args.villageId).autoBuild.merge(args.settings),
  });
});

export const ResetAutoBuildSettingsMutation = mutationField(t => {
  t.field('resetAutoBuildSettings', {
    type: AutoBuildSettings,
    args: {
      villageId: 'ID',
    },
    resolve: (_, args, ctx) => ctx.settingsService.village(args.villageId).autoBuild.reset(),
  });
});

export const DemolitionBuildingInput = inputObjectType({
  name: 'DemolitionBuildingInput',
  definition: t => {
    t.int('fieldId');
    t.int('type');
    t.int('targetLevel');
  },
});

export const AddDemolitionBuildingMutation = mutationField(t => {
  t.field('addDemolitionBuilding', {
    type: BuildingDemolitionSettingsObject,
    args: {
      villageId: idArg(),
      building: arg({ type: DemolitionBuildingInput }),
    },
    resolve: (_, { building, villageId }, ctx) => {
      const service = ctx.settingsService.village(villageId).autoBuild;
      const settings = service.get();

      const buildingsDemolition = [...settings.buildingsDemolition, building];

      service.merge({ buildingsDemolition });

      return building;
    },
  });
});

export const RemoveDemolitionBuildingPayload = objectType({
  name: 'RemoveDemolitionBuildingPayload',
  definition: t => {
    t.int('fieldId');
  },
});

export const RemoveDemolitionBuildingMutation = mutationField(t => {
  t.field('removeDemolitionBuilding', {
    type: RemoveDemolitionBuildingPayload,
    args: {
      villageId: idArg(),
      fieldId: intArg(),
    },
    resolve: (_, { fieldId, villageId }, ctx) => {
      const service = ctx.settingsService.village(villageId).autoBuild;
      const settings = service.get();

      const buildingsDemolition = settings.buildingsDemolition.filter(b => b.fieldId !== fieldId);

      service.merge({ buildingsDemolition });

      return {
        fieldId,
      };
    },
  });
});

export const ClearDemolitionBuildingsMutation = mutationField(t => {
  t.field('clearDemolitionBuildings', {
    type: list(BuildingDemolitionSettingsObject),
    args: {
      villageId: idArg(),
    },
    resolve: (_, { villageId }, ctx) => {
      const service = ctx.settingsService.village(villageId).autoBuild;

      return service.merge({ buildingsDemolition: [] }).buildingsDemolition;
    },
  });
});

export const AutoBuildSettingsSubscription = subscriptionField(t => {
  t.field('autoBuildSettingsUpdated', {
    type: AutoBuildSettings,
    args: {
      villageId: 'ID',
    },
    ...subscribeToEvent(BotEvent.AutoBuildSettingsUpdated, {
      filter: (p, args) => p.villageId === args.villageId,
      resolve: (p) => p.settings,
    }),
  });
});
