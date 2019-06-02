import express from 'express';
import cors from 'cors';
import path from 'path';
import { ApolloServer, gql } from 'apollo-server-express';
import { Account, IAccount } from './models/account';
import { Controller } from './controller';

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
app.use(express.static(clientPath));

export const account: IAccount = new Account({
  username: 'Buckyx',
  password: 'Speedas11',
  url: 'https://ts5.travian.com',
});

const controller: Controller = new Controller();

app.get('', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

app.post('/start', async (req, res) => {
  controller.start();
  res.statusCode = 200;
  res.send('Started');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(`GraphQL ready at http://localhost:${port}${server.graphqlPath}`);
});
