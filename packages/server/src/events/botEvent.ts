export enum BotEvent {
  // Settings & Accounts
  AccountsUpdated = 'AccountsUpdated',
  LastSignedAccountIdUpdated = 'LastSignedAccountIdUpdated',
  AccountSettingsUpdated = 'AccountSettingsUpdated',
  AutoAdventureSettingsUpdated = 'AutoAdventureSettingsUpdated',
  AutoMentorSettingsUpdated = 'AutoMentorSettingsUpdated',
  AutoUnitsSettingsUpdated = 'AutoUnitsSettingsUpdated',
  HeroLevelUpSettingsChanged = 'HeroLevelUpSettingsChanged',

  BotActivityChanged = 'BotActivityChanged',
  ActiveVillageIdChanged = 'ActiveVillageIdChanged',
  BotRunningChanged = 'BotRunningChanged',
  BuildingsInProgressUpdated = 'BuildingsInProgressUpdated',
  BuildingSpotUpdated = 'BuildingSpotUpdated',
  HeroInformationUpdated = 'HeroInformationUpdated',
  LogEntryAdded = 'LogEntryAdded',
  NextTaskExecutionChanged = 'NextTaskExecutionChanged',
  NextTasksExecutionChanged = 'NextTasksExecutionChanged',
  NextVillageTaskExecutionChanged = 'NextVillageTaskExecutionChanged',
  QueuedBuildingUpdated = 'QueuedBuildingUpdated',
  BuildingQueueCorrected = 'BuildingQueueCorrected',
  BuildingQueueTimesUpdated = 'BuildingQueueTimesUpdated',
  VillageUpdated = 'VillageUpdated',
  CrannyCapacityUpdated = 'CrannyCapacityUpdated',
  VillagesUpdated = 'VillagesUpdated',

  GameInfoUpdated = 'GameInfoUpdated',

  MapScanProgressUpdated = 'MapScanProgressUpdated',
  MapSearchStateChanged = 'MapSearchStateChanged',
  MapSearchFinished = 'MapSearchFinished',
}
