import { Resolvers as InnerResolvers } from '../../_types/graphql';

export type Resolvers = {
  [TResolver in keyof InnerResolvers]?: Partial<InnerResolvers[TResolver]>;
};