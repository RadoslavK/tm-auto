import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | undefined;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AccountInput = {
  readonly username: Scalars['String'];
  readonly password: Scalars['String'];
  readonly server: Scalars['String'];
};

export type AccountSettings = {
  readonly allowTasks: Scalars['Boolean'];
  readonly tasksCoolDown: CoolDown;
  readonly autoStart: Scalars['Boolean'];
  readonly autoBuild: Scalars['Boolean'];
  readonly autoUnits: Scalars['Boolean'];
  readonly autoParty: Scalars['Boolean'];
};

export enum AdventureCriteria {
  Closest = 'Closest',
  Furthest = 'Furthest',
  Random = 'Random',
  FirstToExpire = 'FirstToExpire'
}

export type AutoAdventureSettings = {
  readonly allow: Scalars['Boolean'];
  readonly coolDown: CoolDown;
  readonly adventureCriteria: AdventureCriteria;
  readonly preferHard: Scalars['Boolean'];
  readonly normalMinHealth: Scalars['Int'];
  readonly hardMinHealth: Scalars['Int'];
  readonly maxTravelTime: Duration;
  readonly preferredVillageId: Maybe<Scalars['ID']>;
};

export type AutoBuildLogEntryContent = {
  readonly name: Scalars['String'];
  readonly type: Scalars['Int'];
  readonly level: Scalars['Int'];
  readonly fieldId: Scalars['Int'];
};

export type AutoBuildSettings = {
  readonly allow: Scalars['Boolean'];
  readonly allowDualQueue: Scalars['Boolean'];
  readonly coolDown: CoolDown;
  readonly autoCropFields: Scalars['Boolean'];
  readonly minCrop: Scalars['Int'];
  readonly useHeroResources: Scalars['Boolean'];
  readonly autoStorage: AutoStorageSettings;
};

export type AutoMentorSettings = {
  readonly acceptTaskRewards: Scalars['Boolean'];
  readonly acceptDailyRewards: Scalars['Boolean'];
};

