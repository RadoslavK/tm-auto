import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { allBuildingTypes, BuildingType } from './_enums/BuildingType';
import { Tribe } from './_enums/Tribe';
import {
  BuildingConditions,
  CapitalCondition,
  IBuildingWithLevelRequirement,
} from './_models/buildings/buildingConditions';
import { Cost } from './_models/misc/cost';
import { Resources } from './_models/misc/resources';
import { context } from './graphql/context';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';

const app = express();
const port = 3000;
const clientPath = path.join(__dirname, '..', '..', 'client/dist');
const imagesPath = path.join(__dirname, 'resources', 'images');
const buildingInfoPath = path.join(__dirname, '..', 'resources', 'buildingInfo');

interface IBuildingInfo {
  readonly cost: Cost;
}

export const buildingInfos: Record<number, readonly IBuildingInfo[]> = {};

const initBuildingsInfo = () => {
  buildingInfos[BuildingType.None] = [];

  fs.readdirSync(buildingInfoPath).forEach(file => {
    const filePath = path.join(buildingInfoPath, file);
    const buildingType = +/(\d+)/.exec(file)[1];
    const text = fs.readFileSync(filePath, { encoding: 'utf-8' });

    buildingInfos[buildingType] = JSON.parse(text).map((info): IBuildingInfo => ({
      cost: new Cost({
        buildingTime: info.buildingTime,
        resources: new Resources({
          ...info.cost.resources,
          freeCrop: info.cost.freeCrop,
        }),
      }),
    }));
  });
};

initBuildingsInfo();

export const buildingsConditions: Record<number, BuildingConditions> = {};

const requireBuilding = (type: BuildingType, level: number): IBuildingWithLevelRequirement => ({
  type,
  level
});

