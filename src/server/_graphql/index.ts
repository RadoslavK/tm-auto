// eslint-disable-next-line import/no-extraneous-dependencies
import { mergeResolvers } from '@graphql-tools/merge';

import { Resolvers } from '../_types/graphql.type';
import accountResolvers from './account/accountResolvers';
import buildingResolvers from './building/buildingResolvers';
import buildingInProgressResolvers from './buildingInProgress/buildingInProgressResolvers';
import controllerResolvers from './controller/controllerResolvers';
import enumResolvers from './enums/enumResolvers';
import gameInfoResolvers from './gameInfo/gameInfoResolvers';
import heroResolvers from './hero/heroResolvers';
import logsResolvers from './logs/logsResolvers';
import mapSearchResolvers from './mapSearch/mapSearchResolvers';
import miscResolvers from './misc/miscResolvers';
import nextTaskExecutionResolvers from './nextTaskExecution/nextTaskExecutionResolvers';
import queuedBuildingResolvers from './queuedBuilding/queuedBuildingResolvers';
import accountSettingsResolvers from './settings/accountSettingsResolvers';
import autoAdventureSettingsResolvers from './settings/autoAdventureSettingsResolvers';
import autoBuildSettingsResolvers from './settings/autoBuildSettingsResolvers';
import autoMentorSettingsResolvers from './settings/autoMentorSettingsResolvers';
import autoPartySettingsResolvers from './settings/autoPartySettingsResolvers';
import autoUnitsSettingsResolvers from './settings/autoUnitsSettingsResolvers';
import generalSettingsResolvers from './settings/generalSettingsResolvers';
import generalVillageSettingsResolvers from './settings/generalVillageSettingsResolvers';
import settingsManagementResolvers from './settings/settingsManagementResolvers';
import unitResolvers from './unit/unitResolvers';
import villageResolvers from './village/villageResolvers';

export const loadResolvers = (): Resolvers =>
  mergeResolvers([
    accountResolvers,
    buildingResolvers,
    buildingInProgressResolvers,
    controllerResolvers,
    enumResolvers,
    gameInfoResolvers,
    heroResolvers,
    logsResolvers,
    mapSearchResolvers,
    miscResolvers,
    nextTaskExecutionResolvers,
    queuedBuildingResolvers,
    autoAdventureSettingsResolvers,
    autoBuildSettingsResolvers,
    autoMentorSettingsResolvers,
    autoPartySettingsResolvers,
    autoUnitsSettingsResolvers,
    accountSettingsResolvers,
    generalSettingsResolvers,
    generalVillageSettingsResolvers,
    settingsManagementResolvers,
    unitResolvers,
    villageResolvers,
  ] as Resolvers[]);
