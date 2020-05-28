import { Resolvers } from '../../_types';
import {
  AutoBuildLogEntryContent,
  AutoUnitsLogEntryContent,
  TextLogEntryContent,
} from '../../../_types/graphql';

export default <Resolvers>{
  LogEntryContent: {
    //  receives the GraphQL model already
    __resolveType: (content) => {
      if ((content as TextLogEntryContent).text !== undefined) {
        return 'TextLogEntryContent';
      }

      if ((content as AutoBuildLogEntryContent).autoBuild !== undefined) {
        return 'AutoBuildLogEntryContent';
      }

      if ((content as AutoUnitsLogEntryContent).autoUnits !== undefined) {
        return 'AutoUnitsLogEntryContent';
      }

      return null;
    },
  },
};