export type AutoPartySettings = {
  readonly coolDown: CoolDown;
  readonly allowSmall: Scalars['Boolean'];
  readonly allowLarge: Scalars['Boolean'];
  readonly minCulturePointsSmall: Scalars['Int'];
  readonly minCulturePointsLarge: Scalars['Int'];
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

export type AutoUnitsBuildingSettings = {
  readonly allow: Scalars['Boolean'];
  readonly maxBuildTime: Duration;
  readonly units: ReadonlyArray<AutoUnitsUnitSettings>;
};

export type AutoUnitsLogEntryContent = {
  readonly amount: Scalars['Int'];
  readonly index: Scalars['Int'];
  readonly tribe: Scalars['Int'];
  readonly unitName: Scalars['String'];
};

export type AutoUnitsSettings = {
  readonly allow: Scalars['Boolean'];
  readonly coolDown: CoolDown;
  readonly minCrop: Scalars['Int'];
  readonly barracks: AutoUnitsBuildingSettings;
  readonly stable: AutoUnitsBuildingSettings;
  readonly workshop: AutoUnitsBuildingSettings;
  readonly residence: AutoUnitsBuildingSettings;
};

export type AutoUnitsUnitSettings = {
  readonly index: Scalars['Int'];
  readonly autoBuild: Scalars['Boolean'];
  readonly trainForever: Scalars['Boolean'];
  readonly targetAmount: Scalars['Int'];
};

export type AvailableNewBuildingsInput = {
  readonly fieldId: Scalars['Int'];
  readonly villageId: Scalars['ID'];
};

export enum BotState {
  None = 'None',
  Pending = 'Pending',
  Running = 'Running',
  Stopping = 'Stopping',
  Paused = 'Paused'
}

export type BuildingInfo = {
  readonly maxLevel: Scalars['Int'];
  readonly name: Scalars['String'];
};

export type BuildingInProgress = {
  readonly level: Scalars['Int'];
  readonly finishedAt: Timestamp;
  readonly type: Scalars['Int'];
  readonly fieldId: Scalars['Int'];
};

export type BuildingLevelInfo = {
  readonly cost: Resources;
};

export type BuildingQueue = {
  readonly buildingRanges: ReadonlyArray<QueuedBuildingRange>;
  readonly totalBuildingTime: Duration;
  readonly totalCost: Resources;
};

export type BuildingSpot = {
  readonly fieldId: Scalars['Int'];
  readonly level: BuildingSpotLevel;
  readonly type: Scalars['Int'];
};

export type BuildingSpotLevel = {
  readonly actual: Scalars['Int'];
  readonly ongoing: Maybe<Scalars['Int']>;
  readonly queued: Maybe<Scalars['Int']>;
  readonly total: Scalars['Int'];
};

export type BuildingSpots = {
  readonly infrastructure: ReadonlyArray<BuildingSpot>;
  readonly resources: ResourceFields;
};

export enum ClaimHeroResourcesReason {
  AutoBuild = 'AutoBuild'
}

export type ClearQueueInput = {
  readonly villageId: Scalars['ID'];
};

export type CoolDown = {
  readonly min: Duration;
  readonly max: Duration;
};

export type CoolDownInput = {
  readonly min: DurationInput;
  readonly max: DurationInput;
};

export type Coords = {
  readonly x: Scalars['Int'];
  readonly y: Scalars['Int'];
};

export type DequeueBuildingAtFieldInput = {
  readonly targetLevel: Maybe<Scalars['Int']>;
  readonly fieldId: Scalars['Int'];
  readonly villageId: Scalars['ID'];
};

export type DequeueBuildingInput = {
  readonly queueId: Scalars['ID'];
  readonly villageId: Scalars['ID'];
};

export type Duration = {
  readonly days: Scalars['Int'];
  readonly hours: Scalars['Int'];
  readonly minutes: Scalars['Int'];
  readonly seconds: Scalars['Int'];
};

export type DurationInput = {
  readonly days: Scalars['Int'];
  readonly hours: Scalars['Int'];
  readonly minutes: Scalars['Int'];
  readonly seconds: Scalars['Int'];
};

export type EnqueueBuildingInput = {
  readonly fieldId: Scalars['Int'];
  readonly type: Scalars['Int'];
  readonly villageId: Scalars['ID'];
  readonly targetLevel: Maybe<Scalars['Int']>;
};

export type GameInfo = {
  readonly tribe: Scalars['Int'];
};

export type GeneralSettings = {
  readonly dataPath: Scalars['String'];
  readonly chromePath: Scalars['String'];
  readonly headlessChrome: Scalars['Boolean'];
};

export type GeneralVillageSettings = {
  readonly allowTasks: Scalars['Boolean'];
};

export type HeroInformation = {
  readonly health: Scalars['Int'];
  readonly state: HeroState;
  readonly village: Maybe<Village>;
};

export enum HeroState {
  Unknown = 'Unknown',
  InVillage = 'InVillage',
  Dead = 'Dead',
  Reviving = 'Reviving',
  OnAdventure = 'OnAdventure'
}

export type LogEntry = {
  readonly timestamp: Timestamp;
  readonly village: Maybe<Village>;
  readonly content: LogEntryContent;
};

export type LogEntryContent = TextLogEntryContent | AutoBuildLogEntryContent | AutoUnitsLogEntryContent | ResourceClaimLogEntryContent;

export type Mutation = {
  readonly clearQueue: Maybe<Scalars['Boolean']>;
  readonly createAccount: UserAccount;
  readonly deleteAccount: UserAccount;
  readonly dequeueBuilding: Maybe<Scalars['Boolean']>;
  readonly dequeueBuildingAtField: Maybe<Scalars['Boolean']>;
  readonly enqueueBuilding: Maybe<Scalars['Boolean']>;
  readonly moveQueuedBuildingAsHighAsPossible: Maybe<Scalars['Boolean']>;
  readonly moveQueuedBuildingToIndex: Maybe<Scalars['Boolean']>;
  readonly moveQueuedBuildingsBlockToIndex: Maybe<Scalars['Boolean']>;
  readonly refreshVillage: Maybe<Scalars['Boolean']>;
  readonly resetAccountSettings: AccountSettings;
  readonly resetAutoAdventureSettings: AutoAdventureSettings;
  readonly resetAutoBuildSettings: AutoBuildSettings;
  readonly resetAutoMentorSettings: AutoMentorSettings;
  readonly resetAutoPartySettings: AutoPartySettings;
  readonly resetAutoUnitsSettings: AutoUnitsSettings;
  readonly resetGeneralSettings: GeneralSettings;
  readonly resetGeneralVillageSettings: GeneralVillageSettings;
  readonly resetNextTaskExecution: Timestamp;
  readonly resetNextTasksExecution: Timestamp;
  readonly resetNextVillageTaskExecution: Timestamp;
  readonly setNextTaskExecution: Timestamp;
  readonly setNextTasksExecution: Timestamp;
  readonly setNextVillageTaskExecution: Timestamp;
  readonly signIn: Maybe<Scalars['Boolean']>;
  readonly signOut: Maybe<Scalars['Boolean']>;
  readonly startBot: Maybe<Scalars['Boolean']>;
  readonly stopBot: Maybe<Scalars['Boolean']>;
  readonly updateAccount: UserAccount;
  readonly updateAccountSettings: AccountSettings;
  readonly updateAutoAdventureSettings: AutoAdventureSettings;
  readonly updateAutoBuildSettings: AutoBuildSettings;
  readonly updateAutoMentorSettings: AutoMentorSettings;
  readonly updateAutoPartySettings: AutoPartySettings;
  readonly updateAutoUnitsBuildingSettings: AutoUnitsSettings;
  readonly updateAutoUnitsSettings: AutoUnitsSettings;
  readonly updateAutoUnitsUnitSettings: AutoUnitsSettings;
  readonly updateGeneralSettings: GeneralSettings;
  readonly updateGeneralVillageSettings: GeneralVillageSettings;
};


export type MutationClearQueueArgs = {
  villageId: Scalars['ID'];
};


export type MutationCreateAccountArgs = {
  account: AccountInput;
};


export type MutationDeleteAccountArgs = {
  id: Scalars['ID'];
};


export type MutationDequeueBuildingArgs = {
  input: DequeueBuildingInput;
};


export type MutationDequeueBuildingAtFieldArgs = {
  input: DequeueBuildingAtFieldInput;
};


export type MutationEnqueueBuildingArgs = {
  input: EnqueueBuildingInput;
};


export type MutationMoveQueuedBuildingAsHighAsPossibleArgs = {
  villageId: Scalars['ID'];
  queueId: Scalars['ID'];
};


export type MutationMoveQueuedBuildingToIndexArgs = {
  villageId: Scalars['ID'];
  queueId: Scalars['ID'];
  index: Scalars['Int'];
};


export type MutationMoveQueuedBuildingsBlockToIndexArgs = {
  villageId: Scalars['ID'];
  topBuildingQueueId: Scalars['ID'];
  bottomBuildingQueueId: Scalars['ID'];
  index: Scalars['Int'];
};


export type MutationRefreshVillageArgs = {
  villageId: Scalars['ID'];
};


export type MutationResetAutoBuildSettingsArgs = {
  villageId: Scalars['ID'];
};


export type MutationResetAutoPartySettingsArgs = {
  villageId: Scalars['ID'];
};


export type MutationResetAutoUnitsSettingsArgs = {
  villageId: Scalars['ID'];
};


export type MutationResetGeneralVillageSettingsArgs = {
  villageId: Scalars['ID'];
};


export type MutationResetNextTaskExecutionArgs = {
  task: TaskType;
};


export type MutationResetNextVillageTaskExecutionArgs = {
  villageId: Scalars['ID'];
  task: TaskType;
};


export type MutationSetNextTaskExecutionArgs = {
  task: TaskType;
  delay: DurationInput;
};


export type MutationSetNextTasksExecutionArgs = {
  delay: DurationInput;
};


export type MutationSetNextVillageTaskExecutionArgs = {
  villageId: Scalars['ID'];
  task: TaskType;
  delay: DurationInput;
};


export type MutationSignInArgs = {
  accountId: Scalars['ID'];
};


export type MutationUpdateAccountArgs = {
  id: Scalars['ID'];
  account: AccountInput;
};


export type MutationUpdateAccountSettingsArgs = {
  settings: UpdateAccountSettingsInput;
};


export type MutationUpdateAutoAdventureSettingsArgs = {
  settings: UpdateAutoAdventureSettingsInput;
};


export type MutationUpdateAutoBuildSettingsArgs = {
  villageId: Scalars['ID'];
  settings: UpdateAutoBuildSettingsInput;
};


export type MutationUpdateAutoMentorSettingsArgs = {
  settings: UpdateAutoMentorSettingsInput;
};


export type MutationUpdateAutoPartySettingsArgs = {
  villageId: Scalars['ID'];
  settings: UpdateAutoPartySettingsInput;
};


export type MutationUpdateAutoUnitsBuildingSettingsArgs = {
  villageId: Scalars['ID'];
  buildingType: Scalars['Int'];
  settings: UpdateAutoUnitsBuildingSettingsInput;
};


export type MutationUpdateAutoUnitsSettingsArgs = {
  villageId: Scalars['ID'];
  settings: UpdateAutoUnitsSettingsInput;
};


export type MutationUpdateAutoUnitsUnitSettingsArgs = {
  villageId: Scalars['ID'];
  settings: UpdateAutoUnitsUnitSettingsInput;
};


export type MutationUpdateGeneralSettingsArgs = {
  settings: UpdateGeneralSettingsInput;
};


export type MutationUpdateGeneralVillageSettingsArgs = {
  villageId: Scalars['ID'];
  settings: UpdateGeneralVillageSettingsInput;
};

export type Query = {
  readonly account: UserAccount;
  readonly accountSettings: AccountSettings;
  readonly accounts: ReadonlyArray<UserAccount>;
  readonly activeVillageId: Scalars['ID'];
  readonly autoAdventureSettings: AutoAdventureSettings;
  readonly autoBuildSettings: AutoBuildSettings;
  readonly autoMentorSettings: AutoMentorSettings;
  readonly autoPartySettings: AutoPartySettings;
  readonly autoUnitsSettings: AutoUnitsSettings;
  readonly availableNewBuildingsTypes: ReadonlyArray<Scalars['Int']>;
  readonly botState: BotState;
  readonly buildingInfo: BuildingInfo;
  readonly buildingLevelInfo: BuildingLevelInfo;
  readonly buildingQueue: BuildingQueue;
  readonly buildingSpots: BuildingSpots;
  readonly buildingsInProgress: ReadonlyArray<BuildingInProgress>;
  readonly canMoveQueuedBuildingToIndex: Scalars['Boolean'];
  readonly canMoveQueuedBuildingsBlockToIndex: Scalars['Boolean'];
  readonly crannyCapacity: VillageCrannyCapacity;
  readonly currentAccount: UserAccount;
  readonly gameInfo: GameInfo;
  readonly generalSettings: GeneralSettings;
  readonly generalVillageSettings: GeneralVillageSettings;
  readonly heroInformation: HeroInformation;
  readonly isAccountTaken: Scalars['Boolean'];
  readonly isBotActive: Scalars['Boolean'];
  readonly lastSignedAccountId: Maybe<Scalars['String']>;
  readonly logEntries: ReadonlyArray<LogEntry>;
  readonly nextTaskExecution: Timestamp;
  readonly nextTasksExecution: Timestamp;
  readonly nextVillageTaskExecution: Timestamp;
  readonly unitInfo: UnitInfo;
  readonly village: Maybe<Village>;
  readonly villages: ReadonlyArray<Village>;
};


export type QueryAccountArgs = {
  id: Scalars['ID'];
};


export type QueryAutoBuildSettingsArgs = {
  villageId: Scalars['ID'];
};


export type QueryAutoPartySettingsArgs = {
  villageId: Scalars['ID'];
};


export type QueryAutoUnitsSettingsArgs = {
  villageId: Scalars['ID'];
};


export type QueryAvailableNewBuildingsTypesArgs = {
  input: AvailableNewBuildingsInput;
};


export type QueryBuildingInfoArgs = {
  buildingType: Scalars['Int'];
};


export type QueryBuildingLevelInfoArgs = {
  buildingType: Scalars['Int'];
  level: Scalars['Int'];
};


export type QueryBuildingQueueArgs = {
  villageId: Scalars['ID'];
};


export type QueryBuildingSpotsArgs = {
  villageId: Scalars['ID'];
};


export type QueryBuildingsInProgressArgs = {
  villageId: Scalars['ID'];
};


export type QueryCanMoveQueuedBuildingToIndexArgs = {
  villageId: Scalars['ID'];
  queueId: Scalars['ID'];
  index: Scalars['Int'];
};


export type QueryCanMoveQueuedBuildingsBlockToIndexArgs = {
  villageId: Scalars['ID'];
  topBuildingQueueId: Scalars['ID'];
  bottomBuildingQueueId: Scalars['ID'];
  index: Scalars['Int'];
};


export type QueryCrannyCapacityArgs = {
  villageId: Scalars['ID'];
};


export type QueryGeneralVillageSettingsArgs = {
  villageId: Scalars['ID'];
};


export type QueryIsAccountTakenArgs = {
  account: AccountInput;
};


export type QueryNextTaskExecutionArgs = {
  task: TaskType;
};


export type QueryNextVillageTaskExecutionArgs = {
  villageId: Scalars['ID'];
  task: TaskType;
};


export type QueryUnitInfoArgs = {
  index: Scalars['Int'];
};


export type QueryVillageArgs = {
  villageId: Scalars['ID'];
};

export type QueuedBuilding = {
  readonly buildingTime: Duration;
  readonly level: Scalars['Int'];
  readonly type: Scalars['Int'];
  readonly queueId: Scalars['ID'];
  readonly queueIndex: Scalars['Int'];
  readonly fieldId: Scalars['Int'];
};

export type QueuedBuildingRange = {
  readonly id: Scalars['String'];
  readonly buildings: ReadonlyArray<QueuedBuilding>;
  readonly type: Scalars['Int'];
  readonly fieldId: Scalars['Int'];
  readonly buildingTime: Duration;
  readonly cost: Resources;
};

export type ResourceClaimLogEntryContent = {
  readonly reason: ClaimHeroResourcesReason;
  readonly resources: Resources;
};

export type ResourceFields = {
  readonly wood: ReadonlyArray<BuildingSpot>;
  readonly clay: ReadonlyArray<BuildingSpot>;
  readonly iron: ReadonlyArray<BuildingSpot>;
  readonly crop: ReadonlyArray<BuildingSpot>;
};

export type Resources = {
  readonly wood: Scalars['Int'];
  readonly clay: Scalars['Int'];
  readonly iron: Scalars['Int'];
  readonly crop: Scalars['Int'];
  readonly freeCrop: Scalars['Int'];
  readonly total: Scalars['Int'];
};

export type Subscription = {
  readonly activeVillageIdChanged: Scalars['ID'];
  readonly actualBuildingLevelsUpdated: Maybe<Scalars['Boolean']>;
  readonly botActivityChanged: Scalars['Boolean'];
  readonly botStateChanged: BotState;
  readonly buildingsInProgressUpdated: ReadonlyArray<BuildingInProgress>;
  readonly heroInformationUpdated: HeroInformation;
  readonly logEntryAdded: LogEntry;
  readonly nextTaskExecutionChanged: Timestamp;
  readonly nextTasksExecutionChanged: Timestamp;
  readonly nextVillageTaskExecutionChanged: Timestamp;
  readonly queueUpdated: BuildingQueue;
  readonly villageUpdated: Village;
  readonly villagesUpdated: ReadonlyArray<Village>;
};


export type SubscriptionActualBuildingLevelsUpdatedArgs = {
  villageId: Scalars['ID'];
};


export type SubscriptionBuildingsInProgressUpdatedArgs = {
  villageId: Scalars['ID'];
};


export type SubscriptionNextTaskExecutionChangedArgs = {
  task: TaskType;
};


export type SubscriptionNextVillageTaskExecutionChangedArgs = {
  villageId: Scalars['ID'];
  task: TaskType;
};


export type SubscriptionQueueUpdatedArgs = {
  villageId: Scalars['ID'];
};


export type SubscriptionVillageUpdatedArgs = {
  villageId: Scalars['ID'];
};

export enum TaskType {
  AutoAdventure = 'AutoAdventure',
  AutoBuild = 'AutoBuild',
  AutoUnits = 'AutoUnits',
  AutoParty = 'AutoParty',
  AutoMentor = 'AutoMentor'
}

export type TextLogEntryContent = {
  readonly message: Scalars['String'];
  readonly messageType: TextLogEntryType;
};

export enum TextLogEntryType {
  Info = 'Info',
  Error = 'Error'
}

export type Timestamp = {
  readonly totalSeconds: Scalars['Int'];
};

export type TimestampInput = {
  readonly totalSeconds: Scalars['Int'];
};

export type UnitInfo = {
  readonly name: Scalars['String'];
};

export type UpdateAccountSettingsInput = {
  readonly allowTasks: Scalars['Boolean'];
  readonly tasksCoolDown: CoolDownInput;
  readonly autoBuild: Scalars['Boolean'];
  readonly autoUnits: Scalars['Boolean'];
  readonly autoStart: Scalars['Boolean'];
  readonly autoParty: Scalars['Boolean'];
};

export type UpdateAutoAdventureSettingsInput = {
  readonly allow: Scalars['Boolean'];
  readonly coolDown: CoolDownInput;
  readonly adventureCriteria: AdventureCriteria;
  readonly preferHard: Scalars['Boolean'];
  readonly normalMinHealth: Scalars['Int'];
  readonly hardMinHealth: Scalars['Int'];
  readonly maxTravelTime: DurationInput;
  readonly preferredVillageId: Maybe<Scalars['ID']>;
};

export type UpdateAutoBuildSettingsInput = {
  readonly allow: Scalars['Boolean'];
  readonly allowDualQueue: Scalars['Boolean'];
  readonly coolDown: CoolDownInput;
  readonly autoCropFields: Scalars['Boolean'];
  readonly minCrop: Scalars['Int'];
  readonly useHeroResources: Scalars['Boolean'];
  readonly autoStorage: UpdateAutoStorageSettingsInput;
};

export type UpdateAutoMentorSettingsInput = {
  readonly acceptTaskRewards: Scalars['Boolean'];
  readonly acceptDailyRewards: Scalars['Boolean'];
};

export type UpdateAutoPartySettingsInput = {
  readonly allowSmall: Scalars['Boolean'];
  readonly allowLarge: Scalars['Boolean'];
  readonly coolDown: CoolDownInput;
  readonly minCulturePointsSmall: Scalars['Int'];
  readonly minCulturePointsLarge: Scalars['Int'];
};

export type UpdateAutoStorageOptionSettingsInput = {
  readonly allow: Scalars['Boolean'];
  readonly overflowLevel: Scalars['Int'];
};

export type UpdateAutoStorageSettingsInput = {
  readonly allowFreeSpots: Scalars['Boolean'];
  readonly granary: UpdateAutoStorageOptionSettingsInput;
  readonly warehouse: UpdateAutoStorageOptionSettingsInput;
};

export type UpdateAutoUnitsBuildingSettingsInput = {
  readonly allow: Scalars['Boolean'];
  readonly maxBuildTime: DurationInput;
};

export type UpdateAutoUnitsSettingsInput = {
  readonly allow: Scalars['Boolean'];
  readonly coolDown: CoolDownInput;
  readonly minCrop: Scalars['Int'];
};

export type UpdateAutoUnitsUnitSettingsInput = {
  readonly index: Scalars['Int'];
  readonly autoBuild: Scalars['Boolean'];
  readonly trainForever: Scalars['Boolean'];
  readonly targetAmount: Scalars['Int'];
};

export type UpdateGeneralSettingsInput = {
  readonly dataPath: Scalars['String'];
  readonly chromePath: Scalars['String'];
  readonly headlessChrome: Scalars['Boolean'];
};

export type UpdateGeneralVillageSettingsInput = {
  readonly allowTasks: Scalars['Boolean'];
};

export type UserAccount = {
  readonly id: Scalars['ID'];
  readonly username: Scalars['String'];
  readonly password: Scalars['String'];
  readonly server: Scalars['String'];
};

export type Village = {
  readonly id: Scalars['ID'];
  readonly coords: Coords;
  readonly name: Scalars['String'];
  readonly resources: VillageResources;
  readonly isCapital: Scalars['Boolean'];
};

export type VillageCapacity = {
  readonly granary: Scalars['Int'];
  readonly warehouse: Scalars['Int'];
};

export type VillageCrannyCapacity = {
  readonly actual: Scalars['Int'];
  readonly ongoing: Scalars['Int'];
  readonly total: Scalars['Int'];
};

export type VillageResources = {
  readonly amount: Resources;
  readonly capacity: VillageCapacity;
  readonly production: Resources;
};

export type UserAccountFragment = { readonly id: string, readonly username: string, readonly password: string, readonly server: string };

export type GetAccountsQueryVariables = {};


export type GetAccountsQuery = { readonly accounts: ReadonlyArray<UserAccountFragment> };

export type GetCurrentAccountQueryVariables = {};


export type GetCurrentAccountQuery = { readonly currentAccount: UserAccountFragment };

export type GetAccountQueryVariables = {
  id: Scalars['ID'];
};


export type GetAccountQuery = { readonly account: UserAccountFragment };

export type GetLastSignedAccountIdQueryVariables = {};


export type GetLastSignedAccountIdQuery = { readonly lastSignedAccountId: Maybe<string> };

export type IsAccountTakenQueryVariables = {
  account: AccountInput;
};


export type IsAccountTakenQuery = { readonly isAccountTaken: boolean };

export type CreateAccountMutationVariables = {
  account: AccountInput;
};


export type CreateAccountMutation = { readonly createAccount: UserAccountFragment };

export type UpdateAccountMutationVariables = {
  id: Scalars['ID'];
  account: AccountInput;
};


export type UpdateAccountMutation = { readonly updateAccount: UserAccountFragment };

export type DeleteAccountMutationVariables = {
  id: Scalars['ID'];
};


export type DeleteAccountMutation = { readonly deleteAccount: UserAccountFragment };

export type BuildingSpotFragment = { readonly fieldId: number, readonly type: number, readonly level: { readonly actual: number, readonly ongoing: Maybe<number>, readonly queued: Maybe<number>, readonly total: number } };

export type BuildingSpotsFragment = { readonly infrastructure: ReadonlyArray<BuildingSpotFragment>, readonly resources: { readonly wood: ReadonlyArray<BuildingSpotFragment>, readonly clay: ReadonlyArray<BuildingSpotFragment>, readonly iron: ReadonlyArray<BuildingSpotFragment>, readonly crop: ReadonlyArray<BuildingSpotFragment> } };

export type GetBuildingSpotsQueryVariables = {
  villageId: Scalars['ID'];
};


export type GetBuildingSpotsQuery = { readonly buildingSpots: BuildingSpotsFragment };

export type GetAvailableNewBuildingTypesQueryVariables = {
  input: AvailableNewBuildingsInput;
};


export type GetAvailableNewBuildingTypesQuery = { readonly availableNewBuildingsTypes: ReadonlyArray<number> };

export type GetBuildingInfoQueryVariables = {
  buildingType: Scalars['Int'];
};


export type GetBuildingInfoQuery = { readonly buildingInfo: { readonly maxLevel: number, readonly name: string } };

export type GetBuildingLevelInfoQueryVariables = {
  buildingType: Scalars['Int'];
  level: Scalars['Int'];
};


export type GetBuildingLevelInfoQuery = { readonly buildingLevelInfo: { readonly cost: ResourcesFragment } };

export type OnActualBuildingLevelsUpdatedSubscriptionVariables = {
  villageId: Scalars['ID'];
};


export type OnActualBuildingLevelsUpdatedSubscription = { readonly actualBuildingLevelsUpdated: Maybe<boolean> };

export type BuildingInProgressFragment = { readonly level: number, readonly type: number, readonly fieldId: number, readonly finishedAt: TimestampFragment };

export type GetBuildingsInProgressQueryVariables = {
  villageId: Scalars['ID'];
};


export type GetBuildingsInProgressQuery = { readonly buildingsInProgress: ReadonlyArray<BuildingInProgressFragment> };

export type OnBuildingsInProgressUpdatedSubscriptionVariables = {
  villageId: Scalars['ID'];
};


export type OnBuildingsInProgressUpdatedSubscription = { readonly buildingsInProgressUpdated: ReadonlyArray<BuildingInProgressFragment> };

export type GetBotStateQueryVariables = {};


export type GetBotStateQuery = { readonly botState: BotState };

export type IsBotActiveQueryVariables = {};


export type IsBotActiveQuery = { readonly isBotActive: boolean };

export type StartBotMutationVariables = {};


export type StartBotMutation = { readonly startBot: Maybe<boolean> };

export type StopBotMutationVariables = {};


export type StopBotMutation = { readonly stopBot: Maybe<boolean> };

export type SignInMutationVariables = {
  accountId: Scalars['ID'];
};


export type SignInMutation = { readonly signIn: Maybe<boolean> };

export type SignOutMutationVariables = {};


export type SignOutMutation = { readonly signOut: Maybe<boolean> };

export type OnBotRunningChangedSubscriptionVariables = {};


export type OnBotRunningChangedSubscription = { readonly botStateChanged: BotState };

export type OnBotActivityChangedSubscriptionVariables = {};


export type OnBotActivityChangedSubscription = { readonly botActivityChanged: boolean };

export type GetGameInfoQueryVariables = {};


export type GetGameInfoQuery = { readonly gameInfo: { readonly tribe: number } };

export type HeroInformationFragment = { readonly health: number, readonly state: HeroState, readonly village: Maybe<{ readonly id: string, readonly name: string, readonly coords: CoordsFragment }> };

export type GetHeroInformationQueryVariables = {};


export type GetHeroInformationQuery = { readonly heroInformation: HeroInformationFragment };

export type OnHeroInformationUpdatedSubscriptionVariables = {};


export type OnHeroInformationUpdatedSubscription = { readonly heroInformationUpdated: HeroInformationFragment };

export type LogEntryFragment = { readonly timestamp: TimestampFragment, readonly village: Maybe<{ readonly id: string, readonly name: string, readonly coords: CoordsFragment }>, readonly content: { readonly message: string, readonly messageType: TextLogEntryType } | { readonly fieldId: number, readonly level: number, readonly name: string, readonly type: number } | { readonly amount: number, readonly index: number, readonly tribe: number, readonly unitName: string } | { readonly reason: ClaimHeroResourcesReason, readonly resources: ResourcesFragment } };

export type GetLogEntriesQueryVariables = {};


export type GetLogEntriesQuery = { readonly logEntries: ReadonlyArray<LogEntryFragment> };

export type OnLogEntryAddedSubscriptionVariables = {};


export type OnLogEntryAddedSubscription = { readonly logEntryAdded: LogEntryFragment };

export type TimestampFragment = { readonly totalSeconds: number };

export type ResourcesFragment = { readonly wood: number, readonly clay: number, readonly iron: number, readonly crop: number, readonly freeCrop: number, readonly total: number };

export type CoordsFragment = { readonly x: number, readonly y: number };

export type VillageFragment = { readonly id: string, readonly name: string, readonly coords: CoordsFragment, readonly resources: { readonly amount: ResourcesFragment, readonly production: ResourcesFragment, readonly capacity: { readonly granary: number, readonly warehouse: number } } };

export type DurationFragment = { readonly days: number, readonly hours: number, readonly minutes: number, readonly seconds: number };

export type CoolDownFragment = { readonly min: DurationFragment, readonly max: DurationFragment };

export type NextTaskExecutionQueryVariables = {
  task: TaskType;
};


export type NextTaskExecutionQuery = { readonly nextTaskExecution: TimestampFragment };

export type NextVillageTaskExecutionQueryVariables = {
  villageId: Scalars['ID'];
  task: TaskType;
};


export type NextVillageTaskExecutionQuery = { readonly nextVillageTaskExecution: TimestampFragment };

export type NextTasksExecutionQueryVariables = {};


export type NextTasksExecutionQuery = { readonly nextTasksExecution: TimestampFragment };

export type SetNextTaskExecutionMutationVariables = {
  task: TaskType;
  delay: DurationInput;
};


export type SetNextTaskExecutionMutation = { readonly setNextTaskExecution: TimestampFragment };

export type SetNextTasksExecutionMutationVariables = {
  delay: DurationInput;
};


export type SetNextTasksExecutionMutation = { readonly setNextTasksExecution: TimestampFragment };

export type SetNextVillageTaskExecutionMutationVariables = {
  villageId: Scalars['ID'];
  task: TaskType;
  delay: DurationInput;
};


export type SetNextVillageTaskExecutionMutation = { readonly setNextVillageTaskExecution: TimestampFragment };

export type ResetNextTaskExecutionMutationVariables = {
  task: TaskType;
};


export type ResetNextTaskExecutionMutation = { readonly resetNextTaskExecution: TimestampFragment };

export type ResetNextTasksExecutionMutationVariables = {};


export type ResetNextTasksExecutionMutation = { readonly resetNextTasksExecution: TimestampFragment };

export type ResetNextVillageTaskExecutionMutationVariables = {
  villageId: Scalars['ID'];
  task: TaskType;
};


export type ResetNextVillageTaskExecutionMutation = { readonly resetNextVillageTaskExecution: TimestampFragment };

export type OnNextTasksExecutionChangedSubscriptionVariables = {};


export type OnNextTasksExecutionChangedSubscription = { readonly nextTasksExecutionChanged: TimestampFragment };

export type OnNextTaskExecutionChangedSubscriptionVariables = {
  task: TaskType;
};


export type OnNextTaskExecutionChangedSubscription = { readonly nextTaskExecutionChanged: TimestampFragment };

export type OnNextVillageTaskExecutionChangedSubscriptionVariables = {
  villageId: Scalars['ID'];
  task: TaskType;
};


export type OnNextVillageTaskExecutionChangedSubscription = { readonly nextVillageTaskExecutionChanged: TimestampFragment };

export type QueuedBuildingFragment = { readonly fieldId: number, readonly level: number, readonly queueId: string, readonly queueIndex: number, readonly type: number, readonly buildingTime: DurationFragment };

export type QueuedBuildingRangeFragment = { readonly fieldId: number, readonly id: string, readonly type: number, readonly buildings: ReadonlyArray<QueuedBuildingFragment>, readonly buildingTime: DurationFragment, readonly cost: ResourcesFragment };

export type BuildingQueueFragment = { readonly buildingRanges: ReadonlyArray<QueuedBuildingRangeFragment>, readonly totalBuildingTime: DurationFragment, readonly totalCost: ResourcesFragment };

export type GetQueuedBuildingsQueryVariables = {
  villageId: Scalars['ID'];
};


export type GetQueuedBuildingsQuery = { readonly buildingQueue: BuildingQueueFragment };

export type CanMoveQueuedBuildingToIndexQueryVariables = {
  villageId: Scalars['ID'];
  queueId: Scalars['ID'];
  index: Scalars['Int'];
};


export type CanMoveQueuedBuildingToIndexQuery = { readonly canMoveQueuedBuildingToIndex: boolean };

export type CanMoveQueuedBuildingsBlockToIndexQueryVariables = {
  villageId: Scalars['ID'];
  topBuildingQueueId: Scalars['ID'];
  bottomBuildingQueueId: Scalars['ID'];
  index: Scalars['Int'];
};


export type CanMoveQueuedBuildingsBlockToIndexQuery = { readonly canMoveQueuedBuildingsBlockToIndex: boolean };

export type ClearQueueMutationVariables = {
  villageId: Scalars['ID'];
};


export type ClearQueueMutation = { readonly clearQueue: Maybe<boolean> };

export type EnqueueBuildingMutationVariables = {
  input: EnqueueBuildingInput;
};


export type EnqueueBuildingMutation = { readonly enqueueBuilding: Maybe<boolean> };

export type DequeueBuildingMutationVariables = {
  input: DequeueBuildingInput;
};


export type DequeueBuildingMutation = { readonly dequeueBuilding: Maybe<boolean> };

export type DequeueBuildingAtFieldMutationVariables = {
  input: DequeueBuildingAtFieldInput;
};


export type DequeueBuildingAtFieldMutation = { readonly dequeueBuildingAtField: Maybe<boolean> };

export type MoveQueuedBuildingAsHighAsPossibleMutationVariables = {
  villageId: Scalars['ID'];
  queueId: Scalars['ID'];
};


export type MoveQueuedBuildingAsHighAsPossibleMutation = { readonly moveQueuedBuildingAsHighAsPossible: Maybe<boolean> };

export type MoveQueuedBuildingToIndexMutationVariables = {
  villageId: Scalars['ID'];
  queueId: Scalars['ID'];
  index: Scalars['Int'];
};


export type MoveQueuedBuildingToIndexMutation = { readonly moveQueuedBuildingToIndex: Maybe<boolean> };

export type MoveQueuedBuildingsBlockToIndexMutationVariables = {
  villageId: Scalars['ID'];
  topBuildingQueueId: Scalars['ID'];
  bottomBuildingQueueId: Scalars['ID'];
  index: Scalars['Int'];
};


export type MoveQueuedBuildingsBlockToIndexMutation = { readonly moveQueuedBuildingsBlockToIndex: Maybe<boolean> };

export type OnQueueUpdatedSubscriptionVariables = {
  villageId: Scalars['ID'];
};


export type OnQueueUpdatedSubscription = { readonly queueUpdated: BuildingQueueFragment };

export type AccountSettingsFragment = { readonly allowTasks: boolean, readonly autoStart: boolean, readonly autoBuild: boolean, readonly autoUnits: boolean, readonly autoParty: boolean, readonly tasksCoolDown: CoolDownFragment };

export type GetAccountSettingsQueryVariables = {};


export type GetAccountSettingsQuery = { readonly accountSettings: AccountSettingsFragment };

export type UpdateAccountSettingsMutationVariables = {
  settings: UpdateAccountSettingsInput;
};


export type UpdateAccountSettingsMutation = { readonly updateAccountSettings: AccountSettingsFragment };

export type ResetAccountSettingsMutationVariables = {};


export type ResetAccountSettingsMutation = { readonly resetAccountSettings: AccountSettingsFragment };

export type AutoAdventureSettingsFragment = { readonly allow: boolean, readonly adventureCriteria: AdventureCriteria, readonly hardMinHealth: number, readonly normalMinHealth: number, readonly preferHard: boolean, readonly preferredVillageId: Maybe<string>, readonly coolDown: CoolDownFragment, readonly maxTravelTime: DurationFragment };

export type GetAutoAdventureSettingsQueryVariables = {};


export type GetAutoAdventureSettingsQuery = { readonly autoAdventureSettings: AutoAdventureSettingsFragment };

export type UpdateAutoAdventureSettingsMutationVariables = {
  settings: UpdateAutoAdventureSettingsInput;
};


export type UpdateAutoAdventureSettingsMutation = { readonly updateAutoAdventureSettings: AutoAdventureSettingsFragment };

export type ResetAutoAdventureSettingsMutationVariables = {};


export type ResetAutoAdventureSettingsMutation = { readonly resetAutoAdventureSettings: AutoAdventureSettingsFragment };

export type AutoStorageOptionSettingsFragment = { readonly allow: boolean, readonly overflowLevel: number };

export type AutoStorageSettingsFragment = { readonly allowFreeSpots: boolean, readonly granary: AutoStorageOptionSettingsFragment, readonly warehouse: AutoStorageOptionSettingsFragment };

export type AutoBuildSettingsFragment = { readonly allow: boolean, readonly allowDualQueue: boolean, readonly autoCropFields: boolean, readonly minCrop: number, readonly useHeroResources: boolean, readonly coolDown: CoolDownFragment, readonly autoStorage: AutoStorageSettingsFragment };

export type GetAutoBuildSettingsQueryVariables = {
  villageId: Scalars['ID'];
};


export type GetAutoBuildSettingsQuery = { readonly autoBuildSettings: AutoBuildSettingsFragment };

export type UpdateAutoBuildSettingsMutationVariables = {
  villageId: Scalars['ID'];
  settings: UpdateAutoBuildSettingsInput;
};


export type UpdateAutoBuildSettingsMutation = { readonly updateAutoBuildSettings: AutoBuildSettingsFragment };

export type ResetAutoBuildSettingsMutationVariables = {
  villageId: Scalars['ID'];
};


export type ResetAutoBuildSettingsMutation = { readonly resetAutoBuildSettings: AutoBuildSettingsFragment };

export type AutoMentorSettingsFragment = { readonly acceptDailyRewards: boolean, readonly acceptTaskRewards: boolean };

export type GetAutoMentorSettingsQueryVariables = {};


export type GetAutoMentorSettingsQuery = { readonly autoMentorSettings: AutoMentorSettingsFragment };

export type UpdateAutoMentorSettingsMutationVariables = {
  settings: UpdateAutoMentorSettingsInput;
};


export type UpdateAutoMentorSettingsMutation = { readonly updateAutoMentorSettings: AutoMentorSettingsFragment };

export type ResetAutoMentorSettingsMutationVariables = {};


export type ResetAutoMentorSettingsMutation = { readonly resetAutoMentorSettings: AutoMentorSettingsFragment };

export type AutoPartySettingsFragment = { readonly allowSmall: boolean, readonly allowLarge: boolean, readonly minCulturePointsSmall: number, readonly minCulturePointsLarge: number, readonly coolDown: CoolDownFragment };

export type GetAutoPartySettingsQueryVariables = {
  villageId: Scalars['ID'];
};


export type GetAutoPartySettingsQuery = { readonly autoPartySettings: AutoPartySettingsFragment };

export type UpdateAutoPartySettingsMutationVariables = {
  villageId: Scalars['ID'];
  settings: UpdateAutoPartySettingsInput;
};


export type UpdateAutoPartySettingsMutation = { readonly updateAutoPartySettings: AutoPartySettingsFragment };

export type ResetAutoPartySettingsMutationVariables = {
  villageId: Scalars['ID'];
};


export type ResetAutoPartySettingsMutation = { readonly resetAutoPartySettings: AutoPartySettingsFragment };

export type AutoUnitsUnitSettingsFragment = { readonly autoBuild: boolean, readonly index: number, readonly targetAmount: number, readonly trainForever: boolean };

export type AutoUnitsBuildingSettingsFragment = { readonly allow: boolean, readonly maxBuildTime: DurationFragment, readonly units: ReadonlyArray<AutoUnitsUnitSettingsFragment> };

export type AutoUnitsSettingsFragment = { readonly allow: boolean, readonly minCrop: number, readonly coolDown: CoolDownFragment, readonly barracks: AutoUnitsBuildingSettingsFragment, readonly stable: AutoUnitsBuildingSettingsFragment, readonly workshop: AutoUnitsBuildingSettingsFragment, readonly residence: AutoUnitsBuildingSettingsFragment };

export type GetAutoUnitsSettingsQueryVariables = {
  villageId: Scalars['ID'];
};


export type GetAutoUnitsSettingsQuery = { readonly autoUnitsSettings: AutoUnitsSettingsFragment };

export type UpdateAutoUnitsUnitSettingsMutationVariables = {
  villageId: Scalars['ID'];
  settings: UpdateAutoUnitsUnitSettingsInput;
};


export type UpdateAutoUnitsUnitSettingsMutation = { readonly updateAutoUnitsUnitSettings: AutoUnitsSettingsFragment };

export type UpdateAutoUnitsBuildingSettingsMutationVariables = {
  villageId: Scalars['ID'];
  buildingType: Scalars['Int'];
  settings: UpdateAutoUnitsBuildingSettingsInput;
};


export type UpdateAutoUnitsBuildingSettingsMutation = { readonly updateAutoUnitsBuildingSettings: AutoUnitsSettingsFragment };

export type UpdateAutoUnitsSettingsMutationVariables = {
  villageId: Scalars['ID'];
  settings: UpdateAutoUnitsSettingsInput;
};


export type UpdateAutoUnitsSettingsMutation = { readonly updateAutoUnitsSettings: AutoUnitsSettingsFragment };

export type ResetAutoUnitsSettingsMutationVariables = {
  villageId: Scalars['ID'];
};


export type ResetAutoUnitsSettingsMutation = { readonly resetAutoUnitsSettings: AutoUnitsSettingsFragment };

export type GeneralSettingsFragment = { readonly chromePath: string, readonly dataPath: string, readonly headlessChrome: boolean };

export type GetGeneralSettingsQueryVariables = {};


export type GetGeneralSettingsQuery = { readonly generalSettings: GeneralSettingsFragment };

export type UpdateGeneralSettingsMutationVariables = {
  settings: UpdateGeneralSettingsInput;
};


export type UpdateGeneralSettingsMutation = { readonly updateGeneralSettings: GeneralSettingsFragment };

export type ResetGeneralSettingsMutationVariables = {};


export type ResetGeneralSettingsMutation = { readonly resetGeneralSettings: GeneralSettingsFragment };

export type GeneralVillageSettingsFragment = { readonly allowTasks: boolean };

export type GetGeneralVillageSettingsQueryVariables = {
  villageId: Scalars['ID'];
};


export type GetGeneralVillageSettingsQuery = { readonly generalVillageSettings: GeneralVillageSettingsFragment };

export type UpdateGeneralVillageSettingsMutationVariables = {
  villageId: Scalars['ID'];
  settings: UpdateGeneralVillageSettingsInput;
};


export type UpdateGeneralVillageSettingsMutation = { readonly updateGeneralVillageSettings: GeneralVillageSettingsFragment };

export type ResetGeneralVillageSettingsMutationVariables = {
  villageId: Scalars['ID'];
};


export type ResetGeneralVillageSettingsMutation = { readonly resetGeneralVillageSettings: GeneralVillageSettingsFragment };

export type GetUnitInfoQueryVariables = {
  index: Scalars['Int'];
};


export type GetUnitInfoQuery = { readonly unitInfo: { readonly name: string } };

export type VillageCrannyCapacityFragment = { readonly actual: number, readonly ongoing: number, readonly total: number };

export type GetVillageQueryVariables = {
  villageId: Scalars['ID'];
};


export type GetVillageQuery = { readonly village: Maybe<{ readonly id: string, readonly name: string, readonly coords: CoordsFragment, readonly resources: { readonly amount: ResourcesFragment, readonly capacity: { readonly granary: number, readonly warehouse: number }, readonly production: ResourcesFragment } }> };

export type GetVillagesQueryVariables = {};


export type GetVillagesQuery = { readonly villages: ReadonlyArray<{ readonly id: string, readonly name: string, readonly isCapital: boolean, readonly coords: CoordsFragment }> };

export type GetActiveVillageIdQueryVariables = {};


export type GetActiveVillageIdQuery = { readonly activeVillageId: string };

export type GetCrannyCapacityQueryVariables = {
  villageId: Scalars['ID'];
};


export type GetCrannyCapacityQuery = { readonly crannyCapacity: VillageCrannyCapacityFragment };

export type RefreshVillageMutationVariables = {
  villageId: Scalars['ID'];
};


export type RefreshVillageMutation = { readonly refreshVillage: Maybe<boolean> };

export type OnVillageUpdatedSubscriptionVariables = {
  villageId: Scalars['ID'];
};


export type OnVillageUpdatedSubscription = { readonly villageUpdated: { readonly id: string, readonly name: string, readonly coords: CoordsFragment, readonly resources: { readonly amount: ResourcesFragment, readonly capacity: { readonly granary: number, readonly warehouse: number }, readonly production: ResourcesFragment } } };

export type OnVillagesUpdatedSubscriptionVariables = {};


export type OnVillagesUpdatedSubscription = { readonly villagesUpdated: ReadonlyArray<{ readonly id: string, readonly name: string, readonly isCapital: boolean, readonly coords: CoordsFragment }> };

export type OnActiveVillageIdChangedSubscriptionVariables = {};


export type OnActiveVillageIdChangedSubscription = { readonly activeVillageIdChanged: string };

export const UserAccountFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserAccount"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserAccount"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"password"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"server"},"arguments":[],"directives":[]}]}}]};
export const BuildingSpotFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingSpot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingSpot"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fieldId"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"level"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actual"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"ongoing"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"queued"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"total"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]}]}}]};
export const BuildingSpotsFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingSpots"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingSpots"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"infrastructure"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingSpot"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"resources"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wood"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingSpot"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"clay"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingSpot"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"iron"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingSpot"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"crop"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingSpot"},"directives":[]}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingSpot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingSpot"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fieldId"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"level"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actual"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"ongoing"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"queued"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"total"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]}]}}]};
export const TimestampFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Timestamp"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Timestamp"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSeconds"},"arguments":[],"directives":[]}]}}]};
export const BuildingInProgressFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingInProgress"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingInProgress"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"finishedAt"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Timestamp"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"fieldId"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Timestamp"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Timestamp"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSeconds"},"arguments":[],"directives":[]}]}}]};
export const CoordsFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Coords"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Coords"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"y"},"arguments":[],"directives":[]}]}}]};
export const HeroInformationFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HeroInformation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HeroInformation"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"health"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"state"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"village"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coords"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Coords"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Coords"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Coords"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"y"},"arguments":[],"directives":[]}]}}]};
export const ResourcesFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Resources"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Resources"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wood"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"clay"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"iron"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"crop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"freeCrop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"total"},"arguments":[],"directives":[]}]}}]};
export const LogEntryFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogEntry"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Timestamp"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"village"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coords"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Coords"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"content"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextLogEntryContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"messageType"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoBuildLogEntryContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fieldId"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"level"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsLogEntryContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"index"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"tribe"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"unitName"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResourceClaimLogEntryContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reason"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"resources"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Resources"},"directives":[]}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Timestamp"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Timestamp"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSeconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Resources"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Resources"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wood"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"clay"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"iron"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"crop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"freeCrop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"total"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Coords"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Coords"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"y"},"arguments":[],"directives":[]}]}}]};
export const VillageFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Village"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Village"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coords"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Coords"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"resources"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Resources"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"production"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Resources"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"capacity"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"granary"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"warehouse"},"arguments":[],"directives":[]}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Resources"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Resources"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wood"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"clay"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"iron"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"crop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"freeCrop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"total"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Coords"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Coords"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"y"},"arguments":[],"directives":[]}]}}]};
export const DurationFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}}]};
export const QueuedBuildingFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QueuedBuilding"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueuedBuilding"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildingTime"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"fieldId"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"level"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"queueId"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"queueIndex"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}}]};
export const QueuedBuildingRangeFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QueuedBuildingRange"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueuedBuildingRange"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildings"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"QueuedBuilding"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingTime"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Resources"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"fieldId"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Resources"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Resources"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wood"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"clay"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"iron"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"crop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"freeCrop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"total"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QueuedBuilding"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueuedBuilding"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildingTime"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"fieldId"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"level"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"queueId"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"queueIndex"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]}]}}]};
export const BuildingQueueFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingQueue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingQueue"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildingRanges"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"QueuedBuildingRange"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"totalBuildingTime"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCost"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Resources"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Resources"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Resources"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wood"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"clay"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"iron"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"crop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"freeCrop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"total"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QueuedBuilding"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueuedBuilding"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildingTime"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"fieldId"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"level"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"queueId"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"queueIndex"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QueuedBuildingRange"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueuedBuildingRange"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildings"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"QueuedBuilding"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingTime"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Resources"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"fieldId"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]}]}}]};
export const CoolDownFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoolDown"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoolDown"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}}]};
export const AccountSettingsFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AccountSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowTasks"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"tasksCoolDown"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoolDown"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"autoStart"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"autoBuild"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"autoUnits"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"autoParty"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoolDown"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoolDown"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}}]}}]};
export const AutoAdventureSettingsFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoAdventureSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoAdventureSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coolDown"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoolDown"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"adventureCriteria"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hardMinHealth"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"normalMinHealth"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"maxTravelTime"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"preferHard"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"preferredVillageId"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoolDown"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoolDown"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}}]}}]};
export const AutoStorageOptionSettingsFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoStorageOptionSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoStorageOptionSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"overflowLevel"},"arguments":[],"directives":[]}]}}]};
export const AutoStorageSettingsFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoStorageSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoStorageSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"granary"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoStorageOptionSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"warehouse"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoStorageOptionSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"allowFreeSpots"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoStorageOptionSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoStorageOptionSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"overflowLevel"},"arguments":[],"directives":[]}]}}]};
export const AutoBuildSettingsFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoBuildSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoBuildSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"allowDualQueue"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coolDown"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoolDown"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"autoCropFields"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minCrop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"autoStorage"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoStorageSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"useHeroResources"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoolDown"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoolDown"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoStorageOptionSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoStorageOptionSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"overflowLevel"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoStorageSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoStorageSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"granary"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoStorageOptionSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"warehouse"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoStorageOptionSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"allowFreeSpots"},"arguments":[],"directives":[]}]}}]};
export const AutoMentorSettingsFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoMentorSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoMentorSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acceptDailyRewards"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"acceptTaskRewards"},"arguments":[],"directives":[]}]}}]};
export const AutoPartySettingsFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoPartySettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoPartySettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowSmall"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"allowLarge"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coolDown"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoolDown"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"minCulturePointsSmall"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minCulturePointsLarge"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoolDown"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoolDown"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}}]}}]};
export const AutoUnitsUnitSettingsFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoUnitsUnitSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsUnitSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autoBuild"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"index"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"targetAmount"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"trainForever"},"arguments":[],"directives":[]}]}}]};
export const AutoUnitsBuildingSettingsFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"maxBuildTime"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"units"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsUnitSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoUnitsUnitSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsUnitSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autoBuild"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"index"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"targetAmount"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"trainForever"},"arguments":[],"directives":[]}]}}]};
export const AutoUnitsSettingsFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoUnitsSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coolDown"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoolDown"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"minCrop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"barracks"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"stable"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"residence"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoolDown"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoolDown"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoUnitsUnitSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsUnitSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autoBuild"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"index"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"targetAmount"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"trainForever"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"maxBuildTime"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"units"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsUnitSettings"},"directives":[]}]}}]}}]};
export const GeneralSettingsFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GeneralSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GeneralSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chromePath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"dataPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"headlessChrome"},"arguments":[],"directives":[]}]}}]};
export const GeneralVillageSettingsFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GeneralVillageSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GeneralVillageSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowTasks"},"arguments":[],"directives":[]}]}}]};
export const VillageCrannyCapacityFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VillageCrannyCapacity"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VillageCrannyCapacity"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actual"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"ongoing"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"total"},"arguments":[],"directives":[]}]}}]};
export const GetAccountsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccounts"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserAccount"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserAccount"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserAccount"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"password"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"server"},"arguments":[],"directives":[]}]}}]};

