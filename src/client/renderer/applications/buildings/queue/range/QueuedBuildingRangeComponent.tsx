import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import { QueuedBuildingRange } from '../../../../_graphql/graphqlHooks';
import { useBuildingInfo } from '../../../../hooks/useBuildingInfo';
import { imageLinks } from '../../../../utils/imageLinks';
import { Cost } from '../Cost';
import { QueuedBuildingRangeActions } from './QueuedBuildingRangeActions';

type StyleProps = {
  readonly buildingType: number;
};

const useStyles = makeStyles<unknown, StyleProps>({
  buildingImage: props => ({
    backgroundImage: `url("${imageLinks.getBuilding(props.buildingType)}")`,
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
    display: 'flex',
  },
});

type Props = {
  readonly buildingRange: QueuedBuildingRange;
  readonly isHighlight?: boolean;
  readonly onExpand?: (id: string) => void;
};

export const QueuedBuildingRangeComponent: React.FC<Props> = ({ buildingRange, isHighlight, onExpand }) => {
  const classes = useStyles({
    buildingType: buildingRange.type,
  });

  const buildingInfo = useBuildingInfo(buildingRange.type);

  return (
    <div className={classes.root}>
      {!isHighlight && (
        <QueuedBuildingRangeActions
          className={classes.actions}
          onExpand={onExpand ? () => onExpand(buildingRange.id) : undefined}
        />
      )}
      <div className={classes.imageWithFieldId}>
        <div className={classes.buildingImage} />
        <div>
          [{buildingRange.fieldId}]
        </div>
      </div>
      <div className={classes.info}>
        <div>
          {buildingInfo?.name}
          {' '}
          Levels
          {' '}
          {buildingRange.buildings[0].level}-{buildingRange.buildings[buildingRange.buildings.length - 1].level}
        </div>
        <Cost cost={buildingRange.cost} />
      </div>
    </div>
  );
};