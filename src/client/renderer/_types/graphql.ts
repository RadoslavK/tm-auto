export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type UserAccount = {
  readonly id: Scalars['String'];
  readonly username: Scalars['String'];
  readonly password: Scalars['String'];
  readonly server: Scalars['String'];
};

export type Query = {
  readonly account: Maybe<UserAccount>;
  readonly accounts: ReadonlyArray<UserAccount>;
  readonly activeVillageId: Scalars['Int'];
  readonly autoBuildSettings: AutoBuildSettings;
  readonly autoPartySettings: AutoPartySettings;
  readonly autoUnitsSettings: AutoUnitsSettings;
  readonly availableNewBuildings: ReadonlyArray<AvailableNewBuilding>;
  readonly botState: BotState;
  readonly buildingQueue: BuildingQueue;
  readonly buildingSpots: BuildingSpots;
  readonly buildingsInProgress: ReadonlyArray<BuildingInProgress>;
  readonly crannyCapacity: VillageCrannyCapacity;
  readonly currentAccount: UserAccount;
  readonly generalSettings: GeneralSettings;
  readonly generalVillageSettings: GeneralVillageSettings;
  readonly hero: HeroSettings;
  readonly heroInformation: HeroInformation;
  readonly lastSignedAccountId: Maybe<Scalars['String']>;
  readonly logsEntries: ReadonlyArray<LogEntry>;
  readonly maxBuildingLevel: Scalars['Int'];
  readonly nextTaskExecution: Timestamp;
  readonly nextTasksExecution: Timestamp;
  readonly nextVillageTaskExecution: Timestamp;
  readonly unitInfo: UnitInfo;
  readonly village: Maybe<Village>;
  readonly villages: ReadonlyArray<Village>;
};


export type QueryAccountArgs = {
  accountId: Scalars['String'];
};


export type QueryAutoBuildSettingsArgs = {
  villageId: Scalars['Int'];
};


export type QueryAutoPartySettingsArgs = {
  villageId: Scalars['Int'];
};


export type QueryAutoUnitsSettingsArgs = {
  villageId: Scalars['Int'];
};


export type QueryAvailableNewBuildingsArgs = {
  input: AvailableNewBuildingsInput;
};


export type QueryBuildingQueueArgs = {
  villageId: Scalars['Int'];
};


export type QueryBuildingSpotsArgs = {
  villageId: Scalars['Int'];
};


export type QueryBuildingsInProgressArgs = {
  villageId: Scalars['Int'];
};


export type QueryCrannyCapacityArgs = {
  villageId: Scalars['Int'];
};


export type QueryGeneralVillageSettingsArgs = {
  villageId: Scalars['Int'];
};


export type QueryMaxBuildingLevelArgs = {
  buildingType: Scalars['Int'];
};


export type QueryNextTaskExecutionArgs = {
  task: TaskType;
};


export type QueryNextVillageTaskExecutionArgs = {
  villageId: Scalars['Int'];
  task: VillageTaskType;
};


export type QueryUnitInfoArgs = {
  index: Scalars['Int'];
};


export type QueryVillageArgs = {
  villageId: Scalars['Int'];
};

export type Mutation = {
  readonly clearQueue: Scalars['Boolean'];
  readonly createAccount: Maybe<Scalars['String']>;
  readonly deleteAccount: Scalars['Boolean'];
  readonly dequeueBuilding: Scalars['Boolean'];
  readonly dequeueBuildingAtField: Scalars['Boolean'];
  readonly enqueueBuilding: Scalars['Boolean'];
  readonly moveQueuedBuildingAsHighAsPossible: Scalars['Boolean'];
  readonly moveQueuedBuildingDown: Scalars['Boolean'];
  readonly moveQueuedBuildingUp: Scalars['Boolean'];
  readonly resetNextTaskExecution: Scalars['Boolean'];
  readonly resetNextVillageTaskExecution: Scalars['Boolean'];
  readonly resetSettings: Scalars['Boolean'];
  readonly resetVillageSettings: Scalars['Boolean'];
  readonly setNextTaskExecution: Scalars['Boolean'];
  readonly setNextVillageTaskExecution: Scalars['Boolean'];
  readonly signIn: Maybe<Scalars['Boolean']>;
  readonly signOut: Maybe<Scalars['Boolean']>;
  readonly startBot: Scalars['Boolean'];
  readonly stopBot: Scalars['Boolean'];
  readonly updateAccount: Scalars['Boolean'];
  readonly updateAutoAdventureSettings: Scalars['Boolean'];
  readonly updateAutoBuildVillageSettings: Scalars['Boolean'];
  readonly updateAutoPartySettings: Scalars['Boolean'];
  readonly updateAutoUnitsBuildingSettings: Scalars['Boolean'];
  readonly updateAutoUnitsSettings: Scalars['Boolean'];
  readonly updateAutoUnitsUnitSettings: Scalars['Boolean'];
  readonly updateGeneralSettings: Scalars['Boolean'];
  readonly updateGeneralVillageSettings: Scalars['Boolean'];
};


export type MutationClearQueueArgs = {
  villageId: Scalars['Int'];
};


export type MutationCreateAccountArgs = {
  account: CreateUserAccountInput;
};


export type MutationDeleteAccountArgs = {
  accountId: Scalars['String'];
};


export type MutationDequeueBuildingArgs = {
  input: QueuedBuildingManipulationInput;
};


export type MutationDequeueBuildingAtFieldArgs = {
  input: DequeueBuildingAtFieldInput;
};


export type MutationEnqueueBuildingArgs = {
  input: EnqueueBuildingInput;
};


export type MutationMoveQueuedBuildingAsHighAsPossibleArgs = {
  villageId: Scalars['Int'];
  queueId: Scalars['ID'];
};


