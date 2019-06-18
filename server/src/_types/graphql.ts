import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";
export type Maybe<T> = T | undefined;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
};

export type IAutoAdventureSettings = IITaskSettings & {
  __typename?: "AutoAdventureSettings";
  readonly allow: Scalars["Boolean"];
  readonly coolDown: ICoolDown;
  readonly adventureCriteria: Scalars["Int"];
  readonly preferHard: Scalars["Boolean"];
  readonly normalMinHealth: Scalars["Int"];
  readonly hardMinHealth: Scalars["Int"];
  readonly maxTravelTime: Scalars["Int"];
  readonly preferredVillageId?: Maybe<Scalars["Int"]>;
};

export type IAutoAdventureSettingsInput = {
  readonly allow: Scalars["Boolean"];
  readonly coolDown: ICoolDownInput;
  readonly adventureCriteria: Scalars["Int"];
  readonly preferHard: Scalars["Boolean"];
  readonly normalMinHealth: Scalars["Int"];
  readonly hardMinHealth: Scalars["Int"];
  readonly maxTravelTime: Scalars["Int"];
  readonly preferredVillageId?: Maybe<Scalars["Int"]>;
};

export type IAutoBuildSettings = IITaskSettings & {
  __typename?: "AutoBuildSettings";
  readonly allow: Scalars["Boolean"];
  readonly coolDown: ICoolDown;
  readonly autoCropFields: Scalars["Boolean"];
  readonly minCrop: Scalars["Int"];
};

export type IAutoBuildVillageSettingsInput = {
  readonly allow: Scalars["Boolean"];
  readonly coolDown: ICoolDownInput;
  readonly autoCropFields: Scalars["Boolean"];
  readonly minCrop: Scalars["Int"];
};

export type IAvailableNewBuilding = {
  __typename?: "AvailableNewBuilding";
  readonly type: Scalars["Int"];
  readonly name: Scalars["String"];
};

export type IAvailableNewBuildingsInput = {
  readonly fieldId: Scalars["Int"];
  readonly villageId: Scalars["Int"];
};

export type IBuildingInProgress = {
  __typename?: "BuildingInProgress";
  readonly level: Scalars["Int"];
  readonly finishedAt: Scalars["Date"];
  readonly name: Scalars["String"];
  readonly type: Scalars["Int"];
};

export type IBuildingQueue = {
  __typename?: "BuildingQueue";
  readonly buildings: ReadonlyArray<IQueuedBuilding>;
  readonly totalCost: ICost;
};

export type IBuildingSpot = {
  __typename?: "BuildingSpot";
  readonly fieldId: Scalars["Int"];
  readonly level: IBuildingSpotLevel;
  readonly name: Scalars["String"];
  readonly type: Scalars["Int"];
};

export type IBuildingSpotLevel = {
  __typename?: "BuildingSpotLevel";
  readonly actual: Scalars["Int"];
  readonly ongoing: Scalars["Int"];
  readonly queued: Scalars["Int"];
  readonly max: Scalars["Int"];
  readonly total: Scalars["Int"];
};

export type IBuildingSpots = {
  __typename?: "BuildingSpots";
  readonly infrastructure: ReadonlyArray<IBuildingSpot>;
  readonly resources: IResourceFields;
};

export type IClearQueueInput = {
  readonly villageId: Scalars["Int"];
};

export type ICoolDown = {
  __typename?: "CoolDown";
  readonly min: Scalars["Int"];
  readonly max: Scalars["Int"];
};

export type ICoolDownInput = {
  readonly min: Scalars["Int"];
  readonly max: Scalars["Int"];
};

export type ICoords = {
  __typename?: "Coords";
  readonly x: Scalars["Int"];
  readonly y: Scalars["Int"];
};

export type ICost = {
  __typename?: "Cost";
  readonly resources: IResources;
  readonly buildTime: Scalars["Int"];
};

export type IDequeueBuildingAtFieldInput = {
  readonly deleteAll: Scalars["Boolean"];
  readonly fieldId: Scalars["Int"];
  readonly villageId: Scalars["Int"];
};

