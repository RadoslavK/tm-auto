import {
  FormGroup,
  FormLabel,
  makeStyles,
  TextField,
} from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  PreloadedQuery,
  useFragment,
  usePreloadedQuery,
  useSubscription,
} from 'react-relay/hooks';
import { Link } from 'react-router-dom';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { HeroInformation_heroInformation$key } from '../../../_graphql/__generated__/HeroInformation_heroInformation.graphql.js';
import type { HeroInformationQuery } from '../../../_graphql/__generated__/HeroInformationQuery.graphql.js';
import type { HeroInformationSubscription } from '../../../_graphql/__generated__/HeroInformationSubscription.graphql.js';
import { Resources } from '../../../_shared/components/Resources.js';
import { VillageName } from '../../villages/components/VillageName.js';

const heroInformationFragmentDefinition = graphql`
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

export const heroInformationQuery = graphql`
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

type ContainerProps = {
  readonly queryRef: PreloadedQuery<HeroInformationQuery>;
};

const HeroInformationContainer: React.FC<ContainerProps> = ({ queryRef }) => {
  const { heroInformation } = usePreloadedQuery(heroInformationQuery, queryRef);

  const heroInformationSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<HeroInformationSubscription> => ({
    subscription: heroInformationSubscription,
    variables: {},
    updater: (store) => {
      const newRecord = store.getRootField('heroInformationUpdated');
      store.getRoot().setLinkedRecord(newRecord, 'heroInformation');
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
  const heroInformation = useFragment(heroInformationFragmentDefinition, heroInformationKey);

  return (
    <div>
      <h2>Hero stats</h2>
      <FormGroup>
        <FormLabel>Health</FormLabel>
        <TextField
          label="Health"
          disabled
          value={heroInformation.health}
        />
      </FormGroup>
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