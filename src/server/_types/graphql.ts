import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | undefined;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Date: Date,
};

export type IAutoAdventureSettings = IITaskSettings & {
  readonly __typename?: 'AutoAdventureSettings',
  readonly allow: Scalars['Boolean'],
  readonly coolDown: ICoolDown,
  readonly adventureCriteria: Scalars['Int'],
  readonly preferHard: Scalars['Boolean'],
  readonly normalMinHealth: Scalars['Int'],
  readonly hardMinHealth: Scalars['Int'],
  readonly maxTravelTime: Scalars['Int'],
  readonly preferredVillageId?: Maybe<Scalars['Int']>,
};

export type IAutoAdventureSettingsInput = {
  readonly allow: Scalars['Boolean'],
  readonly coolDown: ICoolDownInput,
  readonly adventureCriteria: Scalars['Int'],
  readonly preferHard: Scalars['Boolean'],
  readonly normalMinHealth: Scalars['Int'],
  readonly hardMinHealth: Scalars['Int'],
  readonly maxTravelTime: Scalars['Int'],
  readonly preferredVillageId?: Maybe<Scalars['Int']>,
};

export type IAutoBuildLogEntryContent = {
  readonly __typename?: 'AutoBuildLogEntryContent',
  readonly autoBuild: IAutoBuildLogEntryContentPayload,
};

export type IAutoBuildLogEntryContentPayload = {
  readonly __typename?: 'AutoBuildLogEntryContentPayload',
  readonly name: Scalars['String'],
  readonly type: Scalars['Int'],
  readonly level: Scalars['Int'],
  readonly fieldId: Scalars['Int'],
};

export type IAutoBuildSettings = IITaskSettings & {
  readonly __typename?: 'AutoBuildSettings',
  readonly allow: Scalars['Boolean'],
  readonly coolDown: ICoolDown,
  readonly autoCropFields: Scalars['Boolean'],
  readonly minCrop: Scalars['Int'],
};

export type IAutoBuildVillageSettingsInput = {
  readonly allow: Scalars['Boolean'],
  readonly coolDown: ICoolDownInput,
  readonly autoCropFields: Scalars['Boolean'],
  readonly minCrop: Scalars['Int'],
};

export type IAutoUnitsLogEntryContent = {
  readonly __typename?: 'AutoUnitsLogEntryContent',
  readonly autoUnits: IAutoUnitsLogEntryContentPayload,
};

export type IAutoUnitsLogEntryContentPayload = {
  readonly __typename?: 'AutoUnitsLogEntryContentPayload',
  readonly amount: Scalars['Int'],
  readonly index: Scalars['Int'],
  readonly tribe: Scalars['Int'],
  readonly unitName: Scalars['String'],
};

export type IAvailableNewBuilding = {
  readonly __typename?: 'AvailableNewBuilding',
  readonly type: Scalars['Int'],
  readonly name: Scalars['String'],
};

export type IAvailableNewBuildingsInput = {
  readonly fieldId: Scalars['Int'],
  readonly villageId: Scalars['Int'],
};

export enum IBotState {
  None = 'None',
  Pending = 'Pending',
  Running = 'Running',
  Stopping = 'Stopping',
  Paused = 'Paused'
}

export type IBuildingInProgress = {
  readonly __typename?: 'BuildingInProgress',
  readonly level: Scalars['Int'],
  readonly finishedAt: Scalars['Date'],
  readonly name: Scalars['String'],
  readonly type: Scalars['Int'],
};

export type IBuildingQueue = {
  readonly __typename?: 'BuildingQueue',
  readonly buildings: ReadonlyArray<IQueuedBuilding>,
  readonly totalCost: ICost,
};

export type IBuildingSpot = {
  readonly __typename?: 'BuildingSpot',
  readonly fieldId: Scalars['Int'],
  readonly level: IBuildingSpotLevel,
  readonly name: Scalars['String'],
  readonly type: Scalars['Int'],
};

export type IBuildingSpotLevel = {
  readonly __typename?: 'BuildingSpotLevel',
  readonly actual: Scalars['Int'],
  readonly ongoing: Scalars['Int'],
  readonly queued: Scalars['Int'],
  readonly max: Scalars['Int'],
  readonly total: Scalars['Int'],
};

export type IBuildingSpots = {
  readonly __typename?: 'BuildingSpots',
  readonly infrastructure: ReadonlyArray<IBuildingSpot>,
  readonly resources: IResourceFields,
};

export type IClearQueueInput = {
  readonly villageId: Scalars['Int'],
};

export type ICoolDown = {
  readonly __typename?: 'CoolDown',
  readonly min: Scalars['Int'],
  readonly max: Scalars['Int'],
};

export type ICoolDownInput = {
  readonly min: Scalars['Int'],
  readonly max: Scalars['Int'],
};

export type ICoords = {
  readonly __typename?: 'Coords',
  readonly x: Scalars['Int'],
  readonly y: Scalars['Int'],
};

export type ICost = {
  readonly __typename?: 'Cost',
  readonly resources: IResources,
  readonly buildTime: Scalars['Int'],
};

export type ICreateUserAccountInput = {
  readonly username: Scalars['String'],
  readonly password: Scalars['String'],
  readonly server: Scalars['String'],
};


