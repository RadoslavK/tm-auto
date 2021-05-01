import { makeStyles } from '@material-ui/core';
import React from 'react';

import type { VillageTaskType } from '../../../../_graphql/__generated__/GeneralVillageOverviewQuery.graphql.js';
import { Task } from './Task.js';

const useStyles = makeStyles({
  root: {
    border: 'solid 1px black',
    padding: 4,
  },
});

type Props = {
  readonly order: ReadonlyArray<VillageTaskType>;
  readonly onChange: (newOrder: ReadonlyArray<VillageTaskType>) => void;
};

export const TasksOrder: React.FC<Props> = ({ order, onChange }) => {
  const classes = useStyles();

  const dropTask = (originalIndex: number, targetIndex: number): void => {
    const newOrder = [...order];

    newOrder.splice(targetIndex, 0, newOrder.splice(originalIndex, 1)[0]);

    onChange(newOrder);
  };

  return (
    <div className={classes.root}>
      {order.map((task, index) => (
        <Task
          key={task}
          task={task}
          taskIndex={index}
          onTaskDrop={dropTask}
        />
      ))}
    </div>
  );
};

TasksOrder.displayName = 'TasksOrder';