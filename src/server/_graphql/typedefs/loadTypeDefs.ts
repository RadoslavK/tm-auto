import { DocumentNode } from 'graphql';
import {
  loadFiles,
  mergeTypeDefs,
} from 'graphql-tools';

export const loadTypeDefs = async (): Promise<DocumentNode> => {
  const typesArray = await loadFiles(__dirname);

  return mergeTypeDefs(typesArray);
};