export type IDequeueBuildingAtFieldInput = {
  readonly deleteAll: Scalars['Boolean'],
  readonly fieldId: Scalars['Int'],
  readonly villageId: Scalars['Int'],
};

export type IEnqueueBuildingInput = {
  readonly fieldId: Scalars['Int'],
  readonly levels: Scalars['Int'],
  readonly type: Scalars['Int'],
  readonly villageId: Scalars['Int'],
};

export type IGeneralSettings = {
  readonly __typename?: 'GeneralSettings',
  readonly allowTasks: Scalars['Boolean'],
  readonly autoBuild: Scalars['Boolean'],
};

export type IGeneralSettingsInput = {
  readonly allowTasks: Scalars['Boolean'],
  readonly autoBuild: Scalars['Boolean'],
};

export type IGeneralVillageSettings = {
  readonly __typename?: 'GeneralVillageSettings',
  readonly allowTasks: Scalars['Boolean'],
};

export type IGeneralVillageSettingsInput = {
  readonly allowTasks: Scalars['Boolean'],
};

export type IHeroInformation = {
  readonly __typename?: 'HeroInformation',
  readonly health: Scalars['Int'],
  readonly state: IHeroState,
  readonly village?: Maybe<IVillage>,
};

export type IHeroSettings = {
  readonly __typename?: 'HeroSettings',
  readonly autoAdventure: IAutoAdventureSettings,
};

export enum IHeroState {
  Unknown = 'Unknown',
  InVillage = 'InVillage',
  Dead = 'Dead',
  Reviving = 'Reviving',
  OnAdventure = 'OnAdventure'
}

export type IITaskSettings = {
  readonly allow: Scalars['Boolean'],
  readonly coolDown: ICoolDown,
};

export type ILogEntry = {
  readonly __typename?: 'LogEntry',
  readonly id: Scalars['ID'],
  readonly timestamp: Scalars['Int'],
  readonly village?: Maybe<IVillage>,
  readonly content: ILogEntryContent,
};

export type ILogEntryContent = ITextLogEntryContent | IAutoBuildLogEntryContent | IAutoUnitsLogEntryContent;

export type IMutation = {
  readonly __typename?: 'Mutation',
  readonly createAccount?: Maybe<Scalars['ID']>,
  readonly updateAccount: Scalars['Boolean'],
  readonly deleteAccount: Scalars['Boolean'],
  readonly signIn?: Maybe<Scalars['Boolean']>,
  readonly signOut?: Maybe<Scalars['Boolean']>,
  readonly startBot: Scalars['Boolean'],
  readonly stopBot: Scalars['Boolean'],
  readonly clearQueue: Scalars['Boolean'],
  readonly dequeueBuilding: Scalars['Boolean'],
  readonly dequeueBuildingAtField: Scalars['Boolean'],
  readonly enqueueBuilding: Scalars['Boolean'],
  readonly moveQueuedBuildingDown: Scalars['Boolean'],
  readonly moveQueuedBuildingUp: Scalars['Boolean'],
  readonly updateGeneralSettings: Scalars['Boolean'],
  readonly updateAutoAdventureSettings: Scalars['Boolean'],
  readonly updateGeneralVillageSettings: Scalars['Boolean'],
  readonly updateAutoBuildVillageSettings: Scalars['Boolean'],
};


export type IMutationCreateAccountArgs = {
  account: ICreateUserAccountInput
};


export type IMutationUpdateAccountArgs = {
  account: IUpdateUserAccountInput
};


export type IMutationDeleteAccountArgs = {
  accountId: Scalars['ID']
};


export type IMutationSignInArgs = {
  accountId: Scalars['ID']
};


export type IMutationClearQueueArgs = {
  villageId: Scalars['Int']
};


export type IMutationDequeueBuildingArgs = {
  input: IQueuedBuildingManipulationInput
};


export type IMutationDequeueBuildingAtFieldArgs = {
  input: IDequeueBuildingAtFieldInput
};


export type IMutationEnqueueBuildingArgs = {
  input: IEnqueueBuildingInput
};


export type IMutationMoveQueuedBuildingDownArgs = {
  input: IQueuedBuildingManipulationInput
};


export type IMutationMoveQueuedBuildingUpArgs = {
  input: IQueuedBuildingManipulationInput
};


export type IMutationUpdateGeneralSettingsArgs = {
  input: IUpdateGeneralSettingsInput
};


export type IMutationUpdateAutoAdventureSettingsArgs = {
  input: IUpdateAutoAdventureSettingsInput
};


export type IMutationUpdateGeneralVillageSettingsArgs = {
  input: IUpdateGeneralVillageSettingsInput
};


export type IMutationUpdateAutoBuildVillageSettingsArgs = {
  input: IUpdateAutoBuildVillageSettingsInput
};

export type IQuery = {
  readonly __typename?: 'Query',
  readonly accounts: ReadonlyArray<IUserAccount>,
  readonly account?: Maybe<IUserAccount>,
  readonly currentAccount: IUserAccount,
  readonly availableNewBuildings: ReadonlyArray<IAvailableNewBuilding>,
  readonly buildingName: Scalars['String'],
  readonly buildingSpots: IBuildingSpots,
  readonly maxBuildingLevel: Scalars['Int'],
  readonly buildingsInProgress: ReadonlyArray<IBuildingInProgress>,
  readonly botState: IBotState,
  readonly heroInformation: IHeroInformation,
  readonly logsEntries: ReadonlyArray<ILogEntry>,
  readonly buildingQueue: IBuildingQueue,
  readonly generalSettings: IGeneralSettings,
  readonly hero: IHeroSettings,
  readonly villageSettings: IVillageSettings,
  readonly village?: Maybe<IVillage>,
  readonly villages: ReadonlyArray<IVillage>,
};


