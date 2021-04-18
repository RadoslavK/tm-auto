import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  useFragment,
  useSubscription,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { SmithyUnitsList_autoSmithyUnitSettings$key } from '../../_graphql/__generated__/SmithyUnitsList_autoSmithyUnitSettings.graphql.js';
import type { SmithyUnitsListUnitRemovedSubscription } from '../../_graphql/__generated__/SmithyUnitsListUnitRemovedSubscription.graphql.js';
import type { SmithyUnitsListUnitSubscription } from '../../_graphql/__generated__/SmithyUnitsListUnitSubscription.graphql.js';
import { selectedVillageIdState } from '../../_recoil/atoms/selectedVillageId.js';
import { SmithyUnit } from './SmithyUnit.js';

const unitsFragmentDef = graphql`
    fragment SmithyUnitsList_autoSmithyUnitSettings on AutoSmithyUnitSettings @relay(plural: true){
        unitIndex
        ...SmithyUnit_autoSmithyUnitSettings
    }
`;

const unitUpdatedSubscription = graphql`
    subscription SmithyUnitsListUnitSubscription($villageId: ID!) {
        autoSmithySettingsUnitUpdated(villageId: $villageId) {
            ...SmithyUnit_autoSmithyUnitSettings
        }
    }
`;

const unitRemovedSubscription = graphql`
    subscription SmithyUnitsListUnitRemovedSubscription($villageId: ID!) {
        autoSmithySettingsUnitRemoved(villageId: $villageId) {
            unitIndex
        }
    }
`;

type Props = {
  readonly unitsKey: SmithyUnitsList_autoSmithyUnitSettings$key;
  readonly upgradeableUnits: ReadonlyArray<number>;
};

export const SmithyUnitsList: React.FC<Props> = ({ unitsKey, upgradeableUnits }) => {
  const villageId = useRecoilValue(selectedVillageIdState);
  const units = useFragment(unitsFragmentDef, unitsKey);

  const unitUpdatedSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<SmithyUnitsListUnitSubscription> => ({
    subscription: unitUpdatedSubscription,
    variables: { villageId },
    updater: (store) => {
      const newRecord = store.getRootField('autoSmithySettingsUnitUpdated');
      const root = store.getRoot();
      const settings = root.getLinkedRecord('autoSmithySettings', { villageId });

      if (!settings) {
        return;
      }

      let units = settings.getLinkedRecords('units') || [];
      units = units.map(unit => unit.getValue('unitIndex') === newRecord.getValue('unitIndex')
        ? newRecord
        : unit);

      settings.setLinkedRecords(units, 'units');
      root.setLinkedRecord(settings, 'autoSmithySettings', { villageId });
    },
  }), [villageId]);

  useSubscription(unitUpdatedSubscriptionConfig);

  const unitRemovedSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<SmithyUnitsListUnitRemovedSubscription> => ({
    subscription: unitRemovedSubscription,
    variables: { villageId },
    updater: (store, data) => {
      const { unitIndex } = data.autoSmithySettingsUnitRemoved;
      const root = store.getRoot();
      const settings = root.getLinkedRecord('autoSmithySettings', { villageId });

      if (!settings) {
        return;
      }

      let units = settings.getLinkedRecords('units') || [];
      units = units.filter(unit => unit.getValue('unitIndex') !== unitIndex);

      settings.setLinkedRecords(units, 'units');
      root.setLinkedRecord(settings, 'autoSmithySettings', { villageId });
    },
  }), [villageId]);

  useSubscription(unitRemovedSubscriptionConfig);

  return (
    <div>
      {upgradeableUnits.map(unitIndex => (
        <SmithyUnit
          key={unitIndex}
          unitIndex={unitIndex}
          unitKey={units.find(u => u.unitIndex === unitIndex)}
        />
      ))}
    </div>
  );
};

SmithyUnitsList.displayName = 'SmithyUnitsList';