/**
 * __useGetAccountsQuery__
 *
 * To run a query within a React component, call `useGetAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAccountsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAccountsQuery, GetAccountsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAccountsQuery, GetAccountsQueryVariables>(GetAccountsDocument, baseOptions);
      }
export function useGetAccountsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAccountsQuery, GetAccountsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAccountsQuery, GetAccountsQueryVariables>(GetAccountsDocument, baseOptions);
        }
export type GetAccountsQueryHookResult = ReturnType<typeof useGetAccountsQuery>;
export type GetAccountsLazyQueryHookResult = ReturnType<typeof useGetAccountsLazyQuery>;
export type GetAccountsQueryResult = ApolloReactCommon.QueryResult<GetAccountsQuery, GetAccountsQueryVariables>;
export const GetCurrentAccountDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentAccount"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentAccount"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserAccount"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserAccount"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserAccount"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"password"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"server"},"arguments":[],"directives":[]}]}}]};

/**
 * __useGetCurrentAccountQuery__
 *
 * To run a query within a React component, call `useGetCurrentAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentAccountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentAccountQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCurrentAccountQuery, GetCurrentAccountQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCurrentAccountQuery, GetCurrentAccountQueryVariables>(GetCurrentAccountDocument, baseOptions);
      }
export function useGetCurrentAccountLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrentAccountQuery, GetCurrentAccountQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCurrentAccountQuery, GetCurrentAccountQueryVariables>(GetCurrentAccountDocument, baseOptions);
        }
export type GetCurrentAccountQueryHookResult = ReturnType<typeof useGetCurrentAccountQuery>;
export type GetCurrentAccountLazyQueryHookResult = ReturnType<typeof useGetCurrentAccountLazyQuery>;
export type GetCurrentAccountQueryResult = ApolloReactCommon.QueryResult<GetCurrentAccountQuery, GetCurrentAccountQueryVariables>;
export const GetAccountDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserAccount"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserAccount"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserAccount"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"password"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"server"},"arguments":[],"directives":[]}]}}]};

/**
 * __useGetAccountQuery__
 *
 * To run a query within a React component, call `useGetAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAccountQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAccountQuery, GetAccountQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, baseOptions);
      }
export function useGetAccountLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAccountQuery, GetAccountQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, baseOptions);
        }
export type GetAccountQueryHookResult = ReturnType<typeof useGetAccountQuery>;
export type GetAccountLazyQueryHookResult = ReturnType<typeof useGetAccountLazyQuery>;
export type GetAccountQueryResult = ApolloReactCommon.QueryResult<GetAccountQuery, GetAccountQueryVariables>;
export const GetLastSignedAccountIdDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLastSignedAccountId"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastSignedAccountId"},"arguments":[],"directives":[]}]}}]};

/**
 * __useGetLastSignedAccountIdQuery__
 *
 * To run a query within a React component, call `useGetLastSignedAccountIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLastSignedAccountIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLastSignedAccountIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLastSignedAccountIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetLastSignedAccountIdQuery, GetLastSignedAccountIdQueryVariables>) {
        return ApolloReactHooks.useQuery<GetLastSignedAccountIdQuery, GetLastSignedAccountIdQueryVariables>(GetLastSignedAccountIdDocument, baseOptions);
      }
export function useGetLastSignedAccountIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetLastSignedAccountIdQuery, GetLastSignedAccountIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetLastSignedAccountIdQuery, GetLastSignedAccountIdQueryVariables>(GetLastSignedAccountIdDocument, baseOptions);
        }
export type GetLastSignedAccountIdQueryHookResult = ReturnType<typeof useGetLastSignedAccountIdQuery>;
export type GetLastSignedAccountIdLazyQueryHookResult = ReturnType<typeof useGetLastSignedAccountIdLazyQuery>;
export type GetLastSignedAccountIdQueryResult = ApolloReactCommon.QueryResult<GetLastSignedAccountIdQuery, GetLastSignedAccountIdQueryVariables>;
export const IsAccountTakenDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsAccountTaken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"account"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isAccountTaken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"account"},"value":{"kind":"Variable","name":{"kind":"Name","value":"account"}}}],"directives":[]}]}}]};

/**
 * __useIsAccountTakenQuery__
 *
 * To run a query within a React component, call `useIsAccountTakenQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsAccountTakenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsAccountTakenQuery({
 *   variables: {
 *      account: // value for 'account'
 *   },
 * });
 */
export function useIsAccountTakenQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IsAccountTakenQuery, IsAccountTakenQueryVariables>) {
        return ApolloReactHooks.useQuery<IsAccountTakenQuery, IsAccountTakenQueryVariables>(IsAccountTakenDocument, baseOptions);
      }
export function useIsAccountTakenLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IsAccountTakenQuery, IsAccountTakenQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<IsAccountTakenQuery, IsAccountTakenQueryVariables>(IsAccountTakenDocument, baseOptions);
        }
export type IsAccountTakenQueryHookResult = ReturnType<typeof useIsAccountTakenQuery>;
export type IsAccountTakenLazyQueryHookResult = ReturnType<typeof useIsAccountTakenLazyQuery>;
export type IsAccountTakenQueryResult = ApolloReactCommon.QueryResult<IsAccountTakenQuery, IsAccountTakenQueryVariables>;
export const CreateAccountDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"account"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"account"},"value":{"kind":"Variable","name":{"kind":"Name","value":"account"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserAccount"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserAccount"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserAccount"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"password"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"server"},"arguments":[],"directives":[]}]}}]};
export type CreateAccountMutationFn = ApolloReactCommon.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      account: // value for 'account'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, baseOptions);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = ApolloReactCommon.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const UpdateAccountDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"account"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"account"},"value":{"kind":"Variable","name":{"kind":"Name","value":"account"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserAccount"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserAccount"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserAccount"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"password"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"server"},"arguments":[],"directives":[]}]}}]};
export type UpdateAccountMutationFn = ApolloReactCommon.MutationFunction<UpdateAccountMutation, UpdateAccountMutationVariables>;

/**
 * __useUpdateAccountMutation__
 *
 * To run a mutation, you first call `useUpdateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountMutation, { data, loading, error }] = useUpdateAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *      account: // value for 'account'
 *   },
 * });
 */
export function useUpdateAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateAccountMutation, UpdateAccountMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateAccountMutation, UpdateAccountMutationVariables>(UpdateAccountDocument, baseOptions);
      }
export type UpdateAccountMutationHookResult = ReturnType<typeof useUpdateAccountMutation>;
export type UpdateAccountMutationResult = ApolloReactCommon.MutationResult<UpdateAccountMutation>;
export type UpdateAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateAccountMutation, UpdateAccountMutationVariables>;
export const DeleteAccountDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserAccount"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserAccount"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserAccount"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"password"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"server"},"arguments":[],"directives":[]}]}}]};
export type DeleteAccountMutationFn = ApolloReactCommon.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, baseOptions);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = ApolloReactCommon.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const GetBuildingSpotsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBuildingSpots"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildingSpots"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingSpots"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingSpot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingSpot"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fieldId"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"level"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actual"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"ongoing"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"queued"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"total"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingSpots"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingSpots"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"infrastructure"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingSpot"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"resources"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wood"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingSpot"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"clay"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingSpot"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"iron"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingSpot"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"crop"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingSpot"},"directives":[]}]}}]}}]}}]};

/**
 * __useGetBuildingSpotsQuery__
 *
 * To run a query within a React component, call `useGetBuildingSpotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBuildingSpotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBuildingSpotsQuery({
 *   variables: {
 *      villageId: // value for 'villageId'
 *   },
 * });
 */
export function useGetBuildingSpotsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetBuildingSpotsQuery, GetBuildingSpotsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetBuildingSpotsQuery, GetBuildingSpotsQueryVariables>(GetBuildingSpotsDocument, baseOptions);
      }
export function useGetBuildingSpotsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBuildingSpotsQuery, GetBuildingSpotsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetBuildingSpotsQuery, GetBuildingSpotsQueryVariables>(GetBuildingSpotsDocument, baseOptions);
        }
export type GetBuildingSpotsQueryHookResult = ReturnType<typeof useGetBuildingSpotsQuery>;
export type GetBuildingSpotsLazyQueryHookResult = ReturnType<typeof useGetBuildingSpotsLazyQuery>;
export type GetBuildingSpotsQueryResult = ApolloReactCommon.QueryResult<GetBuildingSpotsQuery, GetBuildingSpotsQueryVariables>;
export const GetAvailableNewBuildingTypesDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAvailableNewBuildingTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AvailableNewBuildingsInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"availableNewBuildingsTypes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[]}]}}]};

