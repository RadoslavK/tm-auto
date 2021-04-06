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
        readonly " $fragmentRefs": FragmentRefs<"HeroLevelUpItemForm_heroLevelUpItem">;
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
    ...HeroLevelUpItemForm_heroLevelUpItem
    id
  }
}

fragment HeroLevelUpItemForm_heroLevelUpItem on HeroLevelUpItem {
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
            "name": "HeroLevelUpItemForm_heroLevelUpItem"
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
    "cacheID": "7b017e27fd6072f46e385d4851f3fcbc",
    "id": null,
    "metadata": {},
    "name": "HeroLevelUpSettingsUpdateHeroLevelUpItemMutation",
    "operationKind": "mutation",
    "text": "mutation HeroLevelUpSettingsUpdateHeroLevelUpItemMutation(\n  $item: HeroLevelUpItemInput!\n  $id: ID!\n) {\n  updateHeroLevelUpItem(item: $item, id: $id) {\n    ...HeroLevelUpItemForm_heroLevelUpItem\n    id\n  }\n}\n\nfragment HeroLevelUpItemForm_heroLevelUpItem on HeroLevelUpItem {\n  defBonus\n  name\n  offBonus\n  offensiveStrength\n  resources\n}\n"
  }
};
})();
(node as any).hash = '804d49cec9bce4d9480eda5a9b74267b';
export default node;