export type IEnqueueBuildingInput = {
  readonly fieldId: Scalars["Int"];
  readonly levels: Scalars["Int"];
  readonly type: Scalars["Int"];
  readonly villageId: Scalars["Int"];
};

export type IGeneralSettings = {
  __typename?: "GeneralSettings";
  readonly allowTasks: Scalars["Boolean"];
  readonly autoBuild: Scalars["Boolean"];
};

export type IGeneralSettingsInput = {
  readonly allowTasks: Scalars["Boolean"];
  readonly autoBuild: Scalars["Boolean"];
};

export type IGeneralVillageSettings = {
  __typename?: "GeneralVillageSettings";
  readonly allowTasks: Scalars["Boolean"];
};

export type IGeneralVillageSettingsInput = {
  readonly allowTasks: Scalars["Boolean"];
};

export type IHeroInformation = {
  __typename?: "HeroInformation";
  readonly health: Scalars["Int"];
  readonly village?: Maybe<IVillage>;
};

export type IHeroSettings = {
  __typename?: "HeroSettings";
  readonly autoAdventure: IAutoAdventureSettings;
};

export type IITaskSettings = {
  __typename?: "ITaskSettings";
  readonly allow: Scalars["Boolean"];
  readonly coolDown: ICoolDown;
};

export type IMutation = {
  __typename?: "Mutation";
  readonly startBot: Scalars["Boolean"];
  readonly stopBot: Scalars["Boolean"];
  readonly clearQueue: Scalars["Boolean"];
  readonly dequeueBuilding: Scalars["Boolean"];
  readonly dequeueBuildingAtField: Scalars["Boolean"];
  readonly enqueueBuilding: Scalars["Boolean"];
  readonly moveQueuedBuildingDown: Scalars["Boolean"];
  readonly moveQueuedBuildingUp: Scalars["Boolean"];
  readonly updateGeneralSettings: Scalars["Boolean"];
  readonly updateAutoAdventureSettings: Scalars["Boolean"];
  readonly updateGeneralVillageSettings: Scalars["Boolean"];
  readonly updateAutoBuildVillageSettings: Scalars["Boolean"];
  readonly signIn: Scalars["Boolean"];
};

export type IMutationClearQueueArgs = {
  villageId: Scalars["Int"];
};

export type IMutationDequeueBuildingArgs = {
  input?: Maybe<IQueuedBuildingManipulationInput>;
};

export type IMutationDequeueBuildingAtFieldArgs = {
  input?: Maybe<IDequeueBuildingAtFieldInput>;
};

export type IMutationEnqueueBuildingArgs = {
  input?: Maybe<IEnqueueBuildingInput>;
};

export type IMutationMoveQueuedBuildingDownArgs = {
  input: IQueuedBuildingManipulationInput;
};

export type IMutationMoveQueuedBuildingUpArgs = {
  input: IQueuedBuildingManipulationInput;
};

export type IMutationUpdateGeneralSettingsArgs = {
  input: IUpdateGeneralSettingsInput;
};

export type IMutationUpdateAutoAdventureSettingsArgs = {
  input: IUpdateAutoAdventureSettingsInput;
};

export type IMutationUpdateGeneralVillageSettingsArgs = {
  input: IUpdateGeneralVillageSettingsInput;
};

export type IMutationUpdateAutoBuildVillageSettingsArgs = {
  input: IUpdateAutoBuildVillageSettingsInput;
};

export type IMutationSignInArgs = {
  account: ISignInInput;
};

export type IQuery = {
  __typename?: "Query";
  readonly availableNewBuildings: ReadonlyArray<IAvailableNewBuilding>;
  readonly buildingName: Scalars["String"];
  readonly buildingSpots: IBuildingSpots;
  readonly maxBuildingLevel: Scalars["Int"];
  readonly buildingsInProgress: ReadonlyArray<IBuildingInProgress>;
  readonly isBotRunning: Scalars["Boolean"];
  readonly heroInformation: IHeroInformation;
  readonly buildingQueue: IBuildingQueue;
  readonly generalSettings: IGeneralSettings;
  readonly hero: IHeroSettings;
  readonly villageSettings: IVillageSettings;
  readonly isSignedIn: Scalars["Boolean"];
  readonly village?: Maybe<IVillage>;
  readonly villages: ReadonlyArray<IVillage>;
};

