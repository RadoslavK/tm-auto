import { Resolvers } from '../../_types';
import { AutoBuildLogEntryContent } from '../../../_models/logs/content/autoBuild';
import { AutoUnitsLogEntryContent } from '../../../_models/logs/content/autoUnits';
import { TextLogEntryContent } from '../../../_models/logs/content/text';

export default <Resolvers>{
  LogEntryContent: {
    //  receives the GraphQL model already
    __resolveType: (content) => {
      if (content instanceof TextLogEntryContent) {
        return 'TextLogEntryContent';
      }

      if (content instanceof AutoBuildLogEntryContent) {
        return 'AutoBuildLogEntryContent';
      }

      if (content instanceof AutoUnitsLogEntryContent) {
        return 'AutoUnitsLogEntryContent';
      }

      return null;
    },
  },

  TextLogEntryContent: {
    messageType: c => c.type,
  },
};