/**
 * __useGetAvailableNewBuildingTypesQuery__
 *
 * To run a query within a React component, call `useGetAvailableNewBuildingTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAvailableNewBuildingTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAvailableNewBuildingTypesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAvailableNewBuildingTypesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAvailableNewBuildingTypesQuery, GetAvailableNewBuildingTypesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAvailableNewBuildingTypesQuery, GetAvailableNewBuildingTypesQueryVariables>(GetAvailableNewBuildingTypesDocument, baseOptions);
      }
export function useGetAvailableNewBuildingTypesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAvailableNewBuildingTypesQuery, GetAvailableNewBuildingTypesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAvailableNewBuildingTypesQuery, GetAvailableNewBuildingTypesQueryVariables>(GetAvailableNewBuildingTypesDocument, baseOptions);
        }
export type GetAvailableNewBuildingTypesQueryHookResult = ReturnType<typeof useGetAvailableNewBuildingTypesQuery>;
export type GetAvailableNewBuildingTypesLazyQueryHookResult = ReturnType<typeof useGetAvailableNewBuildingTypesLazyQuery>;
export type GetAvailableNewBuildingTypesQueryResult = ApolloReactCommon.QueryResult<GetAvailableNewBuildingTypesQuery, GetAvailableNewBuildingTypesQueryVariables>;
export const GetBuildingInfoDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBuildingInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"buildingType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildingInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"buildingType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"buildingType"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maxLevel"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]}}]};

/**
 * __useGetBuildingInfoQuery__
 *
 * To run a query within a React component, call `useGetBuildingInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBuildingInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBuildingInfoQuery({
 *   variables: {
 *      buildingType: // value for 'buildingType'
 *   },
 * });
 */
export function useGetBuildingInfoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetBuildingInfoQuery, GetBuildingInfoQueryVariables>) {
        return ApolloReactHooks.useQuery<GetBuildingInfoQuery, GetBuildingInfoQueryVariables>(GetBuildingInfoDocument, baseOptions);
      }
export function useGetBuildingInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBuildingInfoQuery, GetBuildingInfoQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetBuildingInfoQuery, GetBuildingInfoQueryVariables>(GetBuildingInfoDocument, baseOptions);
        }
export type GetBuildingInfoQueryHookResult = ReturnType<typeof useGetBuildingInfoQuery>;
export type GetBuildingInfoLazyQueryHookResult = ReturnType<typeof useGetBuildingInfoLazyQuery>;
export type GetBuildingInfoQueryResult = ApolloReactCommon.QueryResult<GetBuildingInfoQuery, GetBuildingInfoQueryVariables>;
export const GetBuildingLevelInfoDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBuildingLevelInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"buildingType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"level"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildingLevelInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"buildingType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"buildingType"}}},{"kind":"Argument","name":{"kind":"Name","value":"level"},"value":{"kind":"Variable","name":{"kind":"Name","value":"level"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cost"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Resources"},"directives":[]}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Resources"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Resources"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wood"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"clay"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"iron"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"crop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"freeCrop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"total"},"arguments":[],"directives":[]}]}}]};

/**
 * __useGetBuildingLevelInfoQuery__
 *
 * To run a query within a React component, call `useGetBuildingLevelInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBuildingLevelInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBuildingLevelInfoQuery({
 *   variables: {
 *      buildingType: // value for 'buildingType'
 *      level: // value for 'level'
 *   },
 * });
 */
export function useGetBuildingLevelInfoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetBuildingLevelInfoQuery, GetBuildingLevelInfoQueryVariables>) {
        return ApolloReactHooks.useQuery<GetBuildingLevelInfoQuery, GetBuildingLevelInfoQueryVariables>(GetBuildingLevelInfoDocument, baseOptions);
      }
export function useGetBuildingLevelInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBuildingLevelInfoQuery, GetBuildingLevelInfoQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetBuildingLevelInfoQuery, GetBuildingLevelInfoQueryVariables>(GetBuildingLevelInfoDocument, baseOptions);
        }
export type GetBuildingLevelInfoQueryHookResult = ReturnType<typeof useGetBuildingLevelInfoQuery>;
export type GetBuildingLevelInfoLazyQueryHookResult = ReturnType<typeof useGetBuildingLevelInfoLazyQuery>;
export type GetBuildingLevelInfoQueryResult = ApolloReactCommon.QueryResult<GetBuildingLevelInfoQuery, GetBuildingLevelInfoQueryVariables>;
export const OnActualBuildingLevelsUpdatedDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnActualBuildingLevelsUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actualBuildingLevelsUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}}],"directives":[]}]}}]};

/**
 * __useOnActualBuildingLevelsUpdatedSubscription__
 *
 * To run a query within a React component, call `useOnActualBuildingLevelsUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnActualBuildingLevelsUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnActualBuildingLevelsUpdatedSubscription({
 *   variables: {
 *      villageId: // value for 'villageId'
 *   },
 * });
 */
export function useOnActualBuildingLevelsUpdatedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnActualBuildingLevelsUpdatedSubscription, OnActualBuildingLevelsUpdatedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<OnActualBuildingLevelsUpdatedSubscription, OnActualBuildingLevelsUpdatedSubscriptionVariables>(OnActualBuildingLevelsUpdatedDocument, baseOptions);
      }
export type OnActualBuildingLevelsUpdatedSubscriptionHookResult = ReturnType<typeof useOnActualBuildingLevelsUpdatedSubscription>;
export type OnActualBuildingLevelsUpdatedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnActualBuildingLevelsUpdatedSubscription>;
export const GetBuildingsInProgressDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBuildingsInProgress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildingsInProgress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingInProgress"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingInProgress"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingInProgress"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"finishedAt"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Timestamp"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"fieldId"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Timestamp"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Timestamp"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSeconds"},"arguments":[],"directives":[]}]}}]};

/**
 * __useGetBuildingsInProgressQuery__
 *
 * To run a query within a React component, call `useGetBuildingsInProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBuildingsInProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBuildingsInProgressQuery({
 *   variables: {
 *      villageId: // value for 'villageId'
 *   },
 * });
 */
export function useGetBuildingsInProgressQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetBuildingsInProgressQuery, GetBuildingsInProgressQueryVariables>) {
        return ApolloReactHooks.useQuery<GetBuildingsInProgressQuery, GetBuildingsInProgressQueryVariables>(GetBuildingsInProgressDocument, baseOptions);
      }
export function useGetBuildingsInProgressLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBuildingsInProgressQuery, GetBuildingsInProgressQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetBuildingsInProgressQuery, GetBuildingsInProgressQueryVariables>(GetBuildingsInProgressDocument, baseOptions);
        }
export type GetBuildingsInProgressQueryHookResult = ReturnType<typeof useGetBuildingsInProgressQuery>;
export type GetBuildingsInProgressLazyQueryHookResult = ReturnType<typeof useGetBuildingsInProgressLazyQuery>;
export type GetBuildingsInProgressQueryResult = ApolloReactCommon.QueryResult<GetBuildingsInProgressQuery, GetBuildingsInProgressQueryVariables>;
export const OnBuildingsInProgressUpdatedDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnBuildingsInProgressUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildingsInProgressUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingInProgress"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingInProgress"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingInProgress"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"finishedAt"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Timestamp"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"fieldId"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Timestamp"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Timestamp"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSeconds"},"arguments":[],"directives":[]}]}}]};

/**
 * __useOnBuildingsInProgressUpdatedSubscription__
 *
 * To run a query within a React component, call `useOnBuildingsInProgressUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnBuildingsInProgressUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnBuildingsInProgressUpdatedSubscription({
 *   variables: {
 *      villageId: // value for 'villageId'
 *   },
 * });
 */
export function useOnBuildingsInProgressUpdatedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnBuildingsInProgressUpdatedSubscription, OnBuildingsInProgressUpdatedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<OnBuildingsInProgressUpdatedSubscription, OnBuildingsInProgressUpdatedSubscriptionVariables>(OnBuildingsInProgressUpdatedDocument, baseOptions);
      }
export type OnBuildingsInProgressUpdatedSubscriptionHookResult = ReturnType<typeof useOnBuildingsInProgressUpdatedSubscription>;
export type OnBuildingsInProgressUpdatedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnBuildingsInProgressUpdatedSubscription>;
export const GetBotStateDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBotState"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botState"},"arguments":[],"directives":[]}]}}]};

/**
 * __useGetBotStateQuery__
 *
 * To run a query within a React component, call `useGetBotStateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBotStateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBotStateQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBotStateQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetBotStateQuery, GetBotStateQueryVariables>) {
        return ApolloReactHooks.useQuery<GetBotStateQuery, GetBotStateQueryVariables>(GetBotStateDocument, baseOptions);
      }
export function useGetBotStateLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBotStateQuery, GetBotStateQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetBotStateQuery, GetBotStateQueryVariables>(GetBotStateDocument, baseOptions);
        }
export type GetBotStateQueryHookResult = ReturnType<typeof useGetBotStateQuery>;
export type GetBotStateLazyQueryHookResult = ReturnType<typeof useGetBotStateLazyQuery>;
export type GetBotStateQueryResult = ApolloReactCommon.QueryResult<GetBotStateQuery, GetBotStateQueryVariables>;
export const IsBotActiveDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsBotActive"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isBotActive"},"arguments":[],"directives":[]}]}}]};

/**
 * __useIsBotActiveQuery__
 *
 * To run a query within a React component, call `useIsBotActiveQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsBotActiveQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsBotActiveQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsBotActiveQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IsBotActiveQuery, IsBotActiveQueryVariables>) {
        return ApolloReactHooks.useQuery<IsBotActiveQuery, IsBotActiveQueryVariables>(IsBotActiveDocument, baseOptions);
      }
export function useIsBotActiveLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IsBotActiveQuery, IsBotActiveQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<IsBotActiveQuery, IsBotActiveQueryVariables>(IsBotActiveDocument, baseOptions);
        }
export type IsBotActiveQueryHookResult = ReturnType<typeof useIsBotActiveQuery>;
export type IsBotActiveLazyQueryHookResult = ReturnType<typeof useIsBotActiveLazyQuery>;
export type IsBotActiveQueryResult = ApolloReactCommon.QueryResult<IsBotActiveQuery, IsBotActiveQueryVariables>;
export const StartBotDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartBot"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startBot"},"arguments":[],"directives":[]}]}}]};
export type StartBotMutationFn = ApolloReactCommon.MutationFunction<StartBotMutation, StartBotMutationVariables>;

/**
 * __useStartBotMutation__
 *
 * To run a mutation, you first call `useStartBotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartBotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startBotMutation, { data, loading, error }] = useStartBotMutation({
 *   variables: {
 *   },
 * });
 */
export function useStartBotMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<StartBotMutation, StartBotMutationVariables>) {
        return ApolloReactHooks.useMutation<StartBotMutation, StartBotMutationVariables>(StartBotDocument, baseOptions);
      }
export type StartBotMutationHookResult = ReturnType<typeof useStartBotMutation>;
export type StartBotMutationResult = ApolloReactCommon.MutationResult<StartBotMutation>;
export type StartBotMutationOptions = ApolloReactCommon.BaseMutationOptions<StartBotMutation, StartBotMutationVariables>;
export const StopBotDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StopBot"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopBot"},"arguments":[],"directives":[]}]}}]};
export type StopBotMutationFn = ApolloReactCommon.MutationFunction<StopBotMutation, StopBotMutationVariables>;

/**
 * __useStopBotMutation__
 *
 * To run a mutation, you first call `useStopBotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStopBotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stopBotMutation, { data, loading, error }] = useStopBotMutation({
 *   variables: {
 *   },
 * });
 */
export function useStopBotMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<StopBotMutation, StopBotMutationVariables>) {
        return ApolloReactHooks.useMutation<StopBotMutation, StopBotMutationVariables>(StopBotDocument, baseOptions);
      }
export type StopBotMutationHookResult = ReturnType<typeof useStopBotMutation>;
export type StopBotMutationResult = ApolloReactCommon.MutationResult<StopBotMutation>;
export type StopBotMutationOptions = ApolloReactCommon.BaseMutationOptions<StopBotMutation, StopBotMutationVariables>;
export const SignInDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"accountId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}}}],"directives":[]}]}}]};
export type SignInMutationFn = ApolloReactCommon.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      accountId: // value for 'accountId'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        return ApolloReactHooks.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, baseOptions);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = ApolloReactCommon.MutationResult<SignInMutation>;
export type SignInMutationOptions = ApolloReactCommon.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignOutDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignOut"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signOut"},"arguments":[],"directives":[]}]}}]};
export type SignOutMutationFn = ApolloReactCommon.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignOutMutation, SignOutMutationVariables>) {
        return ApolloReactHooks.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, baseOptions);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = ApolloReactCommon.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = ApolloReactCommon.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export const OnBotRunningChangedDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnBotRunningChanged"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botStateChanged"},"arguments":[],"directives":[]}]}}]};

/**
 * __useOnBotRunningChangedSubscription__
 *
 * To run a query within a React component, call `useOnBotRunningChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnBotRunningChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnBotRunningChangedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnBotRunningChangedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnBotRunningChangedSubscription, OnBotRunningChangedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<OnBotRunningChangedSubscription, OnBotRunningChangedSubscriptionVariables>(OnBotRunningChangedDocument, baseOptions);
      }
export type OnBotRunningChangedSubscriptionHookResult = ReturnType<typeof useOnBotRunningChangedSubscription>;
export type OnBotRunningChangedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnBotRunningChangedSubscription>;
export const OnBotActivityChangedDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnBotActivityChanged"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botActivityChanged"},"arguments":[],"directives":[]}]}}]};

/**
 * __useOnBotActivityChangedSubscription__
 *
 * To run a query within a React component, call `useOnBotActivityChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnBotActivityChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnBotActivityChangedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnBotActivityChangedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnBotActivityChangedSubscription, OnBotActivityChangedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<OnBotActivityChangedSubscription, OnBotActivityChangedSubscriptionVariables>(OnBotActivityChangedDocument, baseOptions);
      }
export type OnBotActivityChangedSubscriptionHookResult = ReturnType<typeof useOnBotActivityChangedSubscription>;
export type OnBotActivityChangedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnBotActivityChangedSubscription>;
export const GetGameInfoDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGameInfo"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gameInfo"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tribe"},"arguments":[],"directives":[]}]}}]}}]};

/**
 * __useGetGameInfoQuery__
 *
 * To run a query within a React component, call `useGetGameInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGameInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGameInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGameInfoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetGameInfoQuery, GetGameInfoQueryVariables>) {
        return ApolloReactHooks.useQuery<GetGameInfoQuery, GetGameInfoQueryVariables>(GetGameInfoDocument, baseOptions);
      }
export function useGetGameInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetGameInfoQuery, GetGameInfoQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetGameInfoQuery, GetGameInfoQueryVariables>(GetGameInfoDocument, baseOptions);
        }
export type GetGameInfoQueryHookResult = ReturnType<typeof useGetGameInfoQuery>;
export type GetGameInfoLazyQueryHookResult = ReturnType<typeof useGetGameInfoLazyQuery>;
export type GetGameInfoQueryResult = ApolloReactCommon.QueryResult<GetGameInfoQuery, GetGameInfoQueryVariables>;
export const GetHeroInformationDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHeroInformation"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"heroInformation"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"HeroInformation"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HeroInformation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HeroInformation"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"health"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"state"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"village"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coords"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Coords"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Coords"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Coords"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"y"},"arguments":[],"directives":[]}]}}]};

/**
 * __useGetHeroInformationQuery__
 *
 * To run a query within a React component, call `useGetHeroInformationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHeroInformationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHeroInformationQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHeroInformationQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetHeroInformationQuery, GetHeroInformationQueryVariables>) {
        return ApolloReactHooks.useQuery<GetHeroInformationQuery, GetHeroInformationQueryVariables>(GetHeroInformationDocument, baseOptions);
      }
export function useGetHeroInformationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetHeroInformationQuery, GetHeroInformationQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetHeroInformationQuery, GetHeroInformationQueryVariables>(GetHeroInformationDocument, baseOptions);
        }
export type GetHeroInformationQueryHookResult = ReturnType<typeof useGetHeroInformationQuery>;
export type GetHeroInformationLazyQueryHookResult = ReturnType<typeof useGetHeroInformationLazyQuery>;
export type GetHeroInformationQueryResult = ApolloReactCommon.QueryResult<GetHeroInformationQuery, GetHeroInformationQueryVariables>;
export const OnHeroInformationUpdatedDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnHeroInformationUpdated"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"heroInformationUpdated"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"HeroInformation"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HeroInformation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HeroInformation"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"health"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"state"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"village"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coords"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Coords"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Coords"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Coords"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"y"},"arguments":[],"directives":[]}]}}]};

/**
 * __useOnHeroInformationUpdatedSubscription__
 *
 * To run a query within a React component, call `useOnHeroInformationUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnHeroInformationUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnHeroInformationUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnHeroInformationUpdatedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnHeroInformationUpdatedSubscription, OnHeroInformationUpdatedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<OnHeroInformationUpdatedSubscription, OnHeroInformationUpdatedSubscriptionVariables>(OnHeroInformationUpdatedDocument, baseOptions);
      }
export type OnHeroInformationUpdatedSubscriptionHookResult = ReturnType<typeof useOnHeroInformationUpdatedSubscription>;
export type OnHeroInformationUpdatedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnHeroInformationUpdatedSubscription>;
export const GetLogEntriesDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLogEntries"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logEntries"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogEntry"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogEntry"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Timestamp"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"village"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coords"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Coords"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"content"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextLogEntryContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"messageType"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoBuildLogEntryContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fieldId"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"level"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsLogEntryContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"index"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"tribe"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"unitName"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResourceClaimLogEntryContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reason"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"resources"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Resources"},"directives":[]}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Timestamp"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Timestamp"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSeconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Resources"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Resources"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wood"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"clay"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"iron"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"crop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"freeCrop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"total"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Coords"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Coords"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"y"},"arguments":[],"directives":[]}]}}]};

/**
 * __useGetLogEntriesQuery__
 *
 * To run a query within a React component, call `useGetLogEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLogEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLogEntriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLogEntriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetLogEntriesQuery, GetLogEntriesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetLogEntriesQuery, GetLogEntriesQueryVariables>(GetLogEntriesDocument, baseOptions);
      }
export function useGetLogEntriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetLogEntriesQuery, GetLogEntriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetLogEntriesQuery, GetLogEntriesQueryVariables>(GetLogEntriesDocument, baseOptions);
        }
export type GetLogEntriesQueryHookResult = ReturnType<typeof useGetLogEntriesQuery>;
export type GetLogEntriesLazyQueryHookResult = ReturnType<typeof useGetLogEntriesLazyQuery>;
export type GetLogEntriesQueryResult = ApolloReactCommon.QueryResult<GetLogEntriesQuery, GetLogEntriesQueryVariables>;
export const OnLogEntryAddedDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnLogEntryAdded"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logEntryAdded"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogEntry"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LogEntry"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Timestamp"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"village"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coords"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Coords"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"content"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextLogEntryContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"messageType"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoBuildLogEntryContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fieldId"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"level"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsLogEntryContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"index"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"tribe"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"unitName"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResourceClaimLogEntryContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reason"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"resources"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Resources"},"directives":[]}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Timestamp"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Timestamp"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSeconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Resources"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Resources"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wood"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"clay"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"iron"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"crop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"freeCrop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"total"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Coords"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Coords"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"y"},"arguments":[],"directives":[]}]}}]};

/**
 * __useOnLogEntryAddedSubscription__
 *
 * To run a query within a React component, call `useOnLogEntryAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnLogEntryAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnLogEntryAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnLogEntryAddedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnLogEntryAddedSubscription, OnLogEntryAddedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<OnLogEntryAddedSubscription, OnLogEntryAddedSubscriptionVariables>(OnLogEntryAddedDocument, baseOptions);
      }
export type OnLogEntryAddedSubscriptionHookResult = ReturnType<typeof useOnLogEntryAddedSubscription>;
export type OnLogEntryAddedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnLogEntryAddedSubscription>;
export const NextTaskExecutionDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NextTaskExecution"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"task"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskType"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nextTaskExecution"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"task"},"value":{"kind":"Variable","name":{"kind":"Name","value":"task"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Timestamp"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Timestamp"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Timestamp"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSeconds"},"arguments":[],"directives":[]}]}}]};

/**
 * __useNextTaskExecutionQuery__
 *
 * To run a query within a React component, call `useNextTaskExecutionQuery` and pass it any options that fit your needs.
 * When your component renders, `useNextTaskExecutionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNextTaskExecutionQuery({
 *   variables: {
 *      task: // value for 'task'
 *   },
 * });
 */
export function useNextTaskExecutionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NextTaskExecutionQuery, NextTaskExecutionQueryVariables>) {
        return ApolloReactHooks.useQuery<NextTaskExecutionQuery, NextTaskExecutionQueryVariables>(NextTaskExecutionDocument, baseOptions);
      }
export function useNextTaskExecutionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NextTaskExecutionQuery, NextTaskExecutionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<NextTaskExecutionQuery, NextTaskExecutionQueryVariables>(NextTaskExecutionDocument, baseOptions);
        }
export type NextTaskExecutionQueryHookResult = ReturnType<typeof useNextTaskExecutionQuery>;
export type NextTaskExecutionLazyQueryHookResult = ReturnType<typeof useNextTaskExecutionLazyQuery>;
export type NextTaskExecutionQueryResult = ApolloReactCommon.QueryResult<NextTaskExecutionQuery, NextTaskExecutionQueryVariables>;
export const NextVillageTaskExecutionDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NextVillageTaskExecution"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"task"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskType"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nextVillageTaskExecution"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"task"},"value":{"kind":"Variable","name":{"kind":"Name","value":"task"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Timestamp"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Timestamp"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Timestamp"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSeconds"},"arguments":[],"directives":[]}]}}]};

