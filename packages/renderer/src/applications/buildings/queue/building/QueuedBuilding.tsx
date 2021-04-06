import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { Suspense } from 'react';
import {
  DragPreviewImage,
  useDrag,
} from 'react-dnd';
import { useFragment } from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';

import type { QueuedBuilding_queuedBuilding$key } from '../../../../_graphql/__generated__/QueuedBuilding_queuedBuilding.graphql.js';
import { selectedVillageIdState } from '../../../../_recoil/atoms/selectedVillageId.js';
import { tribeState } from '../../../../_recoil/atoms/tribe.js';
import {
  BuildingImageSize,
  imageLinks,
} from '../../../../utils/imageLinks.js';
import { useIsQueuedBuildingExpanded } from '../../hooks/useIsQueuedBuildingExpanded.js';
import type { MovedQueuedBuilding } from '../DroppedQueuedBuilding.js';
import {
  DropPosition,
  QueuedBuildingsDropArea,
} from '../QueuedBuildingsDropArea.js';
import { ExpandedQueuedBuilding } from './ExpandedQueuedBuilding.js';
import { QueuedBuildingComponent } from './QueuedBuildingComponent.js';

type StylesProps = {
  readonly isDragging: boolean;
};

const useStyles = makeStyles<unknown, StylesProps>({
  root: {
    opacity: (props) => (props.isDragging ? 0.5 : 1),
  },
});

type Props = {
  readonly building: QueuedBuilding_queuedBuilding$key;
  readonly index: number;
  readonly isMergeable: boolean;
  readonly onCollapse?: () => void;
  readonly onExpand?: () => void;
};

const queuedBuildingQueuedBuildingFragment = graphql`
  fragment QueuedBuilding_queuedBuilding on QueuedBuilding {
      id
      type
      ...QueuedBuildingComponent_queuedBuilding
      ...ExpandedQueuedBuilding_queuedBuilding
  }
`;

export const QueuedBuilding: React.FC<Props> = ({
  building,
  index,
  isMergeable,
  onCollapse,
  onExpand,
}) => {
  const queuedBuildingFragment = useFragment(queuedBuildingQueuedBuildingFragment, building);
  const villageId = useRecoilValue(selectedVillageIdState);


  const movedBuilding: MovedQueuedBuilding = {
    buildingFragmentKey: queuedBuildingFragment,
    index,
    queueId: queuedBuildingFragment.id,
  };

  const [{ isDragging }, drag, preview] = useDrag({
    item: movedBuilding,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    type: 'QueuedBuilding',
  });

  const classes = useStyles({ isDragging });
  const tribe = useRecoilValue(tribeState);
  const isExpanded = useIsQueuedBuildingExpanded(villageId, queuedBuildingFragment.id);

  return (
    <QueuedBuildingsDropArea
      getDropPosition={(queueIndex) =>
        queueIndex > index
          ? DropPosition.Above
          : DropPosition.Below
      }
      queueId={queuedBuildingFragment.id}
      index={index}
    >
      <DragPreviewImage
        connect={preview}
        src={imageLinks.getBuilding(queuedBuildingFragment.type, tribe, BuildingImageSize.Small)}
      />
      <div ref={drag} className={classes.root}>
        <QueuedBuildingComponent
          building={queuedBuildingFragment}
          isMergeable={isMergeable}
          onCollapse={onCollapse}
          onExpand={onExpand}
          showActions
        />
        {isExpanded && (
          <Suspense fallback={null}>
            <ExpandedQueuedBuilding building={queuedBuildingFragment} />
          </Suspense>
        )}
      </div>
    </QueuedBuildingsDropArea>
  );
};

QueuedBuilding.displayName = 'QueuedBuilding';