export type Maybe<T> = T | null;
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
  readonly lol?: Maybe<Scalars["Int"]>;
};

export type IBuildingInProgress = {
  readonly level: Scalars["Int"];
  readonly time: Scalars["String"];
  readonly type: Scalars["Int"];
};

export type IBuildingLevel = {
  readonly actual: Scalars["Int"];
  readonly inProgress: Scalars["Int"];
  readonly queued: Scalars["Int"];
  readonly total: Scalars["Int"];
};

export type IBuildingQueue = {
  readonly buildings: ReadonlyArray<IQueuedBuilding>;
  readonly totalCost: ICost;
  readonly totalBuildingTime: Scalars["String"];
};

export type IBuildingSpot = {
  readonly fieldId: Scalars["Int"];
  readonly level: IBuildingLevel;
  readonly type: Scalars["Int"];
};

export type IBuildingSpots = {
  readonly infrastructure: ReadonlyArray<IBuildingSpot>;
  readonly resources: IResourceFields;
};

export type IClearQueueInput = {
  readonly villageId: Scalars["Int"];
};

export type ICost = {
  readonly wood: Scalars["Int"];
  readonly clay: Scalars["Int"];
  readonly iron: Scalars["Int"];
  readonly crop: Scalars["Int"];
  readonly total: Scalars["Int"];
  readonly freeCrop: Scalars["Int"];
};

export type IDequeueBuildingInput = {
  readonly villageId: Scalars["Int"];
  readonly queueIndex: Scalars["Int"];
};

export type IEnqueueBuildingInput = {
  readonly fieldId: Scalars["Int"];
  readonly type: Scalars["Int"];
  readonly villageId: Scalars["Int"];
};

export type IMutation = {
  readonly clearQueue: Scalars["Boolean"];
  readonly dequeueBuilding: Scalars["Boolean"];
  readonly enqueueBuilding: Scalars["Boolean"];
  readonly startBot: Scalars["Boolean"];
  readonly stopBot: Scalars["Boolean"];
  readonly signIn: Scalars["Boolean"];
};

export type IMutationClearQueueArgs = {
  villageId: Scalars["Int"];
};

export type IMutationDequeueBuildingArgs = {
  input?: Maybe<IDequeueBuildingInput>;
};

export type IMutationEnqueueBuildingArgs = {
  input?: Maybe<IEnqueueBuildingInput>;
};

export type IMutationSignInArgs = {
  account: ISignInInput;
};

export type INewBuildingInfo = {
  readonly name: Scalars["String"];
  readonly type: Scalars["Int"];
};

export type IQuery = {
  readonly buildingSpots: IBuildingSpots;
  readonly buildingsInProgress: ReadonlyArray<IBuildingInProgress>;
  readonly buildingQueue: IBuildingQueue;
  readonly availableNewBuildings: ReadonlyArray<INewBuildingInfo>;
  readonly isBotRunning: Scalars["Boolean"];
  readonly isSignedIn: Scalars["Boolean"];
  readonly villages: ReadonlyArray<IVillage>;
  readonly villageExists: Scalars["Boolean"];
};

export type IQueryBuildingSpotsArgs = {
  villageId: Scalars["Int"];
};

export type IQueryBuildingsInProgressArgs = {
  villageId: Scalars["Int"];
};

export type IQueryBuildingQueueArgs = {
  villageId: Scalars["Int"];
};

export type IQueryAvailableNewBuildingsArgs = {
  input: IAvailableNewBuildingsInput;
};

export type IQueryVillageExistsArgs = {
  villageId: Scalars["Int"];
};

export type IQueuedBuilding = {
  readonly cost: ICost;
  readonly level: Scalars["Int"];
  readonly name: Scalars["String"];
  readonly time: Scalars["String"];
  readonly type: Scalars["Int"];
  readonly queueIndex: Scalars["Int"];
};