/**
 * __useNextVillageTaskExecutionQuery__
 *
 * To run a query within a React component, call `useNextVillageTaskExecutionQuery` and pass it any options that fit your needs.
 * When your component renders, `useNextVillageTaskExecutionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNextVillageTaskExecutionQuery({
 *   variables: {
 *      villageId: // value for 'villageId'
 *      task: // value for 'task'
 *   },
 * });
 */
export function useNextVillageTaskExecutionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NextVillageTaskExecutionQuery, NextVillageTaskExecutionQueryVariables>) {
        return ApolloReactHooks.useQuery<NextVillageTaskExecutionQuery, NextVillageTaskExecutionQueryVariables>(NextVillageTaskExecutionDocument, baseOptions);
      }
export function useNextVillageTaskExecutionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NextVillageTaskExecutionQuery, NextVillageTaskExecutionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<NextVillageTaskExecutionQuery, NextVillageTaskExecutionQueryVariables>(NextVillageTaskExecutionDocument, baseOptions);
        }
export type NextVillageTaskExecutionQueryHookResult = ReturnType<typeof useNextVillageTaskExecutionQuery>;
export type NextVillageTaskExecutionLazyQueryHookResult = ReturnType<typeof useNextVillageTaskExecutionLazyQuery>;
export type NextVillageTaskExecutionQueryResult = ApolloReactCommon.QueryResult<NextVillageTaskExecutionQuery, NextVillageTaskExecutionQueryVariables>;
export const NextTasksExecutionDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NextTasksExecution"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nextTasksExecution"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Timestamp"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Timestamp"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Timestamp"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSeconds"},"arguments":[],"directives":[]}]}}]};

/**
 * __useNextTasksExecutionQuery__
 *
 * To run a query within a React component, call `useNextTasksExecutionQuery` and pass it any options that fit your needs.
 * When your component renders, `useNextTasksExecutionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNextTasksExecutionQuery({
 *   variables: {
 *   },
 * });
 */
export function useNextTasksExecutionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NextTasksExecutionQuery, NextTasksExecutionQueryVariables>) {
        return ApolloReactHooks.useQuery<NextTasksExecutionQuery, NextTasksExecutionQueryVariables>(NextTasksExecutionDocument, baseOptions);
      }
export function useNextTasksExecutionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NextTasksExecutionQuery, NextTasksExecutionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<NextTasksExecutionQuery, NextTasksExecutionQueryVariables>(NextTasksExecutionDocument, baseOptions);
        }
export type NextTasksExecutionQueryHookResult = ReturnType<typeof useNextTasksExecutionQuery>;
export type NextTasksExecutionLazyQueryHookResult = ReturnType<typeof useNextTasksExecutionLazyQuery>;
export type NextTasksExecutionQueryResult = ApolloReactCommon.QueryResult<NextTasksExecutionQuery, NextTasksExecutionQueryVariables>;
export const SetNextTaskExecutionDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetNextTaskExecution"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"task"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskType"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"delay"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DurationInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setNextTaskExecution"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"task"},"value":{"kind":"Variable","name":{"kind":"Name","value":"task"}}},{"kind":"Argument","name":{"kind":"Name","value":"delay"},"value":{"kind":"Variable","name":{"kind":"Name","value":"delay"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Timestamp"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Timestamp"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Timestamp"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSeconds"},"arguments":[],"directives":[]}]}}]};
export type SetNextTaskExecutionMutationFn = ApolloReactCommon.MutationFunction<SetNextTaskExecutionMutation, SetNextTaskExecutionMutationVariables>;

/**
 * __useSetNextTaskExecutionMutation__
 *
 * To run a mutation, you first call `useSetNextTaskExecutionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetNextTaskExecutionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setNextTaskExecutionMutation, { data, loading, error }] = useSetNextTaskExecutionMutation({
 *   variables: {
 *      task: // value for 'task'
 *      delay: // value for 'delay'
 *   },
 * });
 */
export function useSetNextTaskExecutionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetNextTaskExecutionMutation, SetNextTaskExecutionMutationVariables>) {
        return ApolloReactHooks.useMutation<SetNextTaskExecutionMutation, SetNextTaskExecutionMutationVariables>(SetNextTaskExecutionDocument, baseOptions);
      }
export type SetNextTaskExecutionMutationHookResult = ReturnType<typeof useSetNextTaskExecutionMutation>;
export type SetNextTaskExecutionMutationResult = ApolloReactCommon.MutationResult<SetNextTaskExecutionMutation>;
export type SetNextTaskExecutionMutationOptions = ApolloReactCommon.BaseMutationOptions<SetNextTaskExecutionMutation, SetNextTaskExecutionMutationVariables>;
export const SetNextTasksExecutionDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetNextTasksExecution"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"delay"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DurationInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setNextTasksExecution"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"delay"},"value":{"kind":"Variable","name":{"kind":"Name","value":"delay"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Timestamp"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Timestamp"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Timestamp"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSeconds"},"arguments":[],"directives":[]}]}}]};
export type SetNextTasksExecutionMutationFn = ApolloReactCommon.MutationFunction<SetNextTasksExecutionMutation, SetNextTasksExecutionMutationVariables>;

/**
 * __useSetNextTasksExecutionMutation__
 *
 * To run a mutation, you first call `useSetNextTasksExecutionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetNextTasksExecutionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setNextTasksExecutionMutation, { data, loading, error }] = useSetNextTasksExecutionMutation({
 *   variables: {
 *      delay: // value for 'delay'
 *   },
 * });
 */
export function useSetNextTasksExecutionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetNextTasksExecutionMutation, SetNextTasksExecutionMutationVariables>) {
        return ApolloReactHooks.useMutation<SetNextTasksExecutionMutation, SetNextTasksExecutionMutationVariables>(SetNextTasksExecutionDocument, baseOptions);
      }
export type SetNextTasksExecutionMutationHookResult = ReturnType<typeof useSetNextTasksExecutionMutation>;
export type SetNextTasksExecutionMutationResult = ApolloReactCommon.MutationResult<SetNextTasksExecutionMutation>;
export type SetNextTasksExecutionMutationOptions = ApolloReactCommon.BaseMutationOptions<SetNextTasksExecutionMutation, SetNextTasksExecutionMutationVariables>;
export const SetNextVillageTaskExecutionDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetNextVillageTaskExecution"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"task"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskType"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"delay"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DurationInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setNextVillageTaskExecution"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"task"},"value":{"kind":"Variable","name":{"kind":"Name","value":"task"}}},{"kind":"Argument","name":{"kind":"Name","value":"delay"},"value":{"kind":"Variable","name":{"kind":"Name","value":"delay"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Timestamp"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Timestamp"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Timestamp"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSeconds"},"arguments":[],"directives":[]}]}}]};
export type SetNextVillageTaskExecutionMutationFn = ApolloReactCommon.MutationFunction<SetNextVillageTaskExecutionMutation, SetNextVillageTaskExecutionMutationVariables>;

/**
 * __useSetNextVillageTaskExecutionMutation__
 *
 * To run a mutation, you first call `useSetNextVillageTaskExecutionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetNextVillageTaskExecutionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setNextVillageTaskExecutionMutation, { data, loading, error }] = useSetNextVillageTaskExecutionMutation({
 *   variables: {
 *      villageId: // value for 'villageId'
 *      task: // value for 'task'
 *      delay: // value for 'delay'
 *   },
 * });
 */
export function useSetNextVillageTaskExecutionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetNextVillageTaskExecutionMutation, SetNextVillageTaskExecutionMutationVariables>) {
        return ApolloReactHooks.useMutation<SetNextVillageTaskExecutionMutation, SetNextVillageTaskExecutionMutationVariables>(SetNextVillageTaskExecutionDocument, baseOptions);
      }
export type SetNextVillageTaskExecutionMutationHookResult = ReturnType<typeof useSetNextVillageTaskExecutionMutation>;
export type SetNextVillageTaskExecutionMutationResult = ApolloReactCommon.MutationResult<SetNextVillageTaskExecutionMutation>;
export type SetNextVillageTaskExecutionMutationOptions = ApolloReactCommon.BaseMutationOptions<SetNextVillageTaskExecutionMutation, SetNextVillageTaskExecutionMutationVariables>;
export const ResetNextTaskExecutionDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetNextTaskExecution"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"task"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskType"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetNextTaskExecution"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"task"},"value":{"kind":"Variable","name":{"kind":"Name","value":"task"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Timestamp"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Timestamp"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Timestamp"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSeconds"},"arguments":[],"directives":[]}]}}]};
export type ResetNextTaskExecutionMutationFn = ApolloReactCommon.MutationFunction<ResetNextTaskExecutionMutation, ResetNextTaskExecutionMutationVariables>;

/**
 * __useResetNextTaskExecutionMutation__
 *
 * To run a mutation, you first call `useResetNextTaskExecutionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetNextTaskExecutionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetNextTaskExecutionMutation, { data, loading, error }] = useResetNextTaskExecutionMutation({
 *   variables: {
 *      task: // value for 'task'
 *   },
 * });
 */
export function useResetNextTaskExecutionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetNextTaskExecutionMutation, ResetNextTaskExecutionMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetNextTaskExecutionMutation, ResetNextTaskExecutionMutationVariables>(ResetNextTaskExecutionDocument, baseOptions);
      }
export type ResetNextTaskExecutionMutationHookResult = ReturnType<typeof useResetNextTaskExecutionMutation>;
export type ResetNextTaskExecutionMutationResult = ApolloReactCommon.MutationResult<ResetNextTaskExecutionMutation>;
export type ResetNextTaskExecutionMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetNextTaskExecutionMutation, ResetNextTaskExecutionMutationVariables>;
export const ResetNextTasksExecutionDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetNextTasksExecution"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetNextTasksExecution"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Timestamp"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Timestamp"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Timestamp"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSeconds"},"arguments":[],"directives":[]}]}}]};
export type ResetNextTasksExecutionMutationFn = ApolloReactCommon.MutationFunction<ResetNextTasksExecutionMutation, ResetNextTasksExecutionMutationVariables>;

/**
 * __useResetNextTasksExecutionMutation__
 *
 * To run a mutation, you first call `useResetNextTasksExecutionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetNextTasksExecutionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetNextTasksExecutionMutation, { data, loading, error }] = useResetNextTasksExecutionMutation({
 *   variables: {
 *   },
 * });
 */
export function useResetNextTasksExecutionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetNextTasksExecutionMutation, ResetNextTasksExecutionMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetNextTasksExecutionMutation, ResetNextTasksExecutionMutationVariables>(ResetNextTasksExecutionDocument, baseOptions);
      }
export type ResetNextTasksExecutionMutationHookResult = ReturnType<typeof useResetNextTasksExecutionMutation>;
export type ResetNextTasksExecutionMutationResult = ApolloReactCommon.MutationResult<ResetNextTasksExecutionMutation>;
export type ResetNextTasksExecutionMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetNextTasksExecutionMutation, ResetNextTasksExecutionMutationVariables>;
export const ResetNextVillageTaskExecutionDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetNextVillageTaskExecution"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"task"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskType"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetNextVillageTaskExecution"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"task"},"value":{"kind":"Variable","name":{"kind":"Name","value":"task"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Timestamp"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Timestamp"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Timestamp"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSeconds"},"arguments":[],"directives":[]}]}}]};
export type ResetNextVillageTaskExecutionMutationFn = ApolloReactCommon.MutationFunction<ResetNextVillageTaskExecutionMutation, ResetNextVillageTaskExecutionMutationVariables>;

/**
 * __useResetNextVillageTaskExecutionMutation__
 *
 * To run a mutation, you first call `useResetNextVillageTaskExecutionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetNextVillageTaskExecutionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetNextVillageTaskExecutionMutation, { data, loading, error }] = useResetNextVillageTaskExecutionMutation({
 *   variables: {
 *      villageId: // value for 'villageId'
 *      task: // value for 'task'
 *   },
 * });
 */
export function useResetNextVillageTaskExecutionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetNextVillageTaskExecutionMutation, ResetNextVillageTaskExecutionMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetNextVillageTaskExecutionMutation, ResetNextVillageTaskExecutionMutationVariables>(ResetNextVillageTaskExecutionDocument, baseOptions);
      }
export type ResetNextVillageTaskExecutionMutationHookResult = ReturnType<typeof useResetNextVillageTaskExecutionMutation>;
export type ResetNextVillageTaskExecutionMutationResult = ApolloReactCommon.MutationResult<ResetNextVillageTaskExecutionMutation>;
export type ResetNextVillageTaskExecutionMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetNextVillageTaskExecutionMutation, ResetNextVillageTaskExecutionMutationVariables>;
export const OnNextTasksExecutionChangedDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnNextTasksExecutionChanged"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nextTasksExecutionChanged"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Timestamp"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Timestamp"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Timestamp"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSeconds"},"arguments":[],"directives":[]}]}}]};

/**
 * __useOnNextTasksExecutionChangedSubscription__
 *
 * To run a query within a React component, call `useOnNextTasksExecutionChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnNextTasksExecutionChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnNextTasksExecutionChangedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnNextTasksExecutionChangedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnNextTasksExecutionChangedSubscription, OnNextTasksExecutionChangedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<OnNextTasksExecutionChangedSubscription, OnNextTasksExecutionChangedSubscriptionVariables>(OnNextTasksExecutionChangedDocument, baseOptions);
      }
export type OnNextTasksExecutionChangedSubscriptionHookResult = ReturnType<typeof useOnNextTasksExecutionChangedSubscription>;
export type OnNextTasksExecutionChangedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnNextTasksExecutionChangedSubscription>;
export const OnNextTaskExecutionChangedDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnNextTaskExecutionChanged"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"task"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskType"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nextTaskExecutionChanged"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"task"},"value":{"kind":"Variable","name":{"kind":"Name","value":"task"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Timestamp"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Timestamp"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Timestamp"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSeconds"},"arguments":[],"directives":[]}]}}]};

/**
 * __useOnNextTaskExecutionChangedSubscription__
 *
 * To run a query within a React component, call `useOnNextTaskExecutionChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnNextTaskExecutionChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnNextTaskExecutionChangedSubscription({
 *   variables: {
 *      task: // value for 'task'
 *   },
 * });
 */
export function useOnNextTaskExecutionChangedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnNextTaskExecutionChangedSubscription, OnNextTaskExecutionChangedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<OnNextTaskExecutionChangedSubscription, OnNextTaskExecutionChangedSubscriptionVariables>(OnNextTaskExecutionChangedDocument, baseOptions);
      }
export type OnNextTaskExecutionChangedSubscriptionHookResult = ReturnType<typeof useOnNextTaskExecutionChangedSubscription>;
export type OnNextTaskExecutionChangedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnNextTaskExecutionChangedSubscription>;
export const OnNextVillageTaskExecutionChangedDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnNextVillageTaskExecutionChanged"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"task"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskType"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nextVillageTaskExecutionChanged"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"task"},"value":{"kind":"Variable","name":{"kind":"Name","value":"task"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Timestamp"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Timestamp"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Timestamp"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalSeconds"},"arguments":[],"directives":[]}]}}]};

/**
 * __useOnNextVillageTaskExecutionChangedSubscription__
 *
 * To run a query within a React component, call `useOnNextVillageTaskExecutionChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnNextVillageTaskExecutionChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnNextVillageTaskExecutionChangedSubscription({
 *   variables: {
 *      villageId: // value for 'villageId'
 *      task: // value for 'task'
 *   },
 * });
 */
export function useOnNextVillageTaskExecutionChangedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnNextVillageTaskExecutionChangedSubscription, OnNextVillageTaskExecutionChangedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<OnNextVillageTaskExecutionChangedSubscription, OnNextVillageTaskExecutionChangedSubscriptionVariables>(OnNextVillageTaskExecutionChangedDocument, baseOptions);
      }
export type OnNextVillageTaskExecutionChangedSubscriptionHookResult = ReturnType<typeof useOnNextVillageTaskExecutionChangedSubscription>;
export type OnNextVillageTaskExecutionChangedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnNextVillageTaskExecutionChangedSubscription>;
export const GetQueuedBuildingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetQueuedBuildings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildingQueue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingQueue"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Resources"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Resources"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wood"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"clay"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"iron"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"crop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"freeCrop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"total"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QueuedBuilding"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueuedBuilding"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildingTime"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"fieldId"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"level"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"queueId"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"queueIndex"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QueuedBuildingRange"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueuedBuildingRange"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildings"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"QueuedBuilding"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingTime"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Resources"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"fieldId"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingQueue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingQueue"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildingRanges"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"QueuedBuildingRange"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"totalBuildingTime"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCost"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Resources"},"directives":[]}]}}]}}]};

/**
 * __useGetQueuedBuildingsQuery__
 *
 * To run a query within a React component, call `useGetQueuedBuildingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQueuedBuildingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQueuedBuildingsQuery({
 *   variables: {
 *      villageId: // value for 'villageId'
 *   },
 * });
 */
export function useGetQueuedBuildingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetQueuedBuildingsQuery, GetQueuedBuildingsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetQueuedBuildingsQuery, GetQueuedBuildingsQueryVariables>(GetQueuedBuildingsDocument, baseOptions);
      }
export function useGetQueuedBuildingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetQueuedBuildingsQuery, GetQueuedBuildingsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetQueuedBuildingsQuery, GetQueuedBuildingsQueryVariables>(GetQueuedBuildingsDocument, baseOptions);
        }
export type GetQueuedBuildingsQueryHookResult = ReturnType<typeof useGetQueuedBuildingsQuery>;
export type GetQueuedBuildingsLazyQueryHookResult = ReturnType<typeof useGetQueuedBuildingsLazyQuery>;
export type GetQueuedBuildingsQueryResult = ApolloReactCommon.QueryResult<GetQueuedBuildingsQuery, GetQueuedBuildingsQueryVariables>;
export const CanMoveQueuedBuildingToIndexDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CanMoveQueuedBuildingToIndex"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queueId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"index"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canMoveQueuedBuildingToIndex"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"queueId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queueId"}}},{"kind":"Argument","name":{"kind":"Name","value":"index"},"value":{"kind":"Variable","name":{"kind":"Name","value":"index"}}}],"directives":[]}]}}]};

/**
 * __useCanMoveQueuedBuildingToIndexQuery__
 *
 * To run a query within a React component, call `useCanMoveQueuedBuildingToIndexQuery` and pass it any options that fit your needs.
 * When your component renders, `useCanMoveQueuedBuildingToIndexQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCanMoveQueuedBuildingToIndexQuery({
 *   variables: {
 *      villageId: // value for 'villageId'
 *      queueId: // value for 'queueId'
 *      index: // value for 'index'
 *   },
 * });
 */
export function useCanMoveQueuedBuildingToIndexQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CanMoveQueuedBuildingToIndexQuery, CanMoveQueuedBuildingToIndexQueryVariables>) {
        return ApolloReactHooks.useQuery<CanMoveQueuedBuildingToIndexQuery, CanMoveQueuedBuildingToIndexQueryVariables>(CanMoveQueuedBuildingToIndexDocument, baseOptions);
      }
export function useCanMoveQueuedBuildingToIndexLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CanMoveQueuedBuildingToIndexQuery, CanMoveQueuedBuildingToIndexQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CanMoveQueuedBuildingToIndexQuery, CanMoveQueuedBuildingToIndexQueryVariables>(CanMoveQueuedBuildingToIndexDocument, baseOptions);
        }
export type CanMoveQueuedBuildingToIndexQueryHookResult = ReturnType<typeof useCanMoveQueuedBuildingToIndexQuery>;
export type CanMoveQueuedBuildingToIndexLazyQueryHookResult = ReturnType<typeof useCanMoveQueuedBuildingToIndexLazyQuery>;
export type CanMoveQueuedBuildingToIndexQueryResult = ApolloReactCommon.QueryResult<CanMoveQueuedBuildingToIndexQuery, CanMoveQueuedBuildingToIndexQueryVariables>;
export const CanMoveQueuedBuildingsBlockToIndexDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CanMoveQueuedBuildingsBlockToIndex"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topBuildingQueueId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bottomBuildingQueueId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"index"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canMoveQueuedBuildingsBlockToIndex"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"topBuildingQueueId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topBuildingQueueId"}}},{"kind":"Argument","name":{"kind":"Name","value":"bottomBuildingQueueId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bottomBuildingQueueId"}}},{"kind":"Argument","name":{"kind":"Name","value":"index"},"value":{"kind":"Variable","name":{"kind":"Name","value":"index"}}}],"directives":[]}]}}]};

/**
 * __useCanMoveQueuedBuildingsBlockToIndexQuery__
 *
 * To run a query within a React component, call `useCanMoveQueuedBuildingsBlockToIndexQuery` and pass it any options that fit your needs.
 * When your component renders, `useCanMoveQueuedBuildingsBlockToIndexQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCanMoveQueuedBuildingsBlockToIndexQuery({
 *   variables: {
 *      villageId: // value for 'villageId'
 *      topBuildingQueueId: // value for 'topBuildingQueueId'
 *      bottomBuildingQueueId: // value for 'bottomBuildingQueueId'
 *      index: // value for 'index'
 *   },
 * });
 */
