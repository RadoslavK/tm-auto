import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { Link, useLocation } from 'react-router-dom';

import graphql from 'babel-plugin-relay/macro';
import { VillageSideItem_village$key } from '../../../_graphql/__generated__/VillageSideItem_village.graphql';
import { VillageName } from './VillageName';

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
  villageName: (props) => ({
    color: props.isVillageSelected ? '#438655' : undefined,
    fontWeight: 'bold',
  }),
});

type Props = {
  readonly isVillageActive: boolean;
  readonly isVillageSelected: boolean;
  readonly village: VillageSideItem_village$key;
};

const villageSideItemVillageFragment = graphql`
  fragment VillageSideItem_village on Village {
      id
      ...VillageName_village
  }
`;

export const VillageSideItem: React.FC<Props> = ({
  isVillageActive,
  isVillageSelected,
  village,
}) => {
  const villageFragment = useFragment(villageSideItemVillageFragment, village);
  const { id } = villageFragment;

  const classes = useStyles({ isVillageSelected });
  const location = useLocation();
  const path = location.pathname.replace(
    /villages\/(\d+)/,
    `villages/${id}`,
  );

  return (
    <div className={classes.root}>
      {isVillageActive && <div className={classes.activeDot} />}
      <Link className={classes.villageName} to={path}>
        <VillageName village={villageFragment} />
      </Link>
    </div>
  );
};
