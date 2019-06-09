import { GraphQLResolveInfo } from "graphql";
import { IGraphQLContext } from "../graphql/context";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type IAvailableNewBuildingsInput = {
  readonly fieldId: Scalars["Int"];
  readonly villageId: Scalars["Int"];
};

export type IBuilding = {
  __typename?: "Building";
  readonly lol?: Maybe<Scalars["Int"]>;
};

export type IBuildingInProgress = {
  __typename?: "BuildingInProgress";
  readonly level: Scalars["Int"];
  readonly name: Scalars["String"];
  readonly timer: Scalars["Int"];
  readonly type: Scalars["Int"];
};

export type IBuildingQueue = {
  __typename?: "BuildingQueue";
  readonly buildings: ReadonlyArray<IQueuedBuilding>;
  readonly totalCost: ICost;
  readonly totalBuildingTime: Scalars["String"];
};

export type IBuildingSpot = {
  __typename?: "BuildingSpot";
  readonly fieldId: Scalars["Int"];
  readonly level?: Maybe<IBuildingSpotLevel>;
  readonly name: Scalars["String"];
  readonly type: Scalars["Int"];
};

export type IBuildingSpotLevel = {
  __typename?: "BuildingSpotLevel";
  readonly actual: Scalars["Int"];
  readonly max: Scalars["Int"];
  readonly ongoing: Scalars["Int"];
  readonly queued: Scalars["Int"];
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

export type ICost = {
  __typename?: "Cost";
  readonly wood: Scalars["Int"];
  readonly clay: Scalars["Int"];
  readonly iron: Scalars["Int"];
  readonly crop: Scalars["Int"];
  readonly total: Scalars["Int"];
  readonly freeCrop: Scalars["Int"];
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

export type IMutation = {
  __typename?: "Mutation";
  readonly clearQueue: Scalars["Boolean"];
  readonly dequeueBuilding: Scalars["Boolean"];
  readonly dequeueBuildingAtField: Scalars["Boolean"];
  readonly enqueueBuilding: Scalars["Boolean"];
  readonly moveQueuedBuildingDown: Scalars["Boolean"];
  readonly moveQueuedBuildingUp: Scalars["Boolean"];
  readonly startBot: Scalars["Boolean"];
  readonly stopBot: Scalars["Boolean"];
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

export type IMutationSignInArgs = {
  account: ISignInInput;
};

export type INewBuildingInfo = {
  __typename?: "NewBuildingInfo";
  readonly name: Scalars["String"];
  readonly type: Scalars["Int"];
};

export type IQuery = {
  __typename?: "Query";
  readonly buildingSpots: IBuildingSpots;
  readonly buildingQueue: IBuildingQueue;
  readonly availableNewBuildings: ReadonlyArray<INewBuildingInfo>;
  readonly buildingsInProgress: ReadonlyArray<IBuildingInProgress>;
  readonly isBotRunning: Scalars["Boolean"];
  readonly isSignedIn: Scalars["Boolean"];
  readonly villages: ReadonlyArray<IVillage>;
  readonly villageExists: Scalars["Boolean"];
};

export type IQueryBuildingSpotsArgs = {
  villageId: Scalars["Int"];
};

export type IQueryBuildingQueueArgs = {
  villageId: Scalars["Int"];
};

export type IQueryAvailableNewBuildingsArgs = {
  input: IAvailableNewBuildingsInput;
};

export type IQueryBuildingsInProgressArgs = {
  villageId: Scalars["Int"];
};

export type IQueryVillageExistsArgs = {
  villageId: Scalars["Int"];
};

export type IQueuedBuilding = {
  __typename?: "QueuedBuilding";
  readonly canMoveDown: Scalars["Boolean"];
  readonly canMoveUp: Scalars["Boolean"];
  readonly cost: ICost;
  readonly level: Scalars["Int"];
  readonly name: Scalars["String"];
  readonly time: Scalars["String"];
  readonly type: Scalars["Int"];
  readonly queueId: Scalars["ID"];
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

export type ISignInInput = {
  readonly username: Scalars["String"];
  readonly password: Scalars["String"];
  readonly server: Scalars["String"];
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
  readonly name: Scalars["String"];
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
  Int: Scalars["Int"];
  BuildingSpots: IBuildingSpots;
  BuildingSpot: IBuildingSpot;
  BuildingSpotLevel: IBuildingSpotLevel;
  String: Scalars["String"];
  ResourceFields: IResourceFields;
  BuildingQueue: IBuildingQueue;
  QueuedBuilding: IQueuedBuilding;
  Boolean: Scalars["Boolean"];
  Cost: ICost;
  ID: Scalars["ID"];
  AvailableNewBuildingsInput: IAvailableNewBuildingsInput;
  NewBuildingInfo: INewBuildingInfo;
  BuildingInProgress: IBuildingInProgress;
  Village: IVillage;
  Mutation: {};
  QueuedBuildingManipulationInput: IQueuedBuildingManipulationInput;
  DequeueBuildingAtFieldInput: IDequeueBuildingAtFieldInput;
  EnqueueBuildingInput: IEnqueueBuildingInput;
  SignInInput: ISignInInput;
  Building: IBuilding;
  ClearQueueInput: IClearQueueInput;
  UserAccount: IUserAccount;
};

export type IBuildingResolvers<
  ContextType = IGraphQLContext,
  ParentType = IResolversTypes["Building"]
> = {
  lol?: Resolver<Maybe<IResolversTypes["Int"]>, ParentType, ContextType>;
};

export type IBuildingInProgressResolvers<
  ContextType = IGraphQLContext,
  ParentType = IResolversTypes["BuildingInProgress"]
> = {
  level?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  timer?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  type?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
};

export type IBuildingQueueResolvers<
  ContextType = IGraphQLContext,
  ParentType = IResolversTypes["BuildingQueue"]
> = {
  buildings?: Resolver<
    ReadonlyArray<IResolversTypes["QueuedBuilding"]>,
    ParentType,
    ContextType
  >;
  totalCost?: Resolver<IResolversTypes["Cost"], ParentType, ContextType>;
  totalBuildingTime?: Resolver<
    IResolversTypes["String"],
    ParentType,
    ContextType
  >;
};

export type IBuildingSpotResolvers<
  ContextType = IGraphQLContext,
  ParentType = IResolversTypes["BuildingSpot"]
> = {
  fieldId?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  level?: Resolver<
    Maybe<IResolversTypes["BuildingSpotLevel"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  type?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
};

export type IBuildingSpotLevelResolvers<
  ContextType = IGraphQLContext,
  ParentType = IResolversTypes["BuildingSpotLevel"]
> = {
  actual?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  max?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  ongoing?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  queued?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  total?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
};

export type IBuildingSpotsResolvers<
  ContextType = IGraphQLContext,
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

export type ICostResolvers<
  ContextType = IGraphQLContext,
  ParentType = IResolversTypes["Cost"]
> = {
  wood?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  clay?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  iron?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  crop?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  total?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  freeCrop?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
};

export type IMutationResolvers<
  ContextType = IGraphQLContext,
  ParentType = IResolversTypes["Mutation"]
> = {
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
  startBot?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
  stopBot?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
  signIn?: Resolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType,
    IMutationSignInArgs
  >;
};

export type INewBuildingInfoResolvers<
  ContextType = IGraphQLContext,
  ParentType = IResolversTypes["NewBuildingInfo"]
> = {
  name?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  type?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
};

export type IQueryResolvers<
  ContextType = IGraphQLContext,
  ParentType = IResolversTypes["Query"]
> = {
  buildingSpots?: Resolver<
    IResolversTypes["BuildingSpots"],
    ParentType,
    ContextType,
    IQueryBuildingSpotsArgs
  >;
  buildingQueue?: Resolver<
    IResolversTypes["BuildingQueue"],
    ParentType,
    ContextType,
    IQueryBuildingQueueArgs
  >;
  availableNewBuildings?: Resolver<
    ReadonlyArray<IResolversTypes["NewBuildingInfo"]>,
    ParentType,
    ContextType,
    IQueryAvailableNewBuildingsArgs
  >;
  buildingsInProgress?: Resolver<
    ReadonlyArray<IResolversTypes["BuildingInProgress"]>,
    ParentType,
    ContextType,
    IQueryBuildingsInProgressArgs
  >;
  isBotRunning?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
  isSignedIn?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
  villages?: Resolver<
    ReadonlyArray<IResolversTypes["Village"]>,
    ParentType,
    ContextType
  >;
  villageExists?: Resolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType,
    IQueryVillageExistsArgs
  >;
};

export type IQueuedBuildingResolvers<
  ContextType = IGraphQLContext,
  ParentType = IResolversTypes["QueuedBuilding"]
> = {
  canMoveDown?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
  canMoveUp?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
  cost?: Resolver<IResolversTypes["Cost"], ParentType, ContextType>;
  level?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  time?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  type?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  queueId?: Resolver<IResolversTypes["ID"], ParentType, ContextType>;
};

export type IResourceFieldsResolvers<
  ContextType = IGraphQLContext,
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

export type IUserAccountResolvers<
  ContextType = IGraphQLContext,
  ParentType = IResolversTypes["UserAccount"]
> = {
  username?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  password?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  server?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
};

export type IVillageResolvers<
  ContextType = IGraphQLContext,
  ParentType = IResolversTypes["Village"]
> = {
  id?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
};

export type IResolvers<ContextType = IGraphQLContext> = {
  Building?: IBuildingResolvers<ContextType>;
  BuildingInProgress?: IBuildingInProgressResolvers<ContextType>;
  BuildingQueue?: IBuildingQueueResolvers<ContextType>;
  BuildingSpot?: IBuildingSpotResolvers<ContextType>;
  BuildingSpotLevel?: IBuildingSpotLevelResolvers<ContextType>;
  BuildingSpots?: IBuildingSpotsResolvers<ContextType>;
  Cost?: ICostResolvers<ContextType>;
  Mutation?: IMutationResolvers<ContextType>;
  NewBuildingInfo?: INewBuildingInfoResolvers<ContextType>;
  Query?: IQueryResolvers<ContextType>;
  QueuedBuilding?: IQueuedBuildingResolvers<ContextType>;
  ResourceFields?: IResourceFieldsResolvers<ContextType>;
  UserAccount?: IUserAccountResolvers<ContextType>;
  Village?: IVillageResolvers<ContextType>;
};
