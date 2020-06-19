import { GraphQLResolveInfo } from 'graphql';
import { BuildingInProgress as BuildingInProgressModel } from '../_models/buildings/inProgress/buildingInProgress';
import { BuildingSpot as BuildingSpotModel } from '../_models/buildings/spots/buildingSpot';
import { Hero as HeroModel } from '../_models/hero/hero';
import { Resources as ResourcesModel } from '../_models/misc/resources';
import { TextLogEntryContent as TextLogEntryContentModel } from '../_models/logs/content/text';
export type Maybe<T> = T | undefined;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  readonly __typename?: 'AccountSettings';
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
  readonly __typename?: 'AutoAdventureSettings';
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
  readonly __typename?: 'AutoBuildLogEntryContent';
  readonly name: Scalars['String'];
  readonly type: Scalars['Int'];
  readonly level: Scalars['Int'];
  readonly fieldId: Scalars['Int'];
};

export type AutoBuildSettings = {
  readonly __typename?: 'AutoBuildSettings';
  readonly allow: Scalars['Boolean'];
  readonly allowDualQueue: Scalars['Boolean'];
  readonly coolDown: CoolDown;
  readonly autoCropFields: Scalars['Boolean'];
  readonly minCrop: Scalars['Int'];
  readonly useHeroResources: Scalars['Boolean'];
  readonly autoStorage: AutoStorageSettings;
};

export type AutoMentorSettings = {
  readonly __typename?: 'AutoMentorSettings';
  readonly acceptTaskRewards: Scalars['Boolean'];
  readonly acceptDailyRewards: Scalars['Boolean'];
};

export type AutoPartySettings = {
  readonly __typename?: 'AutoPartySettings';
  readonly coolDown: CoolDown;
  readonly allowSmall: Scalars['Boolean'];
  readonly allowLarge: Scalars['Boolean'];
  readonly minCulturePointsSmall: Scalars['Int'];
  readonly minCulturePointsLarge: Scalars['Int'];
};

export type AutoStorageOptionSettings = {
  readonly __typename?: 'AutoStorageOptionSettings';
  readonly allow: Scalars['Boolean'];
  readonly overflowLevel: Scalars['Int'];
};

export type AutoStorageSettings = {
  readonly __typename?: 'AutoStorageSettings';
  readonly allowFreeSpots: Scalars['Boolean'];
  readonly granary: AutoStorageOptionSettings;
  readonly warehouse: AutoStorageOptionSettings;
};

export type AutoUnitsBuildingSettings = {
  readonly __typename?: 'AutoUnitsBuildingSettings';
  readonly allow: Scalars['Boolean'];
  readonly maxBuildTime: Duration;
  readonly units: ReadonlyArray<AutoUnitsUnitSettings>;
};

export type AutoUnitsLogEntryContent = {
  readonly __typename?: 'AutoUnitsLogEntryContent';
  readonly amount: Scalars['Int'];
  readonly index: Scalars['Int'];
  readonly tribe: Scalars['Int'];
  readonly unitName: Scalars['String'];
};

export type AutoUnitsSettings = {
  readonly __typename?: 'AutoUnitsSettings';
  readonly allow: Scalars['Boolean'];
  readonly coolDown: CoolDown;
  readonly minCrop: Scalars['Int'];
  readonly barracks: AutoUnitsBuildingSettings;
  readonly stable: AutoUnitsBuildingSettings;
  readonly workshop: AutoUnitsBuildingSettings;
  readonly residence: AutoUnitsBuildingSettings;
};

export type AutoUnitsUnitSettings = {
  readonly __typename?: 'AutoUnitsUnitSettings';
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
  readonly __typename?: 'BuildingInfo';
  readonly maxLevel: Scalars['Int'];
  readonly name: Scalars['String'];
};

export type BuildingInProgress = {
  readonly __typename?: 'BuildingInProgress';
  readonly level: Scalars['Int'];
  readonly finishedAt: Timestamp;
  readonly type: Scalars['Int'];
  readonly fieldId: Scalars['Int'];
};

export type BuildingLevelInfo = {
  readonly __typename?: 'BuildingLevelInfo';
  readonly cost: ResourcesModel;
};

export type BuildingQueue = {
  readonly __typename?: 'BuildingQueue';
  readonly buildingRanges: ReadonlyArray<QueuedBuildingRange>;
  readonly totalBuildingTime: Duration;
  readonly totalCost: ResourcesModel;
};

export type BuildingSpot = {
  readonly __typename?: 'BuildingSpot';
  readonly fieldId: Scalars['Int'];
  readonly level: BuildingSpotLevel;
  readonly type: Scalars['Int'];
};

export type BuildingSpotLevel = {
  readonly __typename?: 'BuildingSpotLevel';
  readonly actual: Scalars['Int'];
  readonly ongoing: Maybe<Scalars['Int']>;
  readonly queued: Maybe<Scalars['Int']>;
  readonly total: Scalars['Int'];
};

export type BuildingSpots = {
  readonly __typename?: 'BuildingSpots';
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
  readonly __typename?: 'CoolDown';
  readonly min: Duration;
  readonly max: Duration;
};

export type CoolDownInput = {
  readonly min: DurationInput;
  readonly max: DurationInput;
};

export type Coords = {
  readonly __typename?: 'Coords';
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
  readonly __typename?: 'Duration';
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
  readonly __typename?: 'GameInfo';
  readonly tribe: Scalars['Int'];
};

export type GeneralSettings = {
  readonly __typename?: 'GeneralSettings';
  readonly dataPath: Scalars['String'];
  readonly chromePath: Scalars['String'];
  readonly headlessChrome: Scalars['Boolean'];
};

export type GeneralVillageSettings = {
  readonly __typename?: 'GeneralVillageSettings';
  readonly allowTasks: Scalars['Boolean'];
};

export type HeroInformation = {
  readonly __typename?: 'HeroInformation';
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
  readonly __typename?: 'LogEntry';
  readonly timestamp: Timestamp;
  readonly village: Maybe<Village>;
  readonly content: LogEntryContent;
};

export type LogEntryContent = TextLogEntryContent | AutoBuildLogEntryContent | AutoUnitsLogEntryContent | ResourceClaimLogEntryContent;

