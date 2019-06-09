import { GetBuildingSpots } from '*/graphql_operations/building.graphql';
import {
  DequeueBuilding,
  GetQueuedBuildings,
  MoveQueuedBuildingDown,
  MoveQueuedBuildingUp,
} from '*/graphql_operations/queuedBuilding.graphql';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useContext } from 'react';
import * as React from 'react';
import { useMutation } from 'react-apollo-hooks';
import {
  IDequeueBuildingMutation, IDequeueBuildingMutationVariables,
  IMoveQueuedBuildingDownMutation,
  IMoveQueuedBuildingDownMutationVariables,
  IMoveQueuedBuildingUpMutation, IMoveQueuedBuildingUpMutationVariables, IQueuedBuilding,
} from '../../../_types/graphql';
import { imageLinks } from '../../../utils/imageLinks';
import { IVillageContext, VillageContext } from '../../villages/context/VillageContext';
import classNames = require('classnames');

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
      canMoveUp,
      canMoveDown,
      queueId,
    },
    className,
  } = props;

  const { villageId } = useContext<IVillageContext>(VillageContext);

  const options = {
    variables: {
      input: { villageId, queueId },
    },
    refetchQueries: [
      { query: GetBuildingSpots, variables: { villageId } },
      { query: GetQueuedBuildings, variables: { villageId } },
    ],
  };

  const moveDown = useMutation<IMoveQueuedBuildingDownMutation, IMoveQueuedBuildingDownMutationVariables>(MoveQueuedBuildingDown, options);
  const moveUp = useMutation<IMoveQueuedBuildingUpMutation, IMoveQueuedBuildingUpMutationVariables>(MoveQueuedBuildingUp, options);
  const dequeue = useMutation<IDequeueBuildingMutation, IDequeueBuildingMutationVariables>(DequeueBuilding, options);

  const onMoveDown = canMoveDown ? async () => await moveDown() : undefined;
  const onMoveUp = canMoveUp ? async () => await moveUp() : undefined;
  const onDequeue = async () => await dequeue();

  const classes = useStyles({});

  return (
    <div className={classNames(className, classes.root)}>
      <button className={classNames(classes.image, classes.moveUp)} disabled={!canMoveUp} onClick={onMoveUp} />
      <button className={classNames(classes.image, classes.moveDown)} disabled={!canMoveDown} onClick={onMoveDown} />
      <button className={classNames(classes.image, classes.delete)} onClick={onDequeue} />
    </div>
  )
};