export type IQueryAccountArgs = {
  accountId: Scalars['ID']
};


export type IQueryAvailableNewBuildingsArgs = {
  input: IAvailableNewBuildingsInput
};


export type IQueryBuildingNameArgs = {
  buildingType: Scalars['Int']
};


export type IQueryBuildingSpotsArgs = {
  villageId: Scalars['Int']
};


export type IQueryMaxBuildingLevelArgs = {
  buildingType: Scalars['Int']
};


export type IQueryBuildingsInProgressArgs = {
  villageId: Scalars['Int']
};


export type IQueryBuildingQueueArgs = {
  villageId: Scalars['Int']
};


export type IQueryVillageSettingsArgs = {
  villageId: Scalars['Int']
};


export type IQueryVillageArgs = {
  villageId: Scalars['Int']
};

export type IQueuedBuilding = {
  readonly __typename?: 'QueuedBuilding',
  readonly canMoveDown: Scalars['Boolean'],
  readonly canMoveUp: Scalars['Boolean'],
  readonly level: Scalars['Int'],
  readonly name: Scalars['String'],
  readonly type: Scalars['Int'],
  readonly queueId: Scalars['ID'],
  readonly cost: ICost,
};

export type IQueuedBuildingManipulationInput = {
  readonly queueId: Scalars['ID'],
  readonly villageId: Scalars['Int'],
};

export type IResourceFields = {
  readonly __typename?: 'ResourceFields',
  readonly wood: ReadonlyArray<IBuildingSpot>,
  readonly clay: ReadonlyArray<IBuildingSpot>,
  readonly iron: ReadonlyArray<IBuildingSpot>,
  readonly crop: ReadonlyArray<IBuildingSpot>,
};

export type IResources = {
  readonly __typename?: 'Resources',
  readonly wood: Scalars['Int'],
  readonly clay: Scalars['Int'],
  readonly iron: Scalars['Int'],
  readonly crop: Scalars['Int'],
  readonly total: Scalars['Int'],
  readonly freeCrop: Scalars['Int'],
};

export type ISubscription = {
  readonly __typename?: 'Subscription',
  readonly buildingsUpdated: Scalars['Boolean'],
  readonly onBotRunningChanged: Scalars['Boolean'],
  readonly heroInformationUpdated: IHeroInformation,
  readonly onLogEntryAdded: ILogEntry,
  readonly onQueueUpdated: Scalars['Boolean'],
  readonly updateVillage: Scalars['Boolean'],
  readonly updateVillages: Scalars['Boolean'],
};


export type ISubscriptionBuildingsUpdatedArgs = {
  villageId: Scalars['Int']
};


export type ISubscriptionOnQueueUpdatedArgs = {
  villageId: Scalars['Int']
};

export type ITextLogEntryContent = {
  readonly __typename?: 'TextLogEntryContent',
  readonly text: ITextLogEntryContentPayload,
};

export type ITextLogEntryContentPayload = {
  readonly __typename?: 'TextLogEntryContentPayload',
  readonly message: Scalars['String'],
};

export type IUpdateAutoAdventureSettingsInput = {
  readonly settings: IAutoAdventureSettingsInput,
};

export type IUpdateAutoBuildVillageSettingsInput = {
  readonly villageId: Scalars['Int'],
  readonly settings: IAutoBuildVillageSettingsInput,
};

export type IUpdateGeneralSettingsInput = {
  readonly settings: IGeneralSettingsInput,
};

export type IUpdateGeneralVillageSettingsInput = {
  readonly villageId: Scalars['Int'],
  readonly settings: IGeneralVillageSettingsInput,
};

export type IUpdateUserAccountInput = {
  readonly id: Scalars['ID'],
  readonly username: Scalars['String'],
  readonly password: Scalars['String'],
  readonly server: Scalars['String'],
};

export type IUserAccount = {
  readonly __typename?: 'UserAccount',
  readonly id: Scalars['ID'],
  readonly username: Scalars['String'],
  readonly password: Scalars['String'],
  readonly server: Scalars['String'],
};

export type IVillage = {
  readonly __typename?: 'Village',
  readonly id: Scalars['Int'],
  readonly coords: ICoords,
  readonly name: Scalars['String'],
  readonly resources: IVillageResources,
};

export type IVillageCapacity = {
  readonly __typename?: 'VillageCapacity',
  readonly granary: Scalars['Int'],
  readonly warehouse: Scalars['Int'],
};

export type IVillageResources = {
  readonly __typename?: 'VillageResources',
  readonly amount: IResources,
  readonly capacity: IVillageCapacity,
  readonly production: IResources,
};