export type IQueryAvailableNewBuildingsArgs = {
  input: IAvailableNewBuildingsInput;
};

export type IQueryBuildingNameArgs = {
  buildingType: Scalars["Int"];
};

export type IQueryBuildingSpotsArgs = {
  villageId: Scalars["Int"];
};

export type IQueryMaxBuildingLevelArgs = {
  buildingType: Scalars["Int"];
};

export type IQueryBuildingsInProgressArgs = {
  villageId: Scalars["Int"];
};

export type IQueryBuildingQueueArgs = {
  villageId: Scalars["Int"];
};

export type IQueryVillageSettingsArgs = {
  villageId: Scalars["Int"];
};

export type IQueryVillageArgs = {
  villageId: Scalars["Int"];
};

export type IQueuedBuilding = {
  __typename?: "QueuedBuilding";
  readonly canMoveDown: Scalars["Boolean"];
  readonly canMoveUp: Scalars["Boolean"];
  readonly level: Scalars["Int"];
  readonly name: Scalars["String"];
  readonly type: Scalars["Int"];
  readonly queueId: Scalars["ID"];
  readonly cost: ICost;
};

export type IQueuedBuildingManipulationInput = {
  readonly queueId: Scalars["ID"];
  readonly villageId: Scalars["Int"];
};

export type IResourceFields = {
  __typename?: "ResourceFields";
  readonly wood: ReadonlyArray<IBuildingSpot>;
  readonly clay: ReadonlyArray<IBuildingSpot>;
  readonly iron: ReadonlyArray<IBuildingSpot>;
  readonly crop: ReadonlyArray<IBuildingSpot>;
};

export type IResources = {
  __typename?: "Resources";
  readonly wood: Scalars["Int"];
  readonly clay: Scalars["Int"];
  readonly iron: Scalars["Int"];
  readonly crop: Scalars["Int"];
  readonly total: Scalars["Int"];
  readonly freeCrop: Scalars["Int"];
};

export type ISignInInput = {
  readonly username: Scalars["String"];
  readonly password: Scalars["String"];
  readonly server: Scalars["String"];
};

export type ISubscription = {
  __typename?: "Subscription";
  readonly buildingsUpdated: Scalars["Boolean"];
  readonly updateVillage: Scalars["Boolean"];
};

export type ISubscriptionBuildingsUpdatedArgs = {
  villageId: Scalars["Int"];
};

export type ISubscriptionUpdateVillageArgs = {
  villageId: Scalars["Int"];
};

export type IUpdateAutoAdventureSettingsInput = {
  readonly settings: IAutoAdventureSettingsInput;
};

export type IUpdateAutoBuildVillageSettingsInput = {
  readonly villageId: Scalars["Int"];
  readonly settings: IAutoBuildVillageSettingsInput;
};

export type IUpdateGeneralSettingsInput = {
  readonly settings: IGeneralSettingsInput;
};

export type IUpdateGeneralVillageSettingsInput = {
  readonly villageId: Scalars["Int"];
  readonly settings: IGeneralVillageSettingsInput;
};

export type IUserAccount = {
  __typename?: "UserAccount";
  readonly username: Scalars["String"];
  readonly password: Scalars["String"];
  readonly server: Scalars["String"];
};

export type IVillage = {
  __typename?: "Village";
  readonly id: Scalars["Int"];
  readonly coords: ICoords;
  readonly name: Scalars["String"];
  readonly resources: IVillageResources;
};

export type IVillageCapacity = {
  __typename?: "VillageCapacity";
  readonly granary: Scalars["Int"];
  readonly warehouse: Scalars["Int"];
};

