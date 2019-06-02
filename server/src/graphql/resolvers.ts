class Post {
  readonly title: string;
  readonly content: string;

  constructor(obj: { title: string; content: string; }) {
    Object.assign(this, obj);
  }
}

const allPosts: Post[] = [];

export const resolvers = {
  Query: {
    posts: () => {
      return allPosts.map(post => ({ title: post.title, content: post.content }));
    },
  },

  Mutation: {
    addPost: (parent, post) => {
      const newPost = new Post({ title: post.title, content: post.content });
      allPosts.push(newPost);

      return newPost;
    },
  },
};
