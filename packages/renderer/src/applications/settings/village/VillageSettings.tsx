import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useCallback,
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

import type { AutoAcademySettingsQuery } from '../../../_graphql/__generated__/AutoAcademySettingsQuery.graphql.js';
import type { AutoBuildSettingsQuery } from '../../../_graphql/__generated__/AutoBuildSettingsQuery.graphql.js';
import type { AutoPartySettingsQuery } from '../../../_graphql/__generated__/AutoPartySettingsQuery.graphql.js';
import type { AutoSmithySettingsQuery } from '../../../_graphql/__generated__/AutoSmithySettingsQuery.graphql.js';
import type { AutoUnitsSettingsQuery } from '../../../_graphql/__generated__/AutoUnitsSettingsQuery.graphql.js';
import type { GeneralVillageSettingsQuery } from '../../../_graphql/__generated__/GeneralVillageSettingsQuery.graphql.js';
import type { VillageSettingsQuery } from '../../../_graphql/__generated__/VillageSettingsQuery.graphql.js';
import type { VillageSettingsSubscription } from '../../../_graphql/__generated__/VillageSettingsSubscription.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { usePrevious } from '../../../_shared/hooks/usePrevious.js';
import { formatVillageName } from '../../villages/components/VillageName.js';
import {
  AutoAcademySettings,
  autoAcademySettingsQuery,
} from './AutoAcademySettings.js';
import {
  AutoBuildSettings,
  autoBuildSettingsQuery,
} from './AutoBuildSettings.js';
import {
  AutoPartySettings,
  autoPartySettingsQuery,
} from './AutoPartySettings.js';
import {
  AutoSmithySettings,
  autoSmithySettingsQuery,
} from './AutoSmithySettings.js';
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
  AutoSmithy,
  AutoAcademy,
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

  const [selectedTab, setSelectedTab] = useState<VillageSettingsTabType>(() => getTabType(tab));

  const [generalVillageSettingsQueryRef, loadGeneralVillageSettingsQuery] = useQueryLoader<GeneralVillageSettingsQuery>(generalVillageSettingsQuery);
  const [autoBuildSettingsQueryRef, loadAutoBuildSettingsQuery] = useQueryLoader<AutoBuildSettingsQuery>(autoBuildSettingsQuery);
  const [autoUnitsSettingsQueryRef, loadAutoUnitsSettingsQuery] = useQueryLoader<AutoUnitsSettingsQuery>(autoUnitsSettingsQuery);
  const [autoPartySettingsQueryRef, loadAutoPartySettingsQuery] = useQueryLoader<AutoPartySettingsQuery>(autoPartySettingsQuery);
  const [autoSmithySettingsQueryRef, loadAutoSmithySettingsQuery] = useQueryLoader<AutoSmithySettingsQuery>(autoSmithySettingsQuery);
  const [autoAcademySettingsQueryRef, loadAutoAcademySettingsQuery] = useQueryLoader<AutoAcademySettingsQuery>(autoAcademySettingsQuery);

  const reloadGeneralSettings = useCallback((vId: string) => loadGeneralVillageSettingsQuery({ villageId: vId }, { fetchPolicy: 'store-and-network' }), [loadGeneralVillageSettingsQuery]);
  const reloadAutoBuildSettings = useCallback((vId: string) => loadAutoBuildSettingsQuery({ villageId: vId }, { fetchPolicy: 'store-and-network' }), [loadAutoBuildSettingsQuery]);
  const reloadAutoUnitsSettings = useCallback((vId: string) => loadAutoUnitsSettingsQuery({ villageId: vId }, { fetchPolicy: 'store-and-network' }), [loadAutoUnitsSettingsQuery]);
  const reloadAutoPartySettings = useCallback((vId: string) => loadAutoPartySettingsQuery({ villageId: vId }, { fetchPolicy: 'store-and-network' }), [loadAutoPartySettingsQuery]);
  const reloadAutoSmithySettings = useCallback((vId: string) => loadAutoSmithySettingsQuery({ villageId: vId }, { fetchPolicy: 'store-and-network' }), [loadAutoSmithySettingsQuery]);
  const reloadAutoAcademySettingsQuery = useCallback((vId: string) => loadAutoAcademySettingsQuery({ villageId: vId }, { fetchPolicy: 'store-and-network' }), [loadAutoAcademySettingsQuery]);

  const prevTab = usePrevious(tab);

  useEffect(() => {
    if (prevTab === tab) {
      return;
    }

    const newTab = getTabType(tab);

    switch (newTab) {
      case VillageSettingsTabType.General: {
        if (!generalVillageSettingsQueryRef) {
          reloadGeneralSettings(selectedVillageId);
        }
        break;
      }
      case VillageSettingsTabType.AutoBuild: {
        if (!autoBuildSettingsQueryRef) {
          reloadAutoBuildSettings(selectedVillageId);
        }
        break;
      }
      case VillageSettingsTabType.AutoUnits: {
        if (!autoUnitsSettingsQueryRef) {
          reloadAutoUnitsSettings(selectedVillageId);
        }
        break;
      }
      case VillageSettingsTabType.AutoParty: {
        if (!autoPartySettingsQueryRef) {
          reloadAutoPartySettings(selectedVillageId);
        }
        break;
      }
      case VillageSettingsTabType.AutoSmithy: {
        if (!autoSmithySettingsQueryRef) {
          reloadAutoSmithySettings(selectedVillageId);
        }
        break;
      }
      case VillageSettingsTabType.AutoAcademy: {
        if (!autoAcademySettingsQueryRef) {
          reloadAutoAcademySettingsQuery(selectedVillageId);
        }
        break;
      }
    }

    setSelectedTab(getTabType(tab));
  }, [selectedVillageId, prevTab, tab, getTabType, generalVillageSettingsQueryRef, reloadGeneralSettings, autoBuildSettingsQueryRef, reloadAutoBuildSettings, autoUnitsSettingsQueryRef, reloadAutoUnitsSettings, autoPartySettingsQueryRef, reloadAutoPartySettings, autoSmithySettingsQueryRef, reloadAutoSmithySettings, reloadAutoAcademySettingsQuery, autoAcademySettingsQueryRef]);

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
      case VillageSettingsTabType.AutoSmithy:
        return autoSmithySettingsQueryRef && <AutoSmithySettings villageId={selectedVillageId} queryRef={autoSmithySettingsQueryRef} />;
      case VillageSettingsTabType.AutoAcademy:
        return autoAcademySettingsQueryRef && <AutoAcademySettings villageId={selectedVillageId} queryRef={autoAcademySettingsQueryRef} />;
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
                reloadGeneralSettings(id);
                break;
              case VillageSettingsTabType.AutoBuild:
                reloadAutoBuildSettings(id);
                break;
              case VillageSettingsTabType.AutoUnits:
                reloadAutoUnitsSettings(id);
                break;
              case VillageSettingsTabType.AutoParty:
                reloadAutoPartySettings(id);
                break;
              case VillageSettingsTabType.AutoSmithy:
                reloadAutoSmithySettings(id);
                break;
              case VillageSettingsTabType.AutoAcademy:
                reloadAutoAcademySettingsQuery(id);
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
            reloadGeneralSettings(selectedVillageId);
            setSelectedTab(VillageSettingsTabType.General);
          }}
        />
        <TabLink
          isSelected={selectedTab === VillageSettingsTabType.AutoBuild}
          label="Auto Build"
          onSelect={() => {
            reloadAutoBuildSettings(selectedVillageId);
            setSelectedTab(VillageSettingsTabType.AutoBuild);
          }}
        />
        <TabLink
          isSelected={selectedTab === VillageSettingsTabType.AutoUnits}
          label="Auto Units"
          onSelect={() => {
            reloadAutoUnitsSettings(selectedVillageId);
            setSelectedTab(VillageSettingsTabType.AutoUnits);
          }}
        />
        <TabLink
          isSelected={selectedTab === VillageSettingsTabType.AutoParty}
          label="Auto Party"
          onSelect={() => {
            reloadAutoPartySettings(selectedVillageId);
            setSelectedTab(VillageSettingsTabType.AutoParty);
          }}
        />
        <TabLink
          isSelected={selectedTab === VillageSettingsTabType.AutoSmithy}
          label="Auto Smithy"
          onSelect={() => {
            reloadAutoSmithySettings(selectedVillageId);
            setSelectedTab(VillageSettingsTabType.AutoSmithy);
          }}
        />
        <TabLink
          isSelected={selectedTab === VillageSettingsTabType.AutoAcademy}
          label="Auto Academy"
          onSelect={() => {
            reloadAutoAcademySettingsQuery(selectedVillageId);
            setSelectedTab(VillageSettingsTabType.AutoAcademy);
          }}
        />
      </div>
      {renderSettings()}
    </div>
  );
};

VillageSettings.displayName = 'VillageSettings';