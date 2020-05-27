// eslint-disable-next-line import/no-extraneous-dependencies
import { IResolvers } from '@graphql-tools/utils';
import { mergeResolvers } from 'graphql-tools';

import { accountResolvers } from './accountResolvers';
import { buildingResolvers } from './buildingResolvers';
import { controllerResolvers } from './controllerResolvers';
import { heroResolvers } from './heroResolvers';
import { logsResolvers } from './logsResolvers';
import { nextExecutionResolvers } from './nextExecutionResolvers';
import { settingsResolvers } from './settingsResolvers';
import { unitResolvers } from './unitResolvers';
import { villageResolvers } from './villageResolvers';

export const resolvers = mergeResolvers([
  villageResolvers,
  controllerResolvers,
  buildingResolvers,
  settingsResolvers,
  heroResolvers,
  accountResolvers,
  logsResolvers,
  unitResolvers,
  nextExecutionResolvers,
] as IResolvers[]) as IResolvers;
