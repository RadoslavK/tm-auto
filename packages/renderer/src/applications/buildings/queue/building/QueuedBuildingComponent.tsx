import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';

import type { QueuedBuildingComponent_queuedBuilding$key } from '../../../../_graphql/__generated__/QueuedBuildingComponent_queuedBuilding.graphql.js';
import { tribeState } from '../../../../_recoil/atoms/tribe.js';
import { imageLinks } from '../../../../utils/imageLinks.js';
import { Cost } from '../Cost.js';
import { QueuedBuildingActions } from './QueuedBuildingActions.js';

type StyleProps = {
  readonly buildingType: number;
  readonly tribe: string;
};

const useStyles = makeStyles<unknown, StyleProps>({
  actions: {
    '& button': {
      display: 'block',
    },
  },
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
  readonly building: QueuedBuildingComponent_queuedBuilding$key;
  readonly isHighlight?: boolean;
  readonly onCollapse?: () => void;
};

const queuedBuildingComponentQueuedBuildingFragment = graphql`
    fragment QueuedBuildingComponent_queuedBuilding on QueuedBuilding {
        name
        type
        level
        fieldId
        queueId
        buildingTime {
            ...Cost_duration
        }
        cost {
            ...Cost_resources
        }
    }
`;

export const QueuedBuildingComponent: React.FC<Props> = ({
  building,
  isHighlight,
  onCollapse,
}) => {
  const queuedBuildingFragment = useFragment(queuedBuildingComponentQueuedBuildingFragment, building);
  const tribe = useRecoilValue(tribeState);
  const classes = useStyles({
    buildingType: queuedBuildingFragment.type,
    tribe,
  });

  return (
    <div className={classes.root}>
      {!isHighlight && (
        <QueuedBuildingActions
          buildingQueueId={queuedBuildingFragment.queueId}
          className={classes.actions}
          onCollapse={onCollapse}
        />
      )}
      <div className={classes.imageWithFieldId}>
        <div className={classes.buildingImage} />
        <div>[{queuedBuildingFragment.fieldId}]</div>
      </div>
      <div className={classes.info}>
        <div>
          {queuedBuildingFragment.name} Level {queuedBuildingFragment.level}
        </div>
        <Cost
          buildTime={queuedBuildingFragment.buildingTime}
          resources={queuedBuildingFragment.cost}
        />
      </div>
    </div>
  );
};

QueuedBuildingComponent.displayName = 'QueuedBuildingComponent';