import { makeStyles } from '@material-ui/core/styles';
import React, {
  useEffect,
  useState,
} from 'react';

import { useSelectedVillageId } from '../../../hooks/villages/useSelectedVillageId';
import { useVillages } from '../../../hooks/villages/useVillages';
import { formatVillageName } from '../../../utils/formatVillageName';
import { AutoBuildSettings } from './AutoBuildSettings';
import { AutoPartySettings } from './AutoPartySettings';
import { AutoUnitsSettings } from './AutoUnitsSettings';
import { GeneralVillageSettings } from './GeneralVillageSettings';

type LinkProps = {
  readonly isSelected: boolean;
  readonly label: string;
  readonly onSelect: () => void;
};

const useLinkStyles = makeStyles<unknown, LinkProps>({
  root: props => ({
    backgroundColor: props.isSelected ? 'green' : undefined,
  }),
});

const TabLink: React.FC<LinkProps> = (props) => {
  const {
    label,
    onSelect,
  } = props;

  const classes = useLinkStyles(props);

  return (
    <div
      className={classes.root}
      onClick={onSelect}
    >
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

export const VillageSettings: React.FC<Props> = (props) => {
  const {
    getTabType,
    tab,
  } = props;

  const villageId = useSelectedVillageId();
  const [selectedVillageId, setSelectedVillageId] = useState(villageId);

  useEffect(() => {
    setSelectedVillageId(villageId);
  }, [villageId]);

  const [selectedTab, setSelectedTab] = useState<VillageSettingsTabType>(getTabType(tab));

  useEffect(() => {
    setSelectedTab(getTabType(tab));
  }, [tab, getTabType]);

  const villages = useVillages();

  const renderSettings = (): JSX.Element => {
    switch (selectedTab) {
      case VillageSettingsTabType.General: return <GeneralVillageSettings villageId={selectedVillageId} />;
      case VillageSettingsTabType.AutoBuild: return <AutoBuildSettings villageId={selectedVillageId} />;
      case VillageSettingsTabType.AutoUnits: return <AutoUnitsSettings villageId={selectedVillageId} />;
      case VillageSettingsTabType.AutoParty: return <AutoPartySettings villageId={selectedVillageId} />;
      default: throw new Error(`Unknown village settings type: ${selectedTab}`);
    }
  };

  return (
    <div>
      <h1>Village settings</h1>
      <div>
        <select
          onChange={e => {
            const id = e.currentTarget.value;
            setSelectedVillageId(id);
          }}
          value={selectedVillageId}
        >
          {villages.map(village => (
            <option
              key={village.id}
              value={village.id}
            >
              {formatVillageName(village)}
            </option>
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
