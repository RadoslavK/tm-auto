import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';

import {
  QueuedBuildingRange,
  useDequeueBuildingsBlockMutation,
  useMoveQueuedBuildingsBlockAsHighAsPossibleMutation,
} from '../../../../_graphql/graphqlHooks';
import { useSelectedVillageId } from '../../../../hooks/villages/useSelectedVillageId';
import { imageLinks } from '../../../../utils/imageLinks';

const useStyles = makeStyles({
  expand: {
    backgroundImage: `url("${imageLinks.actions.expand}")`,
  },
  delete: {
    backgroundImage: `url("${imageLinks.actions.delete}")`,
  },
  moveToTop: {
    backgroundImage: `url("${imageLinks.actions.queue.moveToTop}")`,
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '2em',
    width: '2em',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

type Props = {
  readonly className?: string;
  readonly onExpand: () => void;
  readonly range: QueuedBuildingRange;
};

export const QueuedBuildingRangeActions: React.FC<Props> = ({ className, onExpand, range }) => {
  const classes = useStyles();

  const villageId = useSelectedVillageId();

  const [moveToTop] = useMoveQueuedBuildingsBlockAsHighAsPossibleMutation({
    variables: {
      villageId,
      topBuildingQueueId: range.buildings[0].queueId,
      bottomBuildingQueueId: range.buildings[range.buildings.length - 1].queueId,
    },
  });
  const [dequeue] = useDequeueBuildingsBlockMutation({
    variables: {
      villageId,
      topBuildingQueueId: range.buildings[0].queueId,
      bottomBuildingQueueId: range.buildings[range.buildings.length - 1].queueId,
    },
  });

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
      <button
        className={clsx(classes.image, classes.expand)}
        onClick={onExpand}
      />
    </div>
  );
};
