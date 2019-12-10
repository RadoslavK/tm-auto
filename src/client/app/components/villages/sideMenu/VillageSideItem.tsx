import { makeStyles } from '@material-ui/core';
import React from 'react';
import {
  Link,
  useRouteMatch,
} from 'react-router-dom';

import { IGetVillagesQuery } from '../../../../_types/graphql';
import { formatVillageName } from '../../../utils/formatVillageName';

interface IProps {
  readonly isVillageActive: boolean;
  readonly village: IGetVillagesQuery['villages'][0];
}

const useStyles = makeStyles<unknown, IProps>({
  root: {
    display: 'flex',
  },
  villageName: props => ({
    color: props.village.isCapital ? '#438655' : undefined,
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

export const VillageSideItem: React.FC<IProps> = (props) => {
  const {
    isVillageActive,
    village,
  } = props;

  const classes = useStyles(props);
  const match = useRouteMatch();

  return (
    <div className={classes.root}>
      {isVillageActive && (
        <div className={classes.activeDot} />
      )}
      <Link
        className={classes.villageName}
        to={`${match.url}/${village.id}`}
      >
        {formatVillageName(village)}
      </Link>
    </div>
  );
};
