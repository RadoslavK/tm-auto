declare module "*/graphql_operations/building.graphql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const GetBuildingSpots: DocumentNode;
  export const GetQueuedBuildings: DocumentNode;
  export const GetBuildingsInProgress: DocumentNode;
  export const GetAvailableNewBuildings: DocumentNode;
  export const ClearQueue: DocumentNode;
  export const EnqueueBuilding: DocumentNode;
  export const DequeueBuilding: DocumentNode;

  export default defaultDocument;
}

declare module "*/graphql_operations/controller.graphql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const IsSignedIn: DocumentNode;
  export const IsBotRunning: DocumentNode;
  export const SignIn: DocumentNode;
  export const StartBot: DocumentNode;
  export const StopBot: DocumentNode;

  export default defaultDocument;
}

declare module "*/graphql_operations/village.graphql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const GetVillages: DocumentNode;
  export const VillageExists: DocumentNode;

  export default defaultDocument;
}
