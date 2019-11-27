import { IResolvers } from 'graphql-tools';
import { mergeResolvers } from 'merge-graphql-schemas';

import { accountResolvers } from './accountResolvers';
import { buildingResolvers } from './buildingResolvers';
import { controllerResolvers } from './controllerResolvers';
import { heroResolvers } from './heroResolvers';
import { logsResolvers } from './logsResolvers';
import { playerResolvers } from './playerResolvers';
import { settingsResolvers } from './settingsResolvers';
import { unitResolvers } from './unitResolvers';
import { villageResolvers } from './villageResolvers';

export const resolvers = mergeResolvers([
  villageResolvers as IResolvers,
  controllerResolvers as IResolvers,
  buildingResolvers as IResolvers,
  settingsResolvers as IResolvers,
  heroResolvers as IResolvers,
  accountResolvers as IResolvers,
  logsResolvers as IResolvers,
  playerResolvers as IResolvers,
  unitResolvers as IResolvers,
]);
