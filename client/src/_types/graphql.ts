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

export type IMutation = {
  readonly startBot: Scalars["Boolean"];
  readonly stopBot: Scalars["Boolean"];
  readonly signIn: Scalars["Boolean"];
};

export type IMutationSignInArgs = {
  account: ISignInInput;
};

export type IQuery = {
  readonly isBotRunning: Scalars["Boolean"];
  readonly isSignedIn: Scalars["Boolean"];
  readonly villages: ReadonlyArray<IVillage>;
  readonly village: IVillage;
};

export type IQueryVillageArgs = {
  id: Scalars["ID"];
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
  readonly buildings: ReadonlyArray<IBuilding>;
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

export type IGetVillageByIdQueryVariables = {
  id: Scalars["ID"];
};

export type IGetVillageByIdQuery = {
  readonly village: Pick<IVillage, "name"> & {
    readonly buildings: ReadonlyArray<
      Pick<IBuilding, "type"> & {
        readonly level: Pick<IBuildingLevel, "actual" | "ongoing">;
      }
    >;
  };
};

export type IGetVillagesQueryVariables = {};

export type IGetVillagesQuery = {
  readonly villages: ReadonlyArray<Pick<IVillage, "id" | "name">>;
};
