import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';

import {
  QueuedBuilding,
  useDequeueBuildingMutation,
  useMoveQueuedBuildingAsHighAsPossibleMutation,
} from '../../../../_graphql/graphqlHooks';
import { imageLinks } from '../../../../utils/imageLinks';
import { useVillageContext } from '../../../villages/context/villageContext';

type Props = {
  readonly building: QueuedBuilding;
  readonly className?: string;
  readonly onCollapse?: () => void;
};

const useStyles = makeStyles({
  collapse: {
    backgroundImage: `url("${imageLinks.actions.collapse}")`,
  },
  delete: {
    backgroundImage: `url("${imageLinks.actions.delete}")`,
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '2em',
    width: '2em',
  },
  moveToTop: {
    backgroundImage: `url("${imageLinks.actions.queue.moveToTop}")`,
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
      queueId,
    },
    className,
    onCollapse,
  } = props;

  const { villageId } = useVillageContext();

  const [moveToTop] = useMoveQueuedBuildingAsHighAsPossibleMutation({ variables: { queueId, villageId } });
  const [dequeue] = useDequeueBuildingMutation({ variables: { input: { queueId, villageId } } });

  const classes = useStyles({});

  const onMoveToTop = () => moveToTop();
  const onDequeue = () => dequeue();

  return (
    <div className={clsx(className, classes.root)}>
      <button
        className={clsx(classes.image, classes.moveToTop)}
        onClick={onMoveToTop}
      />
      <button
        className={clsx(classes.image, classes.delete)}
        onClick={onDequeue}
      />
      {onCollapse && (
        <button
          className={clsx(classes.image, classes.collapse)}
          onClick={onCollapse}
        />
      )}
    </div>
  );
};
