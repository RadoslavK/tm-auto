import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import {
  useFragment,
  useMutation,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';

import type { SmithyUnitLevels_autoSmithyUnitLevelSettings$key } from '../../_graphql/__generated__/SmithyUnitLevels_autoSmithyUnitLevelSettings.graphql.js';
import type { SmithyUnitLevelsRemoveLevelMutation } from '../../_graphql/__generated__/SmithyUnitLevelsRemoveLevelMutation.graphql.js';
import { selectedVillageIdState } from '../../_recoil/atoms/selectedVillageId.js';
import { SmithyUnitLevel } from './SmithyUnitLevel.js';

const levelsFragmentDef = graphql`
    fragment SmithyUnitLevels_autoSmithyUnitLevelSettings on AutoSmithyUnitLevelSettings @relay(plural: true) {
        targetLevel
        ...SmithyUnitLevel_autoSmithyUnitLevelSettings
    }
`;

const removeLevelMutation =  graphql`
  mutation SmithyUnitLevelsRemoveLevelMutation($villageId: ID!, $unitIndex: Int!, $targetLevel: Int!) {
      removeAutoSmithyUnitLevel(villageId: $villageId, unitIndex: $unitIndex, targetLevel: $targetLevel) {
          ...Smithy_autoSmithySettings
      }
  }
`;

type Props = {
  readonly levelsKey: SmithyUnitLevels_autoSmithyUnitLevelSettings$key;
  readonly unitIndex: number;
};

export const SmithyUnitLevels: React.FC<Props> = ({ levelsKey, unitIndex }) => {
  const villageId = useRecoilValue(selectedVillageIdState);
  const levels = useFragment(levelsFragmentDef, levelsKey);
  const [removeLevel] = useMutation<SmithyUnitLevelsRemoveLevelMutation>(removeLevelMutation);

  const onRemove = (targetLevel: number): void => {
    removeLevel({
      variables: { villageId, unitIndex, targetLevel },
      updater: (store) => {
        const newRecord = store.getRootField('removeAutoSmithyUnitLevel');
        store.getRoot().setLinkedRecord(newRecord, 'autoSmithySettings', { villageId });
      },
    });
  };

  return (
    <div>
      {levels.map((level) => (
        <SmithyUnitLevel
          key={level.targetLevel}
          levelSettingsKey={level}
          onRemove={() => onRemove(level.targetLevel)}
        />
      ))}
    </div>
  );
};

SmithyUnitLevels.displayName = 'SmithyUnitLevels';