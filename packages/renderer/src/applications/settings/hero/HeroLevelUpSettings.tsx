import {
  Button,
  Dialog,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useMemo,
  useState,
} from 'react';
import {
  useFragment,
  useMutation,
  useSubscription,
} from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { HeroLevelUpSettings_heroLevelUpSettings$key } from '../../../_graphql/__generated__/HeroLevelUpSettings_heroLevelUpSettings.graphql.js';
import type {
  HeroLevelUpItemInput,
  HeroLevelUpSettingsAddHeroLevelUpItemMutation,
} from '../../../_graphql/__generated__/HeroLevelUpSettingsAddHeroLevelUpItemMutation.graphql.js';
import type { HeroLevelUpSettingsRemoveHeroLevelUpItemMutation } from '../../../_graphql/__generated__/HeroLevelUpSettingsRemoveHeroLevelUpItemMutation.graphql.js';
import type { HeroLevelUpSettingsSubscription } from '../../../_graphql/__generated__/HeroLevelUpSettingsSubscription.graphql.js';
import type { HeroLevelUpSettingsUpdateHeroLevelUpItemMutation } from '../../../_graphql/__generated__/HeroLevelUpSettingsUpdateHeroLevelUpItemMutation.graphql.js';
import { HeroLevelUpItemForm } from './HeroLevelUpItemForm.js';

const heroLevelUpSettingsFragmentDefinition = graphql`
  fragment HeroLevelUpSettings_heroLevelUpSettings on HeroLevelUpSettings {
      levelUpItems {
          id
          defBonus
          name
          offBonus
          offensiveStrength
          resources
          ...HeroLevelUpItemForm_heroLevelUpItem
      }
  }
`;

const heroLevelUpSettingsAddHeroLevelUpItemMutation = graphql`
  mutation HeroLevelUpSettingsAddHeroLevelUpItemMutation($item: HeroLevelUpItemInput!) {
      addHeroLevelUpItem(item: $item) {
          ...HeroLevelUpItemForm_heroLevelUpItem
      }
  } 
`;

const heroLevelUpSettingsUpdateHeroLevelUpItemMutation = graphql`
    mutation HeroLevelUpSettingsUpdateHeroLevelUpItemMutation($item: HeroLevelUpItemInput!, $id: ID!) {
        updateHeroLevelUpItem(item: $item, id: $id) {
            ...HeroLevelUpItemForm_heroLevelUpItem
        }
    }
`;

const heroLevelUpSettingsRemoveHeroLevelUpItemMutation = graphql`
    mutation HeroLevelUpSettingsRemoveHeroLevelUpItemMutation($id: ID!) {
        removeHeroLevelUpItem(id: $id) {
            id
            ...HeroLevelUpItemForm_heroLevelUpItem
        }
    }
`;

const heroLevelUpSettingsSubscription = graphql`
  subscription HeroLevelUpSettingsSubscription {
      heroLevelUpSettingsChanged {
          ...HeroLevelUpSettings_heroLevelUpSettings
      }
  }
`;

type ContainerProps = {
  readonly settingsKey: HeroLevelUpSettings_heroLevelUpSettings$key;
};