export type IVillageSettings = {
  readonly __typename?: 'VillageSettings',
  readonly general: IGeneralVillageSettings,
  readonly autoBuild: IAutoBuildSettings,
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type IResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  UserAccount: ResolverTypeWrapper<IUserAccount>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  AvailableNewBuildingsInput: IAvailableNewBuildingsInput,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  AvailableNewBuilding: ResolverTypeWrapper<IAvailableNewBuilding>,
  BuildingSpots: ResolverTypeWrapper<IBuildingSpots>,
  BuildingSpot: ResolverTypeWrapper<IBuildingSpot>,
  BuildingSpotLevel: ResolverTypeWrapper<IBuildingSpotLevel>,
  ResourceFields: ResolverTypeWrapper<IResourceFields>,
  BuildingInProgress: ResolverTypeWrapper<IBuildingInProgress>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  BotState: IBotState,
  HeroInformation: ResolverTypeWrapper<IHeroInformation>,
  HeroState: IHeroState,
  Village: ResolverTypeWrapper<IVillage>,
  Coords: ResolverTypeWrapper<ICoords>,
  VillageResources: ResolverTypeWrapper<IVillageResources>,
  Resources: ResolverTypeWrapper<IResources>,
  VillageCapacity: ResolverTypeWrapper<IVillageCapacity>,
  LogEntry: ResolverTypeWrapper<Omit<ILogEntry, 'content'> & { content: IResolversTypes['LogEntryContent'] }>,
  LogEntryContent: IResolversTypes['TextLogEntryContent'] | IResolversTypes['AutoBuildLogEntryContent'] | IResolversTypes['AutoUnitsLogEntryContent'],
  TextLogEntryContent: ResolverTypeWrapper<ITextLogEntryContent>,
  TextLogEntryContentPayload: ResolverTypeWrapper<ITextLogEntryContentPayload>,
  AutoBuildLogEntryContent: ResolverTypeWrapper<IAutoBuildLogEntryContent>,
  AutoBuildLogEntryContentPayload: ResolverTypeWrapper<IAutoBuildLogEntryContentPayload>,
  AutoUnitsLogEntryContent: ResolverTypeWrapper<IAutoUnitsLogEntryContent>,
  AutoUnitsLogEntryContentPayload: ResolverTypeWrapper<IAutoUnitsLogEntryContentPayload>,
  BuildingQueue: ResolverTypeWrapper<IBuildingQueue>,
  QueuedBuilding: ResolverTypeWrapper<IQueuedBuilding>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Cost: ResolverTypeWrapper<ICost>,
  GeneralSettings: ResolverTypeWrapper<IGeneralSettings>,
  HeroSettings: ResolverTypeWrapper<IHeroSettings>,
  AutoAdventureSettings: ResolverTypeWrapper<IAutoAdventureSettings>,
  ITaskSettings: ResolverTypeWrapper<IITaskSettings>,
  CoolDown: ResolverTypeWrapper<ICoolDown>,
  VillageSettings: ResolverTypeWrapper<IVillageSettings>,
  GeneralVillageSettings: ResolverTypeWrapper<IGeneralVillageSettings>,
  AutoBuildSettings: ResolverTypeWrapper<IAutoBuildSettings>,
  Mutation: ResolverTypeWrapper<{}>,
  CreateUserAccountInput: ICreateUserAccountInput,
  UpdateUserAccountInput: IUpdateUserAccountInput,
  QueuedBuildingManipulationInput: IQueuedBuildingManipulationInput,
  DequeueBuildingAtFieldInput: IDequeueBuildingAtFieldInput,
  EnqueueBuildingInput: IEnqueueBuildingInput,
  UpdateGeneralSettingsInput: IUpdateGeneralSettingsInput,
  GeneralSettingsInput: IGeneralSettingsInput,
  UpdateAutoAdventureSettingsInput: IUpdateAutoAdventureSettingsInput,
  AutoAdventureSettingsInput: IAutoAdventureSettingsInput,
  CoolDownInput: ICoolDownInput,
  UpdateGeneralVillageSettingsInput: IUpdateGeneralVillageSettingsInput,
  GeneralVillageSettingsInput: IGeneralVillageSettingsInput,
  UpdateAutoBuildVillageSettingsInput: IUpdateAutoBuildVillageSettingsInput,
  AutoBuildVillageSettingsInput: IAutoBuildVillageSettingsInput,
  Subscription: ResolverTypeWrapper<{}>,
  ClearQueueInput: IClearQueueInput,
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
  Query: {},
  UserAccount: IUserAccount,
  ID: Scalars['ID'],
  String: Scalars['String'],
  AvailableNewBuildingsInput: IAvailableNewBuildingsInput,
  Int: Scalars['Int'],
  AvailableNewBuilding: IAvailableNewBuilding,
  BuildingSpots: IBuildingSpots,
  BuildingSpot: IBuildingSpot,
  BuildingSpotLevel: IBuildingSpotLevel,
  ResourceFields: IResourceFields,
  BuildingInProgress: IBuildingInProgress,
  Date: Scalars['Date'],
  BotState: IBotState,
  HeroInformation: IHeroInformation,
  HeroState: IHeroState,
  Village: IVillage,
  Coords: ICoords,
  VillageResources: IVillageResources,
  Resources: IResources,
  VillageCapacity: IVillageCapacity,
  LogEntry: Omit<ILogEntry, 'content'> & { content: IResolversParentTypes['LogEntryContent'] },
  LogEntryContent: IResolversParentTypes['TextLogEntryContent'] | IResolversParentTypes['AutoBuildLogEntryContent'] | IResolversParentTypes['AutoUnitsLogEntryContent'],
  TextLogEntryContent: ITextLogEntryContent,
  TextLogEntryContentPayload: ITextLogEntryContentPayload,
  AutoBuildLogEntryContent: IAutoBuildLogEntryContent,
  AutoBuildLogEntryContentPayload: IAutoBuildLogEntryContentPayload,
  AutoUnitsLogEntryContent: IAutoUnitsLogEntryContent,
  AutoUnitsLogEntryContentPayload: IAutoUnitsLogEntryContentPayload,
  BuildingQueue: IBuildingQueue,
  QueuedBuilding: IQueuedBuilding,
  Boolean: Scalars['Boolean'],
  Cost: ICost,
  GeneralSettings: IGeneralSettings,
  HeroSettings: IHeroSettings,
  AutoAdventureSettings: IAutoAdventureSettings,
  ITaskSettings: IITaskSettings,
  CoolDown: ICoolDown,
  VillageSettings: IVillageSettings,
  GeneralVillageSettings: IGeneralVillageSettings,
  AutoBuildSettings: IAutoBuildSettings,
  Mutation: {},
  CreateUserAccountInput: ICreateUserAccountInput,
  UpdateUserAccountInput: IUpdateUserAccountInput,
  QueuedBuildingManipulationInput: IQueuedBuildingManipulationInput,
  DequeueBuildingAtFieldInput: IDequeueBuildingAtFieldInput,
  EnqueueBuildingInput: IEnqueueBuildingInput,
  UpdateGeneralSettingsInput: IUpdateGeneralSettingsInput,
  GeneralSettingsInput: IGeneralSettingsInput,
  UpdateAutoAdventureSettingsInput: IUpdateAutoAdventureSettingsInput,
  AutoAdventureSettingsInput: IAutoAdventureSettingsInput,
  CoolDownInput: ICoolDownInput,
  UpdateGeneralVillageSettingsInput: IUpdateGeneralVillageSettingsInput,
  GeneralVillageSettingsInput: IGeneralVillageSettingsInput,
  UpdateAutoBuildVillageSettingsInput: IUpdateAutoBuildVillageSettingsInput,
  AutoBuildVillageSettingsInput: IAutoBuildVillageSettingsInput,
  Subscription: {},
  ClearQueueInput: IClearQueueInput,
};

