import { gql } from 'apollo-boost';

export const addPost = gql`
  mutation($title: String!, $content: String!) {
    addPost(title: $title, content: $content) {
      title
      content
    }
  }
`;
