import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import {
  useLocation,
  useMatch,
} from 'react-router';
import { Link } from 'react-router-dom';

import type { VillageSideItem_village$key } from '../../../_graphql/__generated__/VillageSideItem_village.graphql.js';
import { VillageName } from './VillageName.js';
import type { VillageRouteParams } from './Villages.js';

type StylesProps = {
  readonly isVillageSelected: boolean;
};

const useStyles = makeStyles<unknown, StylesProps>({
  activeDot: {
    backgroundColor: '#1c5bbb',
    borderRadius: '50%',
    display: 'inline-block',
    height: 12,
    marginLeft: 8,
    width: 12,
  },
  root: {
    display: 'flex',
  },
  notScannedVillageName: {
    color: '#494747E2',
  },
  scannedVillageName: props => ({
    color: props.isVillageSelected ? '#438655' : undefined,
    fontWeight: 'bold',
  }),
});

type Props = {
  readonly isVillageActive: boolean;
  readonly village: VillageSideItem_village$key;
  readonly onClick: () => void;
};

const villageSideItemVillageFragment = graphql`
  fragment VillageSideItem_village on Village {
      id
      scanned
      ...VillageName_village
  }
`;

export const VillageSideItem: React.FC<Props> = ({
  isVillageActive,
  village,
  onClick,
}) => {
  const villageFragment = useFragment(villageSideItemVillageFragment, village);
  const { id, scanned } = villageFragment;

  const villageMatch = useMatch('/villages/:id/*');
  const isVillageSelected = (villageMatch?.params as VillageRouteParams | undefined)?.id === villageFragment.id;

  const classes = useStyles({ isVillageSelected });
  const location = useLocation();

  const path = location.pathname.replace(
    /villages\/(\d+)/,
    `villages/${id}`,
  );

  const wrapLink = (children: JSX.Element): JSX.Element => scanned
    ? <Link className={classes.scannedVillageName} to={path} onClick={onClick}>{children}</Link>
    : isVillageSelected
      ? <span className={classes.scannedVillageName}>{children}</span>
      : <span className={classes.notScannedVillageName} title="Village has not been scanned yet!">{children}</span>;

  return (
    <div className={classes.root}>
      {wrapLink(<VillageName village={villageFragment} />)}
      {isVillageActive && <div className={classes.activeDot} />}
    </div>
  );
};

VillageSideItem.displayName = 'VillageSideItem';