import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';

import type { QueuedBuildingRangeComponent_QueuedBuildingRange$key } from '../../../../_graphql/__generated__/QueuedBuildingRangeComponent_QueuedBuildingRange.graphql.js';
import { tribeState } from '../../../../_recoil/atoms/tribe.js';
import { imageLinks } from '../../../../utils/imageLinks.js';
import { Cost } from '../Cost.js';
import { QueuedBuildingRangeActions } from './QueuedBuildingRangeActions.js';

type StyleProps = {
  readonly buildingType: number;
  readonly tribe: string;
};

const useStyles = makeStyles<unknown, StyleProps>({
  buildingImage: (props) => ({
    backgroundImage: `url("${imageLinks.getBuilding(props.buildingType, props.tribe)}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '4rem',
    width: '4rem',
  }),
  imageWithFieldId: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
  root: {
    '&>*': {
      marginLeft: '10px',
    },
    'display': 'flex',
  },
});

type Props = {
  readonly buildingRange: QueuedBuildingRangeComponent_QueuedBuildingRange$key;
  readonly isHighlight?: boolean;
  readonly onExpand?: (id: string) => void;
};

const queuedBuildingRangeComponentQueuedBuildingRangeFragment = graphql`
  fragment QueuedBuildingRangeComponent_QueuedBuildingRange on QueuedBuildingRange {
      name
      type
      id
      fieldId
      buildings {
          level
      }
      buildingTime {
          ...Cost_duration
      }
      cost {
          ...Cost_resources
      }
      ...QueuedBuildingRangeActions_queuedBuildingRange
  }
`;

export const QueuedBuildingRangeComponent: React.FC<Props> = ({
  buildingRange,
  isHighlight,
  onExpand,
}) => {
  const buildingRangeFragment = useFragment(queuedBuildingRangeComponentQueuedBuildingRangeFragment, buildingRange);
  const tribe = useRecoilValue(tribeState);
  const classes = useStyles({
    buildingType: buildingRangeFragment.type,
    tribe,
  });

  return (
    <div className={classes.root}>
      {!isHighlight && onExpand && (
        <QueuedBuildingRangeActions
          className={classes.actions}
          onExpand={() => onExpand(buildingRangeFragment.id)}
          range={buildingRangeFragment}
        />
      )}
      <div className={classes.imageWithFieldId}>
        <div className={classes.buildingImage} />
        <div>[{buildingRangeFragment.fieldId}]</div>
      </div>
      <div className={classes.info}>
        <div>
          {buildingRangeFragment.name} Levels {buildingRangeFragment.buildings[0].level}-
          {buildingRangeFragment.buildings[buildingRangeFragment.buildings.length - 1].level}
        </div>
        <Cost
          buildTime={buildingRangeFragment.buildingTime}
          resources={buildingRangeFragment.cost}
        />
      </div>
    </div>
  );
};

QueuedBuildingRangeComponent.displayName = 'QueuedBuildingRangeComponent';