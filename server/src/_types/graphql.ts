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

export type IBuilding = {
  __typename?: "Building";
  readonly level: IBuildingLevel;
  readonly type: Scalars["Int"];
};

export type IBuildingLevel = {
  __typename?: "BuildingLevel";
  readonly actual: Scalars["Int"];
  readonly ongoing: Scalars["Int"];
};

export type IDequeueBuildingInput = {
  readonly villageId: Scalars["ID"];
  readonly fieldId: Scalars["Int"];
};

export type IEnqueueBuildingInput = {
  readonly buildingType: Scalars["Int"];
  readonly fieldId: Scalars["Int"];
  readonly villageId: Scalars["ID"];
};

export type IMutation = {
  __typename?: "Mutation";
  readonly enqueueBuilding: Scalars["Boolean"];
  readonly dequeueBuilding: Scalars["Boolean"];
  readonly startBot: Scalars["Boolean"];
  readonly stopBot: Scalars["Boolean"];
  readonly signIn: Scalars["Boolean"];
};

export type IMutationEnqueueBuildingArgs = {
  input?: Maybe<IEnqueueBuildingInput>;
};

export type IMutationDequeueBuildingArgs = {
  input?: Maybe<IDequeueBuildingInput>;
};

export type IMutationSignInArgs = {
  account: ISignInInput;
};

export type IQuery = {
  __typename?: "Query";
  readonly buildings: ReadonlyArray<IBuilding>;
  readonly buildingQueue: ReadonlyArray<IQueuedBuilding>;
  readonly isBotRunning: Scalars["Boolean"];
  readonly isSignedIn: Scalars["Boolean"];
  readonly villages: ReadonlyArray<IVillage>;
  readonly villageExists: Scalars["Boolean"];
};

export type IQueryBuildingsArgs = {
  villageId: Scalars["ID"];
};

export type IQueryBuildingQueueArgs = {
  villageId: Scalars["ID"];
};

export type IQueryVillageExistsArgs = {
  villageId: Scalars["ID"];
};

export type IQueuedBuilding = {
  __typename?: "QueuedBuilding";
  readonly fieldId: Scalars["Int"];
  readonly buildingType: Scalars["Int"];
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
  readonly id: Scalars["ID"];
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
  ID: Scalars["ID"];
  Building: IBuilding;
  BuildingLevel: IBuildingLevel;
  Int: Scalars["Int"];
  QueuedBuilding: IQueuedBuilding;
  Boolean: Scalars["Boolean"];
  Village: IVillage;
  String: Scalars["String"];
  Mutation: {};
  EnqueueBuildingInput: IEnqueueBuildingInput;
  DequeueBuildingInput: IDequeueBuildingInput;
  SignInInput: ISignInInput;
  UserAccount: IUserAccount;
};

export type IBuildingResolvers<
  ContextType = IGraphQLContext,
  ParentType = IResolversTypes["Building"]
> = {
  level?: Resolver<IResolversTypes["BuildingLevel"], ParentType, ContextType>;
  type?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
};

export type IBuildingLevelResolvers<
  ContextType = IGraphQLContext,
  ParentType = IResolversTypes["BuildingLevel"]
> = {
  actual?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  ongoing?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
};

export type IMutationResolvers<
  ContextType = IGraphQLContext,
  ParentType = IResolversTypes["Mutation"]
> = {
  enqueueBuilding?: Resolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType,
    IMutationEnqueueBuildingArgs
  >;
  dequeueBuilding?: Resolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType,
    IMutationDequeueBuildingArgs
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

export type IQueryResolvers<
  ContextType = IGraphQLContext,
  ParentType = IResolversTypes["Query"]
> = {
  buildings?: Resolver<
    ReadonlyArray<IResolversTypes["Building"]>,
    ParentType,
    ContextType,
    IQueryBuildingsArgs
  >;
  buildingQueue?: Resolver<
    ReadonlyArray<IResolversTypes["QueuedBuilding"]>,
    ParentType,
    ContextType,
    IQueryBuildingQueueArgs
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
  fieldId?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  buildingType?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
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
  id?: Resolver<IResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
};

export type IResolvers<ContextType = IGraphQLContext> = {
  Building?: IBuildingResolvers<ContextType>;
  BuildingLevel?: IBuildingLevelResolvers<ContextType>;
  Mutation?: IMutationResolvers<ContextType>;
  Query?: IQueryResolvers<ContextType>;
  QueuedBuilding?: IQueuedBuildingResolvers<ContextType>;
  UserAccount?: IUserAccountResolvers<ContextType>;
  Village?: IVillageResolvers<ContextType>;
};
