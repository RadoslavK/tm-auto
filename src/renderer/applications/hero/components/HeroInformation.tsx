import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { Link } from 'react-router-dom';

import { HeroInformationQuery } from '../../../_graphql/__generated__/HeroInformationQuery.graphql';
import { VillageName } from '../../villages/components/VillageName';

const heroInformationQuery = graphql`
  query HeroInformationQuery {
      heroInformation {
          health
          state
          village {
              id
              ...VillageName_village
          }
      }
  }
`;

export const HeroInformation: React.FC = () => {
  const { heroInformation } = useLazyLoadQuery<HeroInformationQuery>(heroInformationQuery, {});

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
    </div>
  );
};
