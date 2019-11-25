import { GraphQLScalarType, ValueNode } from 'graphql';
import { Kind } from 'graphql/language';
import { Resolvers } from './_types';

export const miscResolvers: Resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Representation of JavaScript Date instance',
    serialize: (value: Date) => value.valueOf(),
    parseValue: (value: number) => new Date(value),
    parseLiteral: (ast: ValueNode) => {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }

      return null;
    },
  }),
};
