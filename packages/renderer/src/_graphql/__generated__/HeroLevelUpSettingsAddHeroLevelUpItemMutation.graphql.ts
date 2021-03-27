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
        readonly " $fragmentRefs": FragmentRefs<"HeroLevelUpItem">;
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6130b84a0f7182be9a062203c3c4d901",
    "id": null,
    "metadata": {},
    "name": "HeroLevelUpSettingsAddHeroLevelUpItemMutation",
    "operationKind": "mutation",
    "text": "mutation HeroLevelUpSettingsAddHeroLevelUpItemMutation(\n  $item: HeroLevelUpItemInput!\n) {\n  addHeroLevelUpItem(item: $item) {\n    ...HeroLevelUpItem\n  }\n}\n\nfragment HeroLevelUpItem on HeroLevelUpItem {\n  defBonus\n  name\n  offBonus\n  offensiveStrength\n  resources\n}\n"
  }
};
})();
(node as any).hash = 'b124d2608c3b89fa410f2054329a0929';
export default node;
