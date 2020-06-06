declare module '*/serverSchema.graphql' {
  import { DocumentNode } from '@apollo/client';

  const serverSchema: DocumentNode;

  export default serverSchema;
}