export type IAutoAdventureSettingsResolvers<ContextType = any, ParentType extends IResolversParentTypes['AutoAdventureSettings'] = IResolversParentTypes['AutoAdventureSettings']> = {
  allow?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>,
  coolDown?: Resolver<IResolversTypes['CoolDown'], ParentType, ContextType>,
  adventureCriteria?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  preferHard?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>,
  normalMinHealth?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  hardMinHealth?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  maxTravelTime?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  preferredVillageId?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
};

export type IAutoBuildLogEntryContentResolvers<ContextType = any, ParentType extends IResolversParentTypes['AutoBuildLogEntryContent'] = IResolversParentTypes['AutoBuildLogEntryContent']> = {
  autoBuild?: Resolver<IResolversTypes['AutoBuildLogEntryContentPayload'], ParentType, ContextType>,
};

export type IAutoBuildLogEntryContentPayloadResolvers<ContextType = any, ParentType extends IResolversParentTypes['AutoBuildLogEntryContentPayload'] = IResolversParentTypes['AutoBuildLogEntryContentPayload']> = {
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  type?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  level?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  fieldId?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
};

export type IAutoBuildSettingsResolvers<ContextType = any, ParentType extends IResolversParentTypes['AutoBuildSettings'] = IResolversParentTypes['AutoBuildSettings']> = {
  allow?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>,
  coolDown?: Resolver<IResolversTypes['CoolDown'], ParentType, ContextType>,
  autoCropFields?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>,
  minCrop?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
};

export type IAutoUnitsLogEntryContentResolvers<ContextType = any, ParentType extends IResolversParentTypes['AutoUnitsLogEntryContent'] = IResolversParentTypes['AutoUnitsLogEntryContent']> = {
  autoUnits?: Resolver<IResolversTypes['AutoUnitsLogEntryContentPayload'], ParentType, ContextType>,
};

export type IAutoUnitsLogEntryContentPayloadResolvers<ContextType = any, ParentType extends IResolversParentTypes['AutoUnitsLogEntryContentPayload'] = IResolversParentTypes['AutoUnitsLogEntryContentPayload']> = {
  amount?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  index?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  tribe?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  unitName?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
};

export type IAvailableNewBuildingResolvers<ContextType = any, ParentType extends IResolversParentTypes['AvailableNewBuilding'] = IResolversParentTypes['AvailableNewBuilding']> = {
  type?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
};

export type IBuildingInProgressResolvers<ContextType = any, ParentType extends IResolversParentTypes['BuildingInProgress'] = IResolversParentTypes['BuildingInProgress']> = {
  level?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  finishedAt?: Resolver<IResolversTypes['Date'], ParentType, ContextType>,
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  type?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
};

