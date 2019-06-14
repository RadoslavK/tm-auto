export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
};

export type IAvailableNewBuilding = {
  readonly type: Scalars["Int"];
  readonly name: Scalars["String"];
};

export type IAvailableNewBuildingsInput = {
  readonly fieldId: Scalars["Int"];
  readonly villageId: Scalars["Int"];
};

export type IBuildingCostInput = {
  readonly buildingType: Scalars["Int"];
  readonly level: Scalars["Int"];
};

export type IBuildingInProgress = {
  readonly level: Scalars["Int"];
  readonly finishedAt: Scalars["Date"];
  readonly name: Scalars["String"];
  readonly type: Scalars["Int"];
};

export type IBuildingQueue = {
  readonly buildings: ReadonlyArray<IQueuedBuilding>;
  readonly totalCost: ICost;
};

export type IBuildingSpot = {
  readonly fieldId: Scalars["Int"];
  readonly level?: Maybe<IBuildingSpotLevel>;
  readonly name: Scalars["String"];
  readonly type: Scalars["Int"];
};

export type IBuildingSpotLevel = {
  readonly actual: Scalars["Int"];
  readonly ongoing: Scalars["Int"];
  readonly queued: Scalars["Int"];
  readonly max: Scalars["Int"];
  readonly total: Scalars["Int"];
};

export type IBuildingSpots = {
  readonly infrastructure: ReadonlyArray<IBuildingSpot>;
  readonly resources: IResourceFields;
};

export type IClearQueueInput = {
  readonly villageId: Scalars["Int"];
};

export type ICoords = {
  readonly x: Scalars["Int"];
  readonly y: Scalars["Int"];
};

