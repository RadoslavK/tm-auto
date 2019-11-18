import classNames from 'classnames';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  DequeueBuilding,
  GetQueuedBuildings,
  MoveQueuedBuildingDown,
  MoveQueuedBuildingUp,
} from '*/graphql_operations/queuedBuilding.graphql';
import {
  IDequeueBuildingMutation,
  IDequeueBuildingMutationVariables,
  IMoveQueuedBuildingDownMutation,
  IMoveQueuedBuildingDownMutationVariables,
  IMoveQueuedBuildingUpMutation,
  IMoveQueuedBuildingUpMutationVariables,
  IQueuedBuilding,
  IQueuedBuildingManipulationInput,
} from '../../../../_types/graphql';
import { imageLinks } from '../../../../utils/imageLinks';
import { IVillageContext, VillageContext } from '../../villages/context/VillageContext';

interface IProps {
  readonly building: IQueuedBuilding;
  readonly className?: string;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '2em',
    width: '2em',
  },
  moveUp: {
    backgroundImage: `url("${imageLinks.actions.queue.moveUp}")`,
    '&[disabled]': {
      opacity: 0.5,
    },
  },
  moveDown: {
    backgroundImage: `url("${imageLinks.actions.queue.moveDown}")`,
    '&[disabled]': {
      opacity: 0.5,
    },
  },
  delete: {
    backgroundImage: `url("${imageLinks.actions.delete}")`,
  },
});

export const QueuedBuildingActions: React.FunctionComponent<IProps> = (props) => {
  const {
    building: {
      canMoveDown,
      canMoveUp,
      queueId,
    },
    className,
  } = props;

  const { villageId } = useContext<IVillageContext>(VillageContext);
  const input: IQueuedBuildingManipulationInput = { villageId, queueId };

  const options = {
    variables: { input },
    refetchQueries: [
      { query: GetQueuedBuildings, variables: { villageId } },
    ],
  };

  const [moveDown] = useMutation<IMoveQueuedBuildingDownMutation, IMoveQueuedBuildingDownMutationVariables>(MoveQueuedBuildingDown, options);
  const [moveUp] = useMutation<IMoveQueuedBuildingUpMutation, IMoveQueuedBuildingUpMutationVariables>(MoveQueuedBuildingUp, options);
  const [dequeue] = useMutation<IDequeueBuildingMutation, IDequeueBuildingMutationVariables>(DequeueBuilding, { variables: { input } });
  const classes = useStyles({});

  const onMoveDown = canMoveDown ? async () => moveDown() : undefined;
  const onMoveUp = canMoveUp ? async () => moveUp() : undefined;
  const onDequeue = async (): Promise<void> => {
    await dequeue();
  };

  return (
    <div className={classNames(className, classes.root)}>
      <button type="button" className={classNames(classes.image, classes.moveUp)} disabled={!canMoveUp} onClick={onMoveUp} />
      <button type="button" className={classNames(classes.image, classes.moveDown)} disabled={!canMoveDown} onClick={onMoveDown} />
      <button type="button" className={classNames(classes.image, classes.delete)} onClick={onDequeue} />
    </div>
  );
};

QueuedBuildingActions.displayName = 'QueuedBuildingActions';
