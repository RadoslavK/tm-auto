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
  readonly tribe: Scalars['Int'],
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
  readonly fieldId: Scalars['Int'],
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
  readonly days: Scalars['Int'],
  readonly hours: Scalars['Int'],
  readonly minutes: Scalars['Int'],
  readonly seconds: Scalars['Int'],
};

export type IDurationInput = {
  readonly days: Scalars['Int'],
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

export type IGeneralSettings = {
  readonly allowTasks: Scalars['Boolean'],
  readonly autoBuild: Scalars['Boolean'],
  readonly autoUnits: Scalars['Boolean'],
  readonly autoStart: Scalars['Boolean'],
};

export type IGeneralVillageSettings = {
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
  readonly createAccount: Maybe<Scalars['String']>,
  readonly updateAccount: Scalars['Boolean'],
  readonly deleteAccount: Scalars['Boolean'],
  readonly signIn: Maybe<Scalars['Boolean']>,
  readonly signOut: Maybe<Scalars['Boolean']>,
  readonly startBot: Scalars['Boolean'],
  readonly stopBot: Scalars['Boolean'],
  readonly setNextTaskExecution: Scalars['Boolean'],
  readonly setNextVillageTaskExecution: Scalars['Boolean'],
  readonly clearQueue: Scalars['Boolean'],
  readonly dequeueBuilding: Scalars['Boolean'],
  readonly dequeueBuildingAtField: Scalars['Boolean'],
  readonly enqueueBuilding: Scalars['Boolean'],
  readonly moveQueuedBuildingToTop: Scalars['Boolean'],
  readonly moveQueuedBuildingDown: Scalars['Boolean'],
  readonly moveQueuedBuildingUp: Scalars['Boolean'],
  readonly updateGeneralSettings: Scalars['Boolean'],
  readonly updateAutoAdventureSettings: Scalars['Boolean'],
  readonly updateGeneralVillageSettings: Scalars['Boolean'],
  readonly updateAutoBuildVillageSettings: Scalars['Boolean'],
  readonly updateAutoUnitsUnitSettings: Scalars['Boolean'],
  readonly updateAutoUnitsBuildingSettings: Scalars['Boolean'],
  readonly updateAutoUnitsSettings: Scalars['Boolean'],
  readonly resetSettings: Scalars['Boolean'],
  readonly resetVillageSettings: Scalars['Boolean'],
};


export type IMutationCreateAccountArgs = {
  account: ICreateUserAccountInput
};


export type IMutationUpdateAccountArgs = {
  account: IUpdateUserAccountInput
};


export type IMutationDeleteAccountArgs = {
  accountId: Scalars['String']
};


export type IMutationSignInArgs = {
  accountId: Scalars['ID']
};


export type IMutationSetNextTaskExecutionArgs = {
  task: TaskType,
  delay: IDurationInput
};


export type IMutationSetNextVillageTaskExecutionArgs = {
  villageId: Scalars['Int'],
  task: VillageTaskType,
  delay: IDurationInput
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


export type IMutationMoveQueuedBuildingToTopArgs = {
  villageId: Scalars['Int'],
  queueId: Scalars['ID']
};


export type IMutationMoveQueuedBuildingDownArgs = {
  input: IQueuedBuildingManipulationInput
};


export type IMutationMoveQueuedBuildingUpArgs = {
  input: IQueuedBuildingManipulationInput
};


export type IMutationUpdateGeneralSettingsArgs = {
  settings: IUpdateGeneralSettingsInput
};


export type IMutationUpdateAutoAdventureSettingsArgs = {
  settings: IUpdateAutoAdventureSettingsInput
};


export type IMutationUpdateGeneralVillageSettingsArgs = {
  settings: IUpdateGeneralVillageSettingsInput
};


export type IMutationUpdateAutoBuildVillageSettingsArgs = {
  settings: IUpdateAutoBuildVillageSettingsInput
};


export type IMutationUpdateAutoUnitsUnitSettingsArgs = {
  settings: IUpdateAutoUnitsUnitSettingsInput
};


export type IMutationUpdateAutoUnitsBuildingSettingsArgs = {
  settings: IUpdateAutoUnitsBuildingSettingsInput
};


export type IMutationUpdateAutoUnitsSettingsArgs = {
  settings: IUpdateAutoUnitsSettingsInput
};


export type IMutationResetSettingsArgs = {
  type: SettingsType
};


export type IMutationResetVillageSettingsArgs = {
  villageId: Scalars['Int'],
  type: VillageSettingsType
};

export enum PartyType {
  Small = 'Small',
  Large = 'Large'
}

export type IQuery = {
  readonly accounts: ReadonlyArray<IUserAccount>,
  readonly account: Maybe<IUserAccount>,
  readonly currentAccount: IUserAccount,
  readonly lastSignedAccountId: Maybe<Scalars['String']>,
  readonly availableNewBuildings: ReadonlyArray<IAvailableNewBuilding>,
  readonly buildingName: Scalars['String'],
  readonly buildingSpots: IBuildingSpots,
  readonly maxBuildingLevel: Scalars['Int'],
  readonly buildingsInProgress: ReadonlyArray<IBuildingInProgress>,
  readonly botState: BotState,
  readonly heroInformation: IHeroInformation,
  readonly logsEntries: ReadonlyArray<ILogEntry>,
  readonly nextTaskExecution: ITimestamp,
  readonly nextVillageTaskExecution: ITimestamp,
  readonly canMoveToTop: Scalars['Boolean'],
  readonly buildingQueue: IBuildingQueue,
  readonly generalSettings: IGeneralSettings,
  readonly hero: IHeroSettings,
  readonly generalVillageSettings: IGeneralVillageSettings,
  readonly autoBuildSettings: IAutoBuildSettings,
  readonly autoUnitsSettings: IAutoUnitsSettings,
  readonly unitInfo: IUnitInfo,
  readonly activeVillageId: Scalars['Int'],
  readonly village: Maybe<IVillage>,
  readonly villages: ReadonlyArray<IVillage>,
};


export type IQueryAccountArgs = {
  accountId: Scalars['String']
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


export type IQueryNextTaskExecutionArgs = {
  task: TaskType
};


export type IQueryNextVillageTaskExecutionArgs = {
  villageId: Scalars['Int'],
  task: VillageTaskType
};


export type IQueryCanMoveToTopArgs = {
  villageId: Scalars['Int'],
  queueId: Scalars['ID']
};


export type IQueryBuildingQueueArgs = {
  villageId: Scalars['Int']
};


export type IQueryGeneralVillageSettingsArgs = {
  villageId: Scalars['Int']
};


export type IQueryAutoBuildSettingsArgs = {
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
  readonly fieldId: Scalars['Int'],
};

export type IQueuedBuildingManipulationInput = {
  readonly queueId: Scalars['ID'],
  readonly villageId: Scalars['Int'],
};

export type IResetVillageInput = {
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

export enum SettingsType {
  General = 'General',
  AutoAdventure = 'AutoAdventure'
}

export type ISubscription = {
  readonly buildingsUpdated: Scalars['Boolean'],
  readonly onBotRunningChanged: Scalars['Boolean'],
  readonly heroInformationUpdated: IHeroInformation,
  readonly onLogEntryAdded: ILogEntry,
  readonly nextTaskExecutionChanged: ITimestamp,
  readonly nextVillageTaskExecutionChanged: ITimestamp,
  readonly onQueueUpdated: Scalars['Boolean'],
  readonly generalSettingsChanged: IGeneralSettings,
  readonly autoAdventureSettingsChanged: IAutoAdventureSettings,
  readonly generalVillageSettingsChanged: IGeneralVillageSettings,
  readonly autoBuildSettingsChanged: IAutoBuildSettings,
  readonly autoUnitsSettingsChanged: IAutoUnitsSettings,
  readonly updateVillage: Scalars['Boolean'],
  readonly updateVillages: Scalars['Boolean'],
  readonly activeVillageIdChanged: Scalars['Int'],
};


export type ISubscriptionBuildingsUpdatedArgs = {
  villageId: Scalars['Int']
};


export type ISubscriptionNextTaskExecutionChangedArgs = {
  task: TaskType
};


export type ISubscriptionNextVillageTaskExecutionChangedArgs = {
  villageId: Scalars['Int'],
  task: VillageTaskType
};


export type ISubscriptionOnQueueUpdatedArgs = {
  villageId: Scalars['Int']
};


export type ISubscriptionGeneralVillageSettingsChangedArgs = {
  villageId: Scalars['Int']
};


export type ISubscriptionAutoBuildSettingsChangedArgs = {
  villageId: Scalars['Int']
};


export type ISubscriptionAutoUnitsSettingsChangedArgs = {
  villageId: Scalars['Int']
};

export enum TaskType {
  AutoAdventure = 'AutoAdventure'
}

export type ITextLogEntryContent = {
  readonly text: ITextLogEntryContentPayload,
};

export type ITextLogEntryContentPayload = {
  readonly message: Scalars['String'],
};

export type ITimestamp = {
  readonly totalSeconds: Scalars['Int'],
};

export type ITimestampInput = {
  readonly totalSeconds: Scalars['Int'],
};

export type IUnitInfo = {
  readonly name: Scalars['String'],
};

export type IUpdateAutoAdventureSettingsInput = {
  readonly allow: Scalars['Boolean'],
  readonly coolDown: ICoolDownInput,
  readonly adventureCriteria: AdventureCriteria,
  readonly preferHard: Scalars['Boolean'],
  readonly normalMinHealth: Scalars['Int'],
  readonly hardMinHealth: Scalars['Int'],
  readonly maxTravelTime: IDurationInput,
  readonly preferredVillageId: Maybe<Scalars['Int']>,
};

export type IUpdateAutoBuildVillageSettingsInput = {
  readonly villageId: Scalars['Int'],
  readonly allow: Scalars['Boolean'],
  readonly coolDown: ICoolDownInput,
  readonly autoCropFields: Scalars['Boolean'],
  readonly minCrop: Scalars['Int'],
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
  readonly allowTasks: Scalars['Boolean'],
  readonly autoBuild: Scalars['Boolean'],
  readonly autoUnits: Scalars['Boolean'],
  readonly autoStart: Scalars['Boolean'],
};

export type IUpdateGeneralVillageSettingsInput = {
  readonly villageId: Scalars['Int'],
  readonly allowTasks: Scalars['Boolean'],
};

export type IUpdateUserAccountInput = {
  readonly id: Scalars['ID'],
  readonly username: Scalars['String'],
  readonly password: Scalars['String'],
  readonly server: Scalars['String'],
};

export type IUserAccount = {
  readonly id: Scalars['String'],
  readonly username: Scalars['String'],
  readonly password: Scalars['String'],
  readonly server: Scalars['String'],
};

export type IVillage = {
  readonly id: Scalars['Int'],
  readonly coords: ICoords,
  readonly name: Scalars['String'],
  readonly resources: IVillageResources,
  readonly isCapital: Scalars['Boolean'],
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

export enum VillageSettingsType {
  General = 'General',
  AutoBuild = 'AutoBuild',
  AutoUnits = 'AutoUnits'
}

export enum VillageTaskType {
  AutoBuild = 'AutoBuild',
  AutoUnits = 'AutoUnits',
  AutoParty = 'AutoParty'
}

export type IUserAccountFragment = Pick<IUserAccount, 'id' | 'username' | 'password' | 'server'>;

export type IGetAccountsQueryVariables = {};


export type IGetAccountsQuery = { readonly accounts: ReadonlyArray<IUserAccountFragment> };

export type IGetCurrentAccountQueryVariables = {};


export type IGetCurrentAccountQuery = { readonly currentAccount: IUserAccountFragment };

export type IGetAccountQueryVariables = {
  accountId: Scalars['String']
};


export type IGetAccountQuery = { readonly account: Maybe<IUserAccountFragment> };

export type IGetLastSignedAccountIdQueryVariables = {};


export type IGetLastSignedAccountIdQuery = Pick<IQuery, 'lastSignedAccountId'>;

export type ICreateAccountMutationVariables = {
  account: ICreateUserAccountInput
};


export type ICreateAccountMutation = Pick<IMutation, 'createAccount'>;

export type IUpdateAccountMutationVariables = {
  account: IUpdateUserAccountInput
};


export type IUpdateAccountMutation = Pick<IMutation, 'updateAccount'>;

export type IDeleteAccountMutationVariables = {
  accountId: Scalars['String']
};


export type IDeleteAccountMutation = Pick<IMutation, 'deleteAccount'>;

export type IBuildingSpotFragment = (
  Pick<IBuildingSpot, 'fieldId' | 'type' | 'name'>
  & { readonly level: Pick<IBuildingSpotLevel, 'actual' | 'ongoing' | 'queued' | 'total' | 'max'> }
);

export type IGetBuildingSpotsQueryVariables = {
  villageId: Scalars['Int']
};


export type IGetBuildingSpotsQuery = { readonly buildingSpots: { readonly infrastructure: ReadonlyArray<IBuildingSpotFragment>, readonly resources: { readonly wood: ReadonlyArray<IBuildingSpotFragment>, readonly clay: ReadonlyArray<IBuildingSpotFragment>, readonly iron: ReadonlyArray<IBuildingSpotFragment>, readonly crop: ReadonlyArray<IBuildingSpotFragment> } } };

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
    Pick<IBuildingInProgress, 'level' | 'name' | 'type' | 'fieldId'>
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

export type IHeroInformationFragment = (
  Pick<IHeroInformation, 'health' | 'state'>
  & { readonly village: Maybe<(
    Pick<IVillage, 'id' | 'name'>
    & { readonly coords: ICoordsFragment }
  )> }
);

export type IGetHeroInformationQueryVariables = {};


export type IGetHeroInformationQuery = { readonly heroInformation: IHeroInformationFragment };

export type IOnHeroInformationUpdatedSubscriptionVariables = {};


export type IOnHeroInformationUpdatedSubscription = { readonly heroInformationUpdated: IHeroInformationFragment };

export type ILogEntryFragment = (
  Pick<ILogEntry, 'id' | 'timestamp'>
  & { readonly village: Maybe<(
    Pick<IVillage, 'id' | 'name'>
    & { readonly coords: ICoordsFragment }
  )>, readonly content: { readonly text: Pick<ITextLogEntryContentPayload, 'message'> } | { readonly autoBuild: Pick<IAutoBuildLogEntryContentPayload, 'fieldId' | 'level' | 'name' | 'type'> } | { readonly autoUnits: Pick<IAutoUnitsLogEntryContentPayload, 'amount' | 'index' | 'tribe' | 'unitName'> } }
);

export type IGetLogsQueryVariables = {};


export type IGetLogsQuery = { readonly logsEntries: ReadonlyArray<ILogEntryFragment> };

export type IOnLogEntryAddedSubscriptionVariables = {};


export type IOnLogEntryAddedSubscription = { readonly onLogEntryAdded: ILogEntryFragment };

export type ITimestampFragment = Pick<ITimestamp, 'totalSeconds'>;

export type IResourcesFragment = Pick<IResources, 'wood' | 'clay' | 'iron' | 'crop' | 'freeCrop'>;

export type ICostFragment = { readonly resources: IResourcesFragment, readonly buildTime: IDurationFragment };

export type ICoordsFragment = Pick<ICoords, 'x' | 'y'>;

export type IVillageFragment = (
  Pick<IVillage, 'id' | 'name'>
  & { readonly coords: ICoordsFragment, readonly resources: { readonly amount: IResourcesFragment, readonly production: IResourcesFragment, readonly capacity: Pick<IVillageCapacity, 'granary' | 'warehouse'> } }
);

export type IDurationFragment = Pick<IDuration, 'days' | 'hours' | 'minutes' | 'seconds'>;

export type INextTaskExecutionQueryVariables = {
  task: TaskType
};


export type INextTaskExecutionQuery = { readonly nextTaskExecution: ITimestampFragment };

export type INextVillageTaskExecutionQueryVariables = {
  villageId: Scalars['Int'],
  task: VillageTaskType
};


export type INextVillageTaskExecutionQuery = { readonly nextVillageTaskExecution: ITimestampFragment };

export type ISetNextTaskExecutionMutationVariables = {
  task: TaskType,
  delay: IDurationInput
};


export type ISetNextTaskExecutionMutation = Pick<IMutation, 'setNextTaskExecution'>;

export type ISetNextVillageTaskExecutionMutationVariables = {
  villageId: Scalars['Int'],
  task: VillageTaskType,
  delay: IDurationInput
};


export type ISetNextVillageTaskExecutionMutation = Pick<IMutation, 'setNextVillageTaskExecution'>;

export type INextTaskExecutionChangedSubscriptionVariables = {
  task: TaskType
};


export type INextTaskExecutionChangedSubscription = { readonly nextTaskExecutionChanged: ITimestampFragment };

export type INextVillageTaskExecutionChangedSubscriptionVariables = {
  villageId: Scalars['Int'],
  task: VillageTaskType
};


export type INextVillageTaskExecutionChangedSubscription = { readonly nextVillageTaskExecutionChanged: ITimestampFragment };

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

export type IMoveQueuedBuildingToTopMutationVariables = {
  villageId: Scalars['Int'],
  queueId: Scalars['ID']
};


export type IMoveQueuedBuildingToTopMutation = Pick<IMutation, 'moveQueuedBuildingToTop'>;

export type IGetQueuedBuildingsQueryVariables = {
  villageId: Scalars['Int']
};


export type IGetQueuedBuildingsQuery = { readonly buildingQueue: { readonly buildings: ReadonlyArray<(
      Pick<IQueuedBuilding, 'canMoveDown' | 'canMoveUp' | 'name' | 'level' | 'type' | 'queueId' | 'fieldId'>
      & { readonly cost: ICostFragment }
    )>, readonly totalCost: ICostFragment } };

export type ICanMoveToTopQueryVariables = {
  villageId: Scalars['Int'],
  queueId: Scalars['ID']
};


export type ICanMoveToTopQuery = Pick<IQuery, 'canMoveToTop'>;

export type IOnQueueUpdatedSubscriptionVariables = {
  villageId: Scalars['Int']
};


export type IOnQueueUpdatedSubscription = Pick<ISubscription, 'onQueueUpdated'>;

type ITaskSettings_AutoAdventureSettings_Fragment = (
  Pick<IAutoAdventureSettings, 'allow'>
  & { readonly coolDown: { readonly min: IDurationFragment, readonly max: IDurationFragment } }
);

type ITaskSettings_AutoBuildSettings_Fragment = (
  Pick<IAutoBuildSettings, 'allow'>
  & { readonly coolDown: { readonly min: IDurationFragment, readonly max: IDurationFragment } }
);

type ITaskSettings_AutoUnitsSettings_Fragment = (
  Pick<IAutoUnitsSettings, 'allow'>
  & { readonly coolDown: { readonly min: IDurationFragment, readonly max: IDurationFragment } }
);

type ITaskSettings_AutoPartySettings_Fragment = (
  Pick<IAutoPartySettings, 'allow'>
  & { readonly coolDown: { readonly min: IDurationFragment, readonly max: IDurationFragment } }
);

export type ITaskSettingsFragment = ITaskSettings_AutoAdventureSettings_Fragment | ITaskSettings_AutoBuildSettings_Fragment | ITaskSettings_AutoUnitsSettings_Fragment | ITaskSettings_AutoPartySettings_Fragment;

export type IAutoUnitsUnitSettingsFragment = Pick<IAutoUnitsUnitSettings, 'autoBuild' | 'index' | 'targetAmount' | 'trainForever'>;

export type IAutoUnitsBuildingSettingsFragment = (
  Pick<IAutoUnitsBuildingSettings, 'allow'>
  & { readonly maxBuildTime: IDurationFragment, readonly units: ReadonlyArray<IAutoUnitsUnitSettingsFragment> }
);

export type IGeneralSettingsFragment = Pick<IGeneralSettings, 'allowTasks' | 'autoBuild' | 'autoUnits' | 'autoStart'>;

export type IAutoAdventureSettingsFragment = (
  Pick<IAutoAdventureSettings, 'adventureCriteria' | 'hardMinHealth' | 'normalMinHealth' | 'preferHard' | 'preferredVillageId'>
  & { readonly maxTravelTime: IDurationFragment }
  & ITaskSettings_AutoAdventureSettings_Fragment
);

export type IGeneralVillageSettingsFragment = Pick<IGeneralVillageSettings, 'allowTasks'>;

export type IAutoBuildSettingsFragment = (
  Pick<IAutoBuildSettings, 'autoCropFields' | 'minCrop'>
  & ITaskSettings_AutoBuildSettings_Fragment
);

export type IAutoUnitsSettingsFragment = (
  Pick<IAutoUnitsSettings, 'minCrop'>
  & { readonly barracks: IAutoUnitsBuildingSettingsFragment, readonly stable: IAutoUnitsBuildingSettingsFragment, readonly workshop: IAutoUnitsBuildingSettingsFragment, readonly residence: IAutoUnitsBuildingSettingsFragment }
  & ITaskSettings_AutoUnitsSettings_Fragment
);

export type IGetGeneralSettingsQueryVariables = {};


export type IGetGeneralSettingsQuery = { readonly generalSettings: IGeneralSettingsFragment };

export type IGetHeroSettingsQueryVariables = {};


export type IGetHeroSettingsQuery = { readonly hero: { readonly autoAdventure: IAutoAdventureSettingsFragment } };

export type IGetGeneralVillageSettingsQueryVariables = {
  villageId: Scalars['Int']
};


export type IGetGeneralVillageSettingsQuery = { readonly generalVillageSettings: IGeneralVillageSettingsFragment };

export type IGetAutoBuildSettingsQueryVariables = {
  villageId: Scalars['Int']
};


export type IGetAutoBuildSettingsQuery = { readonly autoBuildSettings: IAutoBuildSettingsFragment };

export type IGetAutoUnitsSettingsQueryVariables = {
  villageId: Scalars['Int']
};


export type IGetAutoUnitsSettingsQuery = { readonly autoUnitsSettings: IAutoUnitsSettingsFragment };

export type IUpdateGeneralSettingsMutationVariables = {
  settings: IUpdateGeneralSettingsInput
};


export type IUpdateGeneralSettingsMutation = Pick<IMutation, 'updateGeneralSettings'>;

export type IUpdateAutoAdventureSettingsMutationVariables = {
  settings: IUpdateAutoAdventureSettingsInput
};


export type IUpdateAutoAdventureSettingsMutation = Pick<IMutation, 'updateAutoAdventureSettings'>;

export type IUpdateGeneralVillageSettingsMutationVariables = {
  settings: IUpdateGeneralVillageSettingsInput
};


export type IUpdateGeneralVillageSettingsMutation = Pick<IMutation, 'updateGeneralVillageSettings'>;

export type IUpdateAutoBuildVillageSettingsMutationVariables = {
  settings: IUpdateAutoBuildVillageSettingsInput
};


export type IUpdateAutoBuildVillageSettingsMutation = Pick<IMutation, 'updateAutoBuildVillageSettings'>;

export type IUpdateAutoUnitsUnitSettingsMutationVariables = {
  settings: IUpdateAutoUnitsUnitSettingsInput
};


export type IUpdateAutoUnitsUnitSettingsMutation = Pick<IMutation, 'updateAutoUnitsUnitSettings'>;

export type IUpdateAutoUnitsBuildingSettingsMutationVariables = {
  settings: IUpdateAutoUnitsBuildingSettingsInput
};


export type IUpdateAutoUnitsBuildingSettingsMutation = Pick<IMutation, 'updateAutoUnitsBuildingSettings'>;

export type IUpdateAutoUnitsSettingsMutationVariables = {
  settings: IUpdateAutoUnitsSettingsInput
};


export type IUpdateAutoUnitsSettingsMutation = Pick<IMutation, 'updateAutoUnitsSettings'>;

export type IResetSettingsMutationVariables = {
  type: SettingsType
};


export type IResetSettingsMutation = Pick<IMutation, 'resetSettings'>;

export type IResetVillageSettingsMutationVariables = {
  villageId: Scalars['Int'],
  type: VillageSettingsType
};


export type IResetVillageSettingsMutation = Pick<IMutation, 'resetVillageSettings'>;

export type IOnGeneralSettingsChangedSubscriptionVariables = {};


export type IOnGeneralSettingsChangedSubscription = { readonly generalSettingsChanged: IGeneralSettingsFragment };

export type IOnAutoAdventureSettingsChangedSubscriptionVariables = {};


export type IOnAutoAdventureSettingsChangedSubscription = { readonly autoAdventureSettingsChanged: IAutoAdventureSettingsFragment };

export type IOnGeneralVillageSettingsChangedSubscriptionVariables = {
  villageId: Scalars['Int']
};


export type IOnGeneralVillageSettingsChangedSubscription = { readonly generalVillageSettingsChanged: IGeneralVillageSettingsFragment };

export type IOnAutoBuildSettingsChangedSubscriptionVariables = {
  villageId: Scalars['Int']
};


export type IOnAutoBuildSettingsChangedSubscription = { readonly autoBuildSettingsChanged: IAutoBuildSettingsFragment };

export type IOnAutoUnitsSettingsChangeSubscriptionVariables = {
  villageId: Scalars['Int']
};


export type IOnAutoUnitsSettingsChangeSubscription = { readonly autoUnitsSettingsChanged: IAutoUnitsSettingsFragment };

export type IGetUnitInfoQueryVariables = {
  index: Scalars['Int']
};


export type IGetUnitInfoQuery = { readonly unitInfo: Pick<IUnitInfo, 'name'> };

export type IGetVillageByIdQueryVariables = {
  villageId: Scalars['Int']
};


export type IGetVillageByIdQuery = { readonly village: Maybe<(
    Pick<IVillage, 'id' | 'name'>
    & { readonly coords: ICoordsFragment, readonly resources: { readonly amount: IResourcesFragment, readonly capacity: Pick<IVillageCapacity, 'granary' | 'warehouse'>, readonly production: IResourcesFragment } }
  )> };

export type IGetVillagesQueryVariables = {};


export type IGetVillagesQuery = { readonly villages: ReadonlyArray<(
    Pick<IVillage, 'id' | 'name' | 'isCapital'>
    & { readonly coords: ICoordsFragment }
  )> };

export type IActiveVillageIdQueryVariables = {};


export type IActiveVillageIdQuery = Pick<IQuery, 'activeVillageId'>;

export type IUpdateVillageSubscriptionVariables = {};


export type IUpdateVillageSubscription = Pick<ISubscription, 'updateVillage'>;

export type IUpdateVillagesSubscriptionVariables = {};


export type IUpdateVillagesSubscription = Pick<ISubscription, 'updateVillages'>;

export type IActiveVillageIdChangedSubscriptionVariables = {};


export type IActiveVillageIdChangedSubscription = Pick<ISubscription, 'activeVillageIdChanged'>;
