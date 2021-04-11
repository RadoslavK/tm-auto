import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  PreloadedQuery,
  usePreloadedQuery,
  useQueryLoader,
  useSubscription,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { AutoBuildSettingsQuery } from '../../../_graphql/__generated__/AutoBuildSettingsQuery.graphql.js';
import type { AutoPartySettingsQuery } from '../../../_graphql/__generated__/AutoPartySettingsQuery.graphql.js';
import type { AutoUnitsSettingsQuery } from '../../../_graphql/__generated__/AutoUnitsSettingsQuery.graphql.js';
import type { GeneralVillageSettingsQuery } from '../../../_graphql/__generated__/GeneralVillageSettingsQuery.graphql.js';
import type { VillageSettingsQuery } from '../../../_graphql/__generated__/VillageSettingsQuery.graphql.js';
import type { VillageSettingsSubscription } from '../../../_graphql/__generated__/VillageSettingsSubscription.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { formatVillageName } from '../../villages/components/VillageName.js';
import {
  AutoBuildSettings,
  autoBuildSettingsQuery,
} from './AutoBuildSettings.js';
import {
  AutoPartySettings,
  autoPartySettingsQuery,
} from './AutoPartySettings.js';
import {
  AutoUnitsSettings,
  autoUnitsSettingsQuery,
} from './AutoUnitsSettings.js';
import {
  GeneralVillageSettings,
  generalVillageSettingsQuery,
} from './GeneralVillageSettings.js';

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
  readonly queryRef: PreloadedQuery<VillageSettingsQuery>;
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

export const villageSettingsQuery = graphql`
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

export const VillageSettings: React.FC<Props> = ({ getTabType, tab, queryRef }) => {
  const villageId = useRecoilValue(selectedVillageIdState);
  const [selectedVillageId, setSelectedVillageId] = useState(villageId);

  const { villages } = usePreloadedQuery(villageSettingsQuery, queryRef);

  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<VillageSettingsSubscription> => ({
    subscription: villagesSubscription,
    variables: {},
    updater: (store) => {
      const newRecords = store.getPluralRootField('villagesUpdated');

      store.getRoot().setLinkedRecords(newRecords, 'villages');
    },
  }), []);

  useSubscription(subscriptionConfig);

  useEffect(() => {
    setSelectedVillageId(villageId);
  }, [villageId]);

  const [selectedTab, setSelectedTab] = useState<VillageSettingsTabType>(
    getTabType(tab),
  );

  useEffect(() => {
    setSelectedTab(getTabType(tab));
  }, [tab, getTabType]);

  const [generalVillageSettingsQueryRef, loadGeneralVillageSettingsQuery] = useQueryLoader<GeneralVillageSettingsQuery>(generalVillageSettingsQuery);
  const [autoBuildSettingsQueryRef, loadAutoBuildSettingsQuery] = useQueryLoader<AutoBuildSettingsQuery>(autoBuildSettingsQuery);
  const [autoUnitsSettingsQueryRef, loadAutoUnitsSettingsQuery] = useQueryLoader<AutoUnitsSettingsQuery>(autoUnitsSettingsQuery);
  const [autoPartySettingsQueryRef, loadAutoPartySettingsQuery] = useQueryLoader<AutoPartySettingsQuery>(autoPartySettingsQuery);

  const renderSettings = (): JSX.Element | undefined | null => {
    switch (selectedTab) {
      case VillageSettingsTabType.General:
        return generalVillageSettingsQueryRef && <GeneralVillageSettings villageId={selectedVillageId} queryRef={generalVillageSettingsQueryRef} />;
      case VillageSettingsTabType.AutoBuild:
        return autoBuildSettingsQueryRef && <AutoBuildSettings villageId={selectedVillageId} queryRef={autoBuildSettingsQueryRef} />;
      case VillageSettingsTabType.AutoUnits:
        return autoUnitsSettingsQueryRef && <AutoUnitsSettings villageId={selectedVillageId} queryRef={autoUnitsSettingsQueryRef} />;
      case VillageSettingsTabType.AutoParty:
        return autoPartySettingsQueryRef && <AutoPartySettings villageId={selectedVillageId} queryRef={autoPartySettingsQueryRef} />;
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

            switch (selectedTab) {
              case VillageSettingsTabType.General:
                loadGeneralVillageSettingsQuery({ villageId }, { fetchPolicy: 'store-and-network' });
                break;
              case VillageSettingsTabType.AutoBuild:
                loadAutoBuildSettingsQuery({ villageId }, { fetchPolicy: 'store-and-network' });
                break;
              case VillageSettingsTabType.AutoUnits:
                loadAutoUnitsSettingsQuery({ villageId }, { fetchPolicy: 'store-and-network' });
                break;
              case VillageSettingsTabType.AutoParty:
                loadAutoPartySettingsQuery({ villageId }, { fetchPolicy: 'store-and-network' });
                break;
              default:
                throw new Error(`Invalid selected tab ${selectedTab}`);
            }

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
          onSelect={() => {
            setSelectedTab(VillageSettingsTabType.General);
            loadGeneralVillageSettingsQuery({ villageId }, { fetchPolicy: 'store-and-network' });
          }}
        />
        <TabLink
          isSelected={selectedTab === VillageSettingsTabType.AutoBuild}
          label="Auto Build"
          onSelect={() => {
            setSelectedTab(VillageSettingsTabType.AutoBuild);
            loadAutoBuildSettingsQuery({ villageId }, { fetchPolicy: 'store-and-network' });
          }}
        />
        <TabLink
          isSelected={selectedTab === VillageSettingsTabType.AutoUnits}
          label="Auto Units"
          onSelect={() => {
            setSelectedTab(VillageSettingsTabType.AutoUnits);
            loadAutoUnitsSettingsQuery({ villageId }, { fetchPolicy: 'store-and-network' });
          }}
        />
        <TabLink
          isSelected={selectedTab === VillageSettingsTabType.AutoParty}
          label="Auto Party"
          onSelect={() => {
            setSelectedTab(VillageSettingsTabType.AutoParty);
            loadAutoPartySettingsQuery({ villageId }, { fetchPolicy: 'store-and-network' });
          }}
        />
      </div>
      {renderSettings()}
    </div>
  );
};

VillageSettings.displayName = 'VillageSettings';