export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly clearQueue: Maybe<Scalars['Boolean']>;
  readonly createAccount: UserAccount;
  readonly deleteAccount: UserAccount;
  readonly dequeueBuilding: Maybe<Scalars['Boolean']>;
  readonly dequeueBuildingAtField: Maybe<Scalars['Boolean']>;
  readonly dequeueBuildingsBlock: Maybe<Scalars['Boolean']>;
  readonly enqueueBuilding: Maybe<Scalars['Boolean']>;
  readonly moveQueuedBuildingAsHighAsPossible: Maybe<Scalars['Boolean']>;
  readonly moveQueuedBuildingToIndex: Maybe<Scalars['Boolean']>;
  readonly moveQueuedBuildingsBlockAsHighAsPossible: Maybe<Scalars['Boolean']>;
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


export type MutationDequeueBuildingsBlockArgs = {
  villageId: Scalars['ID'];
  topBuildingQueueId: Scalars['ID'];
  bottomBuildingQueueId: Scalars['ID'];
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


export type MutationMoveQueuedBuildingsBlockAsHighAsPossibleArgs = {
  villageId: Scalars['ID'];
  topBuildingQueueId: Scalars['ID'];
  bottomBuildingQueueId: Scalars['ID'];
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
  readonly __typename?: 'Query';
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
  readonly heroInformation: HeroModel;
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
  readonly __typename?: 'QueuedBuilding';
  readonly buildingTime: Duration;
  readonly level: Scalars['Int'];
  readonly type: Scalars['Int'];
  readonly queueId: Scalars['ID'];
  readonly queueIndex: Scalars['Int'];
  readonly fieldId: Scalars['Int'];
};

export type QueuedBuildingRange = {
  readonly __typename?: 'QueuedBuildingRange';
  readonly id: Scalars['String'];
  readonly buildings: ReadonlyArray<QueuedBuilding>;
  readonly type: Scalars['Int'];
  readonly fieldId: Scalars['Int'];
  readonly buildingTime: Duration;
  readonly cost: ResourcesModel;
};

export type ResourceClaimLogEntryContent = {
  readonly __typename?: 'ResourceClaimLogEntryContent';
  readonly reason: ClaimHeroResourcesReason;
  readonly resources: ResourcesModel;
};

export type ResourceFields = {
  readonly __typename?: 'ResourceFields';
  readonly wood: ReadonlyArray<BuildingSpot>;
  readonly clay: ReadonlyArray<BuildingSpot>;
  readonly iron: ReadonlyArray<BuildingSpot>;
  readonly crop: ReadonlyArray<BuildingSpot>;
};

export type Resources = {
  readonly __typename?: 'Resources';
  readonly wood: Scalars['Int'];
  readonly clay: Scalars['Int'];
  readonly iron: Scalars['Int'];
  readonly crop: Scalars['Int'];
  readonly freeCrop: Scalars['Int'];
  readonly total: Scalars['Int'];
};

export type Subscription = {
  readonly __typename?: 'Subscription';
  readonly activeVillageIdChanged: Scalars['ID'];
  readonly actualBuildingLevelsUpdated: Maybe<Scalars['Boolean']>;
  readonly botActivityChanged: Scalars['Boolean'];
  readonly botStateChanged: BotState;
  readonly buildingsInProgressUpdated: ReadonlyArray<BuildingInProgress>;
  readonly heroInformationUpdated: HeroModel;
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
  readonly __typename?: 'TextLogEntryContent';
  readonly message: Scalars['String'];
  readonly messageType: TextLogEntryType;
};

export enum TextLogEntryType {
  Info = 'Info',
  Error = 'Error'
}

export type Timestamp = {
  readonly __typename?: 'Timestamp';
  readonly totalSeconds: Scalars['Int'];
};

export type TimestampInput = {
  readonly totalSeconds: Scalars['Int'];
};

export type UnitInfo = {
  readonly __typename?: 'UnitInfo';
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
  readonly __typename?: 'UserAccount';
  readonly id: Scalars['ID'];
  readonly username: Scalars['String'];
  readonly password: Scalars['String'];
  readonly server: Scalars['String'];
};

export type Village = {
  readonly __typename?: 'Village';
  readonly id: Scalars['ID'];
  readonly coords: Coords;
  readonly name: Scalars['String'];
  readonly resources: VillageResources;
  readonly isCapital: Scalars['Boolean'];
};

export type VillageCapacity = {
  readonly __typename?: 'VillageCapacity';
  readonly granary: Scalars['Int'];
  readonly warehouse: Scalars['Int'];
};

export type VillageCrannyCapacity = {
  readonly __typename?: 'VillageCrannyCapacity';
  readonly actual: Scalars['Int'];
  readonly ongoing: Scalars['Int'];
  readonly total: Scalars['Int'];
};

export type VillageResources = {
  readonly __typename?: 'VillageResources';
  readonly amount: ResourcesModel;
  readonly capacity: VillageCapacity;
  readonly production: ResourcesModel;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  UserAccount: ResolverTypeWrapper<UserAccount>;
  String: ResolverTypeWrapper<Scalars['String']>;
  AccountSettings: ResolverTypeWrapper<AccountSettings>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CoolDown: ResolverTypeWrapper<CoolDown>;
  Duration: ResolverTypeWrapper<Duration>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  AutoAdventureSettings: ResolverTypeWrapper<AutoAdventureSettings>;
  AdventureCriteria: AdventureCriteria;
  AutoBuildSettings: ResolverTypeWrapper<AutoBuildSettings>;
  AutoStorageSettings: ResolverTypeWrapper<AutoStorageSettings>;
  AutoStorageOptionSettings: ResolverTypeWrapper<AutoStorageOptionSettings>;
  AutoMentorSettings: ResolverTypeWrapper<AutoMentorSettings>;
  AutoPartySettings: ResolverTypeWrapper<AutoPartySettings>;
  AutoUnitsSettings: ResolverTypeWrapper<AutoUnitsSettings>;
  AutoUnitsBuildingSettings: ResolverTypeWrapper<AutoUnitsBuildingSettings>;
  AutoUnitsUnitSettings: ResolverTypeWrapper<AutoUnitsUnitSettings>;
  AvailableNewBuildingsInput: AvailableNewBuildingsInput;
  BotState: BotState;
  BuildingInfo: ResolverTypeWrapper<BuildingInfo>;
  BuildingLevelInfo: ResolverTypeWrapper<Omit<BuildingLevelInfo, 'cost'> & { cost: ResolversTypes['Resources'] }>;
  Resources: ResolverTypeWrapper<ResourcesModel>;
  BuildingQueue: ResolverTypeWrapper<Omit<BuildingQueue, 'buildingRanges' | 'totalCost'> & { buildingRanges: ReadonlyArray<ResolversTypes['QueuedBuildingRange']>, totalCost: ResolversTypes['Resources'] }>;
  QueuedBuildingRange: ResolverTypeWrapper<Omit<QueuedBuildingRange, 'cost'> & { cost: ResolversTypes['Resources'] }>;
  QueuedBuilding: ResolverTypeWrapper<QueuedBuilding>;
  BuildingSpots: ResolverTypeWrapper<Omit<BuildingSpots, 'infrastructure' | 'resources'> & { infrastructure: ReadonlyArray<ResolversTypes['BuildingSpot']>, resources: ResolversTypes['ResourceFields'] }>;
  BuildingSpot: ResolverTypeWrapper<BuildingSpotModel>;
  BuildingSpotLevel: ResolverTypeWrapper<BuildingSpotLevel>;
  ResourceFields: ResolverTypeWrapper<Omit<ResourceFields, 'wood' | 'clay' | 'iron' | 'crop'> & { wood: ReadonlyArray<ResolversTypes['BuildingSpot']>, clay: ReadonlyArray<ResolversTypes['BuildingSpot']>, iron: ReadonlyArray<ResolversTypes['BuildingSpot']>, crop: ReadonlyArray<ResolversTypes['BuildingSpot']> }>;
  BuildingInProgress: ResolverTypeWrapper<BuildingInProgressModel>;
  Timestamp: ResolverTypeWrapper<Timestamp>;
  VillageCrannyCapacity: ResolverTypeWrapper<VillageCrannyCapacity>;
  GameInfo: ResolverTypeWrapper<GameInfo>;
  GeneralSettings: ResolverTypeWrapper<GeneralSettings>;
  GeneralVillageSettings: ResolverTypeWrapper<GeneralVillageSettings>;
  HeroInformation: ResolverTypeWrapper<HeroModel>;
  HeroState: HeroState;
  Village: ResolverTypeWrapper<Omit<Village, 'resources'> & { resources: ResolversTypes['VillageResources'] }>;
  Coords: ResolverTypeWrapper<Coords>;
  VillageResources: ResolverTypeWrapper<Omit<VillageResources, 'amount' | 'production'> & { amount: ResolversTypes['Resources'], production: ResolversTypes['Resources'] }>;
  VillageCapacity: ResolverTypeWrapper<VillageCapacity>;
  AccountInput: AccountInput;
  LogEntry: ResolverTypeWrapper<Omit<LogEntry, 'village' | 'content'> & { village: Maybe<ResolversTypes['Village']>, content: ResolversTypes['LogEntryContent'] }>;
  LogEntryContent: ResolversTypes['TextLogEntryContent'] | ResolversTypes['AutoBuildLogEntryContent'] | ResolversTypes['AutoUnitsLogEntryContent'] | ResolversTypes['ResourceClaimLogEntryContent'];
  TextLogEntryContent: ResolverTypeWrapper<TextLogEntryContentModel>;
  TextLogEntryType: TextLogEntryType;
  AutoBuildLogEntryContent: ResolverTypeWrapper<AutoBuildLogEntryContent>;
  AutoUnitsLogEntryContent: ResolverTypeWrapper<AutoUnitsLogEntryContent>;
  ResourceClaimLogEntryContent: ResolverTypeWrapper<Omit<ResourceClaimLogEntryContent, 'resources'> & { resources: ResolversTypes['Resources'] }>;
  ClaimHeroResourcesReason: ClaimHeroResourcesReason;
  TaskType: TaskType;
  UnitInfo: ResolverTypeWrapper<UnitInfo>;
  Mutation: ResolverTypeWrapper<{}>;
  DequeueBuildingInput: DequeueBuildingInput;
  DequeueBuildingAtFieldInput: DequeueBuildingAtFieldInput;
  EnqueueBuildingInput: EnqueueBuildingInput;
  DurationInput: DurationInput;
  UpdateAccountSettingsInput: UpdateAccountSettingsInput;
  CoolDownInput: CoolDownInput;
  UpdateAutoAdventureSettingsInput: UpdateAutoAdventureSettingsInput;
  UpdateAutoBuildSettingsInput: UpdateAutoBuildSettingsInput;
  UpdateAutoStorageSettingsInput: UpdateAutoStorageSettingsInput;
  UpdateAutoStorageOptionSettingsInput: UpdateAutoStorageOptionSettingsInput;
  UpdateAutoMentorSettingsInput: UpdateAutoMentorSettingsInput;
  UpdateAutoPartySettingsInput: UpdateAutoPartySettingsInput;
  UpdateAutoUnitsBuildingSettingsInput: UpdateAutoUnitsBuildingSettingsInput;
  UpdateAutoUnitsSettingsInput: UpdateAutoUnitsSettingsInput;
  UpdateAutoUnitsUnitSettingsInput: UpdateAutoUnitsUnitSettingsInput;
  UpdateGeneralSettingsInput: UpdateGeneralSettingsInput;
  UpdateGeneralVillageSettingsInput: UpdateGeneralVillageSettingsInput;
  Subscription: ResolverTypeWrapper<{}>;
  TimestampInput: TimestampInput;
  ClearQueueInput: ClearQueueInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  ID: Scalars['ID'];
  UserAccount: UserAccount;
  String: Scalars['String'];
  AccountSettings: AccountSettings;
  Boolean: Scalars['Boolean'];
  CoolDown: CoolDown;
  Duration: Duration;
  Int: Scalars['Int'];
  AutoAdventureSettings: AutoAdventureSettings;
  AdventureCriteria: AdventureCriteria;
  AutoBuildSettings: AutoBuildSettings;
  AutoStorageSettings: AutoStorageSettings;
  AutoStorageOptionSettings: AutoStorageOptionSettings;
  AutoMentorSettings: AutoMentorSettings;
  AutoPartySettings: AutoPartySettings;
  AutoUnitsSettings: AutoUnitsSettings;
  AutoUnitsBuildingSettings: AutoUnitsBuildingSettings;
  AutoUnitsUnitSettings: AutoUnitsUnitSettings;
  AvailableNewBuildingsInput: AvailableNewBuildingsInput;
  BotState: BotState;
  BuildingInfo: BuildingInfo;
  BuildingLevelInfo: Omit<BuildingLevelInfo, 'cost'> & { cost: ResolversParentTypes['Resources'] };
  Resources: ResourcesModel;
  BuildingQueue: Omit<BuildingQueue, 'buildingRanges' | 'totalCost'> & { buildingRanges: ReadonlyArray<ResolversParentTypes['QueuedBuildingRange']>, totalCost: ResolversParentTypes['Resources'] };
  QueuedBuildingRange: Omit<QueuedBuildingRange, 'cost'> & { cost: ResolversParentTypes['Resources'] };
  QueuedBuilding: QueuedBuilding;
  BuildingSpots: Omit<BuildingSpots, 'infrastructure' | 'resources'> & { infrastructure: ReadonlyArray<ResolversParentTypes['BuildingSpot']>, resources: ResolversParentTypes['ResourceFields'] };
  BuildingSpot: BuildingSpotModel;
  BuildingSpotLevel: BuildingSpotLevel;
  ResourceFields: Omit<ResourceFields, 'wood' | 'clay' | 'iron' | 'crop'> & { wood: ReadonlyArray<ResolversParentTypes['BuildingSpot']>, clay: ReadonlyArray<ResolversParentTypes['BuildingSpot']>, iron: ReadonlyArray<ResolversParentTypes['BuildingSpot']>, crop: ReadonlyArray<ResolversParentTypes['BuildingSpot']> };
  BuildingInProgress: BuildingInProgressModel;
  Timestamp: Timestamp;
  VillageCrannyCapacity: VillageCrannyCapacity;
  GameInfo: GameInfo;
  GeneralSettings: GeneralSettings;
  GeneralVillageSettings: GeneralVillageSettings;
  HeroInformation: HeroModel;
  HeroState: HeroState;
  Village: Omit<Village, 'resources'> & { resources: ResolversParentTypes['VillageResources'] };
  Coords: Coords;
  VillageResources: Omit<VillageResources, 'amount' | 'production'> & { amount: ResolversParentTypes['Resources'], production: ResolversParentTypes['Resources'] };
  VillageCapacity: VillageCapacity;
  AccountInput: AccountInput;
  LogEntry: Omit<LogEntry, 'village' | 'content'> & { village: Maybe<ResolversParentTypes['Village']>, content: ResolversParentTypes['LogEntryContent'] };
  LogEntryContent: ResolversParentTypes['TextLogEntryContent'] | ResolversParentTypes['AutoBuildLogEntryContent'] | ResolversParentTypes['AutoUnitsLogEntryContent'] | ResolversParentTypes['ResourceClaimLogEntryContent'];
  TextLogEntryContent: TextLogEntryContentModel;
  TextLogEntryType: TextLogEntryType;
  AutoBuildLogEntryContent: AutoBuildLogEntryContent;
  AutoUnitsLogEntryContent: AutoUnitsLogEntryContent;
  ResourceClaimLogEntryContent: Omit<ResourceClaimLogEntryContent, 'resources'> & { resources: ResolversParentTypes['Resources'] };
  ClaimHeroResourcesReason: ClaimHeroResourcesReason;
  TaskType: TaskType;
  UnitInfo: UnitInfo;
  Mutation: {};
  DequeueBuildingInput: DequeueBuildingInput;
  DequeueBuildingAtFieldInput: DequeueBuildingAtFieldInput;
  EnqueueBuildingInput: EnqueueBuildingInput;
  DurationInput: DurationInput;
  UpdateAccountSettingsInput: UpdateAccountSettingsInput;
  CoolDownInput: CoolDownInput;
  UpdateAutoAdventureSettingsInput: UpdateAutoAdventureSettingsInput;
  UpdateAutoBuildSettingsInput: UpdateAutoBuildSettingsInput;
  UpdateAutoStorageSettingsInput: UpdateAutoStorageSettingsInput;
  UpdateAutoStorageOptionSettingsInput: UpdateAutoStorageOptionSettingsInput;
  UpdateAutoMentorSettingsInput: UpdateAutoMentorSettingsInput;
  UpdateAutoPartySettingsInput: UpdateAutoPartySettingsInput;
  UpdateAutoUnitsBuildingSettingsInput: UpdateAutoUnitsBuildingSettingsInput;
  UpdateAutoUnitsSettingsInput: UpdateAutoUnitsSettingsInput;
  UpdateAutoUnitsUnitSettingsInput: UpdateAutoUnitsUnitSettingsInput;
  UpdateGeneralSettingsInput: UpdateGeneralSettingsInput;
  UpdateGeneralVillageSettingsInput: UpdateGeneralVillageSettingsInput;
  Subscription: {};
  TimestampInput: TimestampInput;
  ClearQueueInput: ClearQueueInput;
};

export type AccountSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccountSettings'] = ResolversParentTypes['AccountSettings']> = {
  allowTasks: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  tasksCoolDown: Resolver<ResolversTypes['CoolDown'], ParentType, ContextType>;
  autoStart: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  autoBuild: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  autoUnits: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  autoParty: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AutoAdventureSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AutoAdventureSettings'] = ResolversParentTypes['AutoAdventureSettings']> = {
  allow: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  coolDown: Resolver<ResolversTypes['CoolDown'], ParentType, ContextType>;
  adventureCriteria: Resolver<ResolversTypes['AdventureCriteria'], ParentType, ContextType>;
  preferHard: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  normalMinHealth: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hardMinHealth: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxTravelTime: Resolver<ResolversTypes['Duration'], ParentType, ContextType>;
  preferredVillageId: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AutoBuildLogEntryContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['AutoBuildLogEntryContent'] = ResolversParentTypes['AutoBuildLogEntryContent']> = {
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  level: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  fieldId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AutoBuildSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AutoBuildSettings'] = ResolversParentTypes['AutoBuildSettings']> = {
  allow: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  allowDualQueue: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  coolDown: Resolver<ResolversTypes['CoolDown'], ParentType, ContextType>;
  autoCropFields: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  minCrop: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  useHeroResources: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  autoStorage: Resolver<ResolversTypes['AutoStorageSettings'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AutoMentorSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AutoMentorSettings'] = ResolversParentTypes['AutoMentorSettings']> = {
  acceptTaskRewards: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  acceptDailyRewards: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AutoPartySettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AutoPartySettings'] = ResolversParentTypes['AutoPartySettings']> = {
  coolDown: Resolver<ResolversTypes['CoolDown'], ParentType, ContextType>;
  allowSmall: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  allowLarge: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  minCulturePointsSmall: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  minCulturePointsLarge: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AutoStorageOptionSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AutoStorageOptionSettings'] = ResolversParentTypes['AutoStorageOptionSettings']> = {
  allow: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  overflowLevel: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AutoStorageSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AutoStorageSettings'] = ResolversParentTypes['AutoStorageSettings']> = {
  allowFreeSpots: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  granary: Resolver<ResolversTypes['AutoStorageOptionSettings'], ParentType, ContextType>;
  warehouse: Resolver<ResolversTypes['AutoStorageOptionSettings'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AutoUnitsBuildingSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AutoUnitsBuildingSettings'] = ResolversParentTypes['AutoUnitsBuildingSettings']> = {
  allow: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  maxBuildTime: Resolver<ResolversTypes['Duration'], ParentType, ContextType>;
  units: Resolver<ReadonlyArray<ResolversTypes['AutoUnitsUnitSettings']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AutoUnitsLogEntryContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['AutoUnitsLogEntryContent'] = ResolversParentTypes['AutoUnitsLogEntryContent']> = {
  amount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tribe: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  unitName: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AutoUnitsSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AutoUnitsSettings'] = ResolversParentTypes['AutoUnitsSettings']> = {
  allow: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  coolDown: Resolver<ResolversTypes['CoolDown'], ParentType, ContextType>;
  minCrop: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  barracks: Resolver<ResolversTypes['AutoUnitsBuildingSettings'], ParentType, ContextType>;
  stable: Resolver<ResolversTypes['AutoUnitsBuildingSettings'], ParentType, ContextType>;
  workshop: Resolver<ResolversTypes['AutoUnitsBuildingSettings'], ParentType, ContextType>;
  residence: Resolver<ResolversTypes['AutoUnitsBuildingSettings'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AutoUnitsUnitSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AutoUnitsUnitSettings'] = ResolversParentTypes['AutoUnitsUnitSettings']> = {
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  autoBuild: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  trainForever: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  targetAmount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type BuildingInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['BuildingInfo'] = ResolversParentTypes['BuildingInfo']> = {
  maxLevel: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type BuildingInProgressResolvers<ContextType = any, ParentType extends ResolversParentTypes['BuildingInProgress'] = ResolversParentTypes['BuildingInProgress']> = {
  level: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  finishedAt: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  fieldId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type BuildingLevelInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['BuildingLevelInfo'] = ResolversParentTypes['BuildingLevelInfo']> = {
  cost: Resolver<ResolversTypes['Resources'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type BuildingQueueResolvers<ContextType = any, ParentType extends ResolversParentTypes['BuildingQueue'] = ResolversParentTypes['BuildingQueue']> = {
  buildingRanges: Resolver<ReadonlyArray<ResolversTypes['QueuedBuildingRange']>, ParentType, ContextType>;
  totalBuildingTime: Resolver<ResolversTypes['Duration'], ParentType, ContextType>;
  totalCost: Resolver<ResolversTypes['Resources'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type BuildingSpotResolvers<ContextType = any, ParentType extends ResolversParentTypes['BuildingSpot'] = ResolversParentTypes['BuildingSpot']> = {
  fieldId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  level: Resolver<ResolversTypes['BuildingSpotLevel'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type BuildingSpotLevelResolvers<ContextType = any, ParentType extends ResolversParentTypes['BuildingSpotLevel'] = ResolversParentTypes['BuildingSpotLevel']> = {
  actual: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ongoing: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  queued: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type BuildingSpotsResolvers<ContextType = any, ParentType extends ResolversParentTypes['BuildingSpots'] = ResolversParentTypes['BuildingSpots']> = {
  infrastructure: Resolver<ReadonlyArray<ResolversTypes['BuildingSpot']>, ParentType, ContextType>;
  resources: Resolver<ResolversTypes['ResourceFields'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CoolDownResolvers<ContextType = any, ParentType extends ResolversParentTypes['CoolDown'] = ResolversParentTypes['CoolDown']> = {
  min: Resolver<ResolversTypes['Duration'], ParentType, ContextType>;
  max: Resolver<ResolversTypes['Duration'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CoordsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Coords'] = ResolversParentTypes['Coords']> = {
  x: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  y: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type DurationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Duration'] = ResolversParentTypes['Duration']> = {
  days: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hours: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  minutes: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  seconds: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type GameInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['GameInfo'] = ResolversParentTypes['GameInfo']> = {
  tribe: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type GeneralSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeneralSettings'] = ResolversParentTypes['GeneralSettings']> = {
  dataPath: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  chromePath: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  headlessChrome: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type GeneralVillageSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeneralVillageSettings'] = ResolversParentTypes['GeneralVillageSettings']> = {
  allowTasks: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type HeroInformationResolvers<ContextType = any, ParentType extends ResolversParentTypes['HeroInformation'] = ResolversParentTypes['HeroInformation']> = {
  health: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  state: Resolver<ResolversTypes['HeroState'], ParentType, ContextType>;
  village: Resolver<Maybe<ResolversTypes['Village']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type LogEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogEntry'] = ResolversParentTypes['LogEntry']> = {
  timestamp: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  village: Resolver<Maybe<ResolversTypes['Village']>, ParentType, ContextType>;
  content: Resolver<ResolversTypes['LogEntryContent'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type LogEntryContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogEntryContent'] = ResolversParentTypes['LogEntryContent']> = {
  __resolveType: TypeResolveFn<'TextLogEntryContent' | 'AutoBuildLogEntryContent' | 'AutoUnitsLogEntryContent' | 'ResourceClaimLogEntryContent', ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  clearQueue: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationClearQueueArgs, 'villageId'>>;
  createAccount: Resolver<ResolversTypes['UserAccount'], ParentType, ContextType, RequireFields<MutationCreateAccountArgs, 'account'>>;
  deleteAccount: Resolver<ResolversTypes['UserAccount'], ParentType, ContextType, RequireFields<MutationDeleteAccountArgs, 'id'>>;
  dequeueBuilding: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDequeueBuildingArgs, 'input'>>;
  dequeueBuildingAtField: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDequeueBuildingAtFieldArgs, 'input'>>;
  dequeueBuildingsBlock: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDequeueBuildingsBlockArgs, 'villageId' | 'topBuildingQueueId' | 'bottomBuildingQueueId'>>;
  enqueueBuilding: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationEnqueueBuildingArgs, 'input'>>;
  moveQueuedBuildingAsHighAsPossible: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationMoveQueuedBuildingAsHighAsPossibleArgs, 'villageId' | 'queueId'>>;
  moveQueuedBuildingToIndex: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationMoveQueuedBuildingToIndexArgs, 'villageId' | 'queueId' | 'index'>>;
  moveQueuedBuildingsBlockAsHighAsPossible: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationMoveQueuedBuildingsBlockAsHighAsPossibleArgs, 'villageId' | 'topBuildingQueueId' | 'bottomBuildingQueueId'>>;
  moveQueuedBuildingsBlockToIndex: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationMoveQueuedBuildingsBlockToIndexArgs, 'villageId' | 'topBuildingQueueId' | 'bottomBuildingQueueId' | 'index'>>;
  refreshVillage: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRefreshVillageArgs, 'villageId'>>;
  resetAccountSettings: Resolver<ResolversTypes['AccountSettings'], ParentType, ContextType>;
  resetAutoAdventureSettings: Resolver<ResolversTypes['AutoAdventureSettings'], ParentType, ContextType>;
  resetAutoBuildSettings: Resolver<ResolversTypes['AutoBuildSettings'], ParentType, ContextType, RequireFields<MutationResetAutoBuildSettingsArgs, 'villageId'>>;
  resetAutoMentorSettings: Resolver<ResolversTypes['AutoMentorSettings'], ParentType, ContextType>;
  resetAutoPartySettings: Resolver<ResolversTypes['AutoPartySettings'], ParentType, ContextType, RequireFields<MutationResetAutoPartySettingsArgs, 'villageId'>>;
  resetAutoUnitsSettings: Resolver<ResolversTypes['AutoUnitsSettings'], ParentType, ContextType, RequireFields<MutationResetAutoUnitsSettingsArgs, 'villageId'>>;
  resetGeneralSettings: Resolver<ResolversTypes['GeneralSettings'], ParentType, ContextType>;
  resetGeneralVillageSettings: Resolver<ResolversTypes['GeneralVillageSettings'], ParentType, ContextType, RequireFields<MutationResetGeneralVillageSettingsArgs, 'villageId'>>;
  resetNextTaskExecution: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType, RequireFields<MutationResetNextTaskExecutionArgs, 'task'>>;
  resetNextTasksExecution: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  resetNextVillageTaskExecution: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType, RequireFields<MutationResetNextVillageTaskExecutionArgs, 'villageId' | 'task'>>;
  setNextTaskExecution: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType, RequireFields<MutationSetNextTaskExecutionArgs, 'task' | 'delay'>>;
  setNextTasksExecution: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType, RequireFields<MutationSetNextTasksExecutionArgs, 'delay'>>;
  setNextVillageTaskExecution: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType, RequireFields<MutationSetNextVillageTaskExecutionArgs, 'villageId' | 'task' | 'delay'>>;
  signIn: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSignInArgs, 'accountId'>>;
  signOut: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  startBot: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  stopBot: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  updateAccount: Resolver<ResolversTypes['UserAccount'], ParentType, ContextType, RequireFields<MutationUpdateAccountArgs, 'id' | 'account'>>;
  updateAccountSettings: Resolver<ResolversTypes['AccountSettings'], ParentType, ContextType, RequireFields<MutationUpdateAccountSettingsArgs, 'settings'>>;
  updateAutoAdventureSettings: Resolver<ResolversTypes['AutoAdventureSettings'], ParentType, ContextType, RequireFields<MutationUpdateAutoAdventureSettingsArgs, 'settings'>>;
  updateAutoBuildSettings: Resolver<ResolversTypes['AutoBuildSettings'], ParentType, ContextType, RequireFields<MutationUpdateAutoBuildSettingsArgs, 'villageId' | 'settings'>>;
  updateAutoMentorSettings: Resolver<ResolversTypes['AutoMentorSettings'], ParentType, ContextType, RequireFields<MutationUpdateAutoMentorSettingsArgs, 'settings'>>;
  updateAutoPartySettings: Resolver<ResolversTypes['AutoPartySettings'], ParentType, ContextType, RequireFields<MutationUpdateAutoPartySettingsArgs, 'villageId' | 'settings'>>;
  updateAutoUnitsBuildingSettings: Resolver<ResolversTypes['AutoUnitsSettings'], ParentType, ContextType, RequireFields<MutationUpdateAutoUnitsBuildingSettingsArgs, 'villageId' | 'buildingType' | 'settings'>>;
  updateAutoUnitsSettings: Resolver<ResolversTypes['AutoUnitsSettings'], ParentType, ContextType, RequireFields<MutationUpdateAutoUnitsSettingsArgs, 'villageId' | 'settings'>>;
  updateAutoUnitsUnitSettings: Resolver<ResolversTypes['AutoUnitsSettings'], ParentType, ContextType, RequireFields<MutationUpdateAutoUnitsUnitSettingsArgs, 'villageId' | 'settings'>>;
  updateGeneralSettings: Resolver<ResolversTypes['GeneralSettings'], ParentType, ContextType, RequireFields<MutationUpdateGeneralSettingsArgs, 'settings'>>;
  updateGeneralVillageSettings: Resolver<ResolversTypes['GeneralVillageSettings'], ParentType, ContextType, RequireFields<MutationUpdateGeneralVillageSettingsArgs, 'villageId' | 'settings'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  account: Resolver<ResolversTypes['UserAccount'], ParentType, ContextType, RequireFields<QueryAccountArgs, 'id'>>;
  accountSettings: Resolver<ResolversTypes['AccountSettings'], ParentType, ContextType>;
  accounts: Resolver<ReadonlyArray<ResolversTypes['UserAccount']>, ParentType, ContextType>;
  activeVillageId: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  autoAdventureSettings: Resolver<ResolversTypes['AutoAdventureSettings'], ParentType, ContextType>;
  autoBuildSettings: Resolver<ResolversTypes['AutoBuildSettings'], ParentType, ContextType, RequireFields<QueryAutoBuildSettingsArgs, 'villageId'>>;
  autoMentorSettings: Resolver<ResolversTypes['AutoMentorSettings'], ParentType, ContextType>;
  autoPartySettings: Resolver<ResolversTypes['AutoPartySettings'], ParentType, ContextType, RequireFields<QueryAutoPartySettingsArgs, 'villageId'>>;
  autoUnitsSettings: Resolver<ResolversTypes['AutoUnitsSettings'], ParentType, ContextType, RequireFields<QueryAutoUnitsSettingsArgs, 'villageId'>>;
  availableNewBuildingsTypes: Resolver<ReadonlyArray<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<QueryAvailableNewBuildingsTypesArgs, 'input'>>;
  botState: Resolver<ResolversTypes['BotState'], ParentType, ContextType>;
  buildingInfo: Resolver<ResolversTypes['BuildingInfo'], ParentType, ContextType, RequireFields<QueryBuildingInfoArgs, 'buildingType'>>;
  buildingLevelInfo: Resolver<ResolversTypes['BuildingLevelInfo'], ParentType, ContextType, RequireFields<QueryBuildingLevelInfoArgs, 'buildingType' | 'level'>>;
  buildingQueue: Resolver<ResolversTypes['BuildingQueue'], ParentType, ContextType, RequireFields<QueryBuildingQueueArgs, 'villageId'>>;
  buildingSpots: Resolver<ResolversTypes['BuildingSpots'], ParentType, ContextType, RequireFields<QueryBuildingSpotsArgs, 'villageId'>>;
  buildingsInProgress: Resolver<ReadonlyArray<ResolversTypes['BuildingInProgress']>, ParentType, ContextType, RequireFields<QueryBuildingsInProgressArgs, 'villageId'>>;
  canMoveQueuedBuildingToIndex: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryCanMoveQueuedBuildingToIndexArgs, 'villageId' | 'queueId' | 'index'>>;
  canMoveQueuedBuildingsBlockToIndex: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryCanMoveQueuedBuildingsBlockToIndexArgs, 'villageId' | 'topBuildingQueueId' | 'bottomBuildingQueueId' | 'index'>>;
  crannyCapacity: Resolver<ResolversTypes['VillageCrannyCapacity'], ParentType, ContextType, RequireFields<QueryCrannyCapacityArgs, 'villageId'>>;
  currentAccount: Resolver<ResolversTypes['UserAccount'], ParentType, ContextType>;
  gameInfo: Resolver<ResolversTypes['GameInfo'], ParentType, ContextType>;
  generalSettings: Resolver<ResolversTypes['GeneralSettings'], ParentType, ContextType>;
  generalVillageSettings: Resolver<ResolversTypes['GeneralVillageSettings'], ParentType, ContextType, RequireFields<QueryGeneralVillageSettingsArgs, 'villageId'>>;
  heroInformation: Resolver<ResolversTypes['HeroInformation'], ParentType, ContextType>;
  isAccountTaken: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryIsAccountTakenArgs, 'account'>>;
  isBotActive: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastSignedAccountId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  logEntries: Resolver<ReadonlyArray<ResolversTypes['LogEntry']>, ParentType, ContextType>;
  nextTaskExecution: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType, RequireFields<QueryNextTaskExecutionArgs, 'task'>>;
  nextTasksExecution: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  nextVillageTaskExecution: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType, RequireFields<QueryNextVillageTaskExecutionArgs, 'villageId' | 'task'>>;
  unitInfo: Resolver<ResolversTypes['UnitInfo'], ParentType, ContextType, RequireFields<QueryUnitInfoArgs, 'index'>>;
  village: Resolver<Maybe<ResolversTypes['Village']>, ParentType, ContextType, RequireFields<QueryVillageArgs, 'villageId'>>;
  villages: Resolver<ReadonlyArray<ResolversTypes['Village']>, ParentType, ContextType>;
};

export type QueuedBuildingResolvers<ContextType = any, ParentType extends ResolversParentTypes['QueuedBuilding'] = ResolversParentTypes['QueuedBuilding']> = {
  buildingTime: Resolver<ResolversTypes['Duration'], ParentType, ContextType>;
  level: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  queueId: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  queueIndex: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  fieldId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type QueuedBuildingRangeResolvers<ContextType = any, ParentType extends ResolversParentTypes['QueuedBuildingRange'] = ResolversParentTypes['QueuedBuildingRange']> = {
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  buildings: Resolver<ReadonlyArray<ResolversTypes['QueuedBuilding']>, ParentType, ContextType>;
  type: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  fieldId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  buildingTime: Resolver<ResolversTypes['Duration'], ParentType, ContextType>;
  cost: Resolver<ResolversTypes['Resources'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ResourceClaimLogEntryContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResourceClaimLogEntryContent'] = ResolversParentTypes['ResourceClaimLogEntryContent']> = {
  reason: Resolver<ResolversTypes['ClaimHeroResourcesReason'], ParentType, ContextType>;
  resources: Resolver<ResolversTypes['Resources'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ResourceFieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResourceFields'] = ResolversParentTypes['ResourceFields']> = {
  wood: Resolver<ReadonlyArray<ResolversTypes['BuildingSpot']>, ParentType, ContextType>;
  clay: Resolver<ReadonlyArray<ResolversTypes['BuildingSpot']>, ParentType, ContextType>;
  iron: Resolver<ReadonlyArray<ResolversTypes['BuildingSpot']>, ParentType, ContextType>;
  crop: Resolver<ReadonlyArray<ResolversTypes['BuildingSpot']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ResourcesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Resources'] = ResolversParentTypes['Resources']> = {
  wood: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  clay: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  iron: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  crop: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  freeCrop: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  activeVillageIdChanged: SubscriptionResolver<ResolversTypes['ID'], "activeVillageIdChanged", ParentType, ContextType>;
  actualBuildingLevelsUpdated: SubscriptionResolver<Maybe<ResolversTypes['Boolean']>, "actualBuildingLevelsUpdated", ParentType, ContextType, RequireFields<SubscriptionActualBuildingLevelsUpdatedArgs, 'villageId'>>;
  botActivityChanged: SubscriptionResolver<ResolversTypes['Boolean'], "botActivityChanged", ParentType, ContextType>;
  botStateChanged: SubscriptionResolver<ResolversTypes['BotState'], "botStateChanged", ParentType, ContextType>;
  buildingsInProgressUpdated: SubscriptionResolver<ReadonlyArray<ResolversTypes['BuildingInProgress']>, "buildingsInProgressUpdated", ParentType, ContextType, RequireFields<SubscriptionBuildingsInProgressUpdatedArgs, 'villageId'>>;
  heroInformationUpdated: SubscriptionResolver<ResolversTypes['HeroInformation'], "heroInformationUpdated", ParentType, ContextType>;
  logEntryAdded: SubscriptionResolver<ResolversTypes['LogEntry'], "logEntryAdded", ParentType, ContextType>;
  nextTaskExecutionChanged: SubscriptionResolver<ResolversTypes['Timestamp'], "nextTaskExecutionChanged", ParentType, ContextType, RequireFields<SubscriptionNextTaskExecutionChangedArgs, 'task'>>;
  nextTasksExecutionChanged: SubscriptionResolver<ResolversTypes['Timestamp'], "nextTasksExecutionChanged", ParentType, ContextType>;
  nextVillageTaskExecutionChanged: SubscriptionResolver<ResolversTypes['Timestamp'], "nextVillageTaskExecutionChanged", ParentType, ContextType, RequireFields<SubscriptionNextVillageTaskExecutionChangedArgs, 'villageId' | 'task'>>;
  queueUpdated: SubscriptionResolver<ResolversTypes['BuildingQueue'], "queueUpdated", ParentType, ContextType, RequireFields<SubscriptionQueueUpdatedArgs, 'villageId'>>;
  villageUpdated: SubscriptionResolver<ResolversTypes['Village'], "villageUpdated", ParentType, ContextType, RequireFields<SubscriptionVillageUpdatedArgs, 'villageId'>>;
  villagesUpdated: SubscriptionResolver<ReadonlyArray<ResolversTypes['Village']>, "villagesUpdated", ParentType, ContextType>;
};

export type TextLogEntryContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['TextLogEntryContent'] = ResolversParentTypes['TextLogEntryContent']> = {
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  messageType: Resolver<ResolversTypes['TextLogEntryType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type TimestampResolvers<ContextType = any, ParentType extends ResolversParentTypes['Timestamp'] = ResolversParentTypes['Timestamp']> = {
  totalSeconds: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type UnitInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnitInfo'] = ResolversParentTypes['UnitInfo']> = {
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type UserAccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAccount'] = ResolversParentTypes['UserAccount']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  server: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type VillageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Village'] = ResolversParentTypes['Village']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  coords: Resolver<ResolversTypes['Coords'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resources: Resolver<ResolversTypes['VillageResources'], ParentType, ContextType>;
  isCapital: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type VillageCapacityResolvers<ContextType = any, ParentType extends ResolversParentTypes['VillageCapacity'] = ResolversParentTypes['VillageCapacity']> = {
  granary: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  warehouse: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type VillageCrannyCapacityResolvers<ContextType = any, ParentType extends ResolversParentTypes['VillageCrannyCapacity'] = ResolversParentTypes['VillageCrannyCapacity']> = {
  actual: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ongoing: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type VillageResourcesResolvers<ContextType = any, ParentType extends ResolversParentTypes['VillageResources'] = ResolversParentTypes['VillageResources']> = {
  amount: Resolver<ResolversTypes['Resources'], ParentType, ContextType>;
  capacity: Resolver<ResolversTypes['VillageCapacity'], ParentType, ContextType>;
  production: Resolver<ResolversTypes['Resources'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  AccountSettings: AccountSettingsResolvers<ContextType>;
  AutoAdventureSettings: AutoAdventureSettingsResolvers<ContextType>;
  AutoBuildLogEntryContent: AutoBuildLogEntryContentResolvers<ContextType>;
  AutoBuildSettings: AutoBuildSettingsResolvers<ContextType>;
  AutoMentorSettings: AutoMentorSettingsResolvers<ContextType>;
  AutoPartySettings: AutoPartySettingsResolvers<ContextType>;
  AutoStorageOptionSettings: AutoStorageOptionSettingsResolvers<ContextType>;
  AutoStorageSettings: AutoStorageSettingsResolvers<ContextType>;
  AutoUnitsBuildingSettings: AutoUnitsBuildingSettingsResolvers<ContextType>;
  AutoUnitsLogEntryContent: AutoUnitsLogEntryContentResolvers<ContextType>;
  AutoUnitsSettings: AutoUnitsSettingsResolvers<ContextType>;
  AutoUnitsUnitSettings: AutoUnitsUnitSettingsResolvers<ContextType>;
  BuildingInfo: BuildingInfoResolvers<ContextType>;
  BuildingInProgress: BuildingInProgressResolvers<ContextType>;
  BuildingLevelInfo: BuildingLevelInfoResolvers<ContextType>;
  BuildingQueue: BuildingQueueResolvers<ContextType>;
  BuildingSpot: BuildingSpotResolvers<ContextType>;
  BuildingSpotLevel: BuildingSpotLevelResolvers<ContextType>;
  BuildingSpots: BuildingSpotsResolvers<ContextType>;
  CoolDown: CoolDownResolvers<ContextType>;
  Coords: CoordsResolvers<ContextType>;
  Duration: DurationResolvers<ContextType>;
  GameInfo: GameInfoResolvers<ContextType>;
  GeneralSettings: GeneralSettingsResolvers<ContextType>;
  GeneralVillageSettings: GeneralVillageSettingsResolvers<ContextType>;
  HeroInformation: HeroInformationResolvers<ContextType>;
  LogEntry: LogEntryResolvers<ContextType>;
  LogEntryContent: LogEntryContentResolvers;
  Mutation: MutationResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  QueuedBuilding: QueuedBuildingResolvers<ContextType>;
  QueuedBuildingRange: QueuedBuildingRangeResolvers<ContextType>;
  ResourceClaimLogEntryContent: ResourceClaimLogEntryContentResolvers<ContextType>;
  ResourceFields: ResourceFieldsResolvers<ContextType>;
  Resources: ResourcesResolvers<ContextType>;
  Subscription: SubscriptionResolvers<ContextType>;
  TextLogEntryContent: TextLogEntryContentResolvers<ContextType>;
  Timestamp: TimestampResolvers<ContextType>;
  UnitInfo: UnitInfoResolvers<ContextType>;
  UserAccount: UserAccountResolvers<ContextType>;
  Village: VillageResolvers<ContextType>;
  VillageCapacity: VillageCapacityResolvers<ContextType>;
  VillageCrannyCapacity: VillageCrannyCapacityResolvers<ContextType>;
  VillageResources: VillageResourcesResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
