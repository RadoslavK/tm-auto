import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { Cost } from './_models/misc/cost';
import { Resources } from './_models/misc/resources';
import { context } from './graphql/context';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';

const app = express();
const port = 3000;
const clientPath = path.join(__dirname, '..', '..', 'client/dist');

interface IBuildingInfo {
  readonly buildingTime: number;
  readonly cost: Cost;
}

export const buildingInfos: Record<number, readonly IBuildingInfo[]> = {};

const initBuildingsInfo = () => {
  const dir = path.join(__dirname, '..', 'resources', 'buildingInfo');

  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const buildingType = +/(\d+)/.exec(file)[1];
    const text = fs.readFileSync(filePath, { encoding: 'utf-8' });

    buildingInfos[buildingType] = JSON.parse(text).map((info): IBuildingInfo => ({
      buildingTime: info.buildingTime,
      cost: new Cost({
        resources: new Resources(info.cost.resources),
        freeCrop: info.cost.freeCrop,
      }),
    }));
  });
};

initBuildingsInfo();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.applyMiddleware({ app });

app.use(cors());
app.use(express.static(clientPath));

app.get(['/app/*', '/app'], (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

app.get('*', (req, res) => {
  res.redirect('/app/');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(`GraphQL ready at http://localhost:${port}${server.graphqlPath}`);
});