export function useCanMoveQueuedBuildingsBlockToIndexQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CanMoveQueuedBuildingsBlockToIndexQuery, CanMoveQueuedBuildingsBlockToIndexQueryVariables>) {
        return ApolloReactHooks.useQuery<CanMoveQueuedBuildingsBlockToIndexQuery, CanMoveQueuedBuildingsBlockToIndexQueryVariables>(CanMoveQueuedBuildingsBlockToIndexDocument, baseOptions);
      }
export function useCanMoveQueuedBuildingsBlockToIndexLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CanMoveQueuedBuildingsBlockToIndexQuery, CanMoveQueuedBuildingsBlockToIndexQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CanMoveQueuedBuildingsBlockToIndexQuery, CanMoveQueuedBuildingsBlockToIndexQueryVariables>(CanMoveQueuedBuildingsBlockToIndexDocument, baseOptions);
        }
export type CanMoveQueuedBuildingsBlockToIndexQueryHookResult = ReturnType<typeof useCanMoveQueuedBuildingsBlockToIndexQuery>;
export type CanMoveQueuedBuildingsBlockToIndexLazyQueryHookResult = ReturnType<typeof useCanMoveQueuedBuildingsBlockToIndexLazyQuery>;
export type CanMoveQueuedBuildingsBlockToIndexQueryResult = ApolloReactCommon.QueryResult<CanMoveQueuedBuildingsBlockToIndexQuery, CanMoveQueuedBuildingsBlockToIndexQueryVariables>;
export const ClearQueueDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ClearQueue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clearQueue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}}],"directives":[]}]}}]};
export type ClearQueueMutationFn = ApolloReactCommon.MutationFunction<ClearQueueMutation, ClearQueueMutationVariables>;

/**
 * __useClearQueueMutation__
 *
 * To run a mutation, you first call `useClearQueueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearQueueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearQueueMutation, { data, loading, error }] = useClearQueueMutation({
 *   variables: {
 *      villageId: // value for 'villageId'
 *   },
 * });
 */
export function useClearQueueMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ClearQueueMutation, ClearQueueMutationVariables>) {
        return ApolloReactHooks.useMutation<ClearQueueMutation, ClearQueueMutationVariables>(ClearQueueDocument, baseOptions);
      }
export type ClearQueueMutationHookResult = ReturnType<typeof useClearQueueMutation>;
export type ClearQueueMutationResult = ApolloReactCommon.MutationResult<ClearQueueMutation>;
export type ClearQueueMutationOptions = ApolloReactCommon.BaseMutationOptions<ClearQueueMutation, ClearQueueMutationVariables>;
export const EnqueueBuildingDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EnqueueBuilding"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EnqueueBuildingInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enqueueBuilding"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[]}]}}]};
export type EnqueueBuildingMutationFn = ApolloReactCommon.MutationFunction<EnqueueBuildingMutation, EnqueueBuildingMutationVariables>;

/**
 * __useEnqueueBuildingMutation__
 *
 * To run a mutation, you first call `useEnqueueBuildingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnqueueBuildingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enqueueBuildingMutation, { data, loading, error }] = useEnqueueBuildingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEnqueueBuildingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EnqueueBuildingMutation, EnqueueBuildingMutationVariables>) {
        return ApolloReactHooks.useMutation<EnqueueBuildingMutation, EnqueueBuildingMutationVariables>(EnqueueBuildingDocument, baseOptions);
      }
export type EnqueueBuildingMutationHookResult = ReturnType<typeof useEnqueueBuildingMutation>;
export type EnqueueBuildingMutationResult = ApolloReactCommon.MutationResult<EnqueueBuildingMutation>;
export type EnqueueBuildingMutationOptions = ApolloReactCommon.BaseMutationOptions<EnqueueBuildingMutation, EnqueueBuildingMutationVariables>;
export const DequeueBuildingDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DequeueBuilding"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DequeueBuildingInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dequeueBuilding"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[]}]}}]};
export type DequeueBuildingMutationFn = ApolloReactCommon.MutationFunction<DequeueBuildingMutation, DequeueBuildingMutationVariables>;

/**
 * __useDequeueBuildingMutation__
 *
 * To run a mutation, you first call `useDequeueBuildingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDequeueBuildingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dequeueBuildingMutation, { data, loading, error }] = useDequeueBuildingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDequeueBuildingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DequeueBuildingMutation, DequeueBuildingMutationVariables>) {
        return ApolloReactHooks.useMutation<DequeueBuildingMutation, DequeueBuildingMutationVariables>(DequeueBuildingDocument, baseOptions);
      }
export type DequeueBuildingMutationHookResult = ReturnType<typeof useDequeueBuildingMutation>;
export type DequeueBuildingMutationResult = ApolloReactCommon.MutationResult<DequeueBuildingMutation>;
export type DequeueBuildingMutationOptions = ApolloReactCommon.BaseMutationOptions<DequeueBuildingMutation, DequeueBuildingMutationVariables>;
export const DequeueBuildingAtFieldDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DequeueBuildingAtField"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DequeueBuildingAtFieldInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dequeueBuildingAtField"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[]}]}}]};
export type DequeueBuildingAtFieldMutationFn = ApolloReactCommon.MutationFunction<DequeueBuildingAtFieldMutation, DequeueBuildingAtFieldMutationVariables>;

/**
 * __useDequeueBuildingAtFieldMutation__
 *
 * To run a mutation, you first call `useDequeueBuildingAtFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDequeueBuildingAtFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dequeueBuildingAtFieldMutation, { data, loading, error }] = useDequeueBuildingAtFieldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDequeueBuildingAtFieldMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DequeueBuildingAtFieldMutation, DequeueBuildingAtFieldMutationVariables>) {
        return ApolloReactHooks.useMutation<DequeueBuildingAtFieldMutation, DequeueBuildingAtFieldMutationVariables>(DequeueBuildingAtFieldDocument, baseOptions);
      }
export type DequeueBuildingAtFieldMutationHookResult = ReturnType<typeof useDequeueBuildingAtFieldMutation>;
export type DequeueBuildingAtFieldMutationResult = ApolloReactCommon.MutationResult<DequeueBuildingAtFieldMutation>;
export type DequeueBuildingAtFieldMutationOptions = ApolloReactCommon.BaseMutationOptions<DequeueBuildingAtFieldMutation, DequeueBuildingAtFieldMutationVariables>;
export const MoveQueuedBuildingAsHighAsPossibleDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveQueuedBuildingAsHighAsPossible"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queueId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveQueuedBuildingAsHighAsPossible"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"queueId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queueId"}}}],"directives":[]}]}}]};
export type MoveQueuedBuildingAsHighAsPossibleMutationFn = ApolloReactCommon.MutationFunction<MoveQueuedBuildingAsHighAsPossibleMutation, MoveQueuedBuildingAsHighAsPossibleMutationVariables>;

/**
 * __useMoveQueuedBuildingAsHighAsPossibleMutation__
 *
 * To run a mutation, you first call `useMoveQueuedBuildingAsHighAsPossibleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveQueuedBuildingAsHighAsPossibleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveQueuedBuildingAsHighAsPossibleMutation, { data, loading, error }] = useMoveQueuedBuildingAsHighAsPossibleMutation({
 *   variables: {
 *      villageId: // value for 'villageId'
 *      queueId: // value for 'queueId'
 *   },
 * });
 */
export function useMoveQueuedBuildingAsHighAsPossibleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MoveQueuedBuildingAsHighAsPossibleMutation, MoveQueuedBuildingAsHighAsPossibleMutationVariables>) {
        return ApolloReactHooks.useMutation<MoveQueuedBuildingAsHighAsPossibleMutation, MoveQueuedBuildingAsHighAsPossibleMutationVariables>(MoveQueuedBuildingAsHighAsPossibleDocument, baseOptions);
      }
export type MoveQueuedBuildingAsHighAsPossibleMutationHookResult = ReturnType<typeof useMoveQueuedBuildingAsHighAsPossibleMutation>;
export type MoveQueuedBuildingAsHighAsPossibleMutationResult = ApolloReactCommon.MutationResult<MoveQueuedBuildingAsHighAsPossibleMutation>;
export type MoveQueuedBuildingAsHighAsPossibleMutationOptions = ApolloReactCommon.BaseMutationOptions<MoveQueuedBuildingAsHighAsPossibleMutation, MoveQueuedBuildingAsHighAsPossibleMutationVariables>;
export const MoveQueuedBuildingToIndexDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveQueuedBuildingToIndex"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queueId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"index"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveQueuedBuildingToIndex"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"queueId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queueId"}}},{"kind":"Argument","name":{"kind":"Name","value":"index"},"value":{"kind":"Variable","name":{"kind":"Name","value":"index"}}}],"directives":[]}]}}]};
export type MoveQueuedBuildingToIndexMutationFn = ApolloReactCommon.MutationFunction<MoveQueuedBuildingToIndexMutation, MoveQueuedBuildingToIndexMutationVariables>;

/**
 * __useMoveQueuedBuildingToIndexMutation__
 *
 * To run a mutation, you first call `useMoveQueuedBuildingToIndexMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveQueuedBuildingToIndexMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveQueuedBuildingToIndexMutation, { data, loading, error }] = useMoveQueuedBuildingToIndexMutation({
 *   variables: {
 *      villageId: // value for 'villageId'
 *      queueId: // value for 'queueId'
 *      index: // value for 'index'
 *   },
 * });
 */
export function useMoveQueuedBuildingToIndexMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MoveQueuedBuildingToIndexMutation, MoveQueuedBuildingToIndexMutationVariables>) {
        return ApolloReactHooks.useMutation<MoveQueuedBuildingToIndexMutation, MoveQueuedBuildingToIndexMutationVariables>(MoveQueuedBuildingToIndexDocument, baseOptions);
      }
export type MoveQueuedBuildingToIndexMutationHookResult = ReturnType<typeof useMoveQueuedBuildingToIndexMutation>;
export type MoveQueuedBuildingToIndexMutationResult = ApolloReactCommon.MutationResult<MoveQueuedBuildingToIndexMutation>;
export type MoveQueuedBuildingToIndexMutationOptions = ApolloReactCommon.BaseMutationOptions<MoveQueuedBuildingToIndexMutation, MoveQueuedBuildingToIndexMutationVariables>;
export const MoveQueuedBuildingsBlockToIndexDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveQueuedBuildingsBlockToIndex"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topBuildingQueueId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bottomBuildingQueueId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"index"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveQueuedBuildingsBlockToIndex"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"topBuildingQueueId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topBuildingQueueId"}}},{"kind":"Argument","name":{"kind":"Name","value":"bottomBuildingQueueId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bottomBuildingQueueId"}}},{"kind":"Argument","name":{"kind":"Name","value":"index"},"value":{"kind":"Variable","name":{"kind":"Name","value":"index"}}}],"directives":[]}]}}]};
export type MoveQueuedBuildingsBlockToIndexMutationFn = ApolloReactCommon.MutationFunction<MoveQueuedBuildingsBlockToIndexMutation, MoveQueuedBuildingsBlockToIndexMutationVariables>;

/**
 * __useMoveQueuedBuildingsBlockToIndexMutation__
 *
 * To run a mutation, you first call `useMoveQueuedBuildingsBlockToIndexMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveQueuedBuildingsBlockToIndexMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveQueuedBuildingsBlockToIndexMutation, { data, loading, error }] = useMoveQueuedBuildingsBlockToIndexMutation({
 *   variables: {
 *      villageId: // value for 'villageId'
 *      topBuildingQueueId: // value for 'topBuildingQueueId'
 *      bottomBuildingQueueId: // value for 'bottomBuildingQueueId'
 *      index: // value for 'index'
 *   },
 * });
 */
export function useMoveQueuedBuildingsBlockToIndexMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MoveQueuedBuildingsBlockToIndexMutation, MoveQueuedBuildingsBlockToIndexMutationVariables>) {
        return ApolloReactHooks.useMutation<MoveQueuedBuildingsBlockToIndexMutation, MoveQueuedBuildingsBlockToIndexMutationVariables>(MoveQueuedBuildingsBlockToIndexDocument, baseOptions);
      }
export type MoveQueuedBuildingsBlockToIndexMutationHookResult = ReturnType<typeof useMoveQueuedBuildingsBlockToIndexMutation>;
export type MoveQueuedBuildingsBlockToIndexMutationResult = ApolloReactCommon.MutationResult<MoveQueuedBuildingsBlockToIndexMutation>;
export type MoveQueuedBuildingsBlockToIndexMutationOptions = ApolloReactCommon.BaseMutationOptions<MoveQueuedBuildingsBlockToIndexMutation, MoveQueuedBuildingsBlockToIndexMutationVariables>;
export const OnQueueUpdatedDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnQueueUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"queueUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingQueue"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Resources"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Resources"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wood"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"clay"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"iron"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"crop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"freeCrop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"total"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QueuedBuilding"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueuedBuilding"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildingTime"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"fieldId"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"level"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"queueId"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"queueIndex"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QueuedBuildingRange"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueuedBuildingRange"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildings"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"QueuedBuilding"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingTime"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"cost"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Resources"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"fieldId"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingQueue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingQueue"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildingRanges"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"QueuedBuildingRange"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"totalBuildingTime"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCost"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Resources"},"directives":[]}]}}]}}]};

/**
 * __useOnQueueUpdatedSubscription__
 *
 * To run a query within a React component, call `useOnQueueUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnQueueUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnQueueUpdatedSubscription({
 *   variables: {
 *      villageId: // value for 'villageId'
 *   },
 * });
 */
export function useOnQueueUpdatedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnQueueUpdatedSubscription, OnQueueUpdatedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<OnQueueUpdatedSubscription, OnQueueUpdatedSubscriptionVariables>(OnQueueUpdatedDocument, baseOptions);
      }
export type OnQueueUpdatedSubscriptionHookResult = ReturnType<typeof useOnQueueUpdatedSubscription>;
export type OnQueueUpdatedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnQueueUpdatedSubscription>;
export const GetAccountSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccountSettings"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountSettings"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoolDown"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoolDown"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AccountSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowTasks"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"tasksCoolDown"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoolDown"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"autoStart"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"autoBuild"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"autoUnits"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"autoParty"},"arguments":[],"directives":[]}]}}]};

/**
 * __useGetAccountSettingsQuery__
 *
 * To run a query within a React component, call `useGetAccountSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAccountSettingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAccountSettingsQuery, GetAccountSettingsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAccountSettingsQuery, GetAccountSettingsQueryVariables>(GetAccountSettingsDocument, baseOptions);
      }
export function useGetAccountSettingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAccountSettingsQuery, GetAccountSettingsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAccountSettingsQuery, GetAccountSettingsQueryVariables>(GetAccountSettingsDocument, baseOptions);
        }
export type GetAccountSettingsQueryHookResult = ReturnType<typeof useGetAccountSettingsQuery>;
export type GetAccountSettingsLazyQueryHookResult = ReturnType<typeof useGetAccountSettingsLazyQuery>;
export type GetAccountSettingsQueryResult = ApolloReactCommon.QueryResult<GetAccountSettingsQuery, GetAccountSettingsQueryVariables>;
export const UpdateAccountSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAccountSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"settings"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAccountSettingsInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAccountSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"settings"},"value":{"kind":"Variable","name":{"kind":"Name","value":"settings"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoolDown"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoolDown"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AccountSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowTasks"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"tasksCoolDown"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoolDown"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"autoStart"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"autoBuild"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"autoUnits"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"autoParty"},"arguments":[],"directives":[]}]}}]};
export type UpdateAccountSettingsMutationFn = ApolloReactCommon.MutationFunction<UpdateAccountSettingsMutation, UpdateAccountSettingsMutationVariables>;

/**
 * __useUpdateAccountSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateAccountSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountSettingsMutation, { data, loading, error }] = useUpdateAccountSettingsMutation({
 *   variables: {
 *      settings: // value for 'settings'
 *   },
 * });
 */
export function useUpdateAccountSettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateAccountSettingsMutation, UpdateAccountSettingsMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateAccountSettingsMutation, UpdateAccountSettingsMutationVariables>(UpdateAccountSettingsDocument, baseOptions);
      }
export type UpdateAccountSettingsMutationHookResult = ReturnType<typeof useUpdateAccountSettingsMutation>;
export type UpdateAccountSettingsMutationResult = ApolloReactCommon.MutationResult<UpdateAccountSettingsMutation>;
export type UpdateAccountSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateAccountSettingsMutation, UpdateAccountSettingsMutationVariables>;
export const ResetAccountSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetAccountSettings"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetAccountSettings"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoolDown"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoolDown"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AccountSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowTasks"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"tasksCoolDown"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoolDown"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"autoStart"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"autoBuild"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"autoUnits"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"autoParty"},"arguments":[],"directives":[]}]}}]};
export type ResetAccountSettingsMutationFn = ApolloReactCommon.MutationFunction<ResetAccountSettingsMutation, ResetAccountSettingsMutationVariables>;

/**
 * __useResetAccountSettingsMutation__
 *
 * To run a mutation, you first call `useResetAccountSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetAccountSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetAccountSettingsMutation, { data, loading, error }] = useResetAccountSettingsMutation({
 *   variables: {
 *   },
 * });
 */
export function useResetAccountSettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetAccountSettingsMutation, ResetAccountSettingsMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetAccountSettingsMutation, ResetAccountSettingsMutationVariables>(ResetAccountSettingsDocument, baseOptions);
      }
export type ResetAccountSettingsMutationHookResult = ReturnType<typeof useResetAccountSettingsMutation>;
export type ResetAccountSettingsMutationResult = ApolloReactCommon.MutationResult<ResetAccountSettingsMutation>;
export type ResetAccountSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetAccountSettingsMutation, ResetAccountSettingsMutationVariables>;
export const GetAutoAdventureSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAutoAdventureSettings"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autoAdventureSettings"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoAdventureSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoolDown"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoolDown"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoAdventureSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoAdventureSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coolDown"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoolDown"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"adventureCriteria"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hardMinHealth"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"normalMinHealth"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"maxTravelTime"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"preferHard"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"preferredVillageId"},"arguments":[],"directives":[]}]}}]};

/**
 * __useGetAutoAdventureSettingsQuery__
 *
 * To run a query within a React component, call `useGetAutoAdventureSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAutoAdventureSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAutoAdventureSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAutoAdventureSettingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAutoAdventureSettingsQuery, GetAutoAdventureSettingsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAutoAdventureSettingsQuery, GetAutoAdventureSettingsQueryVariables>(GetAutoAdventureSettingsDocument, baseOptions);
      }
export function useGetAutoAdventureSettingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAutoAdventureSettingsQuery, GetAutoAdventureSettingsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAutoAdventureSettingsQuery, GetAutoAdventureSettingsQueryVariables>(GetAutoAdventureSettingsDocument, baseOptions);
        }
export type GetAutoAdventureSettingsQueryHookResult = ReturnType<typeof useGetAutoAdventureSettingsQuery>;
export type GetAutoAdventureSettingsLazyQueryHookResult = ReturnType<typeof useGetAutoAdventureSettingsLazyQuery>;
export type GetAutoAdventureSettingsQueryResult = ApolloReactCommon.QueryResult<GetAutoAdventureSettingsQuery, GetAutoAdventureSettingsQueryVariables>;
export const UpdateAutoAdventureSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAutoAdventureSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"settings"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAutoAdventureSettingsInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAutoAdventureSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"settings"},"value":{"kind":"Variable","name":{"kind":"Name","value":"settings"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoAdventureSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoolDown"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoolDown"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoAdventureSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoAdventureSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coolDown"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoolDown"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"adventureCriteria"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hardMinHealth"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"normalMinHealth"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"maxTravelTime"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"preferHard"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"preferredVillageId"},"arguments":[],"directives":[]}]}}]};
export type UpdateAutoAdventureSettingsMutationFn = ApolloReactCommon.MutationFunction<UpdateAutoAdventureSettingsMutation, UpdateAutoAdventureSettingsMutationVariables>;

/**
 * __useUpdateAutoAdventureSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateAutoAdventureSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAutoAdventureSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAutoAdventureSettingsMutation, { data, loading, error }] = useUpdateAutoAdventureSettingsMutation({
 *   variables: {
 *      settings: // value for 'settings'
 *   },
 * });
 */
export function useUpdateAutoAdventureSettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateAutoAdventureSettingsMutation, UpdateAutoAdventureSettingsMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateAutoAdventureSettingsMutation, UpdateAutoAdventureSettingsMutationVariables>(UpdateAutoAdventureSettingsDocument, baseOptions);
      }
export type UpdateAutoAdventureSettingsMutationHookResult = ReturnType<typeof useUpdateAutoAdventureSettingsMutation>;
export type UpdateAutoAdventureSettingsMutationResult = ApolloReactCommon.MutationResult<UpdateAutoAdventureSettingsMutation>;
export type UpdateAutoAdventureSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateAutoAdventureSettingsMutation, UpdateAutoAdventureSettingsMutationVariables>;
export const ResetAutoAdventureSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetAutoAdventureSettings"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetAutoAdventureSettings"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoAdventureSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoolDown"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoolDown"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoAdventureSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoAdventureSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coolDown"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoolDown"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"adventureCriteria"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hardMinHealth"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"normalMinHealth"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"maxTravelTime"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"preferHard"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"preferredVillageId"},"arguments":[],"directives":[]}]}}]};
export type ResetAutoAdventureSettingsMutationFn = ApolloReactCommon.MutationFunction<ResetAutoAdventureSettingsMutation, ResetAutoAdventureSettingsMutationVariables>;

