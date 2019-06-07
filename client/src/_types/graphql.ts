export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type IBuildingInProgress = {
  readonly level: Scalars["Int"];
  readonly timer: Scalars["Int"];
  readonly type: Scalars["Int"];
};

export type IBuildingLevel = {
  readonly actual: Scalars["Int"];
  readonly inProgress: Scalars["Int"];
  readonly queued: Scalars["Int"];
};

export type IBuildingSpot = {
  readonly fieldId: Scalars["Int"];
  readonly level: IBuildingLevel;
  readonly type: Scalars["Int"];
};

export type IClearQueueInput = {
  readonly villageId: Scalars["Int"];
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
  input?: Maybe<IClearQueueInput>;
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
  readonly imageLink: Scalars["String"];
  readonly name: Scalars["String"];
  readonly type: Scalars["Int"];
};

export type IQuery = {
  readonly buildingSpots: ReadonlyArray<IBuildingSpot>;
  readonly buildingsInProgress: ReadonlyArray<IBuildingInProgress>;
  readonly queuedBuildings: ReadonlyArray<IQueuedBuilding>;
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

export type IQueryQueuedBuildingsArgs = {
  villageId: Scalars["Int"];
};

export type IQueryAvailableNewBuildingsArgs = {
  villageId: Scalars["Int"];
};

export type IQueryVillageExistsArgs = {
  villageId: Scalars["Int"];
};

export type IQueuedBuilding = {
  readonly fieldId: Scalars["Int"];
  readonly type: Scalars["Int"];
  readonly queueIndex: Scalars["Int"];
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
export type IGetBuildingSpotsQueryVariables = {
  villageId: Scalars["Int"];
};

export type IGetBuildingSpotsQuery = {
  readonly buildingSpots: ReadonlyArray<
    Pick<IBuildingSpot, "fieldId" | "type"> & {
      readonly level: Pick<IBuildingLevel, "actual" | "inProgress" | "queued">;
    }
  >;
};

export type IGetQueuedBuildingsQueryVariables = {
  villageId: Scalars["Int"];
};

export type IGetQueuedBuildingsQuery = {
  readonly queuedBuildings: ReadonlyArray<
    Pick<IQueuedBuilding, "fieldId" | "type" | "queueIndex">
  >;
};

export type IGetBuildingsInProgressQueryVariables = {
  villageId: Scalars["Int"];
};

export type IGetBuildingsInProgressQuery = {
  readonly buildingsInProgress: ReadonlyArray<
    Pick<IBuildingInProgress, "level" | "timer" | "type">
  >;
};

export type IGetAvailableNewBuildingsQueryVariables = {
  villageId: Scalars["Int"];
};

export type IGetAvailableNewBuildingsQuery = {
  readonly availableNewBuildings: ReadonlyArray<
    Pick<INewBuildingInfo, "imageLink" | "name" | "type">
  >;
};

export type IClearQueueMutationVariables = {
  input?: Maybe<IClearQueueInput>;
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