const getBuildingConditions = (type: BuildingType): BuildingConditions => {
  let capitalCondition: CapitalCondition = CapitalCondition.None;
  let isUnique: boolean = true;
  let playerTribe: Tribe = Tribe.None;
  let requiredBuildings: readonly IBuildingWithLevelRequirement[] = [];
  let prohibitedBuildingTypes: readonly BuildingType[] = [];

  switch (type) {
    case BuildingType.Wood: {
      isUnique = false;
      break;
    }

    case BuildingType.Clay: {
      isUnique = false;
      break;
    }

    case BuildingType.Iron: {
      isUnique = false;
      break;
    }

    case BuildingType.Crop: {
      isUnique = false;
      break;
    }

    case BuildingType.Sawmill: {
      requiredBuildings = [
        requireBuilding(BuildingType.Wood, 10),
        requireBuilding(BuildingType.MainBuilding, 5),
      ];
      break;
    }

    case BuildingType.Brickyard: {
      requiredBuildings = [
        requireBuilding(BuildingType.Clay, 10),
        requireBuilding(BuildingType.MainBuilding, 5),
      ];
      break;
    }

    case BuildingType.IronFoundry: {
      requiredBuildings = [
        requireBuilding(BuildingType.Iron, 1),
        requireBuilding(BuildingType.MainBuilding, 5),
      ];
      break;
    }

    case BuildingType.GrainMill: {
      requiredBuildings = [
        requireBuilding(BuildingType.Crop, 10),
        requireBuilding(BuildingType.MainBuilding, 5),
      ];
      break;
    }

    case BuildingType.Bakery: {
      requiredBuildings = [
        requireBuilding(BuildingType.Crop, 10),
        requireBuilding(BuildingType.MainBuilding, 5),
        requireBuilding(BuildingType.GrainMill, 5),
      ];
      break;
    }

    case BuildingType.Warehouse: {
      requiredBuildings = [
        requireBuilding(BuildingType.MainBuilding, 1),
      ];
      isUnique = false;
      break;
    }

    case BuildingType.Granary: {
      requiredBuildings = [
        requireBuilding(BuildingType.MainBuilding, 1),
      ];
      isUnique = false;
      break;
    }

    case BuildingType.Blacksmith: {
      requiredBuildings = [
        requireBuilding(BuildingType.MainBuilding, 3),
        requireBuilding(BuildingType.Academy, 3),
      ];
      break;
    }

    case BuildingType.Smithy: {
      requiredBuildings = [
        requireBuilding(BuildingType.MainBuilding, 3),
        requireBuilding(BuildingType.Academy, 1),
      ];
      break;
    }

    case BuildingType.TournamentSquare: {
      requiredBuildings = [
        requireBuilding(BuildingType.RallyPoint, 15),
      ];
      break;
    }

    case BuildingType.Marketplace: {
      requiredBuildings = [
        requireBuilding(BuildingType.MainBuilding, 3),
        requireBuilding(BuildingType.Warehouse, 1),
        requireBuilding(BuildingType.Granary, 1),
      ];
      break;
    }

    case BuildingType.Embassy: {
      requiredBuildings = [
        requireBuilding(BuildingType.MainBuilding, 1),
      ];
      break;
    }

    case BuildingType.Barracks: {
      requiredBuildings = [
        requireBuilding(BuildingType.MainBuilding, 3),
        requireBuilding(BuildingType.RallyPoint, 1),
      ];
      break;
    }

    case BuildingType.Stable: {
      requiredBuildings = [
        requireBuilding(BuildingType.Smithy, 3),
        requireBuilding(BuildingType.Academy, 5),
      ];
      break;
    }

    case BuildingType.Workshop: {
      requiredBuildings = [
        requireBuilding(BuildingType.MainBuilding, 5),
        requireBuilding(BuildingType.Academy, 10),
      ];
      break;
    }

    case BuildingType.Academy: {
      requiredBuildings = [
        requireBuilding(BuildingType.MainBuilding, 3),
        requireBuilding(BuildingType.Barracks, 3),
      ];
      break;
    }

    case BuildingType.Cranny: {
      isUnique = false;
      break;
    }

    case BuildingType.TownHall: {
      requiredBuildings = [
        requireBuilding(BuildingType.MainBuilding, 10),
        requireBuilding(BuildingType.Academy, 10),
      ];
      break;
    }

    case BuildingType.Residence: {
      requiredBuildings = [
        requireBuilding(BuildingType.MainBuilding, 5),
      ];
      prohibitedBuildingTypes = [BuildingType.Palace];
      break;
    }

    case BuildingType.Palace: {
      requiredBuildings = [
        requireBuilding(BuildingType.MainBuilding, 5),
        requireBuilding(BuildingType.Embassy, 1),
      ];
      prohibitedBuildingTypes = [BuildingType.Residence];
      break;
    }

    case BuildingType.Treasury: {
      requiredBuildings = [
        requireBuilding(BuildingType.MainBuilding, 10),
      ];
      prohibitedBuildingTypes = [BuildingType.WonderOfTheWorld];
      break;
    }

    case BuildingType.TradeOffice: {
      requiredBuildings = [
        requireBuilding(BuildingType.Marketplace, 20),
        requireBuilding(BuildingType.Stable, 10),
      ];
      break;
    }

    case BuildingType.GreatBarracks: {
      requiredBuildings = [
        requireBuilding(BuildingType.Barracks, 20),
      ];
      capitalCondition = CapitalCondition.Prohibited;
      break;
    }

    case BuildingType.GreatStable: {
      requiredBuildings = [
        requireBuilding(BuildingType.Stable, 20),
      ];
      capitalCondition = CapitalCondition.Prohibited;
      break;
    }

    case BuildingType.CityWall: {
      playerTribe = Tribe.Romans;
      break;
    }

    case BuildingType.EarthWall: {
      playerTribe = Tribe.Teutons;
      break;
    }

    case BuildingType.Palisade: {
      playerTribe = Tribe.Gauls;
      break;
    }

    case BuildingType.StonemasonsLodge: {
      requiredBuildings = [
        requireBuilding(BuildingType.MainBuilding, 5),
      ];
      capitalCondition = CapitalCondition.Required;
      break;
    }

    case BuildingType.Brewery: {
      requiredBuildings = [
        requireBuilding(BuildingType.Granary, 20),
        requireBuilding(BuildingType.RallyPoint, 10),
      ];
      playerTribe = Tribe.Teutons;
      break;
    }

    case BuildingType.Trapper: {
      requiredBuildings = [
        requireBuilding(BuildingType.RallyPoint, 1),
      ];
      playerTribe = Tribe.Gauls;
      isUnique = false;
      break;
    }

    case BuildingType.HerosMansion: {
      requiredBuildings = [
        requireBuilding(BuildingType.MainBuilding, 3),
        requireBuilding(BuildingType.RallyPoint, 1),
      ];
      break;
    }

    case BuildingType.GreatWarehouse: {
      requiredBuildings = [
        requireBuilding(BuildingType.MainBuilding, 10),
      ];
      break;
    }

    case BuildingType.GreatGranary: {
      requiredBuildings = [
        requireBuilding(BuildingType.MainBuilding, 10),
      ];
      break;
    }

    case BuildingType.WonderOfTheWorld: {
      capitalCondition = CapitalCondition.Prohibited;
      break;
    }

    case BuildingType.HorseDrinkingTrough: {
      requiredBuildings = [
        requireBuilding(BuildingType.RallyPoint, 10),
        requireBuilding(BuildingType.Stable, 20),
      ];
      playerTribe = Tribe.Romans;
      break;
    }

    case BuildingType.StoneWall: {
      playerTribe = Tribe.Egyptians;
      break;
    }

    case BuildingType.MakeshiftWall: {
      playerTribe = Tribe.Huns;
      break;
    }

    case BuildingType.CommandCenter: {
      requiredBuildings = [
        requireBuilding(BuildingType.MainBuilding, 5),
      ];
      prohibitedBuildingTypes = [
        BuildingType.Residence,
        BuildingType.Palace,
      ];
      playerTribe = Tribe.Huns;
      break;
    }

    case BuildingType.Waterworks: {
      requiredBuildings = [
        requireBuilding(BuildingType.HerosMansion, 10),
      ];
      playerTribe = Tribe.Egyptians;
      break;
    }
  }

  return new BuildingConditions({
    capital: capitalCondition,
    isUnique,
    playerTribe,
    prohibitedBuildingTypes,
    requiredBuildings,
    type,
  })
};

