import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import graphql from 'babel-plugin-relay/macro';
import React, { useState } from 'react';
import {
  useLazyLoadQuery,
  useMutation,
} from 'react-relay/hooks';

import {
  HeroLevelUpItemInput,
  HeroLevelUpSettingsAddHeroLevelUpItemMutation,
} from '../../../_graphql/__generated__/HeroLevelUpSettingsAddHeroLevelUpItemMutation.graphql';
import { HeroLevelUpSettingsQuery } from '../../../_graphql/__generated__/HeroLevelUpSettingsQuery.graphql';
import { HeroLevelUpSettingsRemoveHeroLevelUpItemMutation } from '../../../_graphql/__generated__/HeroLevelUpSettingsRemoveHeroLevelUpItemMutation.graphql';
import { HeroLevelUpSettingsUpdateHeroLevelUpItemMutation } from '../../../_graphql/__generated__/HeroLevelUpSettingsUpdateHeroLevelUpItemMutation.graphql';
import { HeroLevelUpItemForm } from './HeroLevelUpItemForm';

const heroLevelUpSettingsQuery = graphql`
  query HeroLevelUpSettingsQuery {
      heroLevelUpSettings {
          levelUpItems {
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
          name
      }
  } 
`;

const heroLevelUpSettingsUpdateHeroLevelUpItemMutation = graphql`
    mutation HeroLevelUpSettingsUpdateHeroLevelUpItemMutation($item: HeroLevelUpItemInput!, $previousName: ID!) {
        updateHeroLevelUpItem(item: $item, previousName: $previousName) {
            name
        }
    }
`;

const heroLevelUpSettingsRemoveHeroLevelUpItemMutation = graphql`
    mutation HeroLevelUpSettingsRemoveHeroLevelUpItemMutation($name: ID!) {
        removeHeroLevelUpItem(name: $name) {
            name
        }
    }
`;

export const HeroLevelUpSettings: React.FC = () => {
  const { heroLevelUpSettings } = useLazyLoadQuery<HeroLevelUpSettingsQuery>(heroLevelUpSettingsQuery, {});
  const [addHeroLevelUpItem] = useMutation<HeroLevelUpSettingsAddHeroLevelUpItemMutation>(heroLevelUpSettingsAddHeroLevelUpItemMutation);
  const [updateHeroLevelUpItem] = useMutation<HeroLevelUpSettingsUpdateHeroLevelUpItemMutation>(heroLevelUpSettingsUpdateHeroLevelUpItemMutation);
  const [removeHeroLevelUpItem] = useMutation<HeroLevelUpSettingsRemoveHeroLevelUpItemMutation>(heroLevelUpSettingsRemoveHeroLevelUpItemMutation);

  const [isItemFormShown, setIsItemFormShown] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<HeroLevelUpItemInput | undefined>();

  const openForm = (itemToEdit?: HeroLevelUpItemInput) => {
    setItemToEdit(itemToEdit);
    setIsItemFormShown(true);
  };

  const closeForm = () => {
    setIsItemFormShown(false);
    setItemToEdit(undefined);
  };

  const { levelUpItems } = heroLevelUpSettings;

  const submitItem = (item: HeroLevelUpItemInput) => {
    if (itemToEdit) {
      updateHeroLevelUpItem({
        variables: {
          previousName: itemToEdit.name,
          item,
        },
      });
    } else {
      addHeroLevelUpItem({
        variables: {
          item,
        }
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
                <TableRow key={item.name} onClick={() => openForm(item)}>
                  <TableCell component="th" scope="row">
                    {item.name}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        removeHeroLevelUpItem({
                          variables: { name: item.name },
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