export type IBuildingQueueResolvers<ContextType = any, ParentType extends IResolversParentTypes['BuildingQueue'] = IResolversParentTypes['BuildingQueue']> = {
  buildings?: Resolver<ReadonlyArray<IResolversTypes['QueuedBuilding']>, ParentType, ContextType>,
  totalCost?: Resolver<IResolversTypes['Cost'], ParentType, ContextType>,
};

export type IBuildingSpotResolvers<ContextType = any, ParentType extends IResolversParentTypes['BuildingSpot'] = IResolversParentTypes['BuildingSpot']> = {
  fieldId?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  level?: Resolver<IResolversTypes['BuildingSpotLevel'], ParentType, ContextType>,
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  type?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
};

export type IBuildingSpotLevelResolvers<ContextType = any, ParentType extends IResolversParentTypes['BuildingSpotLevel'] = IResolversParentTypes['BuildingSpotLevel']> = {
  actual?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  ongoing?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  queued?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  max?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  total?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
};

export type IBuildingSpotsResolvers<ContextType = any, ParentType extends IResolversParentTypes['BuildingSpots'] = IResolversParentTypes['BuildingSpots']> = {
  infrastructure?: Resolver<ReadonlyArray<IResolversTypes['BuildingSpot']>, ParentType, ContextType>,
  resources?: Resolver<IResolversTypes['ResourceFields'], ParentType, ContextType>,
};

export type ICoolDownResolvers<ContextType = any, ParentType extends IResolversParentTypes['CoolDown'] = IResolversParentTypes['CoolDown']> = {
  min?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  max?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
};

export type ICoordsResolvers<ContextType = any, ParentType extends IResolversParentTypes['Coords'] = IResolversParentTypes['Coords']> = {
  x?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  y?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
};

export type ICostResolvers<ContextType = any, ParentType extends IResolversParentTypes['Cost'] = IResolversParentTypes['Cost']> = {
  resources?: Resolver<IResolversTypes['Resources'], ParentType, ContextType>,
  buildTime?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
};

export interface IDateScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['Date'], any> {
  name: 'Date'
}

export type IGeneralSettingsResolvers<ContextType = any, ParentType extends IResolversParentTypes['GeneralSettings'] = IResolversParentTypes['GeneralSettings']> = {
  allowTasks?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>,
  autoBuild?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>,
};

export type IGeneralVillageSettingsResolvers<ContextType = any, ParentType extends IResolversParentTypes['GeneralVillageSettings'] = IResolversParentTypes['GeneralVillageSettings']> = {
  allowTasks?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>,
};

export type IHeroInformationResolvers<ContextType = any, ParentType extends IResolversParentTypes['HeroInformation'] = IResolversParentTypes['HeroInformation']> = {
  health?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  state?: Resolver<IResolversTypes['HeroState'], ParentType, ContextType>,
  village?: Resolver<Maybe<IResolversTypes['Village']>, ParentType, ContextType>,
};

export type IHeroSettingsResolvers<ContextType = any, ParentType extends IResolversParentTypes['HeroSettings'] = IResolversParentTypes['HeroSettings']> = {
  autoAdventure?: Resolver<IResolversTypes['AutoAdventureSettings'], ParentType, ContextType>,
};

export type IITaskSettingsResolvers<ContextType = any, ParentType extends IResolversParentTypes['ITaskSettings'] = IResolversParentTypes['ITaskSettings']> = {
  __resolveType: TypeResolveFn<'AutoAdventureSettings' | 'AutoBuildSettings', ParentType, ContextType>,
  allow?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>,
  coolDown?: Resolver<IResolversTypes['CoolDown'], ParentType, ContextType>,
};

export type ILogEntryResolvers<ContextType = any, ParentType extends IResolversParentTypes['LogEntry'] = IResolversParentTypes['LogEntry']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  timestamp?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  village?: Resolver<Maybe<IResolversTypes['Village']>, ParentType, ContextType>,
  content?: Resolver<IResolversTypes['LogEntryContent'], ParentType, ContextType>,
};

export type ILogEntryContentResolvers<ContextType = any, ParentType extends IResolversParentTypes['LogEntryContent'] = IResolversParentTypes['LogEntryContent']> = {
  __resolveType: TypeResolveFn<'TextLogEntryContent' | 'AutoBuildLogEntryContent' | 'AutoUnitsLogEntryContent', ParentType, ContextType>
};

export type IMutationResolvers<ContextType = any, ParentType extends IResolversParentTypes['Mutation'] = IResolversParentTypes['Mutation']> = {
  createAccount?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType, RequireFields<IMutationCreateAccountArgs, 'account'>>,
  updateAccount?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationUpdateAccountArgs, 'account'>>,
  deleteAccount?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationDeleteAccountArgs, 'accountId'>>,
  signIn?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationSignInArgs, 'accountId'>>,
  signOut?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  startBot?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>,
  stopBot?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>,
  clearQueue?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationClearQueueArgs, 'villageId'>>,
  dequeueBuilding?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationDequeueBuildingArgs, 'input'>>,
  dequeueBuildingAtField?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationDequeueBuildingAtFieldArgs, 'input'>>,
  enqueueBuilding?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationEnqueueBuildingArgs, 'input'>>,
  moveQueuedBuildingDown?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationMoveQueuedBuildingDownArgs, 'input'>>,
  moveQueuedBuildingUp?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationMoveQueuedBuildingUpArgs, 'input'>>,
  updateGeneralSettings?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationUpdateGeneralSettingsArgs, 'input'>>,
  updateAutoAdventureSettings?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationUpdateAutoAdventureSettingsArgs, 'input'>>,
  updateGeneralVillageSettings?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationUpdateGeneralVillageSettingsArgs, 'input'>>,
  updateAutoBuildVillageSettings?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationUpdateAutoBuildVillageSettingsArgs, 'input'>>,
};

