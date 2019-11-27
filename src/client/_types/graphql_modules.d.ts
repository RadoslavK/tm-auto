
declare module '*/graphql_operations/account.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const UserAccountFragment: DocumentNode;
export const GetAccounts: DocumentNode;
export const GetCurrentAccount: DocumentNode;
export const GetAccount: DocumentNode;
export const CreateAccount: DocumentNode;
export const UpdateAccount: DocumentNode;
export const DeleteAccount: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/graphql_operations/building.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const BuildingSpotFragment: DocumentNode;
export const GetBuildingSpots: DocumentNode;
export const GetAvailableNewBuildings: DocumentNode;
export const GetMaxBuildingLevel: DocumentNode;
export const GetBuildingName: DocumentNode;
export const BuildingsUpdated: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/graphql_operations/buildingInProgress.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetBuildingsInProgress: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/graphql_operations/controller.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetBotState: DocumentNode;
export const StartBot: DocumentNode;
export const StopBot: DocumentNode;
export const SignIn: DocumentNode;
export const SignOut: DocumentNode;
export const OnBotRunningChanged: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/graphql_operations/hero.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const HeroInformationFragment: DocumentNode;
export const GetHeroInformation: DocumentNode;
export const OnHeroInformationUpdated: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/graphql_operations/logs.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const LogEntryFragment: DocumentNode;
export const GetLogs: DocumentNode;
export const OnLogEntryAdded: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/graphql_operations/misc.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Timestamp: DocumentNode;
export const ResourcesFragment: DocumentNode;
export const CostFragment: DocumentNode;
export const CoordsFragment: DocumentNode;
export const VillageFragment: DocumentNode;
export const Duration: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/graphql_operations/player.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetGameInfo: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/graphql_operations/queuedBuilding.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const ClearQueue: DocumentNode;
export const EnqueueBuilding: DocumentNode;
export const DequeueBuilding: DocumentNode;
export const DequeueBuildingAtField: DocumentNode;
export const MoveQueuedBuildingDown: DocumentNode;
export const MoveQueuedBuildingUp: DocumentNode;
export const GetQueuedBuildings: DocumentNode;
export const OnQueueUpdated: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/graphql_operations/settings.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const TaskSettingsFragment: DocumentNode;
export const AutoUnitsUnitSettingsFragment: DocumentNode;
export const AutoUnitsBuildingSettingsFragment: DocumentNode;
export const GeneralSettings: DocumentNode;
export const AutoAdventureSettings: DocumentNode;
export const GeneralVillageSettings: DocumentNode;
export const AutoBuildSettings: DocumentNode;
export const AutoUnitsSettings: DocumentNode;
export const GetGeneralSettings: DocumentNode;
export const GetHeroSettings: DocumentNode;
export const GetGeneralVillageSettings: DocumentNode;
export const GetAutoBuildSettings: DocumentNode;
export const GetAutoUnitsSettings: DocumentNode;
export const UpdateGeneralSettings: DocumentNode;
export const UpdateAutoAdventureSettings: DocumentNode;
export const UpdateGeneralVillageSettings: DocumentNode;
export const UpdateAutoBuildVillageSettings: DocumentNode;
export const UpdateAutoUnitsUnitSettings: DocumentNode;
export const UpdateAutoUnitsBuildingSettings: DocumentNode;
export const UpdateAutoUnitsSettings: DocumentNode;
export const ResetSettings: DocumentNode;
export const ResetVillageSettings: DocumentNode;
export const OnGeneralSettingsChanged: DocumentNode;
export const OnAutoAdventureSettingsChanged: DocumentNode;
export const OnGeneralVillageSettingsChanged: DocumentNode;
export const OnAutoBuildSettingsChanged: DocumentNode;
export const OnAutoUnitsSettingsChange: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/graphql_operations/unit.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetUnitInfo: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/graphql_operations/village.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetVillageById: DocumentNode;
export const GetVillages: DocumentNode;
export const UpdateVillage: DocumentNode;
export const UpdateVillages: DocumentNode;

  export default defaultDocument;
}
    