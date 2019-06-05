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
  export const GetVillageById: DocumentNode;
  export const GetVillages: DocumentNode;

  export default defaultDocument;
}