export type IVillageResources = {
  __typename?: "VillageResources";
  readonly amount: IResources;
  readonly capacity: IVillageCapacity;
  readonly production: IResources;
};

export type IVillageSettings = {
  __typename?: "VillageSettings";
  readonly general: IGeneralVillageSettings;
  readonly autoBuild: IAutoBuildSettings;
};

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

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type IResolversTypes = {
  Query: {};
  AvailableNewBuildingsInput: IAvailableNewBuildingsInput;
  Int: Scalars["Int"];
  AvailableNewBuilding: IAvailableNewBuilding;
  String: Scalars["String"];
  BuildingSpots: IBuildingSpots;
  BuildingSpot: IBuildingSpot;
  BuildingSpotLevel: IBuildingSpotLevel;
  ResourceFields: IResourceFields;
  BuildingInProgress: IBuildingInProgress;
  Date: Scalars["Date"];
  Boolean: Scalars["Boolean"];
  HeroInformation: IHeroInformation;
  Village: IVillage;
  Coords: ICoords;
  VillageResources: IVillageResources;
  Resources: IResources;
  VillageCapacity: IVillageCapacity;
  BuildingQueue: IBuildingQueue;
  QueuedBuilding: IQueuedBuilding;
  ID: Scalars["ID"];
  Cost: ICost;
  GeneralSettings: IGeneralSettings;
  HeroSettings: IHeroSettings;
  AutoAdventureSettings: IAutoAdventureSettings;
  ITaskSettings: IITaskSettings;
  CoolDown: ICoolDown;
  VillageSettings: IVillageSettings;
  GeneralVillageSettings: IGeneralVillageSettings;
  AutoBuildSettings: IAutoBuildSettings;
  Mutation: {};
  QueuedBuildingManipulationInput: IQueuedBuildingManipulationInput;
  DequeueBuildingAtFieldInput: IDequeueBuildingAtFieldInput;
  EnqueueBuildingInput: IEnqueueBuildingInput;
  UpdateGeneralSettingsInput: IUpdateGeneralSettingsInput;
  GeneralSettingsInput: IGeneralSettingsInput;
  UpdateAutoAdventureSettingsInput: IUpdateAutoAdventureSettingsInput;
  AutoAdventureSettingsInput: IAutoAdventureSettingsInput;
  CoolDownInput: ICoolDownInput;
  UpdateGeneralVillageSettingsInput: IUpdateGeneralVillageSettingsInput;
  GeneralVillageSettingsInput: IGeneralVillageSettingsInput;
  UpdateAutoBuildVillageSettingsInput: IUpdateAutoBuildVillageSettingsInput;
  AutoBuildVillageSettingsInput: IAutoBuildVillageSettingsInput;
  SignInInput: ISignInInput;
  Subscription: {};
  ClearQueueInput: IClearQueueInput;
  UserAccount: IUserAccount;
};

export type IAutoAdventureSettingsResolvers<
  ContextType = any,
  ParentType = IResolversTypes["AutoAdventureSettings"]
> = {
  allow?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
  coolDown?: Resolver<IResolversTypes["CoolDown"], ParentType, ContextType>;
  adventureCriteria?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  preferHard?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
  normalMinHealth?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  hardMinHealth?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  maxTravelTime?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  preferredVillageId?: Resolver<
    Maybe<IResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
};

export type IAutoBuildSettingsResolvers<
  ContextType = any,
  ParentType = IResolversTypes["AutoBuildSettings"]
> = {
  allow?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
  coolDown?: Resolver<IResolversTypes["CoolDown"], ParentType, ContextType>;
  autoCropFields?: Resolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  minCrop?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
};

export type IAvailableNewBuildingResolvers<
  ContextType = any,
  ParentType = IResolversTypes["AvailableNewBuilding"]
> = {
  type?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
};

export type IBuildingInProgressResolvers<
  ContextType = any,
  ParentType = IResolversTypes["BuildingInProgress"]
