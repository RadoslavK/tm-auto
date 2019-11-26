export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export enum AdventureCriteria {
  Closest = 'Closest',
  Furthest = 'Furthest',
  Random = 'Random',
  FirstToExpire = 'FirstToExpire'
}

export type IAutoAdventureSettings = IITaskSettings & {
  readonly allow: Scalars['Boolean'],
  readonly coolDown: ICoolDown,
  readonly adventureCriteria: AdventureCriteria,
  readonly preferHard: Scalars['Boolean'],
  readonly normalMinHealth: Scalars['Int'],
  readonly hardMinHealth: Scalars['Int'],
  readonly maxTravelTime: IDuration,
  readonly preferredVillageId: Maybe<Scalars['Int']>,
};

export type IAutoAdventureSettingsInput = {
  readonly allow: Scalars['Boolean'],
  readonly coolDown: ICoolDownInput,
  readonly adventureCriteria: AdventureCriteria,
  readonly preferHard: Scalars['Boolean'],
  readonly normalMinHealth: Scalars['Int'],
  readonly hardMinHealth: Scalars['Int'],
  readonly maxTravelTime: IDurationInput,
  readonly preferredVillageId: Maybe<Scalars['Int']>,
};

export type IAutoBuildLogEntryContent = {
  readonly autoBuild: IAutoBuildLogEntryContentPayload,
};

export type IAutoBuildLogEntryContentPayload = {
  readonly name: Scalars['String'],
  readonly type: Scalars['Int'],
  readonly level: Scalars['Int'],
  readonly fieldId: Scalars['Int'],
};

