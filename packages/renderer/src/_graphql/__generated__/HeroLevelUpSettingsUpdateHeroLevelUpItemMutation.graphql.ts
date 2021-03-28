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
    id: string;
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
  $id: ID!
) {
  updateHeroLevelUpItem(item: $item, id: $id) {
    ...HeroLevelUpItem
    id
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "item"
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
  {
    "kind": "Variable",
    "name": "item",
    "variableName": "item"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "HeroLevelUpSettingsUpdateHeroLevelUpItemMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "HeroLevelUpSettingsUpdateHeroLevelUpItemMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5ed74d96acfd8b79334b7fa90cd32595",
    "id": null,
    "metadata": {},
    "name": "HeroLevelUpSettingsUpdateHeroLevelUpItemMutation",
    "operationKind": "mutation",
    "text": "mutation HeroLevelUpSettingsUpdateHeroLevelUpItemMutation(\n  $item: HeroLevelUpItemInput!\n  $id: ID!\n) {\n  updateHeroLevelUpItem(item: $item, id: $id) {\n    ...HeroLevelUpItem\n    id\n  }\n}\n\nfragment HeroLevelUpItem on HeroLevelUpItem {\n  defBonus\n  name\n  offBonus\n  offensiveStrength\n  resources\n}\n"
  }
};
})();
(node as any).hash = '9b66447b82d5c8807e6187196b69174f';
export default node;