const HeroLevelUpSettingsContainer: React.FC<ContainerProps> = ({ settingsKey }) => {
  const [addHeroLevelUpItem] = useMutation<HeroLevelUpSettingsAddHeroLevelUpItemMutation>(heroLevelUpSettingsAddHeroLevelUpItemMutation);
  const [updateHeroLevelUpItem] = useMutation<HeroLevelUpSettingsUpdateHeroLevelUpItemMutation>(heroLevelUpSettingsUpdateHeroLevelUpItemMutation);
  const [removeHeroLevelUpItem] = useMutation<HeroLevelUpSettingsRemoveHeroLevelUpItemMutation>(heroLevelUpSettingsRemoveHeroLevelUpItemMutation);

  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<HeroLevelUpSettingsSubscription> => ({
    subscription: heroLevelUpSettingsSubscription,
    variables: {},
    updater: (store) => {
      const newRecord = store.getRootField('heroLevelUpSettingsChanged');
      store.getRoot().setLinkedRecord(newRecord, 'heroLevelUpSettings');
    },
  }), []);

  useSubscription(subscriptionConfig);

  const submitItem = (item: HeroLevelUpItemInput, id: string | undefined) => {
    if (id) {
      updateHeroLevelUpItem({
        variables: {
          id,
          item,
        },
      });
    } else {
      addHeroLevelUpItem({
        variables: { item },
        updater: (store) => {
          const newRecord = store.getRootField('addHeroLevelUpItem');

          const root = store.getRoot();
          const oldSettings = root.getLinkedRecord('heroLevelUpSettings');

          if (!oldSettings) {
            return;
          }

          const oldRecords = oldSettings.getLinkedRecords('levelUpItems');

          oldRecords?.push(newRecord);
          oldSettings.setLinkedRecords(oldRecords, 'levelUpItems');
          root.setLinkedRecord(oldSettings, 'heroLevelUpSettings');
        },
      });
    }
  };

  const removeItem = (id: string) => {
    removeHeroLevelUpItem({
      variables: { id },
      updater: (store) => {
        const deletedItem = store.getRootField('removeHeroLevelUpItem');
        const root = store.getRoot();
        const settings = root.getLinkedRecord('heroLevelUpSettings');

        if (settings) {
          let records = settings.getLinkedRecords('levelUpItems') || [];
          records = records.filter(r => r.getDataID() !== deletedItem.getDataID());

          settings.setLinkedRecords(records, 'levelUpItems');
          root.setLinkedRecord(settings, 'heroLevelUpSettings');
        }

        store.delete(deletedItem.getDataID());
      },
    });
  };

  return (
    <HeroLevelUpSettings
      onRemove={removeItem}
      onSubmit={submitItem}
      settingsKey={settingsKey}
    />
  );
};

HeroLevelUpSettingsContainer.displayName = 'HeroLevelUpSettingsContainer';

export { HeroLevelUpSettingsContainer as HeroLevelUpSettings };

type Props = {
  readonly onRemove: (itemId: string) => void;
  readonly onSubmit: (item: HeroLevelUpItemInput, id: string | undefined) => void;
  readonly settingsKey: HeroLevelUpSettings_heroLevelUpSettings$key;
};

const HeroLevelUpSettings: React.FC<Props> = ({
  onRemove,
  onSubmit,
  settingsKey,
}) => {
  const heroLevelUpSettings = useFragment(heroLevelUpSettingsFragmentDefinition, settingsKey);

  const { levelUpItems } = heroLevelUpSettings;

  const [isItemFormShown, setIsItemFormShown] = useState(false);
  const [editedItemId, setEditedItemId] = useState<string | undefined>();
  const itemToEdit = levelUpItems.find(i => i.id === editedItemId);

  const openForm = (id?: string) => {
    setIsItemFormShown(true);
    setEditedItemId(id);
  };

  const closeForm = () => {
    setIsItemFormShown(false);
    setEditedItemId(undefined);
  };

  const submitItem = (item: HeroLevelUpItemInput) => {
    onSubmit(item, editedItemId);
    closeForm();
  };

  return (
    <div>
      <Dialog open={isItemFormShown} onClose={closeForm}>
        <HeroLevelUpItemForm
          lastItem={heroLevelUpSettings.levelUpItems[heroLevelUpSettings.levelUpItems.length - 1]}
          item={itemToEdit}
          onSubmit={submitItem}
          onClose={closeForm}
        />
      </Dialog>
      <h2>Level up</h2>
      <Button
        color="primary"
        onClick={() => openForm()}
        variant="contained"
      >
        Add new item
      </Button>
      {!!levelUpItems.length && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Fighting strength</TableCell>
                <TableCell align="right">Off bonus</TableCell>
                <TableCell align="right">Def bonus</TableCell>
                <TableCell align="right">Resources</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {levelUpItems.map((item) => (
                <TableRow key={item.id} onClick={() => openForm(item.id)}>
                  <TableCell component="th" scope="row">
                    {item.name}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(item.id);
                      }}
                    >
                      X
                    </button>
                  </TableCell>
                  <TableCell align="right">{item.offensiveStrength}</TableCell>
                  <TableCell align="right">{item.offBonus}</TableCell>
                  <TableCell align="right">{item.defBonus}</TableCell>
                  <TableCell align="right">{item.resources}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

HeroLevelUpSettings.displayName = 'HeroLevelUpSettings';