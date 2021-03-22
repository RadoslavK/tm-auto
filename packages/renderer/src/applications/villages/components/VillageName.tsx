import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';

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

export const VillageName: React.FC<Props> = ({ village }) => {
  const {
    name,
    isCapital,
    coords,
  } = useFragment(villageNameVillageFragment, village);

  return <>{name} [{coords.x}|{coords.y}] {isCapital ? ' (Capital)' : ''}</>;
};

VillageName.displayName = 'VillageName';