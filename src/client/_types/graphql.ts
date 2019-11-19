export type Maybe<T> = T | undefined;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Date: Date,
};

export type IAutoAdventureSettings = IITaskSettings & {
  readonly allow: Scalars['Boolean'],
  readonly coolDown: ICoolDown,
  readonly adventureCriteria: Scalars['Int'],
  readonly preferHard: Scalars['Boolean'],
  readonly normalMinHealth: Scalars['Int'],
  readonly hardMinHealth: Scalars['Int'],
  readonly maxTravelTime: Scalars['Int'],
  readonly preferredVillageId?: Maybe<Scalars['Int']>,
};

export type IAutoAdventureSettingsInput = {
  readonly allow: Scalars['Boolean'],
  readonly coolDown: ICoolDownInput,
  readonly adventureCriteria: Scalars['Int'],
  readonly preferHard: Scalars['Boolean'],
  readonly normalMinHealth: Scalars['Int'],
  readonly hardMinHealth: Scalars['Int'],
  readonly maxTravelTime: Scalars['Int'],
  readonly preferredVillageId?: Maybe<Scalars['Int']>,
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

export type IAvailableNewBuilding = {
  readonly type: Scalars['Int'],
  readonly name: Scalars['String'],
};

export type IAvailableNewBuildingsInput = {
  readonly fieldId: Scalars['Int'],
  readonly villageId: Scalars['Int'],
};

export type IBuildingInProgress = {
  readonly level: Scalars['Int'],
  readonly finishedAt: Scalars['Date'],
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

export type IClearQueueInput = {
  readonly villageId: Scalars['Int'],
};

export type ICoolDown = {
  readonly min: Scalars['Int'],
  readonly max: Scalars['Int'],
};

export type ICoolDownInput = {
  readonly min: Scalars['Int'],
  readonly max: Scalars['Int'],
};

export type ICoords = {
  readonly x: Scalars['Int'],
  readonly y: Scalars['Int'],
};

export type ICost = {
  readonly resources: IResources,
  readonly buildTime: Scalars['Int'],
};


export type IDequeueBuildingAtFieldInput = {
  readonly deleteAll: Scalars['Boolean'],
  readonly fieldId: Scalars['Int'],
  readonly villageId: Scalars['Int'],
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
};

export type IGeneralSettingsInput = {
  readonly allowTasks: Scalars['Boolean'],
  readonly autoBuild: Scalars['Boolean'],
};

export type IGeneralVillageSettings = {
  readonly allowTasks: Scalars['Boolean'],
};

export type IGeneralVillageSettingsInput = {
  readonly allowTasks: Scalars['Boolean'],
};

export type IHeroInformation = {
  readonly health: Scalars['Int'],
  readonly village?: Maybe<IVillage>,
};

export type IHeroSettings = {
  readonly autoAdventure: IAutoAdventureSettings,
};

export type IITaskSettings = {
  readonly allow: Scalars['Boolean'],
  readonly coolDown: ICoolDown,
};

export type IMutation = {
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
  readonly signIn: Scalars['Boolean'],
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


export type IMutationSignInArgs = {
  account: ISignInInput
};

export type IQuery = {
  readonly availableNewBuildings: ReadonlyArray<IAvailableNewBuilding>,
  readonly buildingName: Scalars['String'],
  readonly buildingSpots: IBuildingSpots,
  readonly maxBuildingLevel: Scalars['Int'],
  readonly buildingsInProgress: ReadonlyArray<IBuildingInProgress>,
  readonly isBotRunning: Scalars['Boolean'],
  readonly heroInformation: IHeroInformation,
  readonly buildingQueue: IBuildingQueue,
  readonly generalSettings: IGeneralSettings,
  readonly hero: IHeroSettings,
  readonly villageSettings: IVillageSettings,
  readonly isSignedIn: Scalars['Boolean'],
  readonly village?: Maybe<IVillage>,
  readonly villages: ReadonlyArray<IVillage>,
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
  readonly total: Scalars['Int'],
  readonly freeCrop: Scalars['Int'],
};

export type ISignInInput = {
  readonly username: Scalars['String'],
  readonly password: Scalars['String'],
  readonly server: Scalars['String'],
};

export type ISubscription = {
  readonly buildingsUpdated: Scalars['Boolean'],
  readonly onBotRunningChanged: Scalars['Boolean'],
  readonly onQueueUpdated: Scalars['Boolean'],
  readonly signedToggled: Scalars['Boolean'],
  readonly updateVillage: Scalars['Boolean'],
  readonly updateVillages: Scalars['Boolean'],
};


export type ISubscriptionBuildingsUpdatedArgs = {
  villageId: Scalars['Int']
};


export type ISubscriptionOnQueueUpdatedArgs = {
  villageId: Scalars['Int']
};

export type IUpdateAutoAdventureSettingsInput = {
  readonly settings: IAutoAdventureSettingsInput,
};

export type IUpdateAutoBuildVillageSettingsInput = {
  readonly villageId: Scalars['Int'],
  readonly settings: IAutoBuildVillageSettingsInput,
};

export type IUpdateGeneralSettingsInput = {
  readonly settings: IGeneralSettingsInput,
};

export type IUpdateGeneralVillageSettingsInput = {
  readonly villageId: Scalars['Int'],
  readonly settings: IGeneralVillageSettingsInput,
};

export type IUserAccount = {
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
};

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


export type IGetBuildingsInProgressQuery = { readonly buildingsInProgress: ReadonlyArray<Pick<IBuildingInProgress, 'level' | 'finishedAt' | 'name' | 'type'>> };

export type IIsBotRunningQueryVariables = {};


export type IIsBotRunningQuery = Pick<IQuery, 'isBotRunning'>;

export type IStartBotMutationVariables = {};


export type IStartBotMutation = Pick<IMutation, 'startBot'>;

export type IStopBotMutationVariables = {};


export type IStopBotMutation = Pick<IMutation, 'stopBot'>;

export type IOnBotRunningChangedSubscriptionVariables = {};


export type IOnBotRunningChangedSubscription = Pick<ISubscription, 'onBotRunningChanged'>;

export type IGetHeroInformationQueryVariables = {};


export type IGetHeroInformationQuery = { readonly heroInformation: (
    Pick<IHeroInformation, 'health'>
    & { readonly village: Maybe<Pick<IVillage, 'id' | 'name'>> }
  ) };

export type IResourcesFragmentFragment = Pick<IResources, 'wood' | 'clay' | 'iron' | 'crop' | 'total' | 'freeCrop'>;

export type ICostFragmentFragment = (
  Pick<ICost, 'buildTime'>
  & { readonly resources: IResourcesFragmentFragment }
);

export type ICoordsFragmentFragment = Pick<ICoords, 'x' | 'y'>;

export type IVillageFragmentFragment = (
  Pick<IVillage, 'id' | 'name'>
  & { readonly coords: ICoordsFragmentFragment, readonly resources: { readonly amount: IResourcesFragmentFragment, readonly production: IResourcesFragmentFragment, readonly capacity: Pick<IVillageCapacity, 'granary' | 'warehouse'> } }
);

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
  & { readonly coolDown: Pick<ICoolDown, 'min' | 'max'> }
);

type ITaskSettingsFragment_AutoBuildSettings_Fragment = (
  Pick<IAutoBuildSettings, 'allow'>
  & { readonly coolDown: Pick<ICoolDown, 'min' | 'max'> }
);

export type ITaskSettingsFragmentFragment = ITaskSettingsFragment_AutoAdventureSettings_Fragment | ITaskSettingsFragment_AutoBuildSettings_Fragment;

export type IGetGeneralSettingsQueryVariables = {};


export type IGetGeneralSettingsQuery = { readonly generalSettings: Pick<IGeneralSettings, 'allowTasks' | 'autoBuild'> };

export type IGetHeroSettingsQueryVariables = {};


export type IGetHeroSettingsQuery = { readonly hero: { readonly autoAdventure: (
      Pick<IAutoAdventureSettings, 'adventureCriteria' | 'hardMinHealth' | 'normalMinHealth' | 'maxTravelTime' | 'preferHard' | 'preferredVillageId'>
      & ITaskSettingsFragment_AutoAdventureSettings_Fragment
    ) } };

export type IGetVillageSettingsQueryVariables = {
  villageId: Scalars['Int']
};


export type IGetVillageSettingsQuery = { readonly villageSettings: { readonly general: Pick<IGeneralVillageSettings, 'allowTasks'>, readonly autoBuild: (
      Pick<IAutoBuildSettings, 'autoCropFields' | 'minCrop'>
      & ITaskSettingsFragment_AutoBuildSettings_Fragment
    ) } };

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

export type IIsSignedInQueryVariables = {};


export type IIsSignedInQuery = Pick<IQuery, 'isSignedIn'>;

export type ISignInMutationVariables = {
  account: ISignInInput
};


export type ISignInMutation = Pick<IMutation, 'signIn'>;

export type IOnSignedToggledSubscriptionVariables = {};


export type IOnSignedToggledSubscription = Pick<ISubscription, 'signedToggled'>;

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
