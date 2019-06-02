import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type BuildingLevel {
    actual: Int,
    ongoing: Int,
  },
  
  type Building {
    level: BuildingLevel,
    type: Int,
  },
  
  type Village {
    id: Int,
    name: String,
    buildings: [Building],
  },
  
  type Query {
    villages: [Village],
    village(id: Int): Village
  },
`;
