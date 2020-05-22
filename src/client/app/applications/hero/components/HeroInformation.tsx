import React from 'react';
import { Link } from 'react-router-dom';

import { HeroState } from '../../../../_types/graphql';
import { formatVillageName } from '../../../utils/formatVillageName';
import { useHeroInformation } from '../hooks/useHeroInformation';

export const HeroInformation: React.FC = () => {
  const information = useHeroInformation();

  if (!information) {
    return null;
  }

  return (
    <div>
      <h2>
        Stats
      </h2>
      <div>
        <label htmlFor="health">
          Health:
        </label>
        <span id="heath">
          {information.health}
        </span>
      </div>

      <div>
        <label htmlFor="state">
          State:
        </label>
        <span id="state">
          {HeroState[information.state]}
        </span>
      </div>

      <div>
        <label htmlFor="village">
          Village:
        </label>
        {information.village
          ? (
            <Link to={`/villages/${information.village.id}`}>
              {formatVillageName(information.village)}
            </Link>
          )
          : (
            <span>
              Unknown
            </span>
          )}
      </div>
    </div>
  );
};
