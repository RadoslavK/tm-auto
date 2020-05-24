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
  IDequeueBuildingMutation,
  IDequeueBuildingMutationVariables,
  IMoveQueuedBuildingAsHighAsPossibleMutation,
  IMoveQueuedBuildingAsHighAsPossibleMutationVariables,
  IMoveQueuedBuildingDownMutation,
  IMoveQueuedBuildingDownMutationVariables,
  IMoveQueuedBuildingUpMutation,
  IMoveQueuedBuildingUpMutationVariables,
  IQueuedBuilding,
  IQueuedBuildingManipulationInput,
} from '../../../_types/graphql';
import { useVillageContext } from '../../../hooks/useVillageContext';
import { imageLinks } from '../../../utils/imageLinks';

interface IProps {
  readonly building: IQueuedBuilding;
  readonly className?: string;
}

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

export const QueuedBuildingActions: React.FC<IProps> = (props) => {
  const {
    building: {
      canMoveDown,
      canMoveUp,
      queueId,
    },
    className,
  } = props;

  const { villageId } = useVillageContext();
  const input: IQueuedBuildingManipulationInput = { queueId, villageId };

  const options = {
    variables: { input },
  };

  const [moveToTop] = useMutation<IMoveQueuedBuildingAsHighAsPossibleMutation, IMoveQueuedBuildingAsHighAsPossibleMutationVariables>(MoveQueuedBuildingAsHighAsPossible, {
    variables: { queueId, villageId },
  });
  const [moveDown] = useMutation<IMoveQueuedBuildingDownMutation, IMoveQueuedBuildingDownMutationVariables>(MoveQueuedBuildingDown, options);
  const [moveUp] = useMutation<IMoveQueuedBuildingUpMutation, IMoveQueuedBuildingUpMutationVariables>(MoveQueuedBuildingUp, options);
  const [dequeue] = useMutation<IDequeueBuildingMutation, IDequeueBuildingMutationVariables>(DequeueBuilding, options);

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
