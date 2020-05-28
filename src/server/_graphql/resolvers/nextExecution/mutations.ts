import { Resolvers } from '../../_types';
import { Duration } from '../../../_models/duration';
import { accountContext } from '../../../accountContext';
import { convertDelayToDate } from '../../mappers/convertDelayToDate';

export default <Resolvers>{
  Mutation: {
    resetNextTaskExecution: (_, args) => {
      accountContext.nextExecutionService.resetNextTaskExecution(args.task);
      return true;
    },

    resetNextVillageTaskExecution: (_, args) => {
      accountContext.nextExecutionService.resetNextVillageTaskExecution(args.villageId, args.task);
      return true;
    },

    setNextTaskExecution: (_, args) => {
      accountContext.nextExecutionService.set(args.task, convertDelayToDate(new Duration(args.delay)));
      return true;
    },

    setNextVillageTaskExecution: (_, args) => {
      accountContext.nextExecutionService.setForVillage(args.villageId, args.task, convertDelayToDate(new Duration(args.delay)));
      return true;
    },
  },
};