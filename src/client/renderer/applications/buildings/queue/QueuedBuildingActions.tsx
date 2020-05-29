import { useMutation } from '@apollo/react-hooks';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';

import {
  DequeueBuilding,
  MoveQueuedBuildingAsHighAsPossible,
  MoveQueuedBuildingDown,
  MoveQueuedBuildingUp,
} from '*/graphql_operations/queuedBuilding.graphql';

import {
  DequeueBuildingMutation,
  DequeueBuildingMutationVariables,
  MoveQueuedBuildingAsHighAsPossibleMutation,
  MoveQueuedBuildingAsHighAsPossibleMutationVariables,
  MoveQueuedBuildingDownMutation,
  MoveQueuedBuildingDownMutationVariables,
  MoveQueuedBuildingUpMutation,
  MoveQueuedBuildingUpMutationVariables,
  QueuedBuilding,
  QueuedBuildingManipulationInput,
} from '../../../_graphql/types/graphql.type';
import { imageLinks } from '../../../utils/imageLinks';
import { useVillageContext } from '../../villages/context/villageContext';

type Props = {
  readonly building: QueuedBuilding;
  readonly className?: string;
};

const useStyles = makeStyles({
  delete: {
    backgroundImage: `url("${imageLinks.actions.delete}")`,
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '2em',
    width: '2em',
  },
  moveDown: {
    '&[disabled]': {
      opacity: 0.5,
    },
    backgroundImage: `url("${imageLinks.actions.queue.moveDown}")`,
  },
  moveToTop: {
    backgroundImage: `url("${imageLinks.actions.queue.moveToTop}")`,
  },
  moveUp: {
    '&[disabled]': {
      opacity: 0.5,
    },
    backgroundImage: `url("${imageLinks.actions.queue.moveUp}")`,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export const QueuedBuildingActions: React.FC<Props> = (props) => {
  const {
    building: {
      canMoveDown,
      canMoveUp,
      queueId,
    },
    className,
  } = props;

  const { villageId } = useVillageContext();
  const input: QueuedBuildingManipulationInput = { queueId, villageId };

  const options = {
    variables: { input },
  };

  const [moveToTop] = useMutation<MoveQueuedBuildingAsHighAsPossibleMutation, MoveQueuedBuildingAsHighAsPossibleMutationVariables>(MoveQueuedBuildingAsHighAsPossible, {
    variables: { queueId, villageId },
  });
  const [moveDown] = useMutation<MoveQueuedBuildingDownMutation, MoveQueuedBuildingDownMutationVariables>(MoveQueuedBuildingDown, options);
  const [moveUp] = useMutation<MoveQueuedBuildingUpMutation, MoveQueuedBuildingUpMutationVariables>(MoveQueuedBuildingUp, options);
  const [dequeue] = useMutation<DequeueBuildingMutation, DequeueBuildingMutationVariables>(DequeueBuilding, options);

  const classes = useStyles({});

  const onMoveToTop = () => moveToTop();
  const onMoveDown = canMoveDown ? () => moveDown() : undefined;
  const onMoveUp = canMoveUp ? () => moveUp() : undefined;
  const onDequeue = () => dequeue();

  return (
    <div className={clsx(className, classes.root)}>
      <button
        className={clsx(classes.image, classes.moveToTop)}
        onClick={onMoveToTop}
        type="button"
      />
      <button
        className={clsx(classes.image, classes.moveUp)}
        disabled={!canMoveUp}
        onClick={onMoveUp}
        type="button"
      />
      <button
        className={clsx(classes.image, classes.moveDown)}
        disabled={!canMoveDown}
        onClick={onMoveDown}
        type="button"
      />
      <button
        className={clsx(classes.image, classes.delete)}
        onClick={onDequeue}
        type="button"
      />
    </div>
  );
};