/**
 * __useResetAutoAdventureSettingsMutation__
 *
 * To run a mutation, you first call `useResetAutoAdventureSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetAutoAdventureSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetAutoAdventureSettingsMutation, { data, loading, error }] = useResetAutoAdventureSettingsMutation({
 *   variables: {
 *   },
 * });
 */
export function useResetAutoAdventureSettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetAutoAdventureSettingsMutation, ResetAutoAdventureSettingsMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetAutoAdventureSettingsMutation, ResetAutoAdventureSettingsMutationVariables>(ResetAutoAdventureSettingsDocument, baseOptions);
      }
export type ResetAutoAdventureSettingsMutationHookResult = ReturnType<typeof useResetAutoAdventureSettingsMutation>;
export type ResetAutoAdventureSettingsMutationResult = ApolloReactCommon.MutationResult<ResetAutoAdventureSettingsMutation>;
export type ResetAutoAdventureSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetAutoAdventureSettingsMutation, ResetAutoAdventureSettingsMutationVariables>;
export const GetAutoBuildSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAutoBuildSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autoBuildSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoBuildSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoolDown"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoolDown"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoStorageOptionSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoStorageOptionSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"overflowLevel"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoStorageSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoStorageSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"granary"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoStorageOptionSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"warehouse"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoStorageOptionSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"allowFreeSpots"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoBuildSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoBuildSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"allowDualQueue"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coolDown"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoolDown"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"autoCropFields"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minCrop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"autoStorage"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoStorageSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"useHeroResources"},"arguments":[],"directives":[]}]}}]};

/**
 * __useGetAutoBuildSettingsQuery__
 *
 * To run a query within a React component, call `useGetAutoBuildSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAutoBuildSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAutoBuildSettingsQuery({
 *   variables: {
 *      villageId: // value for 'villageId'
 *   },
 * });
 */
export function useGetAutoBuildSettingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAutoBuildSettingsQuery, GetAutoBuildSettingsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAutoBuildSettingsQuery, GetAutoBuildSettingsQueryVariables>(GetAutoBuildSettingsDocument, baseOptions);
      }
export function useGetAutoBuildSettingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAutoBuildSettingsQuery, GetAutoBuildSettingsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAutoBuildSettingsQuery, GetAutoBuildSettingsQueryVariables>(GetAutoBuildSettingsDocument, baseOptions);
        }
export type GetAutoBuildSettingsQueryHookResult = ReturnType<typeof useGetAutoBuildSettingsQuery>;
export type GetAutoBuildSettingsLazyQueryHookResult = ReturnType<typeof useGetAutoBuildSettingsLazyQuery>;
export type GetAutoBuildSettingsQueryResult = ApolloReactCommon.QueryResult<GetAutoBuildSettingsQuery, GetAutoBuildSettingsQueryVariables>;
export const UpdateAutoBuildSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAutoBuildSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"settings"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAutoBuildSettingsInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAutoBuildSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"settings"},"value":{"kind":"Variable","name":{"kind":"Name","value":"settings"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoBuildSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoolDown"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoolDown"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoStorageOptionSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoStorageOptionSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"overflowLevel"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoStorageSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoStorageSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"granary"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoStorageOptionSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"warehouse"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoStorageOptionSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"allowFreeSpots"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoBuildSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoBuildSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"allowDualQueue"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coolDown"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoolDown"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"autoCropFields"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minCrop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"autoStorage"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoStorageSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"useHeroResources"},"arguments":[],"directives":[]}]}}]};
export type UpdateAutoBuildSettingsMutationFn = ApolloReactCommon.MutationFunction<UpdateAutoBuildSettingsMutation, UpdateAutoBuildSettingsMutationVariables>;

/**
 * __useUpdateAutoBuildSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateAutoBuildSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAutoBuildSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAutoBuildSettingsMutation, { data, loading, error }] = useUpdateAutoBuildSettingsMutation({
 *   variables: {
 *      villageId: // value for 'villageId'
 *      settings: // value for 'settings'
 *   },
 * });
 */
export function useUpdateAutoBuildSettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateAutoBuildSettingsMutation, UpdateAutoBuildSettingsMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateAutoBuildSettingsMutation, UpdateAutoBuildSettingsMutationVariables>(UpdateAutoBuildSettingsDocument, baseOptions);
      }
export type UpdateAutoBuildSettingsMutationHookResult = ReturnType<typeof useUpdateAutoBuildSettingsMutation>;
export type UpdateAutoBuildSettingsMutationResult = ApolloReactCommon.MutationResult<UpdateAutoBuildSettingsMutation>;
export type UpdateAutoBuildSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateAutoBuildSettingsMutation, UpdateAutoBuildSettingsMutationVariables>;
export const ResetAutoBuildSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetAutoBuildSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetAutoBuildSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoBuildSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoolDown"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoolDown"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoStorageOptionSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoStorageOptionSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"overflowLevel"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoStorageSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoStorageSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"granary"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoStorageOptionSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"warehouse"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoStorageOptionSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"allowFreeSpots"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoBuildSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoBuildSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"allowDualQueue"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coolDown"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoolDown"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"autoCropFields"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minCrop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"autoStorage"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoStorageSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"useHeroResources"},"arguments":[],"directives":[]}]}}]};
export type ResetAutoBuildSettingsMutationFn = ApolloReactCommon.MutationFunction<ResetAutoBuildSettingsMutation, ResetAutoBuildSettingsMutationVariables>;

/**
 * __useResetAutoBuildSettingsMutation__
 *
 * To run a mutation, you first call `useResetAutoBuildSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetAutoBuildSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetAutoBuildSettingsMutation, { data, loading, error }] = useResetAutoBuildSettingsMutation({
 *   variables: {
 *      villageId: // value for 'villageId'
 *   },
 * });
 */
export function useResetAutoBuildSettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetAutoBuildSettingsMutation, ResetAutoBuildSettingsMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetAutoBuildSettingsMutation, ResetAutoBuildSettingsMutationVariables>(ResetAutoBuildSettingsDocument, baseOptions);
      }
export type ResetAutoBuildSettingsMutationHookResult = ReturnType<typeof useResetAutoBuildSettingsMutation>;
export type ResetAutoBuildSettingsMutationResult = ApolloReactCommon.MutationResult<ResetAutoBuildSettingsMutation>;
export type ResetAutoBuildSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetAutoBuildSettingsMutation, ResetAutoBuildSettingsMutationVariables>;
export const GetAutoMentorSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAutoMentorSettings"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autoMentorSettings"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoMentorSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoMentorSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoMentorSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acceptDailyRewards"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"acceptTaskRewards"},"arguments":[],"directives":[]}]}}]};

/**
 * __useGetAutoMentorSettingsQuery__
 *
 * To run a query within a React component, call `useGetAutoMentorSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAutoMentorSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAutoMentorSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAutoMentorSettingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAutoMentorSettingsQuery, GetAutoMentorSettingsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAutoMentorSettingsQuery, GetAutoMentorSettingsQueryVariables>(GetAutoMentorSettingsDocument, baseOptions);
      }
export function useGetAutoMentorSettingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAutoMentorSettingsQuery, GetAutoMentorSettingsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAutoMentorSettingsQuery, GetAutoMentorSettingsQueryVariables>(GetAutoMentorSettingsDocument, baseOptions);
        }
export type GetAutoMentorSettingsQueryHookResult = ReturnType<typeof useGetAutoMentorSettingsQuery>;
export type GetAutoMentorSettingsLazyQueryHookResult = ReturnType<typeof useGetAutoMentorSettingsLazyQuery>;
export type GetAutoMentorSettingsQueryResult = ApolloReactCommon.QueryResult<GetAutoMentorSettingsQuery, GetAutoMentorSettingsQueryVariables>;
export const UpdateAutoMentorSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAutoMentorSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"settings"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAutoMentorSettingsInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAutoMentorSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"settings"},"value":{"kind":"Variable","name":{"kind":"Name","value":"settings"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoMentorSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoMentorSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoMentorSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acceptDailyRewards"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"acceptTaskRewards"},"arguments":[],"directives":[]}]}}]};
export type UpdateAutoMentorSettingsMutationFn = ApolloReactCommon.MutationFunction<UpdateAutoMentorSettingsMutation, UpdateAutoMentorSettingsMutationVariables>;

/**
 * __useUpdateAutoMentorSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateAutoMentorSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAutoMentorSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAutoMentorSettingsMutation, { data, loading, error }] = useUpdateAutoMentorSettingsMutation({
 *   variables: {
 *      settings: // value for 'settings'
 *   },
 * });
 */
export function useUpdateAutoMentorSettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateAutoMentorSettingsMutation, UpdateAutoMentorSettingsMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateAutoMentorSettingsMutation, UpdateAutoMentorSettingsMutationVariables>(UpdateAutoMentorSettingsDocument, baseOptions);
      }
export type UpdateAutoMentorSettingsMutationHookResult = ReturnType<typeof useUpdateAutoMentorSettingsMutation>;
export type UpdateAutoMentorSettingsMutationResult = ApolloReactCommon.MutationResult<UpdateAutoMentorSettingsMutation>;
export type UpdateAutoMentorSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateAutoMentorSettingsMutation, UpdateAutoMentorSettingsMutationVariables>;
export const ResetAutoMentorSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetAutoMentorSettings"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetAutoMentorSettings"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoMentorSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoMentorSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoMentorSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acceptDailyRewards"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"acceptTaskRewards"},"arguments":[],"directives":[]}]}}]};
export type ResetAutoMentorSettingsMutationFn = ApolloReactCommon.MutationFunction<ResetAutoMentorSettingsMutation, ResetAutoMentorSettingsMutationVariables>;

/**
 * __useResetAutoMentorSettingsMutation__
 *
 * To run a mutation, you first call `useResetAutoMentorSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetAutoMentorSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetAutoMentorSettingsMutation, { data, loading, error }] = useResetAutoMentorSettingsMutation({
 *   variables: {
 *   },
 * });
 */
export function useResetAutoMentorSettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetAutoMentorSettingsMutation, ResetAutoMentorSettingsMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetAutoMentorSettingsMutation, ResetAutoMentorSettingsMutationVariables>(ResetAutoMentorSettingsDocument, baseOptions);
      }
export type ResetAutoMentorSettingsMutationHookResult = ReturnType<typeof useResetAutoMentorSettingsMutation>;
export type ResetAutoMentorSettingsMutationResult = ApolloReactCommon.MutationResult<ResetAutoMentorSettingsMutation>;
export type ResetAutoMentorSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetAutoMentorSettingsMutation, ResetAutoMentorSettingsMutationVariables>;
export const GetAutoPartySettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAutoPartySettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autoPartySettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoPartySettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoolDown"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoolDown"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoPartySettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoPartySettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowSmall"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"allowLarge"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coolDown"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoolDown"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"minCulturePointsSmall"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minCulturePointsLarge"},"arguments":[],"directives":[]}]}}]};

/**
 * __useGetAutoPartySettingsQuery__
 *
 * To run a query within a React component, call `useGetAutoPartySettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAutoPartySettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAutoPartySettingsQuery({
 *   variables: {
 *      villageId: // value for 'villageId'
 *   },
 * });
 */
export function useGetAutoPartySettingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAutoPartySettingsQuery, GetAutoPartySettingsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAutoPartySettingsQuery, GetAutoPartySettingsQueryVariables>(GetAutoPartySettingsDocument, baseOptions);
      }
export function useGetAutoPartySettingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAutoPartySettingsQuery, GetAutoPartySettingsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAutoPartySettingsQuery, GetAutoPartySettingsQueryVariables>(GetAutoPartySettingsDocument, baseOptions);
        }
export type GetAutoPartySettingsQueryHookResult = ReturnType<typeof useGetAutoPartySettingsQuery>;
export type GetAutoPartySettingsLazyQueryHookResult = ReturnType<typeof useGetAutoPartySettingsLazyQuery>;
export type GetAutoPartySettingsQueryResult = ApolloReactCommon.QueryResult<GetAutoPartySettingsQuery, GetAutoPartySettingsQueryVariables>;
export const UpdateAutoPartySettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAutoPartySettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"settings"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAutoPartySettingsInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAutoPartySettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"settings"},"value":{"kind":"Variable","name":{"kind":"Name","value":"settings"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoPartySettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoolDown"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoolDown"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoPartySettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoPartySettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowSmall"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"allowLarge"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coolDown"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoolDown"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"minCulturePointsSmall"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minCulturePointsLarge"},"arguments":[],"directives":[]}]}}]};
export type UpdateAutoPartySettingsMutationFn = ApolloReactCommon.MutationFunction<UpdateAutoPartySettingsMutation, UpdateAutoPartySettingsMutationVariables>;

/**
 * __useUpdateAutoPartySettingsMutation__
 *
 * To run a mutation, you first call `useUpdateAutoPartySettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAutoPartySettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAutoPartySettingsMutation, { data, loading, error }] = useUpdateAutoPartySettingsMutation({
 *   variables: {
 *      villageId: // value for 'villageId'
 *      settings: // value for 'settings'
 *   },
 * });
 */
export function useUpdateAutoPartySettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateAutoPartySettingsMutation, UpdateAutoPartySettingsMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateAutoPartySettingsMutation, UpdateAutoPartySettingsMutationVariables>(UpdateAutoPartySettingsDocument, baseOptions);
      }
export type UpdateAutoPartySettingsMutationHookResult = ReturnType<typeof useUpdateAutoPartySettingsMutation>;
export type UpdateAutoPartySettingsMutationResult = ApolloReactCommon.MutationResult<UpdateAutoPartySettingsMutation>;
export type UpdateAutoPartySettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateAutoPartySettingsMutation, UpdateAutoPartySettingsMutationVariables>;
export const ResetAutoPartySettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetAutoPartySettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetAutoPartySettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoPartySettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoolDown"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoolDown"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoPartySettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoPartySettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowSmall"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"allowLarge"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coolDown"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoolDown"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"minCulturePointsSmall"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minCulturePointsLarge"},"arguments":[],"directives":[]}]}}]};
export type ResetAutoPartySettingsMutationFn = ApolloReactCommon.MutationFunction<ResetAutoPartySettingsMutation, ResetAutoPartySettingsMutationVariables>;

/**
 * __useResetAutoPartySettingsMutation__
 *
 * To run a mutation, you first call `useResetAutoPartySettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetAutoPartySettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetAutoPartySettingsMutation, { data, loading, error }] = useResetAutoPartySettingsMutation({
 *   variables: {
 *      villageId: // value for 'villageId'
 *   },
 * });
 */
export function useResetAutoPartySettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetAutoPartySettingsMutation, ResetAutoPartySettingsMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetAutoPartySettingsMutation, ResetAutoPartySettingsMutationVariables>(ResetAutoPartySettingsDocument, baseOptions);
      }
export type ResetAutoPartySettingsMutationHookResult = ReturnType<typeof useResetAutoPartySettingsMutation>;
export type ResetAutoPartySettingsMutationResult = ApolloReactCommon.MutationResult<ResetAutoPartySettingsMutation>;
export type ResetAutoPartySettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetAutoPartySettingsMutation, ResetAutoPartySettingsMutationVariables>;
export const GetAutoUnitsSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAutoUnitsSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autoUnitsSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoolDown"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoolDown"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoUnitsUnitSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsUnitSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autoBuild"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"index"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"targetAmount"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"trainForever"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"maxBuildTime"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"units"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsUnitSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoUnitsSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coolDown"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoolDown"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"minCrop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"barracks"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"stable"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"residence"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}}]}}]};

/**
 * __useGetAutoUnitsSettingsQuery__
 *
 * To run a query within a React component, call `useGetAutoUnitsSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAutoUnitsSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAutoUnitsSettingsQuery({
 *   variables: {
 *      villageId: // value for 'villageId'
 *   },
 * });
 */
export function useGetAutoUnitsSettingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAutoUnitsSettingsQuery, GetAutoUnitsSettingsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAutoUnitsSettingsQuery, GetAutoUnitsSettingsQueryVariables>(GetAutoUnitsSettingsDocument, baseOptions);
      }
export function useGetAutoUnitsSettingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAutoUnitsSettingsQuery, GetAutoUnitsSettingsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAutoUnitsSettingsQuery, GetAutoUnitsSettingsQueryVariables>(GetAutoUnitsSettingsDocument, baseOptions);
        }
export type GetAutoUnitsSettingsQueryHookResult = ReturnType<typeof useGetAutoUnitsSettingsQuery>;
export type GetAutoUnitsSettingsLazyQueryHookResult = ReturnType<typeof useGetAutoUnitsSettingsLazyQuery>;
export type GetAutoUnitsSettingsQueryResult = ApolloReactCommon.QueryResult<GetAutoUnitsSettingsQuery, GetAutoUnitsSettingsQueryVariables>;
export const UpdateAutoUnitsUnitSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAutoUnitsUnitSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"settings"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAutoUnitsUnitSettingsInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAutoUnitsUnitSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"settings"},"value":{"kind":"Variable","name":{"kind":"Name","value":"settings"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoolDown"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoolDown"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoUnitsUnitSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsUnitSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autoBuild"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"index"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"targetAmount"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"trainForever"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"maxBuildTime"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"units"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsUnitSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoUnitsSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coolDown"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoolDown"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"minCrop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"barracks"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"stable"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"residence"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}}]}}]};
export type UpdateAutoUnitsUnitSettingsMutationFn = ApolloReactCommon.MutationFunction<UpdateAutoUnitsUnitSettingsMutation, UpdateAutoUnitsUnitSettingsMutationVariables>;

/**
 * __useUpdateAutoUnitsUnitSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateAutoUnitsUnitSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAutoUnitsUnitSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAutoUnitsUnitSettingsMutation, { data, loading, error }] = useUpdateAutoUnitsUnitSettingsMutation({
 *   variables: {
 *      villageId: // value for 'villageId'
 *      settings: // value for 'settings'
 *   },
 * });
 */
export function useUpdateAutoUnitsUnitSettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateAutoUnitsUnitSettingsMutation, UpdateAutoUnitsUnitSettingsMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateAutoUnitsUnitSettingsMutation, UpdateAutoUnitsUnitSettingsMutationVariables>(UpdateAutoUnitsUnitSettingsDocument, baseOptions);
      }
export type UpdateAutoUnitsUnitSettingsMutationHookResult = ReturnType<typeof useUpdateAutoUnitsUnitSettingsMutation>;
export type UpdateAutoUnitsUnitSettingsMutationResult = ApolloReactCommon.MutationResult<UpdateAutoUnitsUnitSettingsMutation>;
export type UpdateAutoUnitsUnitSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateAutoUnitsUnitSettingsMutation, UpdateAutoUnitsUnitSettingsMutationVariables>;
export const UpdateAutoUnitsBuildingSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAutoUnitsBuildingSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"buildingType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"settings"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAutoUnitsBuildingSettingsInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAutoUnitsBuildingSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"buildingType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"buildingType"}}},{"kind":"Argument","name":{"kind":"Name","value":"settings"},"value":{"kind":"Variable","name":{"kind":"Name","value":"settings"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoolDown"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoolDown"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoUnitsUnitSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsUnitSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autoBuild"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"index"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"targetAmount"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"trainForever"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"maxBuildTime"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"units"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsUnitSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoUnitsSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coolDown"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoolDown"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"minCrop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"barracks"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"stable"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"residence"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}}]}}]};
export type UpdateAutoUnitsBuildingSettingsMutationFn = ApolloReactCommon.MutationFunction<UpdateAutoUnitsBuildingSettingsMutation, UpdateAutoUnitsBuildingSettingsMutationVariables>;

/**
 * __useUpdateAutoUnitsBuildingSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateAutoUnitsBuildingSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAutoUnitsBuildingSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAutoUnitsBuildingSettingsMutation, { data, loading, error }] = useUpdateAutoUnitsBuildingSettingsMutation({
 *   variables: {
 *      villageId: // value for 'villageId'
 *      buildingType: // value for 'buildingType'
 *      settings: // value for 'settings'
 *   },
 * });
 */
export function useUpdateAutoUnitsBuildingSettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateAutoUnitsBuildingSettingsMutation, UpdateAutoUnitsBuildingSettingsMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateAutoUnitsBuildingSettingsMutation, UpdateAutoUnitsBuildingSettingsMutationVariables>(UpdateAutoUnitsBuildingSettingsDocument, baseOptions);
      }
export type UpdateAutoUnitsBuildingSettingsMutationHookResult = ReturnType<typeof useUpdateAutoUnitsBuildingSettingsMutation>;
export type UpdateAutoUnitsBuildingSettingsMutationResult = ApolloReactCommon.MutationResult<UpdateAutoUnitsBuildingSettingsMutation>;
export type UpdateAutoUnitsBuildingSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateAutoUnitsBuildingSettingsMutation, UpdateAutoUnitsBuildingSettingsMutationVariables>;
export const UpdateAutoUnitsSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAutoUnitsSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"settings"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAutoUnitsSettingsInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAutoUnitsSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"settings"},"value":{"kind":"Variable","name":{"kind":"Name","value":"settings"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoolDown"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoolDown"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoUnitsUnitSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsUnitSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autoBuild"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"index"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"targetAmount"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"trainForever"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"maxBuildTime"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"units"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsUnitSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoUnitsSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coolDown"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoolDown"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"minCrop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"barracks"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"stable"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"residence"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}}]}}]};
export type UpdateAutoUnitsSettingsMutationFn = ApolloReactCommon.MutationFunction<UpdateAutoUnitsSettingsMutation, UpdateAutoUnitsSettingsMutationVariables>;

