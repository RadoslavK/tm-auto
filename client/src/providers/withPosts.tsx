import { Query } from 'react-apollo';
import React from 'react';
import { getPosts } from '../graphql/queries/getPosts';

export interface IWithPosts {
  readonly posts: { readonly title: string; readonly content: string; }[];
  readonly postsLoading: boolean;
}

export const withPosts = <TProps extends IWithPosts>(Component: React.ComponentType<TProps>): React.ComponentType<LeftOverProps<TProps, IWithPosts>> =>
  (props: TProps) => {
    return (
      <Query query={getPosts}>
        {({ loading, data }) => (
          <Component
            {...props}
            postsLoading={loading}
            posts={data && data.posts}
          />
        )}
      </Query>
    );
  };
