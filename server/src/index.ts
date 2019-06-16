import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import { createServer } from 'http';
import path from 'path';
import { BuildingCategory } from './_enums/BuildingCategory';
import { BuildingType } from './_enums/BuildingType';
import { Tribe } from './_enums/Tribe';
import { BuildingConditions } from './_models/buildings/buildingConditions';
import { Cost } from './_models/misc/cost';
import { context } from './graphql/context';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';

const app = express();
const port = 3000;
const clientPath = path.join(__dirname, '..', '..', 'client/dist');
const imagesPath = path.join(__dirname, 'resources', 'images');
const unitsInfoPath = path.join(__dirname, '..', 'resources', 'unitsInfo.json');
const buildingsInfoPath = path.join(__dirname, '..', 'resources', 'buildingsInfo.json');

interface IBuildingInfo {
  readonly category: BuildingCategory;
  readonly conditions: BuildingConditions;
  readonly costs: Record<number, Cost>;
  readonly maxLevel: number;
  readonly name: string;
}

class BuildingInfo implements IBuildingInfo {
  readonly category: BuildingCategory;
  readonly conditions: BuildingConditions;
  readonly costs: Record<number, Cost>;
  readonly maxLevel: number;
  readonly name: string;

  constructor(params: IBuildingInfo) {
    Object.assign(this, params);

    if (!(this.conditions instanceof BuildingConditions)) {
      this.conditions = new BuildingConditions(this.conditions);
    }

    const costsByLevel = Object.keys(this.costs);
    const zeroLevelCost = this.costs[costsByLevel[0]];

    if (costsByLevel.length && !(zeroLevelCost instanceof Cost)) {
      this.costs = costsByLevel.reduce((reduced, level) => {
        const cost = this.costs[level];
        reduced[level] = new Cost(cost);
        return reduced;
      }, {} as Record<number, Cost>);
    }
  }
}

interface IUnitInfo {
  readonly buildingType: BuildingType;
  readonly cost: Cost;
  readonly name: string;
  readonly tribe: Tribe;
}

export const unitInfos: Record<number, IUnitInfo> = JSON.parse(fs.readFileSync(unitsInfoPath).toString());

const bInfos = JSON.parse(fs.readFileSync(buildingsInfoPath).toString());
export const buildingInfos: Record<number, IBuildingInfo> = Object
  .keys(bInfos)
  .reduce((reduced, bType) => {
    const buildingInfo = bInfos[bType];
    reduced[bType] = new BuildingInfo(buildingInfo);
    return reduced;
  }, {} as Record<number, IBuildingInfo>);


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  subscriptions: {
    path: '/subscriptions',
  },
  uploads: false,
  formatError: err => {
    const errorLinks = err.extensions.exception.stacktrace;

    for (let i = 0; i < errorLinks.length; i++) {
      console.error(errorLinks[i]);
    }

    return err;
  },
});

server.applyMiddleware({ app });

app.use(cors());
app.use(express.static(clientPath));
app.use(express.static(imagesPath));

app.get(['/app/*', '/app'], (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

app.get(['/images*', '/images/*'], (req, res) => {
  res.sendFile( path.join(__dirname, '..', 'resources', req.url));
});

app.get('*', (req, res) => {
  res.redirect('/app/');
});

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => {
    console.log(`GraphQL Server ready at http://localhost:${port}${server.graphqlPath}`);
    console.log(`GraphQL Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`);
});


