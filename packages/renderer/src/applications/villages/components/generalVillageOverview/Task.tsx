import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import {
  useDrag,
  useDrop,
} from 'react-dnd';

import type { TaskType } from '../../../../_graphql/__generated__/GeneralVillageOverviewQuery.graphql.js';

export type DraggedTask = {
  readonly task: TaskType;
  readonly taskIndex: number;
};

type StylesProps = {
  readonly isDragging: boolean;
};

const useStyles = makeStyles<unknown, StylesProps>({
  root: {
    opacity: props => props.isDragging ? 0.5 : 1,
    textAlign: 'center',
  },
  highlight: {
    backgroundColor: 'lightgreen',
  },
});

type Props = {
  readonly onTaskDrop: (originalIndex: number, targetIndex: number) => void;
  readonly task: TaskType;
  readonly taskIndex: number;
};

export const Task: React.FC<Props> = ({
  onTaskDrop,
  task,
  taskIndex,
}) => {
  const [{ isDragging }, drag] = useDrag({
    item: { task, taskIndex } as DraggedTask,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    type: 'Task',
  });

  const classes = useStyles({ isDragging });

  const [{ isTaskOver, movedTask }, drop] = useDrop({
    accept: 'Task',
    canDrop: (droppedItem: DraggedTask) => droppedItem.task !== task,
    collect: (monitor) => ({
      movedTask: monitor.getItem() as DraggedTask | undefined,
      isTaskOver: monitor.isOver() && monitor.canDrop(),
    }),
    drop: (droppedItem) => onTaskDrop(droppedItem.taskIndex, taskIndex),
  });

  const isAbove = movedTask && movedTask.taskIndex >= taskIndex;
  const movedElement = movedTask && <div className={clsx(classes.root, classes.highlight)}>{movedTask.task}</div>;

  return (
    <div ref={drop}>
      {isTaskOver && isAbove && movedElement}
      <div ref={drag} className={classes.root}>
        {task}
      </div>
      {isTaskOver && !isAbove && movedElement}
    </div>
  );
};

Task.displayName = 'Task';