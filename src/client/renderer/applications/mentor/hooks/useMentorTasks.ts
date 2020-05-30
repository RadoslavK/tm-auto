import { useQuery } from '@apollo/client';

import { GetMentorTasks } from '*/graphql_operations/mentor.graphql';

import {
  GetMentorTasksQuery,
  MentorTask,
} from '../../../_graphql/types/graphql.type';

export const useMentorTasks = (): readonly MentorTask[] | null => {
  const { data, loading } = useQuery<GetMentorTasksQuery>(GetMentorTasks);

  return loading || !data
    ? null
    : data.mentorTasks;
};