> = {
  level?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  finishedAt?: Resolver<IResolversTypes["Date"], ParentType, ContextType>;
  name?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  type?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
};

export type IBuildingQueueResolvers<
  ContextType = any,
  ParentType = IResolversTypes["BuildingQueue"]
> = {
  buildings?: Resolver<
    ReadonlyArray<IResolversTypes["QueuedBuilding"]>,
    ParentType,
    ContextType
  >;
  totalCost?: Resolver<IResolversTypes["Cost"], ParentType, ContextType>;
};

export type IBuildingSpotResolvers<
  ContextType = any,
  ParentType = IResolversTypes["BuildingSpot"]
> = {
  fieldId?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  level?: Resolver<
    IResolversTypes["BuildingSpotLevel"],
    ParentType,
    ContextType
  >;
  name?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  type?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
};

export type IBuildingSpotLevelResolvers<
  ContextType = any,
  ParentType = IResolversTypes["BuildingSpotLevel"]
> = {
  actual?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  ongoing?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  queued?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  max?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  total?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
};

export type IBuildingSpotsResolvers<
  ContextType = any,
  ParentType = IResolversTypes["BuildingSpots"]
> = {
  infrastructure?: Resolver<
    ReadonlyArray<IResolversTypes["BuildingSpot"]>,
    ParentType,
    ContextType
  >;
  resources?: Resolver<
    IResolversTypes["ResourceFields"],
    ParentType,
    ContextType
  >;
};

export type ICoolDownResolvers<
  ContextType = any,
  ParentType = IResolversTypes["CoolDown"]
> = {
  min?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  max?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
};

export type ICoordsResolvers<
  ContextType = any,
  ParentType = IResolversTypes["Coords"]
> = {
  x?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  y?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
};

export type ICostResolvers<
  ContextType = any,
  ParentType = IResolversTypes["Cost"]
> = {
  resources?: Resolver<IResolversTypes["Resources"], ParentType, ContextType>;
  buildTime?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
};

export interface IDateScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["Date"], any> {
  name: "Date";
}

export type IGeneralSettingsResolvers<
  ContextType = any,
  ParentType = IResolversTypes["GeneralSettings"]
> = {
  allowTasks?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
  autoBuild?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
};

export type IGeneralVillageSettingsResolvers<
  ContextType = any,
  ParentType = IResolversTypes["GeneralVillageSettings"]
> = {
  allowTasks?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
};

export type IHeroInformationResolvers<
  ContextType = any,
  ParentType = IResolversTypes["HeroInformation"]
> = {
  health?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  village?: Resolver<
    Maybe<IResolversTypes["Village"]>,
    ParentType,
    ContextType
  >;
};

export type IHeroSettingsResolvers<
  ContextType = any,
  ParentType = IResolversTypes["HeroSettings"]
> = {
  autoAdventure?: Resolver<
    IResolversTypes["AutoAdventureSettings"],
    ParentType,
    ContextType
  >;
};

export type IITaskSettingsResolvers<
  ContextType = any,
  ParentType = IResolversTypes["ITaskSettings"]
> = {
  __resolveType: TypeResolveFn<
    "AutoAdventureSettings" | "AutoBuildSettings",
    ParentType,
    ContextType
  >;
  allow?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
  coolDown?: Resolver<IResolversTypes["CoolDown"], ParentType, ContextType>;
};

export type IMutationResolvers<
  ContextType = any,
  ParentType = IResolversTypes["Mutation"]
