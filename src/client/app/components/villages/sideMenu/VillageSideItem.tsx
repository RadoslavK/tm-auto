import { makeStyles } from '@material-ui/core';
import React from 'react';
import {
  Link,
  useLocation,
} from 'react-router-dom';

import { IGetVillagesQuery } from '../../../../_types/graphql';
import { formatVillageName } from '../../../utils/formatVillageName';

interface IStyleProps {
  readonly isVillageSelected: boolean;
}

const useStyles = makeStyles<unknown, IStyleProps>({
  root: {
    display: 'flex',
  },
  villageName: props => ({
    color: props.isVillageSelected ? '#438655' : undefined,
    fontWeight: 'bold',
  }),
  activeDot: {
    height: 25,
    width: 25,
    backgroundColor: '#1c5bbb',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: 10,
  },
});

interface IProps {
  readonly isVillageActive: boolean;
  readonly isVillageSelected: boolean;
  readonly village: IGetVillagesQuery['villages'][0];
}

export const VillageSideItem: React.FC<IProps> = (props) => {
  const {
    isVillageActive,
    isVillageSelected,
    village,
  } = props;

  const classes = useStyles({ isVillageSelected });
  const location = useLocation();
  const path = location.pathname.replace(/villages\/(\d+)/, `villages/${village.id}`);

  return (
    <div className={classes.root}>
      {isVillageActive && (
        <div className={classes.activeDot} />
      )}
      <Link
        className={classes.villageName}
        to={path}
      >
        {formatVillageName(village)}{village.isCapital ? ' (Capital)': ''}
      </Link>
    </div>
  );
};