export type IResourceFields = {
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
  readonly username: Scalars["String"];
  readonly password: Scalars["String"];
  readonly server: Scalars["String"];
};

export type IVillage = {
  readonly id: Scalars["Int"];
  readonly name: Scalars["String"];
};
export type IBuildingSpotFragmentFragment = Pick<
  IBuildingSpot,
  "fieldId" | "type"
> & {
  readonly level: Pick<
    IBuildingLevel,
    "actual" | "inProgress" | "queued" | "total"
  >;
};

export type ICostFragmentFragment = Pick<
  ICost,
  "wood" | "clay" | "iron" | "crop" | "total" | "freeCrop"
>;

export type IGetBuildingSpotsQueryVariables = {
  villageId: Scalars["Int"];
};

export type IGetBuildingSpotsQuery = {
  readonly buildingSpots: {
    readonly infrastructure: ReadonlyArray<IBuildingSpotFragmentFragment>;
    readonly resources: {
      readonly wood: ReadonlyArray<IBuildingSpotFragmentFragment>;
      readonly clay: ReadonlyArray<IBuildingSpotFragmentFragment>;
      readonly iron: ReadonlyArray<IBuildingSpotFragmentFragment>;
      readonly crop: ReadonlyArray<IBuildingSpotFragmentFragment>;
    };
  };
};

export type IGetQueuedBuildingsQueryVariables = {
  villageId: Scalars["Int"];
};

export type IGetQueuedBuildingsQuery = {
  readonly buildingQueue: Pick<IBuildingQueue, "totalBuildingTime"> & {
    readonly buildings: ReadonlyArray<
      Pick<
        IQueuedBuilding,
        "level" | "name" | "time" | "type" | "queueIndex"
      > & { readonly cost: ICostFragmentFragment }
    >;
    readonly totalCost: ICostFragmentFragment;
  };
};

export type IGetBuildingsInProgressQueryVariables = {
  villageId: Scalars["Int"];
};

export type IGetBuildingsInProgressQuery = {
  readonly buildingsInProgress: ReadonlyArray<
    Pick<IBuildingInProgress, "level" | "time" | "type">
  >;
};

export type IGetAvailableNewBuildingsQueryVariables = {
  input: IAvailableNewBuildingsInput;
};

export type IGetAvailableNewBuildingsQuery = {
  readonly availableNewBuildings: ReadonlyArray<
    Pick<INewBuildingInfo, "name" | "type">
  >;
};

export type IClearQueueMutationVariables = {
  villageId: Scalars["Int"];
};

export type IClearQueueMutation = Pick<IMutation, "clearQueue">;

export type IEnqueueBuildingMutationVariables = {
  input?: Maybe<IEnqueueBuildingInput>;
};

export type IEnqueueBuildingMutation = Pick<IMutation, "enqueueBuilding">;

export type IDequeueBuildingMutationVariables = {
  input?: Maybe<IDequeueBuildingInput>;
};

export type IDequeueBuildingMutation = Pick<IMutation, "dequeueBuilding">;

export type IIsSignedInQueryVariables = {};

export type IIsSignedInQuery = Pick<IQuery, "isSignedIn">;

export type IIsBotRunningQueryVariables = {};

export type IIsBotRunningQuery = Pick<IQuery, "isBotRunning">;

export type ISignInMutationVariables = {
  account: ISignInInput;
};

export type ISignInMutation = Pick<IMutation, "signIn">;

export type IStartBotMutationVariables = {};

export type IStartBotMutation = Pick<IMutation, "startBot">;

export type IStopBotMutationVariables = {};

export type IStopBotMutation = Pick<IMutation, "stopBot">;

export type IGetVillagesQueryVariables = {};

export type IGetVillagesQuery = {
  readonly villages: ReadonlyArray<Pick<IVillage, "id" | "name">>;
};

export type IVillageExistsQueryVariables = {
  villageId: Scalars["Int"];
};

export type IVillageExistsQuery = Pick<IQuery, "villageExists">;