> = {
  startBot?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
  stopBot?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
  clearQueue?: Resolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType,
    IMutationClearQueueArgs
  >;
  dequeueBuilding?: Resolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType,
    IMutationDequeueBuildingArgs
  >;
  dequeueBuildingAtField?: Resolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType,
    IMutationDequeueBuildingAtFieldArgs
  >;
  enqueueBuilding?: Resolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType,
    IMutationEnqueueBuildingArgs
  >;
  moveQueuedBuildingDown?: Resolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType,
    IMutationMoveQueuedBuildingDownArgs
  >;
  moveQueuedBuildingUp?: Resolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType,
    IMutationMoveQueuedBuildingUpArgs
  >;
  updateGeneralSettings?: Resolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType,
    IMutationUpdateGeneralSettingsArgs
  >;
  updateAutoAdventureSettings?: Resolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType,
    IMutationUpdateAutoAdventureSettingsArgs
  >;
  updateGeneralVillageSettings?: Resolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType,
    IMutationUpdateGeneralVillageSettingsArgs
  >;
  updateAutoBuildVillageSettings?: Resolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType,
    IMutationUpdateAutoBuildVillageSettingsArgs
  >;
  signIn?: Resolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType,
    IMutationSignInArgs
  >;
};

export type IQueryResolvers<
  ContextType = any,
  ParentType = IResolversTypes["Query"]
> = {
  availableNewBuildings?: Resolver<
    ReadonlyArray<IResolversTypes["AvailableNewBuilding"]>,
    ParentType,
    ContextType,
    IQueryAvailableNewBuildingsArgs
  >;
  buildingName?: Resolver<
    IResolversTypes["String"],
    ParentType,
    ContextType,
    IQueryBuildingNameArgs
  >;
  buildingSpots?: Resolver<
    IResolversTypes["BuildingSpots"],
    ParentType,
    ContextType,
    IQueryBuildingSpotsArgs
  >;
  maxBuildingLevel?: Resolver<
    IResolversTypes["Int"],
    ParentType,
    ContextType,
    IQueryMaxBuildingLevelArgs
  >;
  buildingsInProgress?: Resolver<
    ReadonlyArray<IResolversTypes["BuildingInProgress"]>,
    ParentType,
    ContextType,
    IQueryBuildingsInProgressArgs
  >;
  isBotRunning?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
  heroInformation?: Resolver<
    IResolversTypes["HeroInformation"],
    ParentType,
    ContextType
  >;
  buildingQueue?: Resolver<
    IResolversTypes["BuildingQueue"],
    ParentType,
    ContextType,
    IQueryBuildingQueueArgs
  >;
  generalSettings?: Resolver<
    IResolversTypes["GeneralSettings"],
    ParentType,
    ContextType
  >;
  hero?: Resolver<IResolversTypes["HeroSettings"], ParentType, ContextType>;
  villageSettings?: Resolver<
    IResolversTypes["VillageSettings"],
    ParentType,
    ContextType,
    IQueryVillageSettingsArgs
  >;
  isSignedIn?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
  village?: Resolver<
    Maybe<IResolversTypes["Village"]>,
    ParentType,
    ContextType,
    IQueryVillageArgs
  >;
  villages?: Resolver<
    ReadonlyArray<IResolversTypes["Village"]>,
    ParentType,
    ContextType
  >;
};

export type IQueuedBuildingResolvers<
  ContextType = any,
  ParentType = IResolversTypes["QueuedBuilding"]
> = {
  canMoveDown?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
  canMoveUp?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
  level?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  type?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  queueId?: Resolver<IResolversTypes["ID"], ParentType, ContextType>;
  cost?: Resolver<IResolversTypes["Cost"], ParentType, ContextType>;
};

export type IResourceFieldsResolvers<
  ContextType = any,
  ParentType = IResolversTypes["ResourceFields"]
> = {
  wood?: Resolver<
    ReadonlyArray<IResolversTypes["BuildingSpot"]>,
    ParentType,
    ContextType
  >;
  clay?: Resolver<
    ReadonlyArray<IResolversTypes["BuildingSpot"]>,
    ParentType,
    ContextType
  >;
  iron?: Resolver<
    ReadonlyArray<IResolversTypes["BuildingSpot"]>,
    ParentType,
    ContextType
  >;
  crop?: Resolver<
    ReadonlyArray<IResolversTypes["BuildingSpot"]>,
    ParentType,
    ContextType
  >;
};

export type IResourcesResolvers<
  ContextType = any,
  ParentType = IResolversTypes["Resources"]
