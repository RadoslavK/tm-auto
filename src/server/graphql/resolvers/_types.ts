import { IResolvers } from '../../_types/graphql';

export type Resolvers = {
  [TResolver in keyof IResolvers]?: Partial<IResolvers[TResolver]>;
};