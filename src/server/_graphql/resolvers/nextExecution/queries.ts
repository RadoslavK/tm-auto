import { Resolvers } from '../../_types';
import { Timestamp } from '../../../_models/misc/timestamp';
import { accountContext } from '../../../accountContext';

export default <Resolvers>{
  Query: {
    nextTaskExecution: (_, args) => Timestamp.fromDate(accountContext.nextExecutionService.get(args.task)),
    nextTasksExecution: () => Timestamp.fromDate(accountContext.nextExecutionService.tasks()),
    nextVillageTaskExecution: (_, args) => Timestamp.fromDate(accountContext.nextExecutionService.getForVillage(args.villageId, args.task)),
  },
};