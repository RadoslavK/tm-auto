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
export type HeroLevelUpSettingsAddHeroLevelUpItemMutationVariables = {
    item: HeroLevelUpItemInput;
};
export type HeroLevelUpSettingsAddHeroLevelUpItemMutationResponse = {
    readonly addHeroLevelUpItem: {
        readonly " $fragmentRefs": FragmentRefs<"HeroLevelUpItemForm_heroLevelUpItem">;
    };
};
export type HeroLevelUpSettingsAddHeroLevelUpItemMutation = {
    readonly response: HeroLevelUpSettingsAddHeroLevelUpItemMutationResponse;
    readonly variables: HeroLevelUpSettingsAddHeroLevelUpItemMutationVariables;
};



/*
mutation HeroLevelUpSettingsAddHeroLevelUpItemMutation(
  $item: HeroLevelUpItemInput!
) {
  addHeroLevelUpItem(item: $item) {
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "item"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "item",
    "variableName": "item"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "HeroLevelUpSettingsAddHeroLevelUpItemMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "HeroLevelUpItem",
        "kind": "LinkedField",
        "name": "addHeroLevelUpItem",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HeroLevelUpSettingsAddHeroLevelUpItemMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "HeroLevelUpItem",
        "kind": "LinkedField",
        "name": "addHeroLevelUpItem",
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
    "cacheID": "f22cb979461b2aaa9e4e5c66466f7120",
    "id": null,
    "metadata": {},
    "name": "HeroLevelUpSettingsAddHeroLevelUpItemMutation",
    "operationKind": "mutation",
    "text": "mutation HeroLevelUpSettingsAddHeroLevelUpItemMutation(\n  $item: HeroLevelUpItemInput!\n) {\n  addHeroLevelUpItem(item: $item) {\n    ...HeroLevelUpItemForm_heroLevelUpItem\n    id\n  }\n}\n\nfragment HeroLevelUpItemForm_heroLevelUpItem on HeroLevelUpItem {\n  defBonus\n  name\n  offBonus\n  offensiveStrength\n  resources\n}\n"
  }
};
})();
(node as any).hash = 'be9264504e6762f9ae44832702e4e73f';
export default node;
