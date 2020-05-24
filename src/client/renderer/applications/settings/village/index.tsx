import { makeStyles } from '@material-ui/core/styles';
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { VillageSettingsType } from '../../../_types/graphql';
import { useVillageContext } from '../../../hooks/useVillageContext';
import { useVillages } from '../../../hooks/villages/useVillages';
import { formatVillageName } from '../../../utils/formatVillageName';
import { VillageSettingsContext } from './_context';
import { AutoBuildSettings } from './AutoBuildSettings';
import { AutoPartySettings } from './AutoPartySettings';
import { AutoUnitsSettings } from './AutoUnitsSettings';
import { GeneralVillageSettings } from './GeneralVillageSettings';

interface ILinkProps {
  readonly isSelected: boolean;
  readonly label: string;
  readonly onSelect: () => void;
}

const useLinkStyles = makeStyles<unknown, ILinkProps>({
  root: props => ({
    backgroundColor: props.isSelected ? 'green' : undefined,
  }),
});

const TabLink: React.FC<ILinkProps> = (props) => {
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

interface IProps {
  readonly tab: string;
}

const getSettingsTab = (tab: string): VillageSettingsType => {
  switch (tab) {
    case 'buildings': return VillageSettingsType.AutoBuild;
    case 'units': return VillageSettingsType.AutoUnits;
    default: throw new Error(`Unknown village tab: ${tab}`);
  }
};

export const VillageSettings: React.FC<IProps> = (props) => {
  const {
    tab,
  } = props;

  const { villageId } = useVillageContext();
  const [selectedVillageId, setSelectedVillageId] = useState(villageId);

  useEffect(() => {
    setSelectedVillageId(villageId);
  }, [villageId]);

  const [selectedTab, setSelectedTab] = useState<VillageSettingsType>(getSettingsTab(tab));

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setSelectedTab(getSettingsTab(tab));
    }
  }, [tab]);

  const villages = useVillages();

  if (!villages) {
    return null;
  }

  const renderSettings = (): JSX.Element => {
    switch (selectedTab) {
      case VillageSettingsType.General: return <GeneralVillageSettings />;
      case VillageSettingsType.AutoBuild: return <AutoBuildSettings />;
      case VillageSettingsType.AutoUnits: return <AutoUnitsSettings />;
      case VillageSettingsType.AutoParty: return <AutoPartySettings />;
      default: throw new Error(`Unknown village settings type: ${selectedTab}`);
    }
  };

  return (
    <div>
      <h1>Village settings</h1>
      <div>
        <select
          onChange={e => {
            const id = +e.currentTarget.value;
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
          isSelected={selectedTab === VillageSettingsType.General}
          label="General"
          onSelect={() => setSelectedTab(VillageSettingsType.General)}
        />
        <TabLink
          isSelected={selectedTab === VillageSettingsType.AutoBuild}
          label="Auto Build"
          onSelect={() => setSelectedTab(VillageSettingsType.AutoBuild)}
        />
        <TabLink
          isSelected={selectedTab === VillageSettingsType.AutoUnits}
          label="Auto Units"
          onSelect={() => setSelectedTab(VillageSettingsType.AutoUnits)}
        />
        <TabLink
          isSelected={selectedTab === VillageSettingsType.AutoParty}
          label="Auto Party"
          onSelect={() => setSelectedTab(VillageSettingsType.AutoParty)}
        />
      </div>
      <VillageSettingsContext.Provider value={{ villageId: selectedVillageId }}>
        {renderSettings()}
      </VillageSettingsContext.Provider>
    </div>
  );
};
