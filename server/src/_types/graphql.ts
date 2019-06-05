import { GraphQLResolveInfo } from "graphql";
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
  level: IBuildingLevel;
  type: Scalars["Int"];
};

export type IBuildingLevel = {
  __typename?: "BuildingLevel";
  actual: Scalars["Int"];
  ongoing: Scalars["Int"];
};

export type IMutation = {
  __typename?: "Mutation";
  startBot: Scalars["Boolean"];
  stopBot: Scalars["Boolean"];
  signIn: Scalars["Boolean"];
};

export type IMutationSignInArgs = {
  account: ISignInInput;
};

export type IQuery = {
  __typename?: "Query";
  isBotRunning: Scalars["Boolean"];
  isSignedIn: Scalars["Boolean"];
  villages: Array<IVillage>;
  village: IVillage;
};

export type IQueryVillageArgs = {
  id: Scalars["ID"];
};

export type ISignInInput = {
  username: Scalars["String"];
  password: Scalars["String"];
  server: Scalars["String"];
};

export type IUserAccount = {
  __typename?: "UserAccount";
  username: Scalars["String"];
  password: Scalars["String"];
  server: Scalars["String"];
};

export type IVillage = {
  __typename?: "Village";
  id: Scalars["ID"];
  name: Scalars["String"];
  buildings: Array<IBuilding>;
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
  Boolean: Scalars["Boolean"];
  Village: IVillage;
  ID: Scalars["ID"];
  String: Scalars["String"];
  Building: IBuilding;
  BuildingLevel: IBuildingLevel;
  Int: Scalars["Int"];
  Mutation: {};
  SignInInput: ISignInInput;
  UserAccount: IUserAccount;
};

export type IBuildingResolvers<
  ContextType = any,
  ParentType = IResolversTypes["Building"]
> = {
  level?: Resolver<IResolversTypes["BuildingLevel"], ParentType, ContextType>;
  type?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
};

export type IBuildingLevelResolvers<
  ContextType = any,
  ParentType = IResolversTypes["BuildingLevel"]
> = {
  actual?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  ongoing?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
};

export type IMutationResolvers<
  ContextType = any,
  ParentType = IResolversTypes["Mutation"]
> = {
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
  ContextType = any,
  ParentType = IResolversTypes["Query"]
> = {
  isBotRunning?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
  isSignedIn?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
  villages?: Resolver<
    Array<IResolversTypes["Village"]>,
    ParentType,
    ContextType
  >;
  village?: Resolver<
    IResolversTypes["Village"],
    ParentType,
    ContextType,
    IQueryVillageArgs
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
  id?: Resolver<IResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  buildings?: Resolver<
    Array<IResolversTypes["Building"]>,
    ParentType,
    ContextType
  >;
};

export type IResolvers<ContextType = any> = {
  Building?: IBuildingResolvers<ContextType>;
  BuildingLevel?: IBuildingLevelResolvers<ContextType>;
  Mutation?: IMutationResolvers<ContextType>;
  Query?: IQueryResolvers<ContextType>;
  UserAccount?: IUserAccountResolvers<ContextType>;
  Village?: IVillageResolvers<ContextType>;
};