export type MutationMoveQueuedBuildingDownArgs = {
  input: QueuedBuildingManipulationInput;
};


export type MutationMoveQueuedBuildingUpArgs = {
  input: QueuedBuildingManipulationInput;
};


export type MutationResetNextTaskExecutionArgs = {
  task: TaskType;
};


export type MutationResetNextVillageTaskExecutionArgs = {
  villageId: Scalars['Int'];
  task: VillageTaskType;
};


export type MutationResetSettingsArgs = {
  type: SettingsType;
};


export type MutationResetVillageSettingsArgs = {
  villageId: Scalars['Int'];
  type: VillageSettingsType;
};


export type MutationSetNextTaskExecutionArgs = {
  task: TaskType;
  delay: DurationInput;
};


export type MutationSetNextVillageTaskExecutionArgs = {
  villageId: Scalars['Int'];
  task: VillageTaskType;
  delay: DurationInput;
};


export type MutationSignInArgs = {
  accountId: Scalars['ID'];
};


export type MutationUpdateAccountArgs = {
  account: UpdateUserAccountInput;
};


export type MutationUpdateAutoAdventureSettingsArgs = {
  settings: UpdateAutoAdventureSettingsInput;
};


export type MutationUpdateAutoBuildVillageSettingsArgs = {
  settings: UpdateAutoBuildVillageSettingsInput;
};


export type MutationUpdateAutoPartySettingsArgs = {
  settings: UpdateAutoPartySettingsInput;
};


export type MutationUpdateAutoUnitsBuildingSettingsArgs = {
  settings: UpdateAutoUnitsBuildingSettingsInput;
};


export type MutationUpdateAutoUnitsSettingsArgs = {
  settings: UpdateAutoUnitsSettingsInput;
};


export type MutationUpdateAutoUnitsUnitSettingsArgs = {
  settings: UpdateAutoUnitsUnitSettingsInput;
};


export type MutationUpdateGeneralSettingsArgs = {
  settings: UpdateGeneralSettingsInput;
};


export type MutationUpdateGeneralVillageSettingsArgs = {
  settings: UpdateGeneralVillageSettingsInput;
};

export type BuildingSpotLevel = {
  readonly actual: Scalars['Int'];
  readonly ongoing: Scalars['Int'];
  readonly queued: Scalars['Int'];
  readonly max: Scalars['Int'];
  readonly total: Scalars['Int'];
};

export type BuildingSpot = {
  readonly fieldId: Scalars['Int'];
  readonly level: BuildingSpotLevel;
  readonly name: Scalars['String'];
  readonly type: Scalars['Int'];
};

export type ResourceFields = {
  readonly wood: ReadonlyArray<BuildingSpot>;
  readonly clay: ReadonlyArray<BuildingSpot>;
  readonly iron: ReadonlyArray<BuildingSpot>;
  readonly crop: ReadonlyArray<BuildingSpot>;
};

export type BuildingSpots = {
  readonly infrastructure: ReadonlyArray<BuildingSpot>;
  readonly resources: ResourceFields;
};

export type AvailableNewBuildingsInput = {
  readonly fieldId: Scalars['Int'];
  readonly villageId: Scalars['Int'];
};

export type AvailableNewBuilding = {
  readonly type: Scalars['Int'];
  readonly name: Scalars['String'];
};

export type Subscription = {
  readonly activeVillageIdChanged: Scalars['Int'];
  readonly autoAdventureSettingsChanged: AutoAdventureSettings;
  readonly autoBuildSettingsChanged: AutoBuildSettings;
  readonly autoPartySettingsChanged: AutoPartySettings;
  readonly autoUnitsSettingsChanged: AutoUnitsSettings;
  readonly buildingsUpdated: Scalars['Boolean'];
  readonly crannyCapacityChanged: Scalars['Boolean'];
  readonly generalSettingsChanged: GeneralSettings;
  readonly generalVillageSettingsChanged: GeneralVillageSettings;
  readonly heroInformationUpdated: HeroInformation;
  readonly nextTaskExecutionChanged: Timestamp;
  readonly nextTasksExecutionChanged: Timestamp;
  readonly nextVillageTaskExecutionChanged: Timestamp;
  readonly onBotRunningChanged: Scalars['Boolean'];
  readonly onLogEntryAdded: LogEntry;
  readonly onQueueUpdated: Scalars['Boolean'];
  readonly updateVillage: Scalars['Boolean'];
  readonly updateVillages: Scalars['Boolean'];
};


export type SubscriptionAutoBuildSettingsChangedArgs = {
  villageId: Scalars['Int'];
};


export type SubscriptionAutoPartySettingsChangedArgs = {
  villageId: Scalars['Int'];
};


export type SubscriptionAutoUnitsSettingsChangedArgs = {
  villageId: Scalars['Int'];
};


export type SubscriptionBuildingsUpdatedArgs = {
  villageId: Scalars['Int'];
};


export type SubscriptionCrannyCapacityChangedArgs = {
  villageId: Scalars['Int'];
};


export type SubscriptionGeneralVillageSettingsChangedArgs = {
  villageId: Scalars['Int'];
};


export type SubscriptionNextTaskExecutionChangedArgs = {
  task: TaskType;
};


export type SubscriptionNextVillageTaskExecutionChangedArgs = {
  villageId: Scalars['Int'];
  task: VillageTaskType;
};


export type SubscriptionOnQueueUpdatedArgs = {
  villageId: Scalars['Int'];
};

export type BuildingInProgress = {
  readonly level: Scalars['Int'];
  readonly finishedAt: Timestamp;
  readonly name: Scalars['String'];
  readonly type: Scalars['Int'];
  readonly fieldId: Scalars['Int'];
};