export const getBuildingCategory = (type: BuildingType): number => {
  switch (type) {
    //RESOURCES
    case BuildingType.Sawmill:
    case BuildingType.Brickyard:
    case BuildingType.IronFoundry:
    case BuildingType.GrainMill:
    case BuildingType.Bakery:
      return 3;

    //MILITARY
    case BuildingType.Smithy:
    case BuildingType.TournamentSquare:
    case BuildingType.Barracks:
    case BuildingType.Stable:
    case BuildingType.Workshop:
    case BuildingType.Academy:
    case BuildingType.GreatBarracks:
    case BuildingType.GreatStable:
    case BuildingType.Trapper:
    case BuildingType.HerosMansion:
      return 2;

    //RALLY POINT + WALL
    case BuildingType.RallyPoint:
    case BuildingType.CityWall:
    case BuildingType.EarthWall:
    case BuildingType.Palisade:
    case BuildingType.MakeshiftWall:
    case BuildingType.StoneWall:
      return 0;

    default:
      return 1;
  }
};

const initBuildingConditions = () => {
  for (let i = 0; i < allBuildingTypes.length; i++) {
    const type = allBuildingTypes[i];
    buildingsConditions[type] = getBuildingConditions(type);
  }
};

initBuildingConditions();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(`GraphQL ready at http://localhost:${port}${server.graphqlPath}`);
});
