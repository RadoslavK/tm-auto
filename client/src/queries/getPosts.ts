import { gql } from 'apollo-boost';

export const getPosts = gql`
  {
    posts {
      title
      content
    }
  }
`;