export enum BotState {
  None = 'None',
  Pending = 'Pending',
  Running = 'Running',
  Stopping = 'Stopping',
  Paused = 'Paused'
}

export type CreateUserAccountInput = {
  readonly username: Scalars['String'];
  readonly password: Scalars['String'];
  readonly server: Scalars['String'];
};

export type UpdateUserAccountInput = {
  readonly id: Scalars['ID'];
  readonly username: Scalars['String'];
  readonly password: Scalars['String'];
  readonly server: Scalars['String'];
};

export enum HeroState {
  Unknown = 'Unknown',
  InVillage = 'InVillage',
  Dead = 'Dead',
  Reviving = 'Reviving',
  OnAdventure = 'OnAdventure'
}

export type HeroInformation = {
  readonly health: Scalars['Int'];
  readonly state: HeroState;
  readonly village: Maybe<Village>;
};

export type TextLogEntryContentPayload = {
  readonly message: Scalars['String'];
};

export type TextLogEntryContent = {
  readonly text: TextLogEntryContentPayload;
};

export type AutoBuildLogEntryContentPayload = {
  readonly name: Scalars['String'];
  readonly type: Scalars['Int'];
  readonly level: Scalars['Int'];
  readonly fieldId: Scalars['Int'];
};

export type AutoBuildLogEntryContent = {
  readonly autoBuild: AutoBuildLogEntryContentPayload;
};

export type AutoUnitsLogEntryContentPayload = {
  readonly amount: Scalars['Int'];
  readonly index: Scalars['Int'];
  readonly tribe: Scalars['Int'];
  readonly unitName: Scalars['String'];
};

export type AutoUnitsLogEntryContent = {
  readonly autoUnits: AutoUnitsLogEntryContentPayload;
};

export type LogEntryContent = TextLogEntryContent | AutoBuildLogEntryContent | AutoUnitsLogEntryContent;

export type LogEntry = {
  readonly id: Scalars['ID'];
  readonly timestamp: Scalars['Int'];
  readonly village: Maybe<Village>;
  readonly content: LogEntryContent;
};

export type Timestamp = {
  readonly totalSeconds: Scalars['Int'];
};

export type Resources = {
  readonly wood: Scalars['Int'];
  readonly clay: Scalars['Int'];
  readonly iron: Scalars['Int'];
  readonly crop: Scalars['Int'];
  readonly freeCrop: Scalars['Int'];
  readonly total: Scalars['Int'];
};

export type Cost = {
  readonly resources: Resources;
  readonly buildTime: Duration;
};

export type Coords = {
  readonly x: Scalars['Int'];
  readonly y: Scalars['Int'];
};

export type Duration = {
  readonly days: Scalars['Int'];
  readonly hours: Scalars['Int'];
  readonly minutes: Scalars['Int'];
  readonly seconds: Scalars['Int'];
};

export type CoolDown = {
  readonly min: Duration;
  readonly max: Duration;
};

export type CoolDownInput = {
  readonly min: DurationInput;
  readonly max: DurationInput;
};

export type DurationInput = {
  readonly days: Scalars['Int'];
  readonly hours: Scalars['Int'];
  readonly minutes: Scalars['Int'];
  readonly seconds: Scalars['Int'];
};

export type TimestampInput = {
  readonly totalSeconds: Scalars['Int'];
};

export enum TaskType {
  AutoAdventure = 'AutoAdventure'
}

export enum VillageTaskType {
  AutoBuild = 'AutoBuild',
  AutoUnits = 'AutoUnits',
  AutoParty = 'AutoParty'
}

export type QueuedBuilding = {
  readonly canMoveDown: Scalars['Boolean'];
  readonly canMoveUp: Scalars['Boolean'];
  readonly level: Scalars['Int'];
  readonly name: Scalars['String'];
  readonly type: Scalars['Int'];
  readonly queueId: Scalars['ID'];
  readonly cost: Cost;
  readonly fieldId: Scalars['Int'];
};

export type BuildingQueue = {
  readonly buildings: ReadonlyArray<QueuedBuilding>;
  readonly totalCost: Cost;
};

export type ClearQueueInput = {
  readonly villageId: Scalars['Int'];
};

export type EnqueueBuildingInput = {
  readonly fieldId: Scalars['Int'];
  readonly type: Scalars['Int'];
  readonly villageId: Scalars['Int'];
  readonly targetLevel: Maybe<Scalars['Int']>;
};

export type QueuedBuildingManipulationInput = {
  readonly queueId: Scalars['ID'];
  readonly villageId: Scalars['Int'];
};

export type DequeueBuildingAtFieldInput = {
  readonly deleteAll: Scalars['Boolean'];
  readonly fieldId: Scalars['Int'];
  readonly villageId: Scalars['Int'];
};

export type ITaskSettings = {
  readonly allow: Scalars['Boolean'];
  readonly coolDown: CoolDown;
};

export type GeneralSettings = {
  readonly allowTasks: Scalars['Boolean'];
  readonly autoStart: Scalars['Boolean'];
  readonly autoBuild: Scalars['Boolean'];
  readonly autoUnits: Scalars['Boolean'];
  readonly autoParty: Scalars['Boolean'];
};

export type GeneralVillageSettings = {
  readonly allowTasks: Scalars['Boolean'];
};

export type AutoStorageOptionSettings = {
  readonly allow: Scalars['Boolean'];
  readonly overflowLevel: Scalars['Int'];
};

export type AutoStorageSettings = {
  readonly allowFreeSpots: Scalars['Boolean'];
  readonly granary: AutoStorageOptionSettings;
  readonly warehouse: AutoStorageOptionSettings;
};