export type IAutoBuildSettings = IITaskSettings & {
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

export type IAutoPartySettings = IITaskSettings & {
  readonly coolDown: ICoolDown,
  readonly allow: Scalars['Boolean'],
  readonly minCulturePoints: Scalars['Int'],
  readonly partyType: PartyType,
};

export type IAutoUnitsBuildingSettings = {
  readonly allow: Scalars['Boolean'],
  readonly maxBuildTime: IDuration,
  readonly units: ReadonlyArray<IAutoUnitsUnitSettings>,
};

export type IAutoUnitsLogEntryContent = {
  readonly autoUnits: IAutoUnitsLogEntryContentPayload,
};

export type IAutoUnitsLogEntryContentPayload = {
  readonly amount: Scalars['Int'],
  readonly index: Scalars['Int'],
  readonly tribe: Tribe,
  readonly unitName: Scalars['String'],
};

export type IAutoUnitsSettings = IITaskSettings & {
  readonly allow: Scalars['Boolean'],
  readonly coolDown: ICoolDown,
  readonly minCrop: Scalars['Int'],
  readonly barracks: IAutoUnitsBuildingSettings,
  readonly stable: IAutoUnitsBuildingSettings,
  readonly workshop: IAutoUnitsBuildingSettings,
  readonly residence: IAutoUnitsBuildingSettings,
};

export type IAutoUnitsUnitSettings = {
  readonly index: Scalars['Int'],
  readonly autoBuild: Scalars['Boolean'],
  readonly trainForever: Scalars['Boolean'],
  readonly targetAmount: Scalars['Int'],
};

export type IAvailableNewBuilding = {
  readonly type: Scalars['Int'],
  readonly name: Scalars['String'],
};

export type IAvailableNewBuildingsInput = {
  readonly fieldId: Scalars['Int'],
  readonly villageId: Scalars['Int'],
};

export enum BotState {
  None = 'None',
  Pending = 'Pending',
  Running = 'Running',
  Stopping = 'Stopping',
  Paused = 'Paused'
}

export type IBuildingInProgress = {
  readonly level: Scalars['Int'],
  readonly finishedAt: ITimestamp,
  readonly name: Scalars['String'],
  readonly type: Scalars['Int'],
};

export type IBuildingQueue = {
  readonly buildings: ReadonlyArray<IQueuedBuilding>,
  readonly totalCost: ICost,
};

export type IBuildingSpot = {
  readonly fieldId: Scalars['Int'],
  readonly level: IBuildingSpotLevel,
  readonly name: Scalars['String'],
  readonly type: Scalars['Int'],
};

export type IBuildingSpotLevel = {
  readonly actual: Scalars['Int'],
  readonly ongoing: Scalars['Int'],
  readonly queued: Scalars['Int'],
  readonly max: Scalars['Int'],
  readonly total: Scalars['Int'],
};

export type IBuildingSpots = {
  readonly infrastructure: ReadonlyArray<IBuildingSpot>,
  readonly resources: IResourceFields,
};

export enum BuildingType {
  None = 'None'
}

export type IClearQueueInput = {
  readonly villageId: Scalars['Int'],
};

export type ICoolDown = {
  readonly min: IDuration,
  readonly max: IDuration,
};

export type ICoolDownInput = {
  readonly min: IDurationInput,
  readonly max: IDurationInput,
};

export type ICoords = {
  readonly x: Scalars['Int'],
  readonly y: Scalars['Int'],
};

export type ICost = {
  readonly resources: IResources,
  readonly buildTime: IDuration,
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

export type IDuration = {
  readonly hours: Scalars['Int'],
  readonly minutes: Scalars['Int'],
  readonly seconds: Scalars['Int'],
};

export type IDurationInput = {
  readonly hours: Scalars['Int'],
  readonly minutes: Scalars['Int'],
  readonly seconds: Scalars['Int'],
};

export type IEnqueueBuildingInput = {
  readonly fieldId: Scalars['Int'],
  readonly levels: Scalars['Int'],
  readonly type: Scalars['Int'],
  readonly villageId: Scalars['Int'],
};

export type IGameInfo = {
  readonly tribe: Tribe,
};

export type IGeneralSettings = {
  readonly allowTasks: Scalars['Boolean'],
  readonly autoBuild: Scalars['Boolean'],
  readonly autoUnits: Scalars['Boolean'],
};

export type IGeneralSettingsInput = {
  readonly allowTasks: Scalars['Boolean'],
  readonly autoBuild: Scalars['Boolean'],
  readonly autoUnits: Scalars['Boolean'],
};

export type IGeneralVillageSettings = {
  readonly allowTasks: Scalars['Boolean'],
};

export type IGeneralVillageSettingsInput = {
  readonly allowTasks: Scalars['Boolean'],
};

export type IHeroInformation = {
  readonly health: Scalars['Int'],
  readonly state: HeroState,
  readonly village: Maybe<IVillage>,
};

export type IHeroSettings = {
  readonly autoAdventure: IAutoAdventureSettings,
};

export enum HeroState {
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
  readonly id: Scalars['ID'],
  readonly timestamp: Scalars['Int'],
  readonly village: Maybe<IVillage>,
  readonly content: ILogEntryContent,
};

export type ILogEntryContent = ITextLogEntryContent | IAutoBuildLogEntryContent | IAutoUnitsLogEntryContent;

export type IMutation = {
  readonly createAccount: Maybe<Scalars['ID']>,
  readonly updateAccount: Scalars['Boolean'],
  readonly deleteAccount: Scalars['Boolean'],
  readonly signIn: Maybe<Scalars['Boolean']>,
  readonly signOut: Maybe<Scalars['Boolean']>,
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
  readonly updateAutoUnitsUnitSettings: Scalars['Boolean'],
  readonly updateAutoUnitsBuildingSettings: Scalars['Boolean'],
  readonly updateAutoUnitsSettings: Scalars['Boolean'],
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


export type IMutationUpdateAutoUnitsUnitSettingsArgs = {
  input: IUpdateAutoUnitsUnitSettingsInput
};


export type IMutationUpdateAutoUnitsBuildingSettingsArgs = {
  input: IUpdateAutoUnitsBuildingSettingsInput
};


export type IMutationUpdateAutoUnitsSettingsArgs = {
  input: IUpdateAutoUnitsSettingsInput
};

export enum PartyType {
  Small = 'Small',
  Large = 'Large'
}

export type IQuery = {
  readonly accounts: ReadonlyArray<IUserAccount>,
  readonly account: Maybe<IUserAccount>,
  readonly currentAccount: IUserAccount,
  readonly availableNewBuildings: ReadonlyArray<IAvailableNewBuilding>,
  readonly buildingName: Scalars['String'],
  readonly buildingSpots: IBuildingSpots,
  readonly maxBuildingLevel: Scalars['Int'],
  readonly buildingsInProgress: ReadonlyArray<IBuildingInProgress>,
  readonly botState: BotState,
  readonly heroInformation: IHeroInformation,
  readonly logsEntries: ReadonlyArray<ILogEntry>,
  readonly gameInfo: IGameInfo,
  readonly buildingQueue: IBuildingQueue,
  readonly generalSettings: IGeneralSettings,
  readonly hero: IHeroSettings,
  readonly villageSettings: IVillageSettings,
  readonly autoUnitsSettings: IAutoUnitsSettings,
  readonly unitInfo: IUnitInfo,
  readonly village: Maybe<IVillage>,
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


export type IQueryAutoUnitsSettingsArgs = {
  villageId: Scalars['Int']
};


export type IQueryUnitInfoArgs = {
  index: Scalars['Int']
};


export type IQueryVillageArgs = {
  villageId: Scalars['Int']
};

export type IQueuedBuilding = {
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
  readonly wood: ReadonlyArray<IBuildingSpot>,
  readonly clay: ReadonlyArray<IBuildingSpot>,
  readonly iron: ReadonlyArray<IBuildingSpot>,
  readonly crop: ReadonlyArray<IBuildingSpot>,
};

export type IResources = {
  readonly wood: Scalars['Int'],
  readonly clay: Scalars['Int'],
  readonly iron: Scalars['Int'],
  readonly crop: Scalars['Int'],
  readonly freeCrop: Scalars['Int'],
};

export type ISubscription = {
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
  readonly text: ITextLogEntryContentPayload,
};

export type ITextLogEntryContentPayload = {
  readonly message: Scalars['String'],
};

export type ITimestamp = {
  readonly totalSeconds: Scalars['Int'],
};

export enum Tribe {
  Romans = 'Romans',
  Teutons = 'Teutons',
  Gauls = 'Gauls',
  Nature = 'Nature',
  Natars = 'Natars',
  Egyptians = 'Egyptians',
  Huns = 'Huns'
}

export type IUnitInfo = {
  readonly name: Scalars['String'],
};

export type IUpdateAutoAdventureSettingsInput = {
  readonly settings: IAutoAdventureSettingsInput,
};

export type IUpdateAutoBuildVillageSettingsInput = {
  readonly villageId: Scalars['Int'],
  readonly settings: IAutoBuildVillageSettingsInput,
};

export type IUpdateAutoUnitsBuildingSettingsInput = {
  readonly villageId: Scalars['Int'],
  readonly buildingType: Scalars['Int'],
  readonly allow: Scalars['Boolean'],
  readonly maxBuildTime: IDurationInput,
};

export type IUpdateAutoUnitsSettingsInput = {
  readonly villageId: Scalars['Int'],
  readonly allow: Scalars['Boolean'],
  readonly coolDown: ICoolDownInput,
  readonly minCrop: Scalars['Int'],
};

export type IUpdateAutoUnitsUnitSettingsInput = {
  readonly villageId: Scalars['Int'],
  readonly unitIndex: Scalars['Int'],
  readonly autoBuild: Scalars['Boolean'],
  readonly trainForever: Scalars['Boolean'],
  readonly targetAmount: Scalars['Int'],
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
  readonly id: Scalars['ID'],
  readonly username: Scalars['String'],
  readonly password: Scalars['String'],
  readonly server: Scalars['String'],
};

export type IVillage = {
  readonly id: Scalars['Int'],
  readonly coords: ICoords,
  readonly name: Scalars['String'],
  readonly resources: IVillageResources,
};

export type IVillageCapacity = {
  readonly granary: Scalars['Int'],
  readonly warehouse: Scalars['Int'],
};

export type IVillageResources = {
  readonly amount: IResources,
  readonly capacity: IVillageCapacity,
  readonly production: IResources,
};

export type IVillageSettings = {
  readonly general: IGeneralVillageSettings,
  readonly autoBuild: IAutoBuildSettings,
  readonly autoUnits: IAutoUnitsSettings,
  readonly autoParty: IAutoPartySettings,
};

export type IUserAccountFragmentFragment = Pick<IUserAccount, 'id' | 'username' | 'password' | 'server'>;

export type IGetAccountsQueryVariables = {};


export type IGetAccountsQuery = { readonly accounts: ReadonlyArray<IUserAccountFragmentFragment> };

export type IGetCurrentAccountQueryVariables = {};


export type IGetCurrentAccountQuery = { readonly currentAccount: IUserAccountFragmentFragment };

export type IGetAccountQueryVariables = {
  accountId: Scalars['ID']
};


export type IGetAccountQuery = { readonly account: Maybe<IUserAccountFragmentFragment> };

export type ICreateAccountMutationVariables = {
  account: ICreateUserAccountInput
};


export type ICreateAccountMutation = Pick<IMutation, 'createAccount'>;

export type IUpdateAccountMutationVariables = {
  account: IUpdateUserAccountInput
};


export type IUpdateAccountMutation = Pick<IMutation, 'updateAccount'>;

export type IDeleteAccountMutationVariables = {
  accountId: Scalars['ID']
};


export type IDeleteAccountMutation = Pick<IMutation, 'deleteAccount'>;

export type IBuildingSpotFragmentFragment = (
  Pick<IBuildingSpot, 'fieldId' | 'type' | 'name'>
  & { readonly level: Pick<IBuildingSpotLevel, 'actual' | 'ongoing' | 'queued' | 'total' | 'max'> }
);

export type IGetBuildingSpotsQueryVariables = {
  villageId: Scalars['Int']
};


export type IGetBuildingSpotsQuery = { readonly buildingSpots: { readonly infrastructure: ReadonlyArray<IBuildingSpotFragmentFragment>, readonly resources: { readonly wood: ReadonlyArray<IBuildingSpotFragmentFragment>, readonly clay: ReadonlyArray<IBuildingSpotFragmentFragment>, readonly iron: ReadonlyArray<IBuildingSpotFragmentFragment>, readonly crop: ReadonlyArray<IBuildingSpotFragmentFragment> } } };

export type IGetAvailableNewBuildingsQueryVariables = {
  input: IAvailableNewBuildingsInput
};


export type IGetAvailableNewBuildingsQuery = { readonly availableNewBuildings: ReadonlyArray<Pick<IAvailableNewBuilding, 'name' | 'type'>> };

export type IGetMaxBuildingLevelQueryVariables = {
  buildingType: Scalars['Int']
};


export type IGetMaxBuildingLevelQuery = Pick<IQuery, 'maxBuildingLevel'>;

export type IGetBuildingNameQueryVariables = {
  buildingType: Scalars['Int']
};


export type IGetBuildingNameQuery = Pick<IQuery, 'buildingName'>;

export type IBuildingsUpdatedSubscriptionVariables = {
  villageId: Scalars['Int']
};


export type IBuildingsUpdatedSubscription = Pick<ISubscription, 'buildingsUpdated'>;

export type IGetBuildingsInProgressQueryVariables = {
  villageId: Scalars['Int']
};


export type IGetBuildingsInProgressQuery = { readonly buildingsInProgress: ReadonlyArray<(
    Pick<IBuildingInProgress, 'level' | 'name' | 'type'>
    & { readonly finishedAt: ITimestampFragment }
  )> };

export type IGetBotStateQueryVariables = {};


export type IGetBotStateQuery = Pick<IQuery, 'botState'>;

export type IStartBotMutationVariables = {};


export type IStartBotMutation = Pick<IMutation, 'startBot'>;

export type IStopBotMutationVariables = {};


export type IStopBotMutation = Pick<IMutation, 'stopBot'>;

export type ISignInMutationVariables = {
  accountId: Scalars['ID']
};


export type ISignInMutation = Pick<IMutation, 'signIn'>;

export type ISignOutMutationVariables = {};


export type ISignOutMutation = Pick<IMutation, 'signOut'>;

export type IOnBotRunningChangedSubscriptionVariables = {};


export type IOnBotRunningChangedSubscription = Pick<ISubscription, 'onBotRunningChanged'>;

export type IHeroInformationFragmentFragment = (
  Pick<IHeroInformation, 'health' | 'state'>
  & { readonly village: Maybe<(
    Pick<IVillage, 'id' | 'name'>
    & { readonly coords: ICoordsFragmentFragment }
  )> }
);

export type IGetHeroInformationQueryVariables = {};


export type IGetHeroInformationQuery = { readonly heroInformation: IHeroInformationFragmentFragment };

export type IOnHeroInformationUpdatedSubscriptionVariables = {};


export type IOnHeroInformationUpdatedSubscription = { readonly heroInformationUpdated: IHeroInformationFragmentFragment };

export type ILogEntryFragmentFragment = (
  Pick<ILogEntry, 'id' | 'timestamp'>
  & { readonly village: Maybe<(
    Pick<IVillage, 'id' | 'name'>
    & { readonly coords: ICoordsFragmentFragment }
  )>, readonly content: { readonly text: Pick<ITextLogEntryContentPayload, 'message'> } | { readonly autoBuild: Pick<IAutoBuildLogEntryContentPayload, 'fieldId' | 'level' | 'name' | 'type'> } | { readonly autoUnits: Pick<IAutoUnitsLogEntryContentPayload, 'amount' | 'index' | 'tribe' | 'unitName'> } }
);

export type IGetLogsQueryVariables = {};


export type IGetLogsQuery = { readonly logsEntries: ReadonlyArray<ILogEntryFragmentFragment> };

export type IOnLogEntryAddedSubscriptionVariables = {};


export type IOnLogEntryAddedSubscription = { readonly onLogEntryAdded: ILogEntryFragmentFragment };

export type ITimestampFragment = Pick<ITimestamp, 'totalSeconds'>;

export type IResourcesFragmentFragment = Pick<IResources, 'wood' | 'clay' | 'iron' | 'crop' | 'freeCrop'>;

export type ICostFragmentFragment = { readonly resources: IResourcesFragmentFragment, readonly buildTime: IDurationFragment };

export type ICoordsFragmentFragment = Pick<ICoords, 'x' | 'y'>;

export type IVillageFragmentFragment = (
  Pick<IVillage, 'id' | 'name'>
  & { readonly coords: ICoordsFragmentFragment, readonly resources: { readonly amount: IResourcesFragmentFragment, readonly production: IResourcesFragmentFragment, readonly capacity: Pick<IVillageCapacity, 'granary' | 'warehouse'> } }
);

export type IDurationFragment = Pick<IDuration, 'hours' | 'minutes' | 'seconds'>;

export type IGetGameInfoQueryVariables = {};


export type IGetGameInfoQuery = { readonly gameInfo: Pick<IGameInfo, 'tribe'> };

export type IClearQueueMutationVariables = {
  villageId: Scalars['Int']
};


export type IClearQueueMutation = Pick<IMutation, 'clearQueue'>;

export type IEnqueueBuildingMutationVariables = {
  input: IEnqueueBuildingInput
};


export type IEnqueueBuildingMutation = Pick<IMutation, 'enqueueBuilding'>;

export type IDequeueBuildingMutationVariables = {
  input: IQueuedBuildingManipulationInput
};


export type IDequeueBuildingMutation = Pick<IMutation, 'dequeueBuilding'>;

export type IDequeueBuildingAtFieldMutationVariables = {
  input: IDequeueBuildingAtFieldInput
};


export type IDequeueBuildingAtFieldMutation = Pick<IMutation, 'dequeueBuildingAtField'>;

export type IMoveQueuedBuildingDownMutationVariables = {
  input: IQueuedBuildingManipulationInput
};


export type IMoveQueuedBuildingDownMutation = Pick<IMutation, 'moveQueuedBuildingDown'>;

export type IMoveQueuedBuildingUpMutationVariables = {
  input: IQueuedBuildingManipulationInput
};


export type IMoveQueuedBuildingUpMutation = Pick<IMutation, 'moveQueuedBuildingUp'>;

export type IGetQueuedBuildingsQueryVariables = {
  villageId: Scalars['Int']
};


export type IGetQueuedBuildingsQuery = { readonly buildingQueue: { readonly buildings: ReadonlyArray<(
      Pick<IQueuedBuilding, 'canMoveDown' | 'canMoveUp' | 'name' | 'level' | 'type' | 'queueId'>
      & { readonly cost: ICostFragmentFragment }
    )>, readonly totalCost: ICostFragmentFragment } };

export type IOnQueueUpdatedSubscriptionVariables = {
  villageId: Scalars['Int']
};


export type IOnQueueUpdatedSubscription = Pick<ISubscription, 'onQueueUpdated'>;

type ITaskSettingsFragment_AutoAdventureSettings_Fragment = (
  Pick<IAutoAdventureSettings, 'allow'>
  & { readonly coolDown: { readonly min: IDurationFragment, readonly max: IDurationFragment } }
);

type ITaskSettingsFragment_AutoBuildSettings_Fragment = (
  Pick<IAutoBuildSettings, 'allow'>
  & { readonly coolDown: { readonly min: IDurationFragment, readonly max: IDurationFragment } }
);

type ITaskSettingsFragment_AutoUnitsSettings_Fragment = (
  Pick<IAutoUnitsSettings, 'allow'>
  & { readonly coolDown: { readonly min: IDurationFragment, readonly max: IDurationFragment } }
);

type ITaskSettingsFragment_AutoPartySettings_Fragment = (
  Pick<IAutoPartySettings, 'allow'>
  & { readonly coolDown: { readonly min: IDurationFragment, readonly max: IDurationFragment } }
);

export type ITaskSettingsFragmentFragment = ITaskSettingsFragment_AutoAdventureSettings_Fragment | ITaskSettingsFragment_AutoBuildSettings_Fragment | ITaskSettingsFragment_AutoUnitsSettings_Fragment | ITaskSettingsFragment_AutoPartySettings_Fragment;

export type IAutoUnitsUnitSettingsFragmentFragment = Pick<IAutoUnitsUnitSettings, 'autoBuild' | 'index' | 'targetAmount' | 'trainForever'>;

export type IAutoUnitsBuildingSettingsFragmentFragment = (
  Pick<IAutoUnitsBuildingSettings, 'allow'>
  & { readonly maxBuildTime: IDurationFragment, readonly units: ReadonlyArray<IAutoUnitsUnitSettingsFragmentFragment> }
);

export type IGetGeneralSettingsQueryVariables = {};


export type IGetGeneralSettingsQuery = { readonly generalSettings: Pick<IGeneralSettings, 'allowTasks' | 'autoBuild' | 'autoUnits'> };

export type IGetHeroSettingsQueryVariables = {};


export type IGetHeroSettingsQuery = { readonly hero: { readonly autoAdventure: (
      Pick<IAutoAdventureSettings, 'adventureCriteria' | 'hardMinHealth' | 'normalMinHealth' | 'preferHard' | 'preferredVillageId'>
      & { readonly maxTravelTime: IDurationFragment }
      & ITaskSettingsFragment_AutoAdventureSettings_Fragment
    ) } };

export type IGetVillageSettingsQueryVariables = {
  villageId: Scalars['Int']
};


export type IGetVillageSettingsQuery = { readonly villageSettings: { readonly general: Pick<IGeneralVillageSettings, 'allowTasks'>, readonly autoBuild: (
      Pick<IAutoBuildSettings, 'autoCropFields' | 'minCrop'>
      & ITaskSettingsFragment_AutoBuildSettings_Fragment
    ), readonly autoUnits: (
      Pick<IAutoUnitsSettings, 'minCrop'>
      & ITaskSettingsFragment_AutoUnitsSettings_Fragment
    ) } };

export type IGetAutoUnitsSettingsQueryVariables = {
  villageId: Scalars['Int']
};


export type IGetAutoUnitsSettingsQuery = { readonly autoUnitsSettings: (
    Pick<IAutoUnitsSettings, 'minCrop'>
    & { readonly barracks: IAutoUnitsBuildingSettingsFragmentFragment, readonly stable: IAutoUnitsBuildingSettingsFragmentFragment, readonly workshop: IAutoUnitsBuildingSettingsFragmentFragment, readonly residence: IAutoUnitsBuildingSettingsFragmentFragment }
    & ITaskSettingsFragment_AutoUnitsSettings_Fragment
  ) };

export type IUpdateGeneralSettingsMutationVariables = {
  input: IUpdateGeneralSettingsInput
};


export type IUpdateGeneralSettingsMutation = Pick<IMutation, 'updateGeneralSettings'>;

export type IUpdateAutoAdventureSettingsMutationVariables = {
  input: IUpdateAutoAdventureSettingsInput
};


export type IUpdateAutoAdventureSettingsMutation = Pick<IMutation, 'updateAutoAdventureSettings'>;

export type IUpdateGeneralVillageSettingsMutationVariables = {
  input: IUpdateGeneralVillageSettingsInput
};


export type IUpdateGeneralVillageSettingsMutation = Pick<IMutation, 'updateGeneralVillageSettings'>;

export type IUpdateAutoBuildVillageSettingsMutationVariables = {
  input: IUpdateAutoBuildVillageSettingsInput
};


export type IUpdateAutoBuildVillageSettingsMutation = Pick<IMutation, 'updateAutoBuildVillageSettings'>;

export type IUpdateAutoUnitsUnitSettingsMutationVariables = {
  input: IUpdateAutoUnitsUnitSettingsInput
};


export type IUpdateAutoUnitsUnitSettingsMutation = Pick<IMutation, 'updateAutoUnitsUnitSettings'>;

export type IUpdateAutoUnitsBuildingSettingsMutationVariables = {
  input: IUpdateAutoUnitsBuildingSettingsInput
};


export type IUpdateAutoUnitsBuildingSettingsMutation = Pick<IMutation, 'updateAutoUnitsBuildingSettings'>;

export type IUpdateAutoUnitsSettingsMutationVariables = {
  input: IUpdateAutoUnitsSettingsInput
};


export type IUpdateAutoUnitsSettingsMutation = Pick<IMutation, 'updateAutoUnitsSettings'>;

export type IGetUnitInfoQueryVariables = {
  index: Scalars['Int']
};


export type IGetUnitInfoQuery = { readonly unitInfo: Pick<IUnitInfo, 'name'> };

export type IGetVillageByIdQueryVariables = {
  villageId: Scalars['Int']
};


export type IGetVillageByIdQuery = { readonly village: Maybe<(
    Pick<IVillage, 'id' | 'name'>
    & { readonly coords: ICoordsFragmentFragment, readonly resources: { readonly amount: IResourcesFragmentFragment, readonly capacity: Pick<IVillageCapacity, 'granary' | 'warehouse'>, readonly production: IResourcesFragmentFragment } }
  )> };

export type IGetVillagesQueryVariables = {};


export type IGetVillagesQuery = { readonly villages: ReadonlyArray<Pick<IVillage, 'id' | 'name'>> };

export type IUpdateVillageSubscriptionVariables = {};


export type IUpdateVillageSubscription = Pick<ISubscription, 'updateVillage'>;

export type IUpdateVillagesSubscriptionVariables = {};


export type IUpdateVillagesSubscription = Pick<ISubscription, 'updateVillages'>;
