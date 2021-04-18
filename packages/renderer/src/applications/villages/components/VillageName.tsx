import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import type { Coords } from 'shared/types/coords.js';

import type { VillageName_village$key } from '../../../_graphql/__generated__/VillageName_village.graphql.js';

const villageNameVillageFragment = graphql`
  fragment VillageName_village on Village {
      coords {
          x
          y
      }
      isCapital
      name
  }
`;

type Props = {
  readonly village: VillageName_village$key;
};

export const formatVillageName = (name: string, coords: Coords, isCapital: boolean): string =>
  `[${coords.x}|${coords.y}] ${name} ${isCapital ? ' (Capital)' : ''}`;

export const VillageName: React.FC<Props> = ({ village }) => {
  const {
    name,
    isCapital,
    coords,
  } = useFragment(villageNameVillageFragment, village);

  return <>{formatVillageName(name, coords, isCapital)}</>;
};

VillageName.displayName = 'VillageName';