export type AutoBuildSettings = ITaskSettings & {
  readonly allow: Scalars['Boolean'];
  readonly coolDown: CoolDown;
  readonly autoCropFields: Scalars['Boolean'];
  readonly minCrop: Scalars['Int'];
  readonly autoStorage: AutoStorageSettings;
};

export enum AdventureCriteria {
  Closest = 'Closest',
  Furthest = 'Furthest',
  Random = 'Random',
  FirstToExpire = 'FirstToExpire'
}

export type AutoAdventureSettings = ITaskSettings & {
  readonly allow: Scalars['Boolean'];
  readonly coolDown: CoolDown;
  readonly adventureCriteria: AdventureCriteria;
  readonly preferHard: Scalars['Boolean'];
  readonly normalMinHealth: Scalars['Int'];
  readonly hardMinHealth: Scalars['Int'];
  readonly maxTravelTime: Duration;
  readonly preferredVillageId: Maybe<Scalars['Int']>;
};

export type HeroSettings = {
  readonly autoAdventure: AutoAdventureSettings;
};

export type AutoUnitsUnitSettings = {
  readonly index: Scalars['Int'];
  readonly autoBuild: Scalars['Boolean'];
  readonly trainForever: Scalars['Boolean'];
  readonly targetAmount: Scalars['Int'];
};

export type AutoUnitsBuildingSettings = {
  readonly allow: Scalars['Boolean'];
  readonly maxBuildTime: Duration;
  readonly units: ReadonlyArray<AutoUnitsUnitSettings>;
};

export type AutoUnitsSettings = ITaskSettings & {
  readonly allow: Scalars['Boolean'];
  readonly coolDown: CoolDown;
  readonly minCrop: Scalars['Int'];
  readonly barracks: AutoUnitsBuildingSettings;
  readonly stable: AutoUnitsBuildingSettings;
  readonly workshop: AutoUnitsBuildingSettings;
  readonly residence: AutoUnitsBuildingSettings;
};

export enum PartyType {
  Small = 'Small',
  Large = 'Large'
}

export type AutoPartySettings = ITaskSettings & {
  readonly coolDown: CoolDown;
  readonly allow: Scalars['Boolean'];
  readonly minCulturePoints: Scalars['Int'];
  readonly partyType: PartyType;
};

export type VillageSettings = {
  readonly general: GeneralVillageSettings;
  readonly autoBuild: AutoBuildSettings;
  readonly autoUnits: AutoUnitsSettings;
  readonly autoParty: AutoPartySettings;
};

export type UpdateGeneralVillageSettingsInput = {
  readonly villageId: Scalars['Int'];
  readonly allowTasks: Scalars['Boolean'];
};

export type UpdateAutoBuildVillageSettingsInput = {
  readonly villageId: Scalars['Int'];
  readonly allow: Scalars['Boolean'];
  readonly coolDown: CoolDownInput;
  readonly autoCropFields: Scalars['Boolean'];
  readonly minCrop: Scalars['Int'];
  readonly allowFreeSpots: Scalars['Boolean'];
  readonly allowAutoGranary: Scalars['Boolean'];
  readonly autoGranaryOverflowLevel: Scalars['Int'];
  readonly allowAutoWarehouse: Scalars['Boolean'];
  readonly autoWarehouseOverflowLevel: Scalars['Int'];
};

export type UpdateAutoAdventureSettingsInput = {
  readonly allow: Scalars['Boolean'];
  readonly coolDown: CoolDownInput;
  readonly adventureCriteria: AdventureCriteria;
  readonly preferHard: Scalars['Boolean'];
  readonly normalMinHealth: Scalars['Int'];
  readonly hardMinHealth: Scalars['Int'];
  readonly maxTravelTime: DurationInput;
  readonly preferredVillageId: Maybe<Scalars['Int']>;
};

export type UpdateGeneralSettingsInput = {
  readonly allowTasks: Scalars['Boolean'];
  readonly autoBuild: Scalars['Boolean'];
  readonly autoUnits: Scalars['Boolean'];
  readonly autoStart: Scalars['Boolean'];
  readonly autoParty: Scalars['Boolean'];
};

export type UpdateAutoUnitsUnitSettingsInput = {
  readonly villageId: Scalars['Int'];
  readonly unitIndex: Scalars['Int'];
  readonly autoBuild: Scalars['Boolean'];
  readonly trainForever: Scalars['Boolean'];
  readonly targetAmount: Scalars['Int'];
};

export type UpdateAutoUnitsBuildingSettingsInput = {
  readonly villageId: Scalars['Int'];
  readonly buildingType: Scalars['Int'];
  readonly allow: Scalars['Boolean'];
  readonly maxBuildTime: DurationInput;
};

export type UpdateAutoUnitsSettingsInput = {
  readonly villageId: Scalars['Int'];
  readonly allow: Scalars['Boolean'];
  readonly coolDown: CoolDownInput;
  readonly minCrop: Scalars['Int'];
};

export type UpdateAutoPartySettingsInput = {
  readonly villageId: Scalars['Int'];
  readonly allow: Scalars['Boolean'];
  readonly coolDown: CoolDownInput;
  readonly minCulturePoints: Scalars['Int'];
  readonly partyType: PartyType;
};

export type ResetVillageInput = {
  readonly villageId: Scalars['Int'];
};

export enum SettingsType {
  General = 'General',
  AutoAdventure = 'AutoAdventure'
}

export enum VillageSettingsType {
  General = 'General',
  AutoBuild = 'AutoBuild',
  AutoUnits = 'AutoUnits',
  AutoParty = 'AutoParty'
}

export type UnitInfo = {
  readonly name: Scalars['String'];
};

