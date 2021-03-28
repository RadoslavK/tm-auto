import {
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
  useLazyLoadQuery,
  useMutation,
  useSubscription,
} from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type {
  HeroLevelUpItemInput,
  HeroLevelUpSettingsAddHeroLevelUpItemMutation,
} from '../../../_graphql/__generated__/HeroLevelUpSettingsAddHeroLevelUpItemMutation.graphql.js';
import type { HeroLevelUpSettingsQuery } from '../../../_graphql/__generated__/HeroLevelUpSettingsQuery.graphql.js';
import type { HeroLevelUpSettingsRemoveHeroLevelUpItemMutation } from '../../../_graphql/__generated__/HeroLevelUpSettingsRemoveHeroLevelUpItemMutation.graphql.js';
import type { HeroLevelUpSettingsSubscription } from '../../../_graphql/__generated__/HeroLevelUpSettingsSubscription.graphql.js';
import type { HeroLevelUpSettingsUpdateHeroLevelUpItemMutation } from '../../../_graphql/__generated__/HeroLevelUpSettingsUpdateHeroLevelUpItemMutation.graphql.js';
import { HeroLevelUpItemForm } from './HeroLevelUpItemForm.js';

const heroLevelUpSettingsQuery = graphql`
  query HeroLevelUpSettingsQuery {
      heroLevelUpSettings {
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
  }
`;

const heroLevelUpSettingsAddHeroLevelUpItemMutation = graphql`
  mutation HeroLevelUpSettingsAddHeroLevelUpItemMutation($item: HeroLevelUpItemInput!) {
      addHeroLevelUpItem(item: $item) {
          ...HeroLevelUpItem
      }
  } 
`;

const heroLevelUpSettingsUpdateHeroLevelUpItemMutation = graphql`
    mutation HeroLevelUpSettingsUpdateHeroLevelUpItemMutation($item: HeroLevelUpItemInput!, $id: ID!) {
        updateHeroLevelUpItem(item: $item, id: $id) {
            ...HeroLevelUpItem
        }
    }
`;

const heroLevelUpSettingsRemoveHeroLevelUpItemMutation = graphql`
    mutation HeroLevelUpSettingsRemoveHeroLevelUpItemMutation($id: ID!) {
        removeHeroLevelUpItem(id: $id) {
            id @deleteRecord
            ...HeroLevelUpItem
        }
    }
`;

const heroLevelUpSettingsSubscription = graphql`
  subscription HeroLevelUpSettingsSubscription {
      heroLevelUpSettingsChanged {
          ...HeroLevelUpSettings
      }
  }
`;

export const HeroLevelUpSettings: React.FC = () => {
  const { heroLevelUpSettings } = useLazyLoadQuery<HeroLevelUpSettingsQuery>(heroLevelUpSettingsQuery, {});
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
    if (itemToEdit) {
      updateHeroLevelUpItem({
        variables: {
          id: itemToEdit.id,
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
      <button onClick={() => openForm()}>Add new item</button>
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

                        removeHeroLevelUpItem({
                          variables: { id: item.id },
                          updater: (store) => {
                            const root = store.getRoot();
                            const oldSettings = root.getLinkedRecord('heroLevelUpSettings');

                            if (!oldSettings) {
                              return;
                            }

                            const deletedItem = store.getRootField('removeHeroLevelUpItem');
                            const oldRecords = oldSettings.getLinkedRecords('levelUpItems');
                            const newRecords = oldRecords?.filter(r => !!r && r.getDataID() !== deletedItem.getDataID());

                            oldSettings.setLinkedRecords(newRecords, 'levelUpItems');
                            root.setLinkedRecord(oldSettings, 'heroLevelUpSettings');
                          },
                        });
                      }}>
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
