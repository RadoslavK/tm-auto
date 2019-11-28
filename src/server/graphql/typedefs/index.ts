import {
  fileLoader,
  mergeTypes,
} from 'merge-graphql-schemas';

const typesArray = fileLoader(__dirname);
export const typeDefs = mergeTypes(typesArray, { all: true });