export type VillageCapacity = {
  readonly granary: Scalars['Int'];
  readonly warehouse: Scalars['Int'];
};

export type VillageResources = {
  readonly amount: Resources;
  readonly capacity: VillageCapacity;
  readonly production: Resources;
};

export type Village = {
  readonly id: Scalars['Int'];
  readonly coords: Coords;
  readonly name: Scalars['String'];
  readonly resources: VillageResources;
  readonly isCapital: Scalars['Boolean'];
};

export type VillageCrannyCapacity = {
  readonly actual: Scalars['Int'];
  readonly ongoing: Scalars['Int'];
  readonly total: Scalars['Int'];
};

export type UserAccountFragment = Pick<UserAccount, 'id' | 'username' | 'password' | 'server'>;

export type GetAccountsQueryVariables = {};


export type GetAccountsQuery = { readonly accounts: ReadonlyArray<UserAccountFragment> };

export type GetCurrentAccountQueryVariables = {};


export type GetCurrentAccountQuery = { readonly currentAccount: UserAccountFragment };

export type GetAccountQueryVariables = {
  accountId: Scalars['String'];
};


export type GetAccountQuery = { readonly account: Maybe<UserAccountFragment> };

export type GetLastSignedAccountIdQueryVariables = {};


export type GetLastSignedAccountIdQuery = Pick<Query, 'lastSignedAccountId'>;

export type CreateAccountMutationVariables = {
  account: CreateUserAccountInput;
};


export type CreateAccountMutation = Pick<Mutation, 'createAccount'>;

export type UpdateAccountMutationVariables = {
  account: UpdateUserAccountInput;
};


export type UpdateAccountMutation = Pick<Mutation, 'updateAccount'>;

export type DeleteAccountMutationVariables = {
  accountId: Scalars['String'];
};


export type DeleteAccountMutation = Pick<Mutation, 'deleteAccount'>;

export type BuildingSpotFragment = (
  Pick<BuildingSpot, 'fieldId' | 'type' | 'name'>
  & { readonly level: Pick<BuildingSpotLevel, 'actual' | 'ongoing' | 'queued' | 'total' | 'max'> }
);

export type GetBuildingSpotsQueryVariables = {
  villageId: Scalars['Int'];
};


export type GetBuildingSpotsQuery = { readonly buildingSpots: { readonly infrastructure: ReadonlyArray<BuildingSpotFragment>, readonly resources: { readonly wood: ReadonlyArray<BuildingSpotFragment>, readonly clay: ReadonlyArray<BuildingSpotFragment>, readonly iron: ReadonlyArray<BuildingSpotFragment>, readonly crop: ReadonlyArray<BuildingSpotFragment> } } };

export type GetAvailableNewBuildingsQueryVariables = {
  input: AvailableNewBuildingsInput;
};


export type GetAvailableNewBuildingsQuery = { readonly availableNewBuildings: ReadonlyArray<Pick<AvailableNewBuilding, 'name' | 'type'>> };

export type GetMaxBuildingLevelQueryVariables = {
  buildingType: Scalars['Int'];
};


export type GetMaxBuildingLevelQuery = Pick<Query, 'maxBuildingLevel'>;

export type BuildingsUpdatedSubscriptionVariables = {
  villageId: Scalars['Int'];
};


export type BuildingsUpdatedSubscription = Pick<Subscription, 'buildingsUpdated'>;

export type GetBuildingsInProgressQueryVariables = {
  villageId: Scalars['Int'];
};


export type GetBuildingsInProgressQuery = { readonly buildingsInProgress: ReadonlyArray<(
    Pick<BuildingInProgress, 'level' | 'name' | 'type' | 'fieldId'>
    & { readonly finishedAt: TimestampFragment }
  )> };

export type TimestampFragment = Pick<Timestamp, 'totalSeconds'>;

export type GetBotStateQueryVariables = {};


export type GetBotStateQuery = Pick<Query, 'botState'>;

export type StartBotMutationVariables = {};


export type StartBotMutation = Pick<Mutation, 'startBot'>;

export type StopBotMutationVariables = {};


export type StopBotMutation = Pick<Mutation, 'stopBot'>;

export type SignInMutationVariables = {
  accountId: Scalars['ID'];
};


export type SignInMutation = Pick<Mutation, 'signIn'>;

export type SignOutMutationVariables = {};


export type SignOutMutation = Pick<Mutation, 'signOut'>;

export type OnBotRunningChangedSubscriptionVariables = {};


export type OnBotRunningChangedSubscription = Pick<Subscription, 'onBotRunningChanged'>;

export type HeroInformationFragment = (
  Pick<HeroInformation, 'health' | 'state'>
  & { readonly village: Maybe<(
    Pick<Village, 'id' | 'name'>
    & { readonly coords: CoordsFragment }
  )> }
);

export type CoordsFragment = Pick<Coords, 'x' | 'y'>;

export type GetHeroInformationQueryVariables = {};


export type GetHeroInformationQuery = { readonly heroInformation: HeroInformationFragment };

export type OnHeroInformationUpdatedSubscriptionVariables = {};


export type OnHeroInformationUpdatedSubscription = { readonly heroInformationUpdated: HeroInformationFragment };

export type LogEntryFragment = (
  Pick<LogEntry, 'id' | 'timestamp'>
  & { readonly village: Maybe<(
    Pick<Village, 'id' | 'name'>
    & { readonly coords: CoordsFragment }
  )>, readonly content: { readonly text: Pick<TextLogEntryContentPayload, 'message'> } | { readonly autoBuild: Pick<AutoBuildLogEntryContentPayload, 'fieldId' | 'level' | 'name' | 'type'> } | { readonly autoUnits: Pick<AutoUnitsLogEntryContentPayload, 'amount' | 'index' | 'tribe' | 'unitName'> } }
);

