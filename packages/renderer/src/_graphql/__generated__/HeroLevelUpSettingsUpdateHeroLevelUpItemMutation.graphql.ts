/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HeroLevelUpItemInput = {
    defBonus: number;
    name: string;
    offBonus: number;
    offensiveStrength: number;
    resources: number;
};
export type HeroLevelUpSettingsUpdateHeroLevelUpItemMutationVariables = {
    item: HeroLevelUpItemInput;
    previousName: string;
};
export type HeroLevelUpSettingsUpdateHeroLevelUpItemMutationResponse = {
    readonly updateHeroLevelUpItem: {
        readonly " $fragmentRefs": FragmentRefs<"HeroLevelUpItem">;
    };
};
export type HeroLevelUpSettingsUpdateHeroLevelUpItemMutation = {
    readonly response: HeroLevelUpSettingsUpdateHeroLevelUpItemMutationResponse;
    readonly variables: HeroLevelUpSettingsUpdateHeroLevelUpItemMutationVariables;
};



/*
mutation HeroLevelUpSettingsUpdateHeroLevelUpItemMutation(
  $item: HeroLevelUpItemInput!
  $previousName: ID!
) {
  updateHeroLevelUpItem(item: $item, previousName: $previousName) {
    ...HeroLevelUpItem
  }
}

fragment HeroLevelUpItem on HeroLevelUpItem {
  defBonus
  name
  offBonus
  offensiveStrength
  resources
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "item"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "previousName"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "item",
    "variableName": "item"
  },
  {
    "kind": "Variable",
    "name": "previousName",
    "variableName": "previousName"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "HeroLevelUpSettingsUpdateHeroLevelUpItemMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "HeroLevelUpItem",
        "kind": "LinkedField",
        "name": "updateHeroLevelUpItem",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HeroLevelUpItem"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HeroLevelUpSettingsUpdateHeroLevelUpItemMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "HeroLevelUpItem",
        "kind": "LinkedField",
        "name": "updateHeroLevelUpItem",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "defBonus",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "offBonus",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "offensiveStrength",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "resources",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "aafdb138af8bce1126119d90d0a78685",
    "id": null,
    "metadata": {},
    "name": "HeroLevelUpSettingsUpdateHeroLevelUpItemMutation",
    "operationKind": "mutation",
    "text": "mutation HeroLevelUpSettingsUpdateHeroLevelUpItemMutation(\n  $item: HeroLevelUpItemInput!\n  $previousName: ID!\n) {\n  updateHeroLevelUpItem(item: $item, previousName: $previousName) {\n    ...HeroLevelUpItem\n  }\n}\n\nfragment HeroLevelUpItem on HeroLevelUpItem {\n  defBonus\n  name\n  offBonus\n  offensiveStrength\n  resources\n}\n"
  }
};
})();
(node as any).hash = 'e3c9e58db0c0ec5ea7e27f6e7b9fa6e9';
export default node;
