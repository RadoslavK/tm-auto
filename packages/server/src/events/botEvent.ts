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
  ActualBuildingLevelsUpdated = 'ActualBuildingLevelsUpdated',
  HeroInformationUpdated = 'HeroInformationUpdated',
  LogEntryAdded = 'LogEntryAdded',
  NextTaskExecutionChanged = 'NextTaskExecutionChanged',
  NextTasksExecutionChanged = 'NextTasksExecutionChanged',
  NextVillageTaskExecutionChanged = 'NextVillageTaskExecutionChanged',
  QueuedUpdated = 'QueuedUpdated',
  VillageUpdated = 'VillageUpdated',
  VillagesUpdated = 'VillagesUpdated',

  MapScanProgressUpdated = 'MapScanProgressUpdated',
  MapSearchStateChanged = 'MapSearchStateChanged',
  MapSearchFinished = 'MapSearchFinished',
}
