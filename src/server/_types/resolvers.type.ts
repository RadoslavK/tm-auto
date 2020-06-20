import { Resolvers as InnerResolvers } from './graphql.type';

export type Resolvers = {
  [TResolver in keyof InnerResolvers]?: Partial<InnerResolvers[TResolver]>;
};
