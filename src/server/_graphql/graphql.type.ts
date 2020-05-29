import { GraphQLResolveInfo } from 'graphql';
import { Resources as ResourcesModel } from '../_models/misc/resources';
import { BuildingInProgress as BuildingInProgressModel } from '../_models/buildings/inProgress/buildingInProgress';
import { Hero as HeroModel } from '../_models/hero/hero';
import { LogEntry as LogEntryModel } from '../_models/logs/logEntry';
import { TextLogEntryContent as TextLogEntryContentModel } from '../_models/logs/content/text';
import { AutoBuildLogEntryContent as AutoBuildLogEntryContentModel } from '../_models/logs/content/autoBuild';
import { AutoUnitsLogEntryContent as AutoUnitsLogEntryContentModel } from '../_models/logs/content/autoUnits';
export type Maybe<T> = T | null;
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

export type UserAccount = {
  readonly __typename?: 'UserAccount';
  readonly id: Scalars['String'];
  readonly username: Scalars['String'];
  readonly password: Scalars['String'];
  readonly server: Scalars['String'];
};

export type Query = {
  readonly __typename?: 'Query';
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
  readonly __typename?: 'Mutation';
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
  readonly __typename?: 'BuildingSpotLevel';
  readonly actual: Scalars['Int'];
  readonly ongoing: Scalars['Int'];
  readonly queued: Scalars['Int'];
  readonly max: Scalars['Int'];
  readonly total: Scalars['Int'];
};

export type BuildingSpot = {
  readonly __typename?: 'BuildingSpot';
  readonly fieldId: Scalars['Int'];
  readonly level: BuildingSpotLevel;
  readonly name: Scalars['String'];
  readonly type: Scalars['Int'];
};

export type ResourceFields = {
  readonly __typename?: 'ResourceFields';
  readonly wood: ReadonlyArray<BuildingSpot>;
  readonly clay: ReadonlyArray<BuildingSpot>;
  readonly iron: ReadonlyArray<BuildingSpot>;
  readonly crop: ReadonlyArray<BuildingSpot>;
};

export type BuildingSpots = {
  readonly __typename?: 'BuildingSpots';
  readonly infrastructure: ReadonlyArray<BuildingSpot>;
  readonly resources: ResourceFields;
};

export type AvailableNewBuildingsInput = {
  readonly fieldId: Scalars['Int'];
  readonly villageId: Scalars['Int'];
};

export type AvailableNewBuilding = {
  readonly __typename?: 'AvailableNewBuilding';
  readonly type: Scalars['Int'];
  readonly name: Scalars['String'];
};

export type Subscription = {
  readonly __typename?: 'Subscription';
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
  readonly __typename?: 'BuildingInProgress';
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
  readonly __typename?: 'HeroInformation';
  readonly health: Scalars['Int'];
  readonly state: HeroState;
  readonly village: Maybe<Village>;
};

export type TextLogEntryContent = {
  readonly __typename?: 'TextLogEntryContent';
  readonly message: Scalars['String'];
};

export type AutoBuildLogEntryContent = {
  readonly __typename?: 'AutoBuildLogEntryContent';
  readonly name: Scalars['String'];
  readonly type: Scalars['Int'];
  readonly level: Scalars['Int'];
  readonly fieldId: Scalars['Int'];
};

export type AutoUnitsLogEntryContent = {
  readonly __typename?: 'AutoUnitsLogEntryContent';
  readonly amount: Scalars['Int'];
  readonly index: Scalars['Int'];
  readonly tribe: Scalars['Int'];
  readonly unitName: Scalars['String'];
};

export type LogEntryContent = TextLogEntryContent | AutoBuildLogEntryContent | AutoUnitsLogEntryContent;

export type LogEntry = {
  readonly __typename?: 'LogEntry';
  readonly id: Scalars['ID'];
  readonly timestamp: Timestamp;
  readonly village: Maybe<Village>;
  readonly content: LogEntryContent;
};

export type Timestamp = {
  readonly __typename?: 'Timestamp';
  readonly totalSeconds: Scalars['Int'];
};

export type Cost = {
  readonly __typename?: 'Cost';
  readonly resources: ResourcesModel;
  readonly buildTime: Duration;
};

export type Coords = {
  readonly __typename?: 'Coords';
  readonly x: Scalars['Int'];
  readonly y: Scalars['Int'];
};

export type Duration = {
  readonly __typename?: 'Duration';
  readonly days: Scalars['Int'];
  readonly hours: Scalars['Int'];
  readonly minutes: Scalars['Int'];
  readonly seconds: Scalars['Int'];
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
  readonly __typename?: 'QueuedBuilding';
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
  readonly __typename?: 'BuildingQueue';
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
  readonly __typename?: 'GeneralSettings';
  readonly allowTasks: Scalars['Boolean'];
  readonly autoStart: Scalars['Boolean'];
  readonly autoBuild: Scalars['Boolean'];
  readonly autoUnits: Scalars['Boolean'];
  readonly autoParty: Scalars['Boolean'];
};