export type CoordsFragment = Pick<Coords, 'x' | 'y'>;

export type GetLogsQueryVariables = {};


export type GetLogsQuery = { readonly logsEntries: ReadonlyArray<LogEntryFragment> };

export type OnLogEntryAddedSubscriptionVariables = {};


export type OnLogEntryAddedSubscription = { readonly onLogEntryAdded: LogEntryFragment };

export type TimestampFragment = Pick<Timestamp, 'totalSeconds'>;

export type ResourcesFragment = Pick<Resources, 'wood' | 'clay' | 'iron' | 'crop' | 'freeCrop' | 'total'>;

export type CostFragment = { readonly resources: ResourcesFragment, readonly buildTime: DurationFragment };

export type CoordsFragment = Pick<Coords, 'x' | 'y'>;

export type VillageFragment = (
  Pick<Village, 'id' | 'name'>
  & { readonly coords: CoordsFragment, readonly resources: { readonly amount: ResourcesFragment, readonly production: ResourcesFragment, readonly capacity: Pick<VillageCapacity, 'granary' | 'warehouse'> } }
);

export type DurationFragment = Pick<Duration, 'days' | 'hours' | 'minutes' | 'seconds'>;

export type NextTaskExecutionQueryVariables = {
  task: TaskType;
};


export type NextTaskExecutionQuery = { readonly nextTaskExecution: TimestampFragment };

export type TimestampFragment = Pick<Timestamp, 'totalSeconds'>;

export type NextVillageTaskExecutionQueryVariables = {
  villageId: Scalars['Int'];
  task: VillageTaskType;
};


export type NextVillageTaskExecutionQuery = { readonly nextVillageTaskExecution: TimestampFragment };

export type NextTasksExecutionQueryVariables = {};


export type NextTasksExecutionQuery = { readonly nextTasksExecution: TimestampFragment };

export type SetNextTaskExecutionMutationVariables = {
  task: TaskType;
  delay: DurationInput;
};


export type SetNextTaskExecutionMutation = Pick<Mutation, 'setNextTaskExecution'>;

export type SetNextVillageTaskExecutionMutationVariables = {
  villageId: Scalars['Int'];
  task: VillageTaskType;
  delay: DurationInput;
};


export type SetNextVillageTaskExecutionMutation = Pick<Mutation, 'setNextVillageTaskExecution'>;

export type ResetNextTaskExecutionMutationVariables = {
  task: TaskType;
};


export type ResetNextTaskExecutionMutation = Pick<Mutation, 'resetNextTaskExecution'>;

export type ResetNextVillageTaskExecutionMutationVariables = {
  villageId: Scalars['Int'];
  task: VillageTaskType;
};


export type ResetNextVillageTaskExecutionMutation = Pick<Mutation, 'resetNextVillageTaskExecution'>;

export type NextTasksExecutionChangedSubscriptionVariables = {};


export type NextTasksExecutionChangedSubscription = { readonly nextTasksExecutionChanged: TimestampFragment };

export type NextTaskExecutionChangedSubscriptionVariables = {
  task: TaskType;
};


export type NextTaskExecutionChangedSubscription = { readonly nextTaskExecutionChanged: TimestampFragment };

export type NextVillageTaskExecutionChangedSubscriptionVariables = {
  villageId: Scalars['Int'];
  task: VillageTaskType;
};


export type NextVillageTaskExecutionChangedSubscription = { readonly nextVillageTaskExecutionChanged: TimestampFragment };

export type ClearQueueMutationVariables = {
  villageId: Scalars['Int'];
};


export type ClearQueueMutation = Pick<Mutation, 'clearQueue'>;

export type EnqueueBuildingMutationVariables = {
  input: EnqueueBuildingInput;
};


export type EnqueueBuildingMutation = Pick<Mutation, 'enqueueBuilding'>;

export type DequeueBuildingMutationVariables = {
  input: QueuedBuildingManipulationInput;
};


export type DequeueBuildingMutation = Pick<Mutation, 'dequeueBuilding'>;

export type DequeueBuildingAtFieldMutationVariables = {
  input: DequeueBuildingAtFieldInput;
};


export type DequeueBuildingAtFieldMutation = Pick<Mutation, 'dequeueBuildingAtField'>;

export type MoveQueuedBuildingDownMutationVariables = {
  input: QueuedBuildingManipulationInput;
};


export type MoveQueuedBuildingDownMutation = Pick<Mutation, 'moveQueuedBuildingDown'>;

export type MoveQueuedBuildingUpMutationVariables = {
  input: QueuedBuildingManipulationInput;
};


export type MoveQueuedBuildingUpMutation = Pick<Mutation, 'moveQueuedBuildingUp'>;

export type MoveQueuedBuildingAsHighAsPossibleMutationVariables = {
  villageId: Scalars['Int'];
  queueId: Scalars['ID'];
};


export type MoveQueuedBuildingAsHighAsPossibleMutation = Pick<Mutation, 'moveQueuedBuildingAsHighAsPossible'>;

export type GetQueuedBuildingsQueryVariables = {
  villageId: Scalars['Int'];
};


export type GetQueuedBuildingsQuery = { readonly buildingQueue: { readonly buildings: ReadonlyArray<(
      Pick<QueuedBuilding, 'canMoveDown' | 'canMoveUp' | 'name' | 'level' | 'type' | 'queueId' | 'fieldId'>
      & { readonly cost: CostFragment }
    )>, readonly totalCost: CostFragment } };

export type CostFragment = { readonly resources: ResourcesFragment, readonly buildTime: DurationFragment };

