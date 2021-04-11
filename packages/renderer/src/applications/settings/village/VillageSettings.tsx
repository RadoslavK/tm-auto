import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  useLazyLoadQuery,
  useSubscription,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { VillageSettingsQuery } from '../../../_graphql/__generated__/VillageSettingsQuery.graphql.js';
import type { VillageSettingsSubscription } from '../../../_graphql/__generated__/VillageSettingsSubscription.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { formatVillageName } from '../../villages/components/VillageName.js';
import { AutoBuildSettings } from './AutoBuildSettings.js';
import { AutoPartySettings } from './AutoPartySettings.js';
import { AutoUnitsSettings } from './AutoUnitsSettings.js';
import { GeneralVillageSettings } from './GeneralVillageSettings.js';

type LinkProps = {
  readonly isSelected: boolean;
  readonly label: string;
  readonly onSelect: () => void;
};

const useLinkStyles = makeStyles<unknown, LinkProps>({
  root: (props) => ({
    backgroundColor: props.isSelected ? 'green' : undefined,
  }),
});

const TabLink: React.FC<LinkProps> = (props) => {
  const { label, onSelect } = props;

  const classes = useLinkStyles(props);

  return (
    <div className={classes.root} onClick={onSelect}>
      {label}
    </div>
  );
};

export enum VillageSettingsTabType {
  AutoBuild,
  AutoUnits,
  AutoParty,
  General,
}

type Props = {
  readonly getTabType: (tab: string) => VillageSettingsTabType;
  readonly tab: string;
};

graphql`
    fragment VillageSettings_village on Village {
        id
        name
        coords {
            ...Coords @relay(mask: false)
        }
        isCapital
    }
`;

const villageSettingsQuery = graphql`
  query VillageSettingsQuery {
      villages {
         ...VillageSettings_village @relay(mask: false)
      }
  }
`;

const villagesSubscription = graphql`
  subscription VillageSettingsSubscription {
      villagesUpdated {
         ...VillageSettings_village
      }
  }
`;

export const VillageSettings: React.FC<Props> = ({ getTabType, tab }) => {
  const { villages } = useLazyLoadQuery<VillageSettingsQuery>(villageSettingsQuery, {}, { fetchPolicy: 'store-and-network' });

  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<VillageSettingsSubscription> => ({
    subscription: villagesSubscription,
    variables: {},
    updater: (store) => {
      const newRecords = store.getPluralRootField('villagesUpdated');

      store.getRoot().setLinkedRecords(newRecords, 'villages');
    },
  }), []);

  useSubscription(subscriptionConfig);

  const villageId = useRecoilValue(selectedVillageIdState);
  const [selectedVillageId, setSelectedVillageId] = useState(villageId);

  useEffect(() => {
    setSelectedVillageId(villageId);
  }, [villageId]);

  const [selectedTab, setSelectedTab] = useState<VillageSettingsTabType>(
    getTabType(tab),
  );

  useEffect(() => {
    setSelectedTab(getTabType(tab));
  }, [tab, getTabType]);

  const renderSettings = (): JSX.Element => {
    switch (selectedTab) {
      case VillageSettingsTabType.General:
        return <GeneralVillageSettings villageId={selectedVillageId} />;
      case VillageSettingsTabType.AutoBuild:
        return <AutoBuildSettings villageId={selectedVillageId} />;
      case VillageSettingsTabType.AutoUnits:
        return <AutoUnitsSettings villageId={selectedVillageId} />;
      case VillageSettingsTabType.AutoParty:
        return <AutoPartySettings villageId={selectedVillageId} />;
      default:
        throw new Error(`Unknown village settings type: ${selectedTab}`);
    }
  };

  return (
    <div>
      <h1>Village settings</h1>
      <div>
        <select
          onChange={(e) => {
            const id = e.currentTarget.value;
            setSelectedVillageId(id);
          }}
          value={selectedVillageId}>
          {villages.map((village) => (
            <option
              key={village.id}
              value={village.id}
              label={formatVillageName(village.name, village.coords, village.isCapital)}
            />
          ))}
        </select>
      </div>
      <div>
        <TabLink
          isSelected={selectedTab === VillageSettingsTabType.General}
          label="General"
          onSelect={() => setSelectedTab(VillageSettingsTabType.General)}
        />
        <TabLink
          isSelected={selectedTab === VillageSettingsTabType.AutoBuild}
          label="Auto Build"
          onSelect={() => setSelectedTab(VillageSettingsTabType.AutoBuild)}
        />
        <TabLink
          isSelected={selectedTab === VillageSettingsTabType.AutoUnits}
          label="Auto Units"
          onSelect={() => setSelectedTab(VillageSettingsTabType.AutoUnits)}
        />
        <TabLink
          isSelected={selectedTab === VillageSettingsTabType.AutoParty}
          label="Auto Party"
          onSelect={() => setSelectedTab(VillageSettingsTabType.AutoParty)}
        />
      </div>
      {renderSettings()}
    </div>
  );
};

VillageSettings.displayName = 'VillageSettings';