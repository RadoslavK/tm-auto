import React, { useState } from 'react';
import {
  makeStyles,
} from '@material-ui/core';
import { GeneralVillageSettings } from './GeneralVillageSettings';
import { VillageSettingsType } from '../../../../_types/graphql';
import { AutoBuildSettings } from './AutoBuildSettings';
import { AutoUnitsSettings } from './AutoUnitsSettings';

interface ILinkProps {
  readonly label: string;
  readonly isSelected: boolean;
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

export const VillageSettings: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<VillageSettingsType>(VillageSettingsType.General);

  const renderSettings = (): JSX.Element => {
    switch (selectedTab) {
      case VillageSettingsType.General: return <GeneralVillageSettings />;
      case VillageSettingsType.AutoBuild: return <AutoBuildSettings />;
      case VillageSettingsType.AutoUnits: return <AutoUnitsSettings />;
      default: throw new Error(`Unknown village settings type: ${selectedTab}`);
    }
  };

  return (
    <div>
      <h1>Village settings</h1>
      <div>
        <TabLink
          label="General"
          isSelected={selectedTab === VillageSettingsType.General}
          onSelect={() => setSelectedTab(VillageSettingsType.General)}
        />
        <TabLink
          label="Auto Build"
          isSelected={selectedTab === VillageSettingsType.AutoBuild}
          onSelect={() => setSelectedTab(VillageSettingsType.AutoBuild)}
        />
        <TabLink
          label="Auto Units"
          isSelected={selectedTab === VillageSettingsType.AutoUnits}
          onSelect={() => setSelectedTab(VillageSettingsType.AutoUnits)}
        />
      </div>
      {renderSettings()}
    </div>
  );
};