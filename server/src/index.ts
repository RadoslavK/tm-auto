import express from 'express';
import cors from 'cors';
import path from 'path';
import { ApolloServer, gql } from 'apollo-server-express';
import { Account, IAccount } from './models/account';
import { api } from './api';

const app = express();
const port = 3000;
const clientPath = path.join(__dirname, '..', '..', 'client/dist');

const typeDefs = gql`
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

class Post {
  readonly title: string;
  readonly content: string;

  constructor(obj: { title: string; content: string; }) {
    Object.assign(this, obj);
  }
}

const allPosts: Post[] = [];

const resolvers = {
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

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.use(cors());

export const account: IAccount = new Account({
  username: 'Buckyx',
  password: 'Speedas11',
  url: 'https://ts5.travian.com',
});

app.use('/api', api);

app.get(['', '/'], (req, res) => {
  res.redirect('/app/');
});

app.get('*/app.js', (req, res) => {
  res.sendFile(path.join(clientPath, 'app.js'));
});

app.get(['/app/*', '/app'], (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(`GraphQL ready at http://localhost:${port}${server.graphqlPath}`);
});