export type GeneralVillageSettings = {
  readonly __typename?: 'GeneralVillageSettings';
  readonly allowTasks: Scalars['Boolean'];
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

export type AutoBuildSettings = ITaskSettings & {
  readonly __typename?: 'AutoBuildSettings';
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
  readonly __typename?: 'AutoAdventureSettings';
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
  readonly __typename?: 'HeroSettings';
  readonly autoAdventure: AutoAdventureSettings;
};

export type AutoUnitsUnitSettings = {
  readonly __typename?: 'AutoUnitsUnitSettings';
  readonly index: Scalars['Int'];
  readonly autoBuild: Scalars['Boolean'];
  readonly trainForever: Scalars['Boolean'];
  readonly targetAmount: Scalars['Int'];
};

export type AutoUnitsBuildingSettings = {
  readonly __typename?: 'AutoUnitsBuildingSettings';
  readonly allow: Scalars['Boolean'];
  readonly maxBuildTime: Duration;
  readonly units: ReadonlyArray<AutoUnitsUnitSettings>;
};

export type AutoUnitsSettings = ITaskSettings & {
  readonly __typename?: 'AutoUnitsSettings';
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
  readonly __typename?: 'AutoPartySettings';
  readonly coolDown: CoolDown;
  readonly allow: Scalars['Boolean'];
  readonly minCulturePoints: Scalars['Int'];
  readonly partyType: PartyType;
};

export type VillageSettings = {
  readonly __typename?: 'VillageSettings';
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
  readonly __typename?: 'UnitInfo';
  readonly name: Scalars['String'];
};

export type VillageCapacity = {
  readonly __typename?: 'VillageCapacity';
  readonly granary: Scalars['Int'];
  readonly warehouse: Scalars['Int'];
};

export type VillageResources = {
  readonly __typename?: 'VillageResources';
  readonly amount: ResourcesModel;
  readonly capacity: VillageCapacity;
  readonly production: ResourcesModel;
};

export type Village = {
  readonly __typename?: 'Village';
  readonly id: Scalars['Int'];
  readonly coords: Coords;
  readonly name: Scalars['String'];
  readonly resources: VillageResources;
  readonly isCapital: Scalars['Boolean'];
};

export type VillageCrannyCapacity = {
  readonly __typename?: 'VillageCrannyCapacity';
  readonly actual: Scalars['Int'];
  readonly ongoing: Scalars['Int'];
  readonly total: Scalars['Int'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

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

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

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
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  UserAccount: ResolverTypeWrapper<UserAccount>;
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  BuildingSpotLevel: ResolverTypeWrapper<BuildingSpotLevel>;
  BuildingSpot: ResolverTypeWrapper<BuildingSpot>;
  ResourceFields: ResolverTypeWrapper<ResourceFields>;
  BuildingSpots: ResolverTypeWrapper<BuildingSpots>;
  AvailableNewBuildingsInput: AvailableNewBuildingsInput;
  AvailableNewBuilding: ResolverTypeWrapper<AvailableNewBuilding>;
  Subscription: ResolverTypeWrapper<{}>;
  BuildingInProgress: ResolverTypeWrapper<BuildingInProgressModel>;
  BotState: BotState;
  CreateUserAccountInput: CreateUserAccountInput;
  UpdateUserAccountInput: UpdateUserAccountInput;
  HeroState: HeroState;
  HeroInformation: ResolverTypeWrapper<HeroModel>;
  TextLogEntryContent: ResolverTypeWrapper<TextLogEntryContentModel>;
  AutoBuildLogEntryContent: ResolverTypeWrapper<AutoBuildLogEntryContentModel>;
  AutoUnitsLogEntryContent: ResolverTypeWrapper<AutoUnitsLogEntryContentModel>;
  LogEntryContent: ResolversTypes['TextLogEntryContent'] | ResolversTypes['AutoBuildLogEntryContent'] | ResolversTypes['AutoUnitsLogEntryContent'];
  LogEntry: ResolverTypeWrapper<LogEntryModel>;
  Timestamp: ResolverTypeWrapper<Timestamp>;
  Resources: ResolverTypeWrapper<ResourcesModel>;
  Cost: ResolverTypeWrapper<Omit<Cost, 'resources'> & { resources: ResolversTypes['Resources'] }>;
  Coords: ResolverTypeWrapper<Coords>;
  Duration: ResolverTypeWrapper<Duration>;
  CoolDown: ResolverTypeWrapper<CoolDown>;
  CoolDownInput: CoolDownInput;
  DurationInput: DurationInput;
  TimestampInput: TimestampInput;
  TaskType: TaskType;
  VillageTaskType: VillageTaskType;
  QueuedBuilding: ResolverTypeWrapper<Omit<QueuedBuilding, 'cost'> & { cost: ResolversTypes['Cost'] }>;
  BuildingQueue: ResolverTypeWrapper<Omit<BuildingQueue, 'buildings' | 'totalCost'> & { buildings: ReadonlyArray<ResolversTypes['QueuedBuilding']>, totalCost: ResolversTypes['Cost'] }>;
  ClearQueueInput: ClearQueueInput;
  EnqueueBuildingInput: EnqueueBuildingInput;
  QueuedBuildingManipulationInput: QueuedBuildingManipulationInput;
  DequeueBuildingAtFieldInput: DequeueBuildingAtFieldInput;
  ITaskSettings: ResolversTypes['AutoBuildSettings'] | ResolversTypes['AutoAdventureSettings'] | ResolversTypes['AutoUnitsSettings'] | ResolversTypes['AutoPartySettings'];
  GeneralSettings: ResolverTypeWrapper<GeneralSettings>;
  GeneralVillageSettings: ResolverTypeWrapper<GeneralVillageSettings>;
  AutoStorageOptionSettings: ResolverTypeWrapper<AutoStorageOptionSettings>;
  AutoStorageSettings: ResolverTypeWrapper<AutoStorageSettings>;
  AutoBuildSettings: ResolverTypeWrapper<AutoBuildSettings>;
  AdventureCriteria: AdventureCriteria;
  AutoAdventureSettings: ResolverTypeWrapper<AutoAdventureSettings>;
  HeroSettings: ResolverTypeWrapper<HeroSettings>;
  AutoUnitsUnitSettings: ResolverTypeWrapper<AutoUnitsUnitSettings>;
  AutoUnitsBuildingSettings: ResolverTypeWrapper<AutoUnitsBuildingSettings>;
  AutoUnitsSettings: ResolverTypeWrapper<AutoUnitsSettings>;
  PartyType: PartyType;
  AutoPartySettings: ResolverTypeWrapper<AutoPartySettings>;
  VillageSettings: ResolverTypeWrapper<VillageSettings>;
  UpdateGeneralVillageSettingsInput: UpdateGeneralVillageSettingsInput;
  UpdateAutoBuildVillageSettingsInput: UpdateAutoBuildVillageSettingsInput;
  UpdateAutoAdventureSettingsInput: UpdateAutoAdventureSettingsInput;
  UpdateGeneralSettingsInput: UpdateGeneralSettingsInput;
  UpdateAutoUnitsUnitSettingsInput: UpdateAutoUnitsUnitSettingsInput;
  UpdateAutoUnitsBuildingSettingsInput: UpdateAutoUnitsBuildingSettingsInput;
  UpdateAutoUnitsSettingsInput: UpdateAutoUnitsSettingsInput;
  UpdateAutoPartySettingsInput: UpdateAutoPartySettingsInput;
  ResetVillageInput: ResetVillageInput;
  SettingsType: SettingsType;
  VillageSettingsType: VillageSettingsType;
  UnitInfo: ResolverTypeWrapper<UnitInfo>;
  VillageCapacity: ResolverTypeWrapper<VillageCapacity>;
  VillageResources: ResolverTypeWrapper<Omit<VillageResources, 'amount' | 'production'> & { amount: ResolversTypes['Resources'], production: ResolversTypes['Resources'] }>;
  Village: ResolverTypeWrapper<Omit<Village, 'resources'> & { resources: ResolversTypes['VillageResources'] }>;
  VillageCrannyCapacity: ResolverTypeWrapper<VillageCrannyCapacity>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  UserAccount: UserAccount;
  Query: {};
  Int: Scalars['Int'];
  Mutation: {};
  ID: Scalars['ID'];
  BuildingSpotLevel: BuildingSpotLevel;
  BuildingSpot: BuildingSpot;
  ResourceFields: ResourceFields;
  BuildingSpots: BuildingSpots;
  AvailableNewBuildingsInput: AvailableNewBuildingsInput;
  AvailableNewBuilding: AvailableNewBuilding;
  Subscription: {};
  BuildingInProgress: BuildingInProgressModel;
  BotState: BotState;
  CreateUserAccountInput: CreateUserAccountInput;
  UpdateUserAccountInput: UpdateUserAccountInput;
  HeroState: HeroState;
  HeroInformation: HeroModel;
  TextLogEntryContent: TextLogEntryContentModel;
  AutoBuildLogEntryContent: AutoBuildLogEntryContentModel;
  AutoUnitsLogEntryContent: AutoUnitsLogEntryContentModel;
  LogEntryContent: ResolversParentTypes['TextLogEntryContent'] | ResolversParentTypes['AutoBuildLogEntryContent'] | ResolversParentTypes['AutoUnitsLogEntryContent'];
  LogEntry: LogEntryModel;
  Timestamp: Timestamp;
  Resources: ResourcesModel;
  Cost: Omit<Cost, 'resources'> & { resources: ResolversParentTypes['Resources'] };
  Coords: Coords;
  Duration: Duration;
  CoolDown: CoolDown;
  CoolDownInput: CoolDownInput;
  DurationInput: DurationInput;
  TimestampInput: TimestampInput;
  TaskType: TaskType;
  VillageTaskType: VillageTaskType;
  QueuedBuilding: Omit<QueuedBuilding, 'cost'> & { cost: ResolversParentTypes['Cost'] };
  BuildingQueue: Omit<BuildingQueue, 'buildings' | 'totalCost'> & { buildings: ReadonlyArray<ResolversParentTypes['QueuedBuilding']>, totalCost: ResolversParentTypes['Cost'] };
  ClearQueueInput: ClearQueueInput;
  EnqueueBuildingInput: EnqueueBuildingInput;
  QueuedBuildingManipulationInput: QueuedBuildingManipulationInput;
  DequeueBuildingAtFieldInput: DequeueBuildingAtFieldInput;
  ITaskSettings: ResolversParentTypes['AutoBuildSettings'] | ResolversParentTypes['AutoAdventureSettings'] | ResolversParentTypes['AutoUnitsSettings'] | ResolversParentTypes['AutoPartySettings'];
  GeneralSettings: GeneralSettings;
  GeneralVillageSettings: GeneralVillageSettings;
  AutoStorageOptionSettings: AutoStorageOptionSettings;
  AutoStorageSettings: AutoStorageSettings;
  AutoBuildSettings: AutoBuildSettings;
  AdventureCriteria: AdventureCriteria;
  AutoAdventureSettings: AutoAdventureSettings;
  HeroSettings: HeroSettings;
  AutoUnitsUnitSettings: AutoUnitsUnitSettings;
  AutoUnitsBuildingSettings: AutoUnitsBuildingSettings;
  AutoUnitsSettings: AutoUnitsSettings;
  PartyType: PartyType;
  AutoPartySettings: AutoPartySettings;
  VillageSettings: VillageSettings;
  UpdateGeneralVillageSettingsInput: UpdateGeneralVillageSettingsInput;
  UpdateAutoBuildVillageSettingsInput: UpdateAutoBuildVillageSettingsInput;
  UpdateAutoAdventureSettingsInput: UpdateAutoAdventureSettingsInput;
  UpdateGeneralSettingsInput: UpdateGeneralSettingsInput;
  UpdateAutoUnitsUnitSettingsInput: UpdateAutoUnitsUnitSettingsInput;
  UpdateAutoUnitsBuildingSettingsInput: UpdateAutoUnitsBuildingSettingsInput;
  UpdateAutoUnitsSettingsInput: UpdateAutoUnitsSettingsInput;
  UpdateAutoPartySettingsInput: UpdateAutoPartySettingsInput;
  ResetVillageInput: ResetVillageInput;
  SettingsType: SettingsType;
  VillageSettingsType: VillageSettingsType;
  UnitInfo: UnitInfo;
  VillageCapacity: VillageCapacity;
  VillageResources: Omit<VillageResources, 'amount' | 'production'> & { amount: ResolversParentTypes['Resources'], production: ResolversParentTypes['Resources'] };
  Village: Omit<Village, 'resources'> & { resources: ResolversParentTypes['VillageResources'] };
  VillageCrannyCapacity: VillageCrannyCapacity;
};

export type UserAccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAccount'] = ResolversParentTypes['UserAccount']> = {
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  server: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  account: Resolver<Maybe<ResolversTypes['UserAccount']>, ParentType, ContextType, RequireFields<QueryAccountArgs, 'accountId'>>;
  accounts: Resolver<ReadonlyArray<ResolversTypes['UserAccount']>, ParentType, ContextType>;
  activeVillageId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  autoBuildSettings: Resolver<ResolversTypes['AutoBuildSettings'], ParentType, ContextType, RequireFields<QueryAutoBuildSettingsArgs, 'villageId'>>;
  autoPartySettings: Resolver<ResolversTypes['AutoPartySettings'], ParentType, ContextType, RequireFields<QueryAutoPartySettingsArgs, 'villageId'>>;
  autoUnitsSettings: Resolver<ResolversTypes['AutoUnitsSettings'], ParentType, ContextType, RequireFields<QueryAutoUnitsSettingsArgs, 'villageId'>>;
  availableNewBuildings: Resolver<ReadonlyArray<ResolversTypes['AvailableNewBuilding']>, ParentType, ContextType, RequireFields<QueryAvailableNewBuildingsArgs, 'input'>>;
  botState: Resolver<ResolversTypes['BotState'], ParentType, ContextType>;
  buildingQueue: Resolver<ResolversTypes['BuildingQueue'], ParentType, ContextType, RequireFields<QueryBuildingQueueArgs, 'villageId'>>;
  buildingSpots: Resolver<ResolversTypes['BuildingSpots'], ParentType, ContextType, RequireFields<QueryBuildingSpotsArgs, 'villageId'>>;
  buildingsInProgress: Resolver<ReadonlyArray<ResolversTypes['BuildingInProgress']>, ParentType, ContextType, RequireFields<QueryBuildingsInProgressArgs, 'villageId'>>;
  crannyCapacity: Resolver<ResolversTypes['VillageCrannyCapacity'], ParentType, ContextType, RequireFields<QueryCrannyCapacityArgs, 'villageId'>>;
  currentAccount: Resolver<ResolversTypes['UserAccount'], ParentType, ContextType>;
  generalSettings: Resolver<ResolversTypes['GeneralSettings'], ParentType, ContextType>;
  generalVillageSettings: Resolver<ResolversTypes['GeneralVillageSettings'], ParentType, ContextType, RequireFields<QueryGeneralVillageSettingsArgs, 'villageId'>>;
  hero: Resolver<ResolversTypes['HeroSettings'], ParentType, ContextType>;
  heroInformation: Resolver<ResolversTypes['HeroInformation'], ParentType, ContextType>;
  lastSignedAccountId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  logsEntries: Resolver<ReadonlyArray<ResolversTypes['LogEntry']>, ParentType, ContextType>;
  maxBuildingLevel: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<QueryMaxBuildingLevelArgs, 'buildingType'>>;
  nextTaskExecution: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType, RequireFields<QueryNextTaskExecutionArgs, 'task'>>;
  nextTasksExecution: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  nextVillageTaskExecution: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType, RequireFields<QueryNextVillageTaskExecutionArgs, 'villageId' | 'task'>>;
  unitInfo: Resolver<ResolversTypes['UnitInfo'], ParentType, ContextType, RequireFields<QueryUnitInfoArgs, 'index'>>;
  village: Resolver<Maybe<ResolversTypes['Village']>, ParentType, ContextType, RequireFields<QueryVillageArgs, 'villageId'>>;
  villages: Resolver<ReadonlyArray<ResolversTypes['Village']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  clearQueue: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationClearQueueArgs, 'villageId'>>;
  createAccount: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationCreateAccountArgs, 'account'>>;
  deleteAccount: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteAccountArgs, 'accountId'>>;
  dequeueBuilding: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDequeueBuildingArgs, 'input'>>;
  dequeueBuildingAtField: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDequeueBuildingAtFieldArgs, 'input'>>;
  enqueueBuilding: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationEnqueueBuildingArgs, 'input'>>;
  moveQueuedBuildingAsHighAsPossible: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationMoveQueuedBuildingAsHighAsPossibleArgs, 'villageId' | 'queueId'>>;
  moveQueuedBuildingDown: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationMoveQueuedBuildingDownArgs, 'input'>>;
  moveQueuedBuildingUp: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationMoveQueuedBuildingUpArgs, 'input'>>;
  resetNextTaskExecution: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationResetNextTaskExecutionArgs, 'task'>>;
  resetNextVillageTaskExecution: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationResetNextVillageTaskExecutionArgs, 'villageId' | 'task'>>;
  resetSettings: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationResetSettingsArgs, 'type'>>;
  resetVillageSettings: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationResetVillageSettingsArgs, 'villageId' | 'type'>>;
  setNextTaskExecution: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSetNextTaskExecutionArgs, 'task' | 'delay'>>;
  setNextVillageTaskExecution: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSetNextVillageTaskExecutionArgs, 'villageId' | 'task' | 'delay'>>;
  signIn: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSignInArgs, 'accountId'>>;
  signOut: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  startBot: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  stopBot: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  updateAccount: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateAccountArgs, 'account'>>;
  updateAutoAdventureSettings: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateAutoAdventureSettingsArgs, 'settings'>>;
  updateAutoBuildVillageSettings: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateAutoBuildVillageSettingsArgs, 'settings'>>;
  updateAutoPartySettings: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateAutoPartySettingsArgs, 'settings'>>;
  updateAutoUnitsBuildingSettings: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateAutoUnitsBuildingSettingsArgs, 'settings'>>;
  updateAutoUnitsSettings: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateAutoUnitsSettingsArgs, 'settings'>>;
  updateAutoUnitsUnitSettings: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateAutoUnitsUnitSettingsArgs, 'settings'>>;
  updateGeneralSettings: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateGeneralSettingsArgs, 'settings'>>;
  updateGeneralVillageSettings: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateGeneralVillageSettingsArgs, 'settings'>>;
};

export type BuildingSpotLevelResolvers<ContextType = any, ParentType extends ResolversParentTypes['BuildingSpotLevel'] = ResolversParentTypes['BuildingSpotLevel']> = {
  actual: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ongoing: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  queued: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  max: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type BuildingSpotResolvers<ContextType = any, ParentType extends ResolversParentTypes['BuildingSpot'] = ResolversParentTypes['BuildingSpot']> = {
  fieldId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  level: Resolver<ResolversTypes['BuildingSpotLevel'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type ResourceFieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResourceFields'] = ResolversParentTypes['ResourceFields']> = {
  wood: Resolver<ReadonlyArray<ResolversTypes['BuildingSpot']>, ParentType, ContextType>;
  clay: Resolver<ReadonlyArray<ResolversTypes['BuildingSpot']>, ParentType, ContextType>;
  iron: Resolver<ReadonlyArray<ResolversTypes['BuildingSpot']>, ParentType, ContextType>;
  crop: Resolver<ReadonlyArray<ResolversTypes['BuildingSpot']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type BuildingSpotsResolvers<ContextType = any, ParentType extends ResolversParentTypes['BuildingSpots'] = ResolversParentTypes['BuildingSpots']> = {
  infrastructure: Resolver<ReadonlyArray<ResolversTypes['BuildingSpot']>, ParentType, ContextType>;
  resources: Resolver<ResolversTypes['ResourceFields'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type AvailableNewBuildingResolvers<ContextType = any, ParentType extends ResolversParentTypes['AvailableNewBuilding'] = ResolversParentTypes['AvailableNewBuilding']> = {
  type: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  activeVillageIdChanged: SubscriptionResolver<ResolversTypes['Int'], "activeVillageIdChanged", ParentType, ContextType>;
  autoAdventureSettingsChanged: SubscriptionResolver<ResolversTypes['AutoAdventureSettings'], "autoAdventureSettingsChanged", ParentType, ContextType>;
  autoBuildSettingsChanged: SubscriptionResolver<ResolversTypes['AutoBuildSettings'], "autoBuildSettingsChanged", ParentType, ContextType, RequireFields<SubscriptionAutoBuildSettingsChangedArgs, 'villageId'>>;
  autoPartySettingsChanged: SubscriptionResolver<ResolversTypes['AutoPartySettings'], "autoPartySettingsChanged", ParentType, ContextType, RequireFields<SubscriptionAutoPartySettingsChangedArgs, 'villageId'>>;
  autoUnitsSettingsChanged: SubscriptionResolver<ResolversTypes['AutoUnitsSettings'], "autoUnitsSettingsChanged", ParentType, ContextType, RequireFields<SubscriptionAutoUnitsSettingsChangedArgs, 'villageId'>>;
  buildingsUpdated: SubscriptionResolver<ResolversTypes['Boolean'], "buildingsUpdated", ParentType, ContextType, RequireFields<SubscriptionBuildingsUpdatedArgs, 'villageId'>>;
  crannyCapacityChanged: SubscriptionResolver<ResolversTypes['Boolean'], "crannyCapacityChanged", ParentType, ContextType, RequireFields<SubscriptionCrannyCapacityChangedArgs, 'villageId'>>;
  generalSettingsChanged: SubscriptionResolver<ResolversTypes['GeneralSettings'], "generalSettingsChanged", ParentType, ContextType>;
  generalVillageSettingsChanged: SubscriptionResolver<ResolversTypes['GeneralVillageSettings'], "generalVillageSettingsChanged", ParentType, ContextType, RequireFields<SubscriptionGeneralVillageSettingsChangedArgs, 'villageId'>>;
  heroInformationUpdated: SubscriptionResolver<ResolversTypes['HeroInformation'], "heroInformationUpdated", ParentType, ContextType>;
  nextTaskExecutionChanged: SubscriptionResolver<ResolversTypes['Timestamp'], "nextTaskExecutionChanged", ParentType, ContextType, RequireFields<SubscriptionNextTaskExecutionChangedArgs, 'task'>>;
  nextTasksExecutionChanged: SubscriptionResolver<ResolversTypes['Timestamp'], "nextTasksExecutionChanged", ParentType, ContextType>;
  nextVillageTaskExecutionChanged: SubscriptionResolver<ResolversTypes['Timestamp'], "nextVillageTaskExecutionChanged", ParentType, ContextType, RequireFields<SubscriptionNextVillageTaskExecutionChangedArgs, 'villageId' | 'task'>>;
  onBotRunningChanged: SubscriptionResolver<ResolversTypes['Boolean'], "onBotRunningChanged", ParentType, ContextType>;
  onLogEntryAdded: SubscriptionResolver<ResolversTypes['LogEntry'], "onLogEntryAdded", ParentType, ContextType>;
  onQueueUpdated: SubscriptionResolver<ResolversTypes['Boolean'], "onQueueUpdated", ParentType, ContextType, RequireFields<SubscriptionOnQueueUpdatedArgs, 'villageId'>>;
  updateVillage: SubscriptionResolver<ResolversTypes['Boolean'], "updateVillage", ParentType, ContextType>;
  updateVillages: SubscriptionResolver<ResolversTypes['Boolean'], "updateVillages", ParentType, ContextType>;
};

export type BuildingInProgressResolvers<ContextType = any, ParentType extends ResolversParentTypes['BuildingInProgress'] = ResolversParentTypes['BuildingInProgress']> = {
  level: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  finishedAt: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  fieldId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type HeroInformationResolvers<ContextType = any, ParentType extends ResolversParentTypes['HeroInformation'] = ResolversParentTypes['HeroInformation']> = {
  health: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  state: Resolver<ResolversTypes['HeroState'], ParentType, ContextType>;
  village: Resolver<Maybe<ResolversTypes['Village']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type TextLogEntryContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['TextLogEntryContent'] = ResolversParentTypes['TextLogEntryContent']> = {
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type AutoBuildLogEntryContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['AutoBuildLogEntryContent'] = ResolversParentTypes['AutoBuildLogEntryContent']> = {
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  level: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  fieldId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type AutoUnitsLogEntryContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['AutoUnitsLogEntryContent'] = ResolversParentTypes['AutoUnitsLogEntryContent']> = {
  amount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tribe: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  unitName: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type LogEntryContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogEntryContent'] = ResolversParentTypes['LogEntryContent']> = {
  __resolveType: TypeResolveFn<'TextLogEntryContent' | 'AutoBuildLogEntryContent' | 'AutoUnitsLogEntryContent', ParentType, ContextType>;
};

export type LogEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogEntry'] = ResolversParentTypes['LogEntry']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  village: Resolver<Maybe<ResolversTypes['Village']>, ParentType, ContextType>;
  content: Resolver<ResolversTypes['LogEntryContent'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type TimestampResolvers<ContextType = any, ParentType extends ResolversParentTypes['Timestamp'] = ResolversParentTypes['Timestamp']> = {
  totalSeconds: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type ResourcesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Resources'] = ResolversParentTypes['Resources']> = {
  wood: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  clay: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  iron: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  crop: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  freeCrop: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type CostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cost'] = ResolversParentTypes['Cost']> = {
  resources: Resolver<ResolversTypes['Resources'], ParentType, ContextType>;
  buildTime: Resolver<ResolversTypes['Duration'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type CoordsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Coords'] = ResolversParentTypes['Coords']> = {
  x: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  y: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type DurationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Duration'] = ResolversParentTypes['Duration']> = {
  days: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hours: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  minutes: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  seconds: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type CoolDownResolvers<ContextType = any, ParentType extends ResolversParentTypes['CoolDown'] = ResolversParentTypes['CoolDown']> = {
  min: Resolver<ResolversTypes['Duration'], ParentType, ContextType>;
  max: Resolver<ResolversTypes['Duration'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type QueuedBuildingResolvers<ContextType = any, ParentType extends ResolversParentTypes['QueuedBuilding'] = ResolversParentTypes['QueuedBuilding']> = {
  canMoveDown: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canMoveUp: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  level: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  queueId: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  cost: Resolver<ResolversTypes['Cost'], ParentType, ContextType>;
  fieldId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type BuildingQueueResolvers<ContextType = any, ParentType extends ResolversParentTypes['BuildingQueue'] = ResolversParentTypes['BuildingQueue']> = {
  buildings: Resolver<ReadonlyArray<ResolversTypes['QueuedBuilding']>, ParentType, ContextType>;
  totalCost: Resolver<ResolversTypes['Cost'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type ITaskSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ITaskSettings'] = ResolversParentTypes['ITaskSettings']> = {
  __resolveType: TypeResolveFn<'AutoBuildSettings' | 'AutoAdventureSettings' | 'AutoUnitsSettings' | 'AutoPartySettings', ParentType, ContextType>;
  allow: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  coolDown: Resolver<ResolversTypes['CoolDown'], ParentType, ContextType>;
};

export type GeneralSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeneralSettings'] = ResolversParentTypes['GeneralSettings']> = {
  allowTasks: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  autoStart: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  autoBuild: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  autoUnits: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  autoParty: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type GeneralVillageSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeneralVillageSettings'] = ResolversParentTypes['GeneralVillageSettings']> = {
  allowTasks: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type AutoStorageOptionSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AutoStorageOptionSettings'] = ResolversParentTypes['AutoStorageOptionSettings']> = {
  allow: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  overflowLevel: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type AutoStorageSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AutoStorageSettings'] = ResolversParentTypes['AutoStorageSettings']> = {
  allowFreeSpots: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  granary: Resolver<ResolversTypes['AutoStorageOptionSettings'], ParentType, ContextType>;
  warehouse: Resolver<ResolversTypes['AutoStorageOptionSettings'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type AutoBuildSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AutoBuildSettings'] = ResolversParentTypes['AutoBuildSettings']> = {
  allow: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  coolDown: Resolver<ResolversTypes['CoolDown'], ParentType, ContextType>;
  autoCropFields: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  minCrop: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  autoStorage: Resolver<ResolversTypes['AutoStorageSettings'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type AutoAdventureSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AutoAdventureSettings'] = ResolversParentTypes['AutoAdventureSettings']> = {
  allow: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  coolDown: Resolver<ResolversTypes['CoolDown'], ParentType, ContextType>;
  adventureCriteria: Resolver<ResolversTypes['AdventureCriteria'], ParentType, ContextType>;
  preferHard: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  normalMinHealth: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hardMinHealth: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxTravelTime: Resolver<ResolversTypes['Duration'], ParentType, ContextType>;
  preferredVillageId: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type HeroSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['HeroSettings'] = ResolversParentTypes['HeroSettings']> = {
  autoAdventure: Resolver<ResolversTypes['AutoAdventureSettings'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type AutoUnitsUnitSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AutoUnitsUnitSettings'] = ResolversParentTypes['AutoUnitsUnitSettings']> = {
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  autoBuild: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  trainForever: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  targetAmount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type AutoUnitsBuildingSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AutoUnitsBuildingSettings'] = ResolversParentTypes['AutoUnitsBuildingSettings']> = {
  allow: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  maxBuildTime: Resolver<ResolversTypes['Duration'], ParentType, ContextType>;
  units: Resolver<ReadonlyArray<ResolversTypes['AutoUnitsUnitSettings']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type AutoUnitsSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AutoUnitsSettings'] = ResolversParentTypes['AutoUnitsSettings']> = {
  allow: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  coolDown: Resolver<ResolversTypes['CoolDown'], ParentType, ContextType>;
  minCrop: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  barracks: Resolver<ResolversTypes['AutoUnitsBuildingSettings'], ParentType, ContextType>;
  stable: Resolver<ResolversTypes['AutoUnitsBuildingSettings'], ParentType, ContextType>;
  workshop: Resolver<ResolversTypes['AutoUnitsBuildingSettings'], ParentType, ContextType>;
  residence: Resolver<ResolversTypes['AutoUnitsBuildingSettings'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type AutoPartySettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AutoPartySettings'] = ResolversParentTypes['AutoPartySettings']> = {
  coolDown: Resolver<ResolversTypes['CoolDown'], ParentType, ContextType>;
  allow: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  minCulturePoints: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  partyType: Resolver<ResolversTypes['PartyType'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type VillageSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['VillageSettings'] = ResolversParentTypes['VillageSettings']> = {
  general: Resolver<ResolversTypes['GeneralVillageSettings'], ParentType, ContextType>;
  autoBuild: Resolver<ResolversTypes['AutoBuildSettings'], ParentType, ContextType>;
  autoUnits: Resolver<ResolversTypes['AutoUnitsSettings'], ParentType, ContextType>;
  autoParty: Resolver<ResolversTypes['AutoPartySettings'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type UnitInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnitInfo'] = ResolversParentTypes['UnitInfo']> = {
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type VillageCapacityResolvers<ContextType = any, ParentType extends ResolversParentTypes['VillageCapacity'] = ResolversParentTypes['VillageCapacity']> = {
  granary: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  warehouse: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type VillageResourcesResolvers<ContextType = any, ParentType extends ResolversParentTypes['VillageResources'] = ResolversParentTypes['VillageResources']> = {
  amount: Resolver<ResolversTypes['Resources'], ParentType, ContextType>;
  capacity: Resolver<ResolversTypes['VillageCapacity'], ParentType, ContextType>;
  production: Resolver<ResolversTypes['Resources'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type VillageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Village'] = ResolversParentTypes['Village']> = {
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  coords: Resolver<ResolversTypes['Coords'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resources: Resolver<ResolversTypes['VillageResources'], ParentType, ContextType>;
  isCapital: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type VillageCrannyCapacityResolvers<ContextType = any, ParentType extends ResolversParentTypes['VillageCrannyCapacity'] = ResolversParentTypes['VillageCrannyCapacity']> = {
  actual: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ongoing: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  UserAccount: UserAccountResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  Mutation: MutationResolvers<ContextType>;
  BuildingSpotLevel: BuildingSpotLevelResolvers<ContextType>;
  BuildingSpot: BuildingSpotResolvers<ContextType>;
  ResourceFields: ResourceFieldsResolvers<ContextType>;
  BuildingSpots: BuildingSpotsResolvers<ContextType>;
  AvailableNewBuilding: AvailableNewBuildingResolvers<ContextType>;
  Subscription: SubscriptionResolvers<ContextType>;
  BuildingInProgress: BuildingInProgressResolvers<ContextType>;
  HeroInformation: HeroInformationResolvers<ContextType>;
  TextLogEntryContent: TextLogEntryContentResolvers<ContextType>;
  AutoBuildLogEntryContent: AutoBuildLogEntryContentResolvers<ContextType>;
  AutoUnitsLogEntryContent: AutoUnitsLogEntryContentResolvers<ContextType>;
  LogEntryContent: LogEntryContentResolvers;
  LogEntry: LogEntryResolvers<ContextType>;
  Timestamp: TimestampResolvers<ContextType>;
  Resources: ResourcesResolvers<ContextType>;
  Cost: CostResolvers<ContextType>;
  Coords: CoordsResolvers<ContextType>;
  Duration: DurationResolvers<ContextType>;
  CoolDown: CoolDownResolvers<ContextType>;
  QueuedBuilding: QueuedBuildingResolvers<ContextType>;
  BuildingQueue: BuildingQueueResolvers<ContextType>;
  ITaskSettings: ITaskSettingsResolvers;
  GeneralSettings: GeneralSettingsResolvers<ContextType>;
  GeneralVillageSettings: GeneralVillageSettingsResolvers<ContextType>;
  AutoStorageOptionSettings: AutoStorageOptionSettingsResolvers<ContextType>;
  AutoStorageSettings: AutoStorageSettingsResolvers<ContextType>;
  AutoBuildSettings: AutoBuildSettingsResolvers<ContextType>;
  AutoAdventureSettings: AutoAdventureSettingsResolvers<ContextType>;
  HeroSettings: HeroSettingsResolvers<ContextType>;
  AutoUnitsUnitSettings: AutoUnitsUnitSettingsResolvers<ContextType>;
  AutoUnitsBuildingSettings: AutoUnitsBuildingSettingsResolvers<ContextType>;
  AutoUnitsSettings: AutoUnitsSettingsResolvers<ContextType>;
  AutoPartySettings: AutoPartySettingsResolvers<ContextType>;
  VillageSettings: VillageSettingsResolvers<ContextType>;
  UnitInfo: UnitInfoResolvers<ContextType>;
  VillageCapacity: VillageCapacityResolvers<ContextType>;
  VillageResources: VillageResourcesResolvers<ContextType>;
  Village: VillageResolvers<ContextType>;
  VillageCrannyCapacity: VillageCrannyCapacityResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