export type ResourcesFragment = Pick<Resources, 'wood' | 'clay' | 'iron' | 'crop' | 'freeCrop' | 'total'>;

export type DurationFragment = Pick<Duration, 'days' | 'hours' | 'minutes' | 'seconds'>;

export type OnQueueUpdatedSubscriptionVariables = {
  villageId: Scalars['Int'];
};


export type OnQueueUpdatedSubscription = Pick<Subscription, 'onQueueUpdated'>;

type TaskSettings_AutoBuildSettings_Fragment = (
  Pick<AutoBuildSettings, 'allow'>
  & { readonly coolDown: { readonly min: DurationFragment, readonly max: DurationFragment } }
);

type TaskSettings_AutoAdventureSettings_Fragment = (
  Pick<AutoAdventureSettings, 'allow'>
  & { readonly coolDown: { readonly min: DurationFragment, readonly max: DurationFragment } }
);

type TaskSettings_AutoUnitsSettings_Fragment = (
  Pick<AutoUnitsSettings, 'allow'>
  & { readonly coolDown: { readonly min: DurationFragment, readonly max: DurationFragment } }
);

type TaskSettings_AutoPartySettings_Fragment = (
  Pick<AutoPartySettings, 'allow'>
  & { readonly coolDown: { readonly min: DurationFragment, readonly max: DurationFragment } }
);

export type TaskSettingsFragment = TaskSettings_AutoBuildSettings_Fragment | TaskSettings_AutoAdventureSettings_Fragment | TaskSettings_AutoUnitsSettings_Fragment | TaskSettings_AutoPartySettings_Fragment;

export type DurationFragment = Pick<Duration, 'days' | 'hours' | 'minutes' | 'seconds'>;

export type AutoUnitsUnitSettingsFragment = Pick<AutoUnitsUnitSettings, 'autoBuild' | 'index' | 'targetAmount' | 'trainForever'>;

export type AutoUnitsBuildingSettingsFragment = (
  Pick<AutoUnitsBuildingSettings, 'allow'>
  & { readonly maxBuildTime: DurationFragment, readonly units: ReadonlyArray<AutoUnitsUnitSettingsFragment> }
);

export type GeneralSettingsFragment = Pick<GeneralSettings, 'allowTasks' | 'autoStart' | 'autoBuild' | 'autoUnits' | 'autoParty'>;

export type AutoAdventureSettingsFragment = (
  Pick<AutoAdventureSettings, 'adventureCriteria' | 'hardMinHealth' | 'normalMinHealth' | 'preferHard' | 'preferredVillageId'>
  & { readonly maxTravelTime: DurationFragment }
  & TaskSettings_AutoAdventureSettings_Fragment
);

export type GeneralVillageSettingsFragment = Pick<GeneralVillageSettings, 'allowTasks'>;

export type AutoStorageOptionSettingsFragment = Pick<AutoStorageOptionSettings, 'allow' | 'overflowLevel'>;

export type AutoStorageSettingsFragment = (
  Pick<AutoStorageSettings, 'allowFreeSpots'>
  & { readonly granary: AutoStorageOptionSettingsFragment, readonly warehouse: AutoStorageOptionSettingsFragment }
);

export type AutoBuildSettingsFragment = (
  Pick<AutoBuildSettings, 'autoCropFields' | 'minCrop'>
  & { readonly autoStorage: AutoStorageSettingsFragment }
  & TaskSettings_AutoBuildSettings_Fragment
);

export type AutoUnitsSettingsFragment = (
  Pick<AutoUnitsSettings, 'minCrop'>
  & { readonly barracks: AutoUnitsBuildingSettingsFragment, readonly stable: AutoUnitsBuildingSettingsFragment, readonly workshop: AutoUnitsBuildingSettingsFragment, readonly residence: AutoUnitsBuildingSettingsFragment }
  & TaskSettings_AutoUnitsSettings_Fragment
);

export type AutoPartySettingsFragment = (
  Pick<AutoPartySettings, 'minCulturePoints' | 'partyType'>
  & TaskSettings_AutoPartySettings_Fragment
);

export type GetGeneralSettingsQueryVariables = {};


export type GetGeneralSettingsQuery = { readonly generalSettings: GeneralSettingsFragment };

export type GetHeroSettingsQueryVariables = {};


export type GetHeroSettingsQuery = { readonly hero: { readonly autoAdventure: AutoAdventureSettingsFragment } };

export type GetGeneralVillageSettingsQueryVariables = {
  villageId: Scalars['Int'];
};


export type GetGeneralVillageSettingsQuery = { readonly generalVillageSettings: GeneralVillageSettingsFragment };

export type GetAutoBuildSettingsQueryVariables = {
  villageId: Scalars['Int'];
};


export type GetAutoBuildSettingsQuery = { readonly autoBuildSettings: AutoBuildSettingsFragment };

export type GetAutoUnitsSettingsQueryVariables = {
  villageId: Scalars['Int'];
};


export type GetAutoUnitsSettingsQuery = { readonly autoUnitsSettings: AutoUnitsSettingsFragment };

export type GetAutoPartySettingsQueryVariables = {
  villageId: Scalars['Int'];
};


export type GetAutoPartySettingsQuery = { readonly autoPartySettings: AutoPartySettingsFragment };

export type UpdateGeneralSettingsMutationVariables = {
  settings: UpdateGeneralSettingsInput;
};


export type UpdateGeneralSettingsMutation = Pick<Mutation, 'updateGeneralSettings'>;

export type UpdateAutoAdventureSettingsMutationVariables = {
  settings: UpdateAutoAdventureSettingsInput;
};


