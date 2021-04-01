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
  QueuedUpdated = 'QueuedUpdated',
  VillageUpdated = 'VillageUpdated',
  CrannyCapacityUpdated = 'CrannyCapacityUpdated',
  VillagesUpdated = 'VillagesUpdated',

  MapScanProgressUpdated = 'MapScanProgressUpdated',
  MapSearchStateChanged = 'MapSearchStateChanged',
  MapSearchFinished = 'MapSearchFinished',
}
