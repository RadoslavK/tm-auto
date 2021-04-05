import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useEffect,
  useState,
} from 'react';
import {
  useFragment,
  useLazyLoadQuery,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';
import { getTotalSeconds } from 'shared/utils/getTotalSeconds.js';

import type { ExpandedQueuedBuilding_queuedBuilding$key } from '../../../../_graphql/__generated__/ExpandedQueuedBuilding_queuedBuilding.graphql.js';
import type { ExpandedQueuedBuildingQuery } from '../../../../_graphql/__generated__/ExpandedQueuedBuildingQuery.graphql.js';
import { selectedVillageIdState } from '../../../../_recoil/atoms/selectedVillageId.js';
import { usePrevious } from '../../../../_shared/hooks/usePrevious.js';
import { Cost } from '../Cost.js';

type Props = {
  readonly building: ExpandedQueuedBuilding_queuedBuilding$key;
};

const useStyles = makeStyles({
  expandedBuilding: {
    display: 'flex',
  },
  level: {
    flex: 1,
  },
});

const fragmentDefinition = graphql`
  fragment ExpandedQueuedBuilding_queuedBuilding on QueuedBuilding {
    id
    startingLevel
    targetLevel
    buildingTime {
        ...Duration @relay(mask: false)
    }
  }
`;

const expandedBuildingQuery = graphql`
    query ExpandedQueuedBuildingQuery($villageId: ID!, $queueId: ID!) {
        expandedQueuedBuilding(villageId: $villageId, queueId: $queueId) {
            level
            buildingTime {
                ...Cost_duration
            }
            cost {
                ...Cost_resources
            }
        }
    }
`;

export const ExpandedQueuedBuilding: React.FC<Props> = ({ building }) => {
  const classes = useStyles();
  const fragment = useFragment(fragmentDefinition, building);
  const levels = fragment.targetLevel - fragment.startingLevel + 1;
  const villageId = useRecoilValue(selectedVillageIdState);
  const [fetchKey, setFetchKey] = useState(0);
  const buildTimeTotalSeconds = getTotalSeconds(fragment.buildingTime);
  const prevBuildTimeTotalSeconds = usePrevious(buildTimeTotalSeconds);

  useEffect(() => {
    if (buildTimeTotalSeconds !== prevBuildTimeTotalSeconds) {
      setFetchKey(prevKey => prevKey + 1);
    }
  }, [buildTimeTotalSeconds, prevBuildTimeTotalSeconds]);

  const { expandedQueuedBuilding } = useLazyLoadQuery<ExpandedQueuedBuildingQuery>(expandedBuildingQuery, {
    queueId: fragment.id,
    villageId,
  }, { fetchPolicy: 'store-and-network' ,fetchKey });

  if (levels === 1) {
    return null;
  }

  return (
    <div>
      {expandedQueuedBuilding.map((expandedBuilding) => (
        <div
          key={expandedBuilding.level}
          className={classes.expandedBuilding}
        >
          <strong className={classes.level}>
            Level {expandedBuilding.level}
          </strong>
          <Cost
            buildTime={expandedBuilding.buildingTime}
            resources={expandedBuilding.cost}
          />
        </div>
      ))}
    </div>
  );
};

ExpandedQueuedBuilding.displayName = 'ExpandedQueuedBuilding';