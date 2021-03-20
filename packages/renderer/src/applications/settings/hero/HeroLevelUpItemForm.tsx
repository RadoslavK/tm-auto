import React, { useState } from 'react';
import {
  useFragment,
  useLazyLoadQuery,
} from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';
import type { HeroLevelUpItemFormQueryIsHeroLevelUpItemNameUsedQuery } from '../../../_graphql/__generated__/HeroLevelUpItemFormQueryIsHeroLevelUpItemNameUsedQuery.graphql.js';
import type { HeroLevelUpItemForm_heroLevelUpItem$key } from '../../../_graphql/__generated__/HeroLevelUpItemForm_heroLevelUpItem.graphql.js';
import type { HeroLevelUpItemInput } from '../../../_graphql/__generated__/HeroLevelUpSettingsAddHeroLevelUpItemMutation.graphql.js';

type Props = {
  readonly item?: HeroLevelUpItemInput;
  readonly lastItem?: HeroLevelUpItemForm_heroLevelUpItem$key;
  readonly onClose: () => void;
  readonly onSubmit: (item: HeroLevelUpItemInput) => void;
};

const heroLevelUpItemFormHeroLevelUpItemFragment = graphql`
  fragment HeroLevelUpItemForm_heroLevelUpItem on HeroLevelUpItem {
      defBonus
      name
      offBonus
      offensiveStrength
      resources
  }
`;

const heroLevelUpItemFormQueryIsHeroLevelUpItemNameUsedQuery = graphql`
  query HeroLevelUpItemFormQueryIsHeroLevelUpItemNameUsedQuery($name: ID!, $include: Boolean!) {
      isHeroLevelUpItemNameUsed(name: $name) @include(if: $include)
  }
`;

export const HeroLevelUpItemForm: React.FC<Props> = ({
  item,
  lastItem,
  onClose,
  onSubmit,
}) => {
  const lastItemFragment = useFragment(heroLevelUpItemFormHeroLevelUpItemFragment, lastItem || null);

  const [name, setName] = useState(item?.name || '');
  const [offensiveStrength, setOffensiveStrength] = useState(
    (item || lastItemFragment)?.offensiveStrength || 0,
  );
  const [offBonus, setOffBonus] = useState((item || lastItemFragment)?.offBonus || 0);
  const [defBonus, setDefBonus] = useState((item || lastItemFragment)?.defBonus || 0);
  const [resources, setResources] = useState(
    (item || lastItemFragment)?.resources || 0,
  );

  const { isHeroLevelUpItemNameUsed } = useLazyLoadQuery<HeroLevelUpItemFormQueryIsHeroLevelUpItemNameUsedQuery>(heroLevelUpItemFormQueryIsHeroLevelUpItemNameUsedQuery, {
    name,
    include: !!name && name !== item?.name,
  });

  const submitForm = () => {
    const item: HeroLevelUpItemInput = {
      name,
      offensiveStrength,
      offBonus,
      defBonus,
      resources,
    };

    onSubmit(item);
  };

  const isNameValid = !!name && !isHeroLevelUpItemNameUsed;

  return (
    <div>
      <div>
        <div>
          <label>Name{isHeroLevelUpItemNameUsed ? ' (invalid)' : ''}</label>
          <input
            value={name}
            onChange={(e) => {
              const name = e.target.value;
              setName(name);
            }}
          />
        </div>

        <div>
          <label>Offensive strength</label>
          <input
            type="number"
            value={offensiveStrength}
            onChange={(e) => {
              const { value } = e.target;
              setOffensiveStrength(+value);
            }}
          />
        </div>

        <div>
          <label>Off bonus</label>
          <input
            type="number"
            value={offBonus}
            onChange={(e) => {
              const { value } = e.target;
              setOffBonus(+value);
            }}
          />
        </div>

        <div>
          <label>Def bonus</label>
          <input
            type="number"
            value={defBonus}
            onChange={(e) => {
              const { value } = e.target;
              setDefBonus(+value);
            }}
          />
        </div>

        <div>
          <label>Resources</label>
          <input
            type="number"
            value={resources}
            onChange={(e) => {
              const { value } = e.target;
              setResources(+value);
            }}
          />
        </div>
      </div>
      <div>
        <button onClick={onClose}>Close</button>
        <button disabled={!isNameValid} onClick={submitForm}>
          Submit
        </button>
      </div>
    </div>
  );
};
