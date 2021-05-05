import {
  Button,
  FormGroup,
  makeStyles,
  TextField,
} from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useState } from 'react';
import { useFragment } from 'react-relay/hooks';

import type { HeroLevelUpItemForm_heroLevelUpItem$key } from '../../../_graphql/__generated__/HeroLevelUpItemForm_heroLevelUpItem.graphql.js';
import type { HeroLevelUpItemInput } from '../../../_graphql/__generated__/HeroLevelUpSettingsAddHeroLevelUpItemMutation.graphql.js';

type Props = {
  readonly item?: HeroLevelUpItemInput;
  readonly lastItem?: HeroLevelUpItemForm_heroLevelUpItem$key;
  readonly onClose: () => void;
  readonly onSubmit: (item: HeroLevelUpItemInput) => void;
};

const heroLevelUpItemFormHeroLevelUpItemFragment = graphql`
  fragment HeroLevelUpItemForm_heroLevelUpItem on HeroLevelUpItem {
      defBonus
      name
      offBonus
      offensiveStrength
      resources
  }
`;

const useStyles = makeStyles({
  root: {
    padding: 16,
  },
  numberInput: {
    maxWidth: 50,
  },
  form: {
    '& > *': {
      marginBottom: 16,
    },
  },
  actions: {
    margin: '0 auto',
  },
  action: {
    marginRight: 16,
  },
});

export const HeroLevelUpItemForm: React.FC<Props> = ({
  item,
  lastItem,
  onClose,
  onSubmit,
}) => {
  const classes = useStyles();
  const lastItemFragment = useFragment(heroLevelUpItemFormHeroLevelUpItemFragment, lastItem || null);

  const [name, setName] = useState(item?.name || '');
  const [offensiveStrength, setOffensiveStrength] = useState(
    (item || lastItemFragment)?.offensiveStrength || 0,
  );
  const [offBonus, setOffBonus] = useState((item || lastItemFragment)?.offBonus || 0);
  const [defBonus, setDefBonus] = useState((item || lastItemFragment)?.defBonus || 0);
  const [resources, setResources] = useState(
    (item || lastItemFragment)?.resources || 0,
  );

  const submitForm = () => {
    const item: HeroLevelUpItemInput = {
      name,
      offensiveStrength,
      offBonus,
      defBonus,
      resources,
    };

    onSubmit(item);
  };

  const isNameValid = !!name;

  return (
    <div className={classes.root}>
      <FormGroup className={classes.form}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => {
            const { value } = e.target;
            setName(value);
          }}
        />
        <TextField
          className={classes.numberInput}
          label="Strength"
          type="number"
          value={offensiveStrength}
          onChange={(e) => {
            const { value } = e.target;
            setOffensiveStrength(+value);
          }}
        />
        <TextField
          className={classes.numberInput}
          label="Off"
          type="number"
          value={offBonus}
          onChange={(e) => {
            const { value } = e.target;
            setOffBonus(+value);
          }}
        />
        <TextField
          className={classes.numberInput}
          label="Def"
          type="number"
          value={defBonus}
          onChange={(e) => {
            const { value } = e.target;
            setDefBonus(+value);
          }}
        />
        <TextField
          className={classes.numberInput}
          label="Resources"
          type="number"
          value={resources}
          onChange={(e) => {
            const { value } = e.target;
            setResources(+value);
          }}
        />
      </FormGroup>
      <div className={classes.actions}>
        <Button
          className={classes.action}
          onClick={onClose}
          variant="contained"
        >
          Close
        </Button>
        <Button
          className={classes.action}
          color="primary"
          variant="contained"
          disabled={!isNameValid}
          onClick={submitForm}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

HeroLevelUpItemForm.displayName = 'HeroLevelUpItemForm';