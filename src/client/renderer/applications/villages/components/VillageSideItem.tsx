import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import {
  Link,
  useLocation,
} from 'react-router-dom';

import { GetVillagesQuery } from '../../../_graphql/types/graphql.type';
import { formatVillageName } from '../../../utils/formatVillageName';

type StylesProps = {
  readonly isVillageSelected: boolean;
};

const useStyles = makeStyles<unknown, StylesProps>({
  activeDot: {
    backgroundColor: '#1c5bbb',
    borderRadius: '50%',
    display: 'inline-block',
    height: 25,
    marginRight: 10,
    width: 25,
  },
  root: {
    display: 'flex',
  },
  villageName: props => ({
    color: props.isVillageSelected ? '#438655' : undefined,
    fontWeight: 'bold',
  }),
});

type Props = {
  readonly isVillageActive: boolean;
  readonly isVillageSelected: boolean;
  readonly village: GetVillagesQuery['villages'][0];
};

export const VillageSideItem: React.FC<Props> = ({
  isVillageActive,
  isVillageSelected,
  village,
}) => {
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
        {formatVillageName(village)}
      </Link>
    </div>
  );
};