export type UpdateAutoAdventureSettingsMutation = Pick<Mutation, 'updateAutoAdventureSettings'>;

export type UpdateGeneralVillageSettingsMutationVariables = {
  settings: UpdateGeneralVillageSettingsInput;
};


export type UpdateGeneralVillageSettingsMutation = Pick<Mutation, 'updateGeneralVillageSettings'>;

export type UpdateAutoBuildVillageSettingsMutationVariables = {
  settings: UpdateAutoBuildVillageSettingsInput;
};


export type UpdateAutoBuildVillageSettingsMutation = Pick<Mutation, 'updateAutoBuildVillageSettings'>;

export type UpdateAutoUnitsUnitSettingsMutationVariables = {
  settings: UpdateAutoUnitsUnitSettingsInput;
};


export type UpdateAutoUnitsUnitSettingsMutation = Pick<Mutation, 'updateAutoUnitsUnitSettings'>;

export type UpdateAutoUnitsBuildingSettingsMutationVariables = {
  settings: UpdateAutoUnitsBuildingSettingsInput;
};


export type UpdateAutoUnitsBuildingSettingsMutation = Pick<Mutation, 'updateAutoUnitsBuildingSettings'>;

export type UpdateAutoUnitsSettingsMutationVariables = {
  settings: UpdateAutoUnitsSettingsInput;
};


export type UpdateAutoUnitsSettingsMutation = Pick<Mutation, 'updateAutoUnitsSettings'>;

export type UpdateAutoPartySettingsMutationVariables = {
  settings: UpdateAutoPartySettingsInput;
};


export type UpdateAutoPartySettingsMutation = Pick<Mutation, 'updateAutoPartySettings'>;

export type ResetSettingsMutationVariables = {
  type: SettingsType;
};


export type ResetSettingsMutation = Pick<Mutation, 'resetSettings'>;

export type ResetVillageSettingsMutationVariables = {
  villageId: Scalars['Int'];
  type: VillageSettingsType;
};


export type ResetVillageSettingsMutation = Pick<Mutation, 'resetVillageSettings'>;

export type OnGeneralSettingsChangedSubscriptionVariables = {};


export type OnGeneralSettingsChangedSubscription = { readonly generalSettingsChanged: GeneralSettingsFragment };

export type OnAutoAdventureSettingsChangedSubscriptionVariables = {};


export type OnAutoAdventureSettingsChangedSubscription = { readonly autoAdventureSettingsChanged: AutoAdventureSettingsFragment };

export type OnGeneralVillageSettingsChangedSubscriptionVariables = {
  villageId: Scalars['Int'];
};


export type OnGeneralVillageSettingsChangedSubscription = { readonly generalVillageSettingsChanged: GeneralVillageSettingsFragment };

export type OnAutoBuildSettingsChangedSubscriptionVariables = {
  villageId: Scalars['Int'];
};


export type OnAutoBuildSettingsChangedSubscription = { readonly autoBuildSettingsChanged: AutoBuildSettingsFragment };

export type OnAutoUnitsSettingsChangedSubscriptionVariables = {
  villageId: Scalars['Int'];
};


export type OnAutoUnitsSettingsChangedSubscription = { readonly autoUnitsSettingsChanged: AutoUnitsSettingsFragment };

export type OnAutoPartySettingsChangedSubscriptionVariables = {
  villageId: Scalars['Int'];
};


export type OnAutoPartySettingsChangedSubscription = { readonly autoPartySettingsChanged: AutoPartySettingsFragment };

export type GetUnitInfoQueryVariables = {
  index: Scalars['Int'];
};


export type GetUnitInfoQuery = { readonly unitInfo: Pick<UnitInfo, 'name'> };

export type VillageCrannyCapacityFragment = Pick<VillageCrannyCapacity, 'actual' | 'ongoing' | 'total'>;

export type GetVillageByIdQueryVariables = {
  villageId: Scalars['Int'];
};


export type GetVillageByIdQuery = { readonly village: Maybe<(
    Pick<Village, 'id' | 'name'>
    & { readonly coords: CoordsFragment, readonly resources: { readonly amount: ResourcesFragment, readonly capacity: Pick<VillageCapacity, 'granary' | 'warehouse'>, readonly production: ResourcesFragment } }
  )> };

export type CoordsFragment = Pick<Coords, 'x' | 'y'>;

export type ResourcesFragment = Pick<Resources, 'wood' | 'clay' | 'iron' | 'crop' | 'freeCrop' | 'total'>;

export type GetVillagesQueryVariables = {};


export type GetVillagesQuery = { readonly villages: ReadonlyArray<(
    Pick<Village, 'id' | 'name' | 'isCapital'>
    & { readonly coords: CoordsFragment }
  )> };

export type ActiveVillageIdQueryVariables = {};


export type ActiveVillageIdQuery = Pick<Query, 'activeVillageId'>;

export type CrannyCapacityQueryVariables = {
  villageId: Scalars['Int'];
};


export type CrannyCapacityQuery = { readonly crannyCapacity: VillageCrannyCapacityFragment };

export type UpdateVillageSubscriptionVariables = {};


export type UpdateVillageSubscription = Pick<Subscription, 'updateVillage'>;

export type UpdateVillagesSubscriptionVariables = {};


export type UpdateVillagesSubscription = Pick<Subscription, 'updateVillages'>;

export type ActiveVillageIdChangedSubscriptionVariables = {};


export type ActiveVillageIdChangedSubscription = Pick<Subscription, 'activeVillageIdChanged'>;

export type CrannyCapacityChangedSubscriptionVariables = {
  villageId: Scalars['Int'];
};


export type CrannyCapacityChangedSubscription = Pick<Subscription, 'crannyCapacityChanged'>;
