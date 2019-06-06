export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type IBuilding = {
  readonly level: IBuildingLevel;
  readonly type: Scalars["Int"];
};

export type IBuildingLevel = {
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
  readonly fieldId: Scalars["Int"];
  readonly buildingType: Scalars["Int"];
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
  readonly id: Scalars["ID"];
  readonly name: Scalars["String"];
};
export type IGetVillageBuildingsQueryVariables = {
  villageId: Scalars["ID"];
};

export type IGetVillageBuildingsQuery = {
  readonly buildings: ReadonlyArray<
    Pick<IBuilding, "type"> & {
      readonly level: Pick<IBuildingLevel, "actual" | "ongoing">;
    }
  >;
};

export type IGetVillageBuildingQueueQueryVariables = {
  villageId: Scalars["ID"];
};

export type IGetVillageBuildingQueueQuery = {
  readonly buildingQueue: ReadonlyArray<
    Pick<IQueuedBuilding, "buildingType" | "fieldId">
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

export type IGetVillagesQueryVariables = {};

export type IGetVillagesQuery = {
  readonly villages: ReadonlyArray<Pick<IVillage, "id" | "name">>;
};

export type IVillageExistsQueryVariables = {
  villageId: Scalars["ID"];
};

export type IVillageExistsQuery = Pick<IQuery, "villageExists">;