> = {
  wood?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  clay?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  iron?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  crop?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  total?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  freeCrop?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
};

export type ISubscriptionResolvers<
  ContextType = any,
  ParentType = IResolversTypes["Subscription"]
> = {
  buildingsUpdated?: SubscriptionResolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType,
    ISubscriptionBuildingsUpdatedArgs
  >;
  updateVillage?: SubscriptionResolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType,
    ISubscriptionUpdateVillageArgs
  >;
};

export type IUserAccountResolvers<
  ContextType = any,
  ParentType = IResolversTypes["UserAccount"]
> = {
  username?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  password?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  server?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
};

export type IVillageResolvers<
  ContextType = any,
  ParentType = IResolversTypes["Village"]
> = {
  id?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  coords?: Resolver<IResolversTypes["Coords"], ParentType, ContextType>;
  name?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  resources?: Resolver<
    IResolversTypes["VillageResources"],
    ParentType,
    ContextType
  >;
};

export type IVillageCapacityResolvers<
  ContextType = any,
  ParentType = IResolversTypes["VillageCapacity"]
> = {
  granary?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  warehouse?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
};

export type IVillageResourcesResolvers<
  ContextType = any,
  ParentType = IResolversTypes["VillageResources"]
> = {
  amount?: Resolver<IResolversTypes["Resources"], ParentType, ContextType>;
  capacity?: Resolver<
    IResolversTypes["VillageCapacity"],
    ParentType,
    ContextType
  >;
  production?: Resolver<IResolversTypes["Resources"], ParentType, ContextType>;
};

export type IVillageSettingsResolvers<
  ContextType = any,
  ParentType = IResolversTypes["VillageSettings"]
> = {
  general?: Resolver<
    IResolversTypes["GeneralVillageSettings"],
    ParentType,
    ContextType
  >;
  autoBuild?: Resolver<
    IResolversTypes["AutoBuildSettings"],
    ParentType,
    ContextType
  >;
};

export type IResolvers<ContextType = any> = {
  AutoAdventureSettings?: IAutoAdventureSettingsResolvers<ContextType>;
  AutoBuildSettings?: IAutoBuildSettingsResolvers<ContextType>;
  AvailableNewBuilding?: IAvailableNewBuildingResolvers<ContextType>;
  BuildingInProgress?: IBuildingInProgressResolvers<ContextType>;
  BuildingQueue?: IBuildingQueueResolvers<ContextType>;
  BuildingSpot?: IBuildingSpotResolvers<ContextType>;
  BuildingSpotLevel?: IBuildingSpotLevelResolvers<ContextType>;
  BuildingSpots?: IBuildingSpotsResolvers<ContextType>;
  CoolDown?: ICoolDownResolvers<ContextType>;
  Coords?: ICoordsResolvers<ContextType>;
  Cost?: ICostResolvers<ContextType>;
  Date?: GraphQLScalarType;
  GeneralSettings?: IGeneralSettingsResolvers<ContextType>;
  GeneralVillageSettings?: IGeneralVillageSettingsResolvers<ContextType>;
  HeroInformation?: IHeroInformationResolvers<ContextType>;
  HeroSettings?: IHeroSettingsResolvers<ContextType>;
  ITaskSettings?: IITaskSettingsResolvers;
  Mutation?: IMutationResolvers<ContextType>;
  Query?: IQueryResolvers<ContextType>;
  QueuedBuilding?: IQueuedBuildingResolvers<ContextType>;
  ResourceFields?: IResourceFieldsResolvers<ContextType>;
  Resources?: IResourcesResolvers<ContextType>;
  Subscription?: ISubscriptionResolvers<ContextType>;
  UserAccount?: IUserAccountResolvers<ContextType>;
  Village?: IVillageResolvers<ContextType>;
  VillageCapacity?: IVillageCapacityResolvers<ContextType>;
  VillageResources?: IVillageResourcesResolvers<ContextType>;
  VillageSettings?: IVillageSettingsResolvers<ContextType>;
};
