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
import React, { useCallback, useState } from 'react';

import { updateQueryCache } from '../../../../../server/utils/graphql';
import {
  GetHeroLevelUpSettingsDocument,
  GetHeroLevelUpSettingsQuery,
  GetHeroLevelUpSettingsQueryVariables,
  HeroLevelUpItem,
  HeroLevelUpItemInput,
  OnHeroLevelUpSettingsChangedDocument,
  OnHeroLevelUpSettingsChangedSubscription,
  OnHeroLevelUpSettingsChangedSubscriptionVariables,
  useAddHeroLevelUpItemMutation,
  useGetHeroLevelUpSettingsQuery,
  useRemoveHeroLevelUpItemMutation,
  useUpdateHeroLevelUpItemMutation,
} from '../../../_graphql/graphqlHooks';
import { HeroLevelUpItemForm } from './HeroLevelUpItemForm';

const useHeroLevelUpSettings = () => {
  const {
    client,
    data,
    loading,
    subscribeToMore,
  } = useGetHeroLevelUpSettingsQuery();

  subscribeToMore<
    OnHeroLevelUpSettingsChangedSubscription,
    OnHeroLevelUpSettingsChangedSubscriptionVariables
  >({
    document: OnHeroLevelUpSettingsChangedDocument,
    updateQuery: ({ heroLevelUpSettings }, { subscriptionData: { data } }) => {
      const currentNames = new Set(
        data.heroLevelUpSettingsChanged.levelUpItems.map((x) => x.name),
      );
      const oldItems = heroLevelUpSettings.levelUpItems.filter(
        (x) => !currentNames.has(x.name),
      );

      oldItems.forEach((item) => {
        client.cache.evict({ id: client.cache.identify(item) });
      });

      return {
        heroLevelUpSettings: data.heroLevelUpSettingsChanged,
      };
    },
  });

  const [onAdd] = useAddHeroLevelUpItemMutation();
  const [onUpdate] = useUpdateHeroLevelUpItemMutation();
  const [onRemove] = useRemoveHeroLevelUpItemMutation();

  const settings = loading || !data ? null : data.heroLevelUpSettings;

  const addHeroLevelUpItem = useCallback(
    (item: HeroLevelUpItemInput) => {
      onAdd({
        variables: { item },
        update: (cache, { data }) => {
          if (!data) {
            return;
          }

          updateQueryCache<
            GetHeroLevelUpSettingsQuery,
            GetHeroLevelUpSettingsQueryVariables
          >({
            cache,
            query: GetHeroLevelUpSettingsDocument,
            mergeWithOriginal: ({ heroLevelUpSettings }) => ({
              heroLevelUpSettings: {
                ...heroLevelUpSettings,
                levelUpItems: heroLevelUpSettings.levelUpItems.concat(
                  data.addHeroLevelUpItem,
                ),
              },
            }),
          });
        },
      });
    },
    [onAdd],
  );

  const updateHeroLevelUpItem = useCallback(
    (previousName: string, item: HeroLevelUpItemInput) => {
      onUpdate({
        variables: { previousName, item },
      });
    },
    [onUpdate],
  );

  const removeHeroLevelUpItem = useCallback(
    (name: string) => {
      onRemove({
        variables: { name },
        update: (cache, { data }) => {
          if (!data) {
            return;
          }

          updateQueryCache<
            GetHeroLevelUpSettingsQuery,
            GetHeroLevelUpSettingsQueryVariables
          >({
            cache,
            query: GetHeroLevelUpSettingsDocument,
            mergeWithOriginal: (original) => ({
              heroLevelUpSettings: {
                ...original.heroLevelUpSettings,
                levelUpItems: original.heroLevelUpSettings.levelUpItems.filter(
                  (item) => item.name !== data.removeHeroLevelUpItem.name,
                ),
              },
            }),
          });

          cache.evict({ id: cache.identify(data.removeHeroLevelUpItem) });
        },
      });
    },
    [onRemove],
  );

  return {
    settings,
    addHeroLevelUpItem,
    updateHeroLevelUpItem,
    removeHeroLevelUpItem,
  };
};

export const HeroLevelUpSettings: React.FC = () => {
  const [isItemFormShown, setIsItemFormShown] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<HeroLevelUpItem | undefined>();

  const openForm = (itemToEdit?: HeroLevelUpItem) => {
    setItemToEdit(itemToEdit);
    setIsItemFormShown(true);
  };
  const closeForm = () => {
    setIsItemFormShown(false);
    setItemToEdit(undefined);
  };

  const {
    settings,
    addHeroLevelUpItem,
    updateHeroLevelUpItem,
    removeHeroLevelUpItem,
  } = useHeroLevelUpSettings();

  if (!settings) {
    return null;
  }

  const { levelUpItems } = settings;

  const submitItem = (item: HeroLevelUpItemInput) => {
    if (itemToEdit) {
      updateHeroLevelUpItem(itemToEdit.name, item);
    } else {
      addHeroLevelUpItem(item);
    }

    closeForm();
  };

  return (
    <div>
      <Dialog open={isItemFormShown} onClose={closeForm}>
        <HeroLevelUpItemForm
          lastItem={settings.levelUpItems[settings.levelUpItems.length - 1]}
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
                <TableRow key={item.name} onClick={() => openForm(item)}>
                  <TableCell component="th" scope="row">
                    {item.name}
                    <button
                      onClick={(e) => {
                        removeHeroLevelUpItem(item.name);
                        e.stopPropagation();
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