/**
 * __useUpdateAutoUnitsSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateAutoUnitsSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAutoUnitsSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAutoUnitsSettingsMutation, { data, loading, error }] = useUpdateAutoUnitsSettingsMutation({
 *   variables: {
 *      villageId: // value for 'villageId'
 *      settings: // value for 'settings'
 *   },
 * });
 */
export function useUpdateAutoUnitsSettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateAutoUnitsSettingsMutation, UpdateAutoUnitsSettingsMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateAutoUnitsSettingsMutation, UpdateAutoUnitsSettingsMutationVariables>(UpdateAutoUnitsSettingsDocument, baseOptions);
      }
export type UpdateAutoUnitsSettingsMutationHookResult = ReturnType<typeof useUpdateAutoUnitsSettingsMutation>;
export type UpdateAutoUnitsSettingsMutationResult = ApolloReactCommon.MutationResult<UpdateAutoUnitsSettingsMutation>;
export type UpdateAutoUnitsSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateAutoUnitsSettingsMutation, UpdateAutoUnitsSettingsMutationVariables>;
export const ResetAutoUnitsSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetAutoUnitsSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetAutoUnitsSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Duration"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Duration"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"days"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hours"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"minutes"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seconds"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoolDown"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoolDown"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoUnitsUnitSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsUnitSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autoBuild"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"index"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"targetAmount"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"trainForever"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"maxBuildTime"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Duration"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"units"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsUnitSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AutoUnitsSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AutoUnitsSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allow"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coolDown"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoolDown"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"minCrop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"barracks"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"stable"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"residence"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AutoUnitsBuildingSettings"},"directives":[]}]}}]}}]};
export type ResetAutoUnitsSettingsMutationFn = ApolloReactCommon.MutationFunction<ResetAutoUnitsSettingsMutation, ResetAutoUnitsSettingsMutationVariables>;

/**
 * __useResetAutoUnitsSettingsMutation__
 *
 * To run a mutation, you first call `useResetAutoUnitsSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetAutoUnitsSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetAutoUnitsSettingsMutation, { data, loading, error }] = useResetAutoUnitsSettingsMutation({
 *   variables: {
 *      villageId: // value for 'villageId'
 *   },
 * });
 */
export function useResetAutoUnitsSettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetAutoUnitsSettingsMutation, ResetAutoUnitsSettingsMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetAutoUnitsSettingsMutation, ResetAutoUnitsSettingsMutationVariables>(ResetAutoUnitsSettingsDocument, baseOptions);
      }
export type ResetAutoUnitsSettingsMutationHookResult = ReturnType<typeof useResetAutoUnitsSettingsMutation>;
export type ResetAutoUnitsSettingsMutationResult = ApolloReactCommon.MutationResult<ResetAutoUnitsSettingsMutation>;
export type ResetAutoUnitsSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetAutoUnitsSettingsMutation, ResetAutoUnitsSettingsMutationVariables>;
export const GetGeneralSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGeneralSettings"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generalSettings"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GeneralSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GeneralSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GeneralSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chromePath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"dataPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"headlessChrome"},"arguments":[],"directives":[]}]}}]};

/**
 * __useGetGeneralSettingsQuery__
 *
 * To run a query within a React component, call `useGetGeneralSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGeneralSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGeneralSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGeneralSettingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetGeneralSettingsQuery, GetGeneralSettingsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetGeneralSettingsQuery, GetGeneralSettingsQueryVariables>(GetGeneralSettingsDocument, baseOptions);
      }
export function useGetGeneralSettingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetGeneralSettingsQuery, GetGeneralSettingsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetGeneralSettingsQuery, GetGeneralSettingsQueryVariables>(GetGeneralSettingsDocument, baseOptions);
        }
export type GetGeneralSettingsQueryHookResult = ReturnType<typeof useGetGeneralSettingsQuery>;
export type GetGeneralSettingsLazyQueryHookResult = ReturnType<typeof useGetGeneralSettingsLazyQuery>;
export type GetGeneralSettingsQueryResult = ApolloReactCommon.QueryResult<GetGeneralSettingsQuery, GetGeneralSettingsQueryVariables>;
export const UpdateGeneralSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGeneralSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"settings"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGeneralSettingsInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGeneralSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"settings"},"value":{"kind":"Variable","name":{"kind":"Name","value":"settings"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GeneralSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GeneralSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GeneralSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chromePath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"dataPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"headlessChrome"},"arguments":[],"directives":[]}]}}]};
export type UpdateGeneralSettingsMutationFn = ApolloReactCommon.MutationFunction<UpdateGeneralSettingsMutation, UpdateGeneralSettingsMutationVariables>;

/**
 * __useUpdateGeneralSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateGeneralSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGeneralSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGeneralSettingsMutation, { data, loading, error }] = useUpdateGeneralSettingsMutation({
 *   variables: {
 *      settings: // value for 'settings'
 *   },
 * });
 */
export function useUpdateGeneralSettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateGeneralSettingsMutation, UpdateGeneralSettingsMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateGeneralSettingsMutation, UpdateGeneralSettingsMutationVariables>(UpdateGeneralSettingsDocument, baseOptions);
      }
export type UpdateGeneralSettingsMutationHookResult = ReturnType<typeof useUpdateGeneralSettingsMutation>;
export type UpdateGeneralSettingsMutationResult = ApolloReactCommon.MutationResult<UpdateGeneralSettingsMutation>;
export type UpdateGeneralSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateGeneralSettingsMutation, UpdateGeneralSettingsMutationVariables>;
export const ResetGeneralSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetGeneralSettings"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetGeneralSettings"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GeneralSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GeneralSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GeneralSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chromePath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"dataPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"headlessChrome"},"arguments":[],"directives":[]}]}}]};
export type ResetGeneralSettingsMutationFn = ApolloReactCommon.MutationFunction<ResetGeneralSettingsMutation, ResetGeneralSettingsMutationVariables>;

/**
 * __useResetGeneralSettingsMutation__
 *
 * To run a mutation, you first call `useResetGeneralSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetGeneralSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetGeneralSettingsMutation, { data, loading, error }] = useResetGeneralSettingsMutation({
 *   variables: {
 *   },
 * });
 */
export function useResetGeneralSettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetGeneralSettingsMutation, ResetGeneralSettingsMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetGeneralSettingsMutation, ResetGeneralSettingsMutationVariables>(ResetGeneralSettingsDocument, baseOptions);
      }
export type ResetGeneralSettingsMutationHookResult = ReturnType<typeof useResetGeneralSettingsMutation>;
export type ResetGeneralSettingsMutationResult = ApolloReactCommon.MutationResult<ResetGeneralSettingsMutation>;
export type ResetGeneralSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetGeneralSettingsMutation, ResetGeneralSettingsMutationVariables>;
export const GetGeneralVillageSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGeneralVillageSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generalVillageSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GeneralVillageSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GeneralVillageSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GeneralVillageSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowTasks"},"arguments":[],"directives":[]}]}}]};

/**
 * __useGetGeneralVillageSettingsQuery__
 *
 * To run a query within a React component, call `useGetGeneralVillageSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGeneralVillageSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGeneralVillageSettingsQuery({
 *   variables: {
 *      villageId: // value for 'villageId'
 *   },
 * });
 */
export function useGetGeneralVillageSettingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetGeneralVillageSettingsQuery, GetGeneralVillageSettingsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetGeneralVillageSettingsQuery, GetGeneralVillageSettingsQueryVariables>(GetGeneralVillageSettingsDocument, baseOptions);
      }
export function useGetGeneralVillageSettingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetGeneralVillageSettingsQuery, GetGeneralVillageSettingsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetGeneralVillageSettingsQuery, GetGeneralVillageSettingsQueryVariables>(GetGeneralVillageSettingsDocument, baseOptions);
        }
export type GetGeneralVillageSettingsQueryHookResult = ReturnType<typeof useGetGeneralVillageSettingsQuery>;
export type GetGeneralVillageSettingsLazyQueryHookResult = ReturnType<typeof useGetGeneralVillageSettingsLazyQuery>;
export type GetGeneralVillageSettingsQueryResult = ApolloReactCommon.QueryResult<GetGeneralVillageSettingsQuery, GetGeneralVillageSettingsQueryVariables>;
export const UpdateGeneralVillageSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGeneralVillageSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"settings"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGeneralVillageSettingsInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGeneralVillageSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"settings"},"value":{"kind":"Variable","name":{"kind":"Name","value":"settings"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GeneralVillageSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GeneralVillageSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GeneralVillageSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowTasks"},"arguments":[],"directives":[]}]}}]};
export type UpdateGeneralVillageSettingsMutationFn = ApolloReactCommon.MutationFunction<UpdateGeneralVillageSettingsMutation, UpdateGeneralVillageSettingsMutationVariables>;

/**
 * __useUpdateGeneralVillageSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateGeneralVillageSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGeneralVillageSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGeneralVillageSettingsMutation, { data, loading, error }] = useUpdateGeneralVillageSettingsMutation({
 *   variables: {
 *      villageId: // value for 'villageId'
 *      settings: // value for 'settings'
 *   },
 * });
 */
export function useUpdateGeneralVillageSettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateGeneralVillageSettingsMutation, UpdateGeneralVillageSettingsMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateGeneralVillageSettingsMutation, UpdateGeneralVillageSettingsMutationVariables>(UpdateGeneralVillageSettingsDocument, baseOptions);
      }
export type UpdateGeneralVillageSettingsMutationHookResult = ReturnType<typeof useUpdateGeneralVillageSettingsMutation>;
export type UpdateGeneralVillageSettingsMutationResult = ApolloReactCommon.MutationResult<UpdateGeneralVillageSettingsMutation>;
export type UpdateGeneralVillageSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateGeneralVillageSettingsMutation, UpdateGeneralVillageSettingsMutationVariables>;
export const ResetGeneralVillageSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetGeneralVillageSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetGeneralVillageSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GeneralVillageSettings"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GeneralVillageSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GeneralVillageSettings"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowTasks"},"arguments":[],"directives":[]}]}}]};
export type ResetGeneralVillageSettingsMutationFn = ApolloReactCommon.MutationFunction<ResetGeneralVillageSettingsMutation, ResetGeneralVillageSettingsMutationVariables>;

/**
 * __useResetGeneralVillageSettingsMutation__
 *
 * To run a mutation, you first call `useResetGeneralVillageSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetGeneralVillageSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetGeneralVillageSettingsMutation, { data, loading, error }] = useResetGeneralVillageSettingsMutation({
 *   variables: {
 *      villageId: // value for 'villageId'
 *   },
 * });
 */
export function useResetGeneralVillageSettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetGeneralVillageSettingsMutation, ResetGeneralVillageSettingsMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetGeneralVillageSettingsMutation, ResetGeneralVillageSettingsMutationVariables>(ResetGeneralVillageSettingsDocument, baseOptions);
      }
export type ResetGeneralVillageSettingsMutationHookResult = ReturnType<typeof useResetGeneralVillageSettingsMutation>;
export type ResetGeneralVillageSettingsMutationResult = ApolloReactCommon.MutationResult<ResetGeneralVillageSettingsMutation>;
export type ResetGeneralVillageSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetGeneralVillageSettingsMutation, ResetGeneralVillageSettingsMutationVariables>;
export const GetUnitInfoDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUnitInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"index"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unitInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"index"},"value":{"kind":"Variable","name":{"kind":"Name","value":"index"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]}}]};

/**
 * __useGetUnitInfoQuery__
 *
 * To run a query within a React component, call `useGetUnitInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnitInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnitInfoQuery({
 *   variables: {
 *      index: // value for 'index'
 *   },
 * });
 */
export function useGetUnitInfoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUnitInfoQuery, GetUnitInfoQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUnitInfoQuery, GetUnitInfoQueryVariables>(GetUnitInfoDocument, baseOptions);
      }
export function useGetUnitInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUnitInfoQuery, GetUnitInfoQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUnitInfoQuery, GetUnitInfoQueryVariables>(GetUnitInfoDocument, baseOptions);
        }
export type GetUnitInfoQueryHookResult = ReturnType<typeof useGetUnitInfoQuery>;
export type GetUnitInfoLazyQueryHookResult = ReturnType<typeof useGetUnitInfoLazyQuery>;
export type GetUnitInfoQueryResult = ApolloReactCommon.QueryResult<GetUnitInfoQuery, GetUnitInfoQueryVariables>;
export const GetVillageDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVillage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"village"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coords"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Coords"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"resources"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Resources"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"capacity"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"granary"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"warehouse"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"production"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Resources"},"directives":[]}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Resources"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Resources"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wood"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"clay"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"iron"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"crop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"freeCrop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"total"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Coords"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Coords"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"y"},"arguments":[],"directives":[]}]}}]};

/**
 * __useGetVillageQuery__
 *
 * To run a query within a React component, call `useGetVillageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVillageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVillageQuery({
 *   variables: {
 *      villageId: // value for 'villageId'
 *   },
 * });
 */
export function useGetVillageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetVillageQuery, GetVillageQueryVariables>) {
        return ApolloReactHooks.useQuery<GetVillageQuery, GetVillageQueryVariables>(GetVillageDocument, baseOptions);
      }
export function useGetVillageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetVillageQuery, GetVillageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetVillageQuery, GetVillageQueryVariables>(GetVillageDocument, baseOptions);
        }
export type GetVillageQueryHookResult = ReturnType<typeof useGetVillageQuery>;
export type GetVillageLazyQueryHookResult = ReturnType<typeof useGetVillageLazyQuery>;
export type GetVillageQueryResult = ApolloReactCommon.QueryResult<GetVillageQuery, GetVillageQueryVariables>;
export const GetVillagesDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVillages"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"villages"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coords"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Coords"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"isCapital"},"arguments":[],"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Coords"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Coords"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"y"},"arguments":[],"directives":[]}]}}]};

/**
 * __useGetVillagesQuery__
 *
 * To run a query within a React component, call `useGetVillagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVillagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVillagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetVillagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetVillagesQuery, GetVillagesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetVillagesQuery, GetVillagesQueryVariables>(GetVillagesDocument, baseOptions);
      }
export function useGetVillagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetVillagesQuery, GetVillagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetVillagesQuery, GetVillagesQueryVariables>(GetVillagesDocument, baseOptions);
        }
export type GetVillagesQueryHookResult = ReturnType<typeof useGetVillagesQuery>;
export type GetVillagesLazyQueryHookResult = ReturnType<typeof useGetVillagesLazyQuery>;
export type GetVillagesQueryResult = ApolloReactCommon.QueryResult<GetVillagesQuery, GetVillagesQueryVariables>;
export const GetActiveVillageIdDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetActiveVillageId"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activeVillageId"},"arguments":[],"directives":[]}]}}]};

/**
 * __useGetActiveVillageIdQuery__
 *
 * To run a query within a React component, call `useGetActiveVillageIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActiveVillageIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActiveVillageIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActiveVillageIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetActiveVillageIdQuery, GetActiveVillageIdQueryVariables>) {
        return ApolloReactHooks.useQuery<GetActiveVillageIdQuery, GetActiveVillageIdQueryVariables>(GetActiveVillageIdDocument, baseOptions);
      }
export function useGetActiveVillageIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetActiveVillageIdQuery, GetActiveVillageIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetActiveVillageIdQuery, GetActiveVillageIdQueryVariables>(GetActiveVillageIdDocument, baseOptions);
        }
export type GetActiveVillageIdQueryHookResult = ReturnType<typeof useGetActiveVillageIdQuery>;
export type GetActiveVillageIdLazyQueryHookResult = ReturnType<typeof useGetActiveVillageIdLazyQuery>;
export type GetActiveVillageIdQueryResult = ApolloReactCommon.QueryResult<GetActiveVillageIdQuery, GetActiveVillageIdQueryVariables>;
export const GetCrannyCapacityDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCrannyCapacity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"crannyCapacity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VillageCrannyCapacity"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VillageCrannyCapacity"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VillageCrannyCapacity"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actual"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"ongoing"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"total"},"arguments":[],"directives":[]}]}}]};

/**
 * __useGetCrannyCapacityQuery__
 *
 * To run a query within a React component, call `useGetCrannyCapacityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCrannyCapacityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCrannyCapacityQuery({
 *   variables: {
 *      villageId: // value for 'villageId'
 *   },
 * });
 */
export function useGetCrannyCapacityQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCrannyCapacityQuery, GetCrannyCapacityQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCrannyCapacityQuery, GetCrannyCapacityQueryVariables>(GetCrannyCapacityDocument, baseOptions);
      }
export function useGetCrannyCapacityLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCrannyCapacityQuery, GetCrannyCapacityQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCrannyCapacityQuery, GetCrannyCapacityQueryVariables>(GetCrannyCapacityDocument, baseOptions);
        }
export type GetCrannyCapacityQueryHookResult = ReturnType<typeof useGetCrannyCapacityQuery>;
export type GetCrannyCapacityLazyQueryHookResult = ReturnType<typeof useGetCrannyCapacityLazyQuery>;
export type GetCrannyCapacityQueryResult = ApolloReactCommon.QueryResult<GetCrannyCapacityQuery, GetCrannyCapacityQueryVariables>;
export const RefreshVillageDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshVillage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshVillage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}}],"directives":[]}]}}]};
export type RefreshVillageMutationFn = ApolloReactCommon.MutationFunction<RefreshVillageMutation, RefreshVillageMutationVariables>;

/**
 * __useRefreshVillageMutation__
 *
 * To run a mutation, you first call `useRefreshVillageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshVillageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshVillageMutation, { data, loading, error }] = useRefreshVillageMutation({
 *   variables: {
 *      villageId: // value for 'villageId'
 *   },
 * });
 */
export function useRefreshVillageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RefreshVillageMutation, RefreshVillageMutationVariables>) {
        return ApolloReactHooks.useMutation<RefreshVillageMutation, RefreshVillageMutationVariables>(RefreshVillageDocument, baseOptions);
      }
export type RefreshVillageMutationHookResult = ReturnType<typeof useRefreshVillageMutation>;
export type RefreshVillageMutationResult = ApolloReactCommon.MutationResult<RefreshVillageMutation>;
export type RefreshVillageMutationOptions = ApolloReactCommon.BaseMutationOptions<RefreshVillageMutation, RefreshVillageMutationVariables>;
export const OnVillageUpdatedDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnVillageUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"villageUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"villageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"villageId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coords"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Coords"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"resources"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Resources"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"capacity"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"granary"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"warehouse"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"production"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Resources"},"directives":[]}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Resources"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Resources"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wood"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"clay"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"iron"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"crop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"freeCrop"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"total"},"arguments":[],"directives":[]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Coords"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Coords"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"y"},"arguments":[],"directives":[]}]}}]};

/**
 * __useOnVillageUpdatedSubscription__
 *
 * To run a query within a React component, call `useOnVillageUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnVillageUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnVillageUpdatedSubscription({
 *   variables: {
 *      villageId: // value for 'villageId'
 *   },
 * });
 */
export function useOnVillageUpdatedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnVillageUpdatedSubscription, OnVillageUpdatedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<OnVillageUpdatedSubscription, OnVillageUpdatedSubscriptionVariables>(OnVillageUpdatedDocument, baseOptions);
      }
export type OnVillageUpdatedSubscriptionHookResult = ReturnType<typeof useOnVillageUpdatedSubscription>;
export type OnVillageUpdatedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnVillageUpdatedSubscription>;
export const OnVillagesUpdatedDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnVillagesUpdated"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"villagesUpdated"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"coords"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Coords"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"isCapital"},"arguments":[],"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Coords"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Coords"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"y"},"arguments":[],"directives":[]}]}}]};

/**
 * __useOnVillagesUpdatedSubscription__
 *
 * To run a query within a React component, call `useOnVillagesUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnVillagesUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnVillagesUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnVillagesUpdatedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnVillagesUpdatedSubscription, OnVillagesUpdatedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<OnVillagesUpdatedSubscription, OnVillagesUpdatedSubscriptionVariables>(OnVillagesUpdatedDocument, baseOptions);
      }
export type OnVillagesUpdatedSubscriptionHookResult = ReturnType<typeof useOnVillagesUpdatedSubscription>;
export type OnVillagesUpdatedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnVillagesUpdatedSubscription>;
export const OnActiveVillageIdChangedDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnActiveVillageIdChanged"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activeVillageIdChanged"},"arguments":[],"directives":[]}]}}]};

/**
 * __useOnActiveVillageIdChangedSubscription__
 *
 * To run a query within a React component, call `useOnActiveVillageIdChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnActiveVillageIdChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnActiveVillageIdChangedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnActiveVillageIdChangedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnActiveVillageIdChangedSubscription, OnActiveVillageIdChangedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<OnActiveVillageIdChangedSubscription, OnActiveVillageIdChangedSubscriptionVariables>(OnActiveVillageIdChangedDocument, baseOptions);
      }
export type OnActiveVillageIdChangedSubscriptionHookResult = ReturnType<typeof useOnActiveVillageIdChangedSubscription>;
export type OnActiveVillageIdChangedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnActiveVillageIdChangedSubscription>;