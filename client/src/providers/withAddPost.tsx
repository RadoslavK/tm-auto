import { Mutation } from 'react-apollo';
import React from 'react';
import { addPost } from '../graphql/mutations/addPost';
import { getPosts } from '../graphql/queries/getPosts';

export interface IWithAddPost {
  readonly addPost: (post: { readonly title: string; readonly content: string; }) => void;
}

const addPostFactory = (addPostFn) => ({ title, content }) => addPostFn({
  variables: { title, content },
  refetchQueries: [{ query: getPosts }],
});

export const withAddPost = <TProps extends IWithAddPost>(Component: React.ComponentType<TProps>): React.ComponentType<LeftOverProps<TProps, IWithAddPost>> =>
  (props: TProps) => {
    return (
      <Mutation mutation={addPost}>
        {addPostFn => (
          <Component
            addPost={addPostFactory(addPostFn)}
            {...props}
          />
        )}
      </Mutation>
    );
  };
