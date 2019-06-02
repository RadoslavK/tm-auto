import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Post {
    title: String,
    content: String
  },
  
  type Query {
    posts: [Post]
  },
  
  type Mutation {
    addPost(title: String!, content: String!): Post,
  }
`;
