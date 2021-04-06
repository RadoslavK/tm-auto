import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  useFragment,
  useLazyLoadQuery,
  useSubscription,
} from 'react-relay/hooks';
import { Link } from 'react-router-dom';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { HeroInformation_heroInformation$key } from '../../../_graphql/__generated__/HeroInformation_heroInformation.graphql.js';
import type { HeroInformationQuery } from '../../../_graphql/__generated__/HeroInformationQuery.graphql.js';
import type { HeroInformationSubscription } from '../../../_graphql/__generated__/HeroInformationSubscription.graphql.js';
import { Resources } from '../../../_shared/components/Resources.js';
import { VillageName } from '../../villages/components/VillageName.js';

const HeroInformationFragmentDefinition = graphql`
  fragment HeroInformation_heroInformation on HeroInformation {
      health
      state
      resources {
          ...Resources_resources
      }
      village {
          id
          ...VillageName_village
      }
  }
`;

const heroInformationQuery = graphql`
  query HeroInformationQuery {
      heroInformation {
          ...HeroInformation_heroInformation
      }
  }
`;

const heroInformationSubscription = graphql`
  subscription HeroInformationSubscription {
      heroInformationUpdated {
          ...HeroInformation_heroInformation
      }
  }
`;

const useStyles = makeStyles({
  resources: {
    display: 'flex',
  },
});

const HeroInformationContainer: React.FC = () => {
  const { heroInformation } = useLazyLoadQuery<HeroInformationQuery>(heroInformationQuery, {}, { fetchPolicy: 'store-and-network' });

  const heroInformationSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<HeroInformationSubscription> => ({
    subscription: heroInformationSubscription,
    variables: {},
    updater: (store) => {
      const root = store.getRoot();
      const oldRecord = root.getLinkedRecord('heroInformation');
      const newRecord = store.getRootField('heroInformationUpdated');
      oldRecord?.copyFieldsFrom(newRecord);
    },
  }), []);

  useSubscription(heroInformationSubscriptionConfig);

  return (
    <HeroInformation heroInformationKey={heroInformation} />
  );
};

HeroInformationContainer.displayName = 'HeroInformationContainer';

export { HeroInformationContainer as HeroInformation };

type Props = {
  readonly heroInformationKey: HeroInformation_heroInformation$key;
};

const HeroInformation: React.FC<Props> = ({ heroInformationKey }) => {
  const classes = useStyles();
  const heroInformation = useFragment(HeroInformationFragmentDefinition, heroInformationKey);

  return (
    <div>
      <h2>Stats</h2>
      <div>
        <label htmlFor="health">Health:</label>
        <span id="heath">{heroInformation.health}</span>
      </div>

      <div>
        <label htmlFor="state">State:</label>
        <span id="state">{heroInformation.state}</span>
      </div>

      <div>
        <label htmlFor="village">Village:</label>
        {heroInformation.village ? (
          <Link to={`/villages/${heroInformation.village.id}`}>
            <VillageName village={heroInformation.village} />
          </Link>
        ) : (
          <span>Unknown</span>
        )}
      </div>

      <div className={classes.resources}>
        <label htmlFor="resources">Resources:</label>
        <Resources
          resourcesKey={heroInformation.resources}
          showFreeCrop={false}
        />
      </div>
    </div>
  );
};

HeroInformation.displayName = 'HeroInformation';