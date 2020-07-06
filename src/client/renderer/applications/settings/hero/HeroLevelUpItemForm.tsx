import React, { useEffect, useState } from 'react';

import {
  HeroLevelUpItem,
  HeroLevelUpItemInput,
  useIsHeroLevelUpItemNameUsedLazyQuery,
} from '../../../_graphql/graphqlHooks';

const useIsItemNameUsed = (name: string, itemName?: string) => {
  const [
    isItemNameUsed,
    { data, loading },
  ] = useIsHeroLevelUpItemNameUsedLazyQuery({ fetchPolicy: 'no-cache' });

  useEffect(() => {
    if (name && name !== itemName) {
      isItemNameUsed({ variables: { name } });
    }
  }, [isItemNameUsed, name, itemName]);

  if (!name || itemName === name) {
    return false;
  }

  return loading || !data ? false : data.isHeroLevelUpItemNameUsed;
};

type Props = {
  readonly item?: HeroLevelUpItem;
  readonly lastItem?: HeroLevelUpItem;
  readonly onClose: () => void;
  readonly onSubmit: (item: HeroLevelUpItemInput) => void;
};

export const HeroLevelUpItemForm: React.FC<Props> = ({
  item,
  lastItem,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState(item?.name || '');
  const [offensiveStrength, setOffensiveStrength] = useState(
    (item || lastItem)?.offensiveStrength || 0,
  );
  const [offBonus, setOffBonus] = useState((item || lastItem)?.offBonus || 0);
  const [defBonus, setDefBonus] = useState((item || lastItem)?.defBonus || 0);
  const [resources, setResources] = useState(
    (item || lastItem)?.resources || 0,
  );

  const isItemNameUsed = useIsItemNameUsed(name, item?.name);

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

  const isNameValid = !!name && !isItemNameUsed;

  return (
    <div>
      <div>
        <div>
          <label>Name{isItemNameUsed ? ' (invalid)' : ''}</label>
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