export type ICost = {
  readonly resources: IResources;
  readonly buildingTime: Scalars["Int"];
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
  readonly startBot: Scalars["Boolean"];
  readonly stopBot: Scalars["Boolean"];
  readonly clearQueue: Scalars["Boolean"];
  readonly dequeueBuilding: Scalars["Boolean"];
  readonly dequeueBuildingAtField: Scalars["Boolean"];
  readonly enqueueBuilding: Scalars["Boolean"];
  readonly moveQueuedBuildingDown: Scalars["Boolean"];
  readonly moveQueuedBuildingUp: Scalars["Boolean"];
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

export type IQuery = {
  readonly availableNewBuildings: ReadonlyArray<IAvailableNewBuilding>;
  readonly buildingName: Scalars["String"];
  readonly buildingSpots: IBuildingSpots;
  readonly maxBuildingLevel: Scalars["Int"];
  readonly buildingsInProgress: ReadonlyArray<IBuildingInProgress>;
  readonly isBotRunning: Scalars["Boolean"];
  readonly buildingQueue: IBuildingQueue;
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

export type IQueryVillageArgs = {
  villageId: Scalars["Int"];
};

export type IQueuedBuilding = {
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
  readonly wood: ReadonlyArray<IBuildingSpot>;
  readonly clay: ReadonlyArray<IBuildingSpot>;
  readonly iron: ReadonlyArray<IBuildingSpot>;
  readonly crop: ReadonlyArray<IBuildingSpot>;
};

export type IResources = {
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
  readonly buildingsUpdated: Scalars["Boolean"];
  readonly updateVillage: Scalars["Boolean"];
};

export type ISubscriptionBuildingsUpdatedArgs = {
  villageId: Scalars["Int"];
};

export type ISubscriptionUpdateVillageArgs = {
  villageId: Scalars["Int"];
};

export type IUserAccount = {
  readonly username: Scalars["String"];
  readonly password: Scalars["String"];
  readonly server: Scalars["String"];
};

export type IVillage = {
  readonly id: Scalars["Int"];
  readonly coords: ICoords;
  readonly name: Scalars["String"];
  readonly resources: IVillageResources;
};

export type IVillageCapacity = {
  readonly granary: Scalars["Int"];
  readonly warehouse: Scalars["Int"];
};

export type IVillageResources = {
  readonly amount: IResources;
  readonly capacity: IVillageCapacity;
  readonly production: IResources;
};
export type IBuildingSpotFragmentFragment = Pick<
  IBuildingSpot,
  "fieldId" | "type" | "name"
> & {
  readonly level: Maybe<
    Pick<IBuildingSpotLevel, "actual" | "ongoing" | "queued" | "total" | "max">
  >;
};

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

export type IGetAvailableNewBuildingsQueryVariables = {
  input: IAvailableNewBuildingsInput;
};

export type IGetAvailableNewBuildingsQuery = {
  readonly availableNewBuildings: ReadonlyArray<
    Pick<IAvailableNewBuilding, "name" | "type">
  >;
};

export type IGetMaxBuildingLevelQueryVariables = {
  buildingType: Scalars["Int"];
};

export type IGetMaxBuildingLevelQuery = Pick<IQuery, "maxBuildingLevel">;

export type IGetBuildingNameQueryVariables = {
  buildingType: Scalars["Int"];
};

export type IGetBuildingNameQuery = Pick<IQuery, "buildingName">;

export type IBuildingsUpdatedSubscriptionVariables = {
  villageId: Scalars["Int"];
};

export type IBuildingsUpdatedSubscription = Pick<
  ISubscription,
  "buildingsUpdated"
>;

export type IGetBuildingsInProgressQueryVariables = {
  villageId: Scalars["Int"];
};

export type IGetBuildingsInProgressQuery = {
  readonly buildingsInProgress: ReadonlyArray<
    Pick<IBuildingInProgress, "level" | "finishedAt" | "name" | "type">
  >;
};

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

export type IResourcesFragmentFragment = Pick<
  IResources,
  "wood" | "clay" | "iron" | "crop" | "total" | "freeCrop"
>;

export type ICostFragmentFragment = Pick<ICost, "buildingTime"> & {
  readonly resources: IResourcesFragmentFragment;
};

export type ICoordsFragmentFragment = Pick<ICoords, "x" | "y">;

export type IClearQueueMutationVariables = {
  villageId: Scalars["Int"];
};

export type IClearQueueMutation = Pick<IMutation, "clearQueue">;

export type IEnqueueBuildingMutationVariables = {
  input?: Maybe<IEnqueueBuildingInput>;
};

export type IEnqueueBuildingMutation = Pick<IMutation, "enqueueBuilding">;

export type IDequeueBuildingMutationVariables = {
  input?: Maybe<IQueuedBuildingManipulationInput>;
};

export type IDequeueBuildingMutation = Pick<IMutation, "dequeueBuilding">;

export type IDequeueBuildingAtFieldMutationVariables = {
  input?: Maybe<IDequeueBuildingAtFieldInput>;
};

export type IDequeueBuildingAtFieldMutation = Pick<
  IMutation,
  "dequeueBuildingAtField"
>;

export type IMoveQueuedBuildingDownMutationVariables = {
  input: IQueuedBuildingManipulationInput;
};

export type IMoveQueuedBuildingDownMutation = Pick<
  IMutation,
  "moveQueuedBuildingDown"
>;

export type IMoveQueuedBuildingUpMutationVariables = {
  input: IQueuedBuildingManipulationInput;
};

export type IMoveQueuedBuildingUpMutation = Pick<
  IMutation,
  "moveQueuedBuildingUp"
>;

export type IGetQueuedBuildingsQueryVariables = {
  villageId: Scalars["Int"];
};

export type IGetQueuedBuildingsQuery = {
  readonly buildingQueue: {
    readonly buildings: ReadonlyArray<
      Pick<
        IQueuedBuilding,
        "canMoveDown" | "canMoveUp" | "name" | "level" | "type" | "queueId"
      > & { readonly cost: ICostFragmentFragment }
    >;
    readonly totalCost: ICostFragmentFragment;
  };
};

export type IGetVillageByIdQueryVariables = {
  villageId: Scalars["Int"];
};

export type IGetVillageByIdQuery = {
  readonly village: Maybe<
    Pick<IVillage, "id" | "name"> & {
      readonly coords: ICoordsFragmentFragment;
      readonly resources: {
        readonly amount: IResourcesFragmentFragment;
        readonly capacity: Pick<IVillageCapacity, "granary" | "warehouse">;
        readonly production: IResourcesFragmentFragment;
      };
    }
  >;
};

export type IGetVillagesQueryVariables = {};

export type IGetVillagesQuery = {
  readonly villages: ReadonlyArray<Pick<IVillage, "id" | "name">>;
};

export type IUpdateVillageSubscriptionVariables = {
  villageId: Scalars["Int"];
};

export type IUpdateVillageSubscription = Pick<ISubscription, "updateVillage">;
