import { Resolvers } from '../../_types';
import { accountContext } from '../../../accountContext';
import { mapLogEntry } from '../../mappers/mapLogEntry';

export default <Resolvers>{
  Query: {
    logsEntries: () => accountContext.logsService.logEntries().map(x => mapLogEntry(x)),
  },
};