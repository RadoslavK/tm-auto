import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo';
import { apolloClient } from '../settings/apolloClient';
import { IWithAddPost, withAddPost } from '../providers/withAddPost';
import { IWithPosts, withPosts } from '../providers/withPosts';

class PostListComponent extends Component<IWithPosts> {
  showPosts = () => {
    const { posts = [], postsLoading } = this.props;

    if (!postsLoading && posts.length > 0) {
      return posts.map((post, index) => {
        return (
          <div key={index}>
            <h3>{post.title}</h3>
            <div>{post.content}</div>
          </div>
        );
      });
    } else {
      return (
        <div>
          <h3>No posts available</h3>
          <p>Use the form on the right to create a new post.</p>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        {this.showPosts()}
      </div>
    );
  }
}

const PostList = withPosts(PostListComponent);

class PostFormComponent extends React.Component<IWithAddPost> {
  submitForm = (event) => {
    event.preventDefault();

    this.props.addPost({
      title: event.target.title.value,
      content: event.target.content.value
    });
  };

  render() {
    return (
      <div>
        <h2>Create</h2>
        <form onSubmit={this.submitForm}>
          <div>
            <label htmlFor="title">Title:</label>
            <input name="title" id="title" placeholder="Title" />
          </div>

          <div>
            <label htmlFor="content">Content:</label>
            <input name="content" id="content" placeholder="Content" />
          </div>

          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const PostForm = withAddPost(PostFormComponent);

export class AppNew extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <div>
          <h2>Posts</h2>

          <PostList />
          <PostForm />
        </div>
      </ApolloProvider>
    )
  }
}
