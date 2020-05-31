import { DocumentNode } from 'graphql';
import {
  loadFiles,
  mergeResolvers,
  mergeTypeDefs,
} from 'graphql-tools';

export const loadResolvers = async () => {
  const files = await loadFiles(__dirname, { ignoreIndex: true, recursive: true });

  return mergeResolvers(files);
};

export const loadTypeDefs = async (): Promise<DocumentNode> => {
  const typesArray = await loadFiles(__dirname, { extensions: ['graphql'], recursive: true });

  return mergeTypeDefs(typesArray);
};