export type IQueryResolvers<ContextType = any, ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']> = {
  accounts?: Resolver<ReadonlyArray<IResolversTypes['UserAccount']>, ParentType, ContextType>,
  account?: Resolver<Maybe<IResolversTypes['UserAccount']>, ParentType, ContextType, RequireFields<IQueryAccountArgs, 'accountId'>>,
  currentAccount?: Resolver<IResolversTypes['UserAccount'], ParentType, ContextType>,
  availableNewBuildings?: Resolver<ReadonlyArray<IResolversTypes['AvailableNewBuilding']>, ParentType, ContextType, RequireFields<IQueryAvailableNewBuildingsArgs, 'input'>>,
  buildingName?: Resolver<IResolversTypes['String'], ParentType, ContextType, RequireFields<IQueryBuildingNameArgs, 'buildingType'>>,
  buildingSpots?: Resolver<IResolversTypes['BuildingSpots'], ParentType, ContextType, RequireFields<IQueryBuildingSpotsArgs, 'villageId'>>,
  maxBuildingLevel?: Resolver<IResolversTypes['Int'], ParentType, ContextType, RequireFields<IQueryMaxBuildingLevelArgs, 'buildingType'>>,
  buildingsInProgress?: Resolver<ReadonlyArray<IResolversTypes['BuildingInProgress']>, ParentType, ContextType, RequireFields<IQueryBuildingsInProgressArgs, 'villageId'>>,
  botState?: Resolver<IResolversTypes['BotState'], ParentType, ContextType>,
  heroInformation?: Resolver<IResolversTypes['HeroInformation'], ParentType, ContextType>,
  logsEntries?: Resolver<ReadonlyArray<IResolversTypes['LogEntry']>, ParentType, ContextType>,
  buildingQueue?: Resolver<IResolversTypes['BuildingQueue'], ParentType, ContextType, RequireFields<IQueryBuildingQueueArgs, 'villageId'>>,
  generalSettings?: Resolver<IResolversTypes['GeneralSettings'], ParentType, ContextType>,
  hero?: Resolver<IResolversTypes['HeroSettings'], ParentType, ContextType>,
  villageSettings?: Resolver<IResolversTypes['VillageSettings'], ParentType, ContextType, RequireFields<IQueryVillageSettingsArgs, 'villageId'>>,
  village?: Resolver<Maybe<IResolversTypes['Village']>, ParentType, ContextType, RequireFields<IQueryVillageArgs, 'villageId'>>,
  villages?: Resolver<ReadonlyArray<IResolversTypes['Village']>, ParentType, ContextType>,
};

export type IQueuedBuildingResolvers<ContextType = any, ParentType extends IResolversParentTypes['QueuedBuilding'] = IResolversParentTypes['QueuedBuilding']> = {
  canMoveDown?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>,
  canMoveUp?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>,
  level?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  type?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  queueId?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  cost?: Resolver<IResolversTypes['Cost'], ParentType, ContextType>,
};

export type IResourceFieldsResolvers<ContextType = any, ParentType extends IResolversParentTypes['ResourceFields'] = IResolversParentTypes['ResourceFields']> = {
  wood?: Resolver<ReadonlyArray<IResolversTypes['BuildingSpot']>, ParentType, ContextType>,
  clay?: Resolver<ReadonlyArray<IResolversTypes['BuildingSpot']>, ParentType, ContextType>,
  iron?: Resolver<ReadonlyArray<IResolversTypes['BuildingSpot']>, ParentType, ContextType>,
  crop?: Resolver<ReadonlyArray<IResolversTypes['BuildingSpot']>, ParentType, ContextType>,
};

export type IResourcesResolvers<ContextType = any, ParentType extends IResolversParentTypes['Resources'] = IResolversParentTypes['Resources']> = {
  wood?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  clay?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  iron?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  crop?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  total?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  freeCrop?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
};

export type ISubscriptionResolvers<ContextType = any, ParentType extends IResolversParentTypes['Subscription'] = IResolversParentTypes['Subscription']> = {
  buildingsUpdated?: SubscriptionResolver<IResolversTypes['Boolean'], "buildingsUpdated", ParentType, ContextType, RequireFields<ISubscriptionBuildingsUpdatedArgs, 'villageId'>>,
  onBotRunningChanged?: SubscriptionResolver<IResolversTypes['Boolean'], "onBotRunningChanged", ParentType, ContextType>,
  heroInformationUpdated?: SubscriptionResolver<IResolversTypes['HeroInformation'], "heroInformationUpdated", ParentType, ContextType>,
  onLogEntryAdded?: SubscriptionResolver<IResolversTypes['LogEntry'], "onLogEntryAdded", ParentType, ContextType>,
  onQueueUpdated?: SubscriptionResolver<IResolversTypes['Boolean'], "onQueueUpdated", ParentType, ContextType, RequireFields<ISubscriptionOnQueueUpdatedArgs, 'villageId'>>,
  updateVillage?: SubscriptionResolver<IResolversTypes['Boolean'], "updateVillage", ParentType, ContextType>,
  updateVillages?: SubscriptionResolver<IResolversTypes['Boolean'], "updateVillages", ParentType, ContextType>,
};

export type ITextLogEntryContentResolvers<ContextType = any, ParentType extends IResolversParentTypes['TextLogEntryContent'] = IResolversParentTypes['TextLogEntryContent']> = {
  text?: Resolver<IResolversTypes['TextLogEntryContentPayload'], ParentType, ContextType>,
};

export type ITextLogEntryContentPayloadResolvers<ContextType = any, ParentType extends IResolversParentTypes['TextLogEntryContentPayload'] = IResolversParentTypes['TextLogEntryContentPayload']> = {
  message?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
};

export type IUserAccountResolvers<ContextType = any, ParentType extends IResolversParentTypes['UserAccount'] = IResolversParentTypes['UserAccount']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  username?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  password?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  server?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
};

export type IVillageResolvers<ContextType = any, ParentType extends IResolversParentTypes['Village'] = IResolversParentTypes['Village']> = {
  id?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  coords?: Resolver<IResolversTypes['Coords'], ParentType, ContextType>,
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  resources?: Resolver<IResolversTypes['VillageResources'], ParentType, ContextType>,
};

export type IVillageCapacityResolvers<ContextType = any, ParentType extends IResolversParentTypes['VillageCapacity'] = IResolversParentTypes['VillageCapacity']> = {
  granary?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  warehouse?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
};

export type IVillageResourcesResolvers<ContextType = any, ParentType extends IResolversParentTypes['VillageResources'] = IResolversParentTypes['VillageResources']> = {
  amount?: Resolver<IResolversTypes['Resources'], ParentType, ContextType>,
  capacity?: Resolver<IResolversTypes['VillageCapacity'], ParentType, ContextType>,
  production?: Resolver<IResolversTypes['Resources'], ParentType, ContextType>,
};

export type IVillageSettingsResolvers<ContextType = any, ParentType extends IResolversParentTypes['VillageSettings'] = IResolversParentTypes['VillageSettings']> = {
  general?: Resolver<IResolversTypes['GeneralVillageSettings'], ParentType, ContextType>,
  autoBuild?: Resolver<IResolversTypes['AutoBuildSettings'], ParentType, ContextType>,
};

export type IResolvers<ContextType = any> = {
  AutoAdventureSettings?: IAutoAdventureSettingsResolvers<ContextType>,
  AutoBuildLogEntryContent?: IAutoBuildLogEntryContentResolvers<ContextType>,
  AutoBuildLogEntryContentPayload?: IAutoBuildLogEntryContentPayloadResolvers<ContextType>,
  AutoBuildSettings?: IAutoBuildSettingsResolvers<ContextType>,
  AutoUnitsLogEntryContent?: IAutoUnitsLogEntryContentResolvers<ContextType>,
  AutoUnitsLogEntryContentPayload?: IAutoUnitsLogEntryContentPayloadResolvers<ContextType>,
  AvailableNewBuilding?: IAvailableNewBuildingResolvers<ContextType>,
  BuildingInProgress?: IBuildingInProgressResolvers<ContextType>,
  BuildingQueue?: IBuildingQueueResolvers<ContextType>,
  BuildingSpot?: IBuildingSpotResolvers<ContextType>,
  BuildingSpotLevel?: IBuildingSpotLevelResolvers<ContextType>,
  BuildingSpots?: IBuildingSpotsResolvers<ContextType>,
  CoolDown?: ICoolDownResolvers<ContextType>,
  Coords?: ICoordsResolvers<ContextType>,
  Cost?: ICostResolvers<ContextType>,
  Date?: GraphQLScalarType,
  GeneralSettings?: IGeneralSettingsResolvers<ContextType>,
  GeneralVillageSettings?: IGeneralVillageSettingsResolvers<ContextType>,
  HeroInformation?: IHeroInformationResolvers<ContextType>,
  HeroSettings?: IHeroSettingsResolvers<ContextType>,
  ITaskSettings?: IITaskSettingsResolvers,
  LogEntry?: ILogEntryResolvers<ContextType>,
  LogEntryContent?: ILogEntryContentResolvers,
  Mutation?: IMutationResolvers<ContextType>,
  Query?: IQueryResolvers<ContextType>,
  QueuedBuilding?: IQueuedBuildingResolvers<ContextType>,
  ResourceFields?: IResourceFieldsResolvers<ContextType>,
  Resources?: IResourcesResolvers<ContextType>,
  Subscription?: ISubscriptionResolvers<ContextType>,
  TextLogEntryContent?: ITextLogEntryContentResolvers<ContextType>,
  TextLogEntryContentPayload?: ITextLogEntryContentPayloadResolvers<ContextType>,
  UserAccount?: IUserAccountResolvers<ContextType>,
  Village?: IVillageResolvers<ContextType>,
  VillageCapacity?: IVillageCapacityResolvers<ContextType>,
  VillageResources?: IVillageResourcesResolvers<ContextType>,
  VillageSettings?: IVillageSettingsResolvers<ContextType>,
};


