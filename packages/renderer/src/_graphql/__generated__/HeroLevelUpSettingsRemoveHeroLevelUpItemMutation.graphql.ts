/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HeroLevelUpSettingsRemoveHeroLevelUpItemMutationVariables = {
    id: string;
};
export type HeroLevelUpSettingsRemoveHeroLevelUpItemMutationResponse = {
    readonly removeHeroLevelUpItem: {
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"HeroLevelUpItemForm_heroLevelUpItem">;
    };
};
export type HeroLevelUpSettingsRemoveHeroLevelUpItemMutation = {
    readonly response: HeroLevelUpSettingsRemoveHeroLevelUpItemMutationResponse;
    readonly variables: HeroLevelUpSettingsRemoveHeroLevelUpItemMutationVariables;
};



/*
mutation HeroLevelUpSettingsRemoveHeroLevelUpItemMutation(
  $id: ID!
) {
  removeHeroLevelUpItem(id: $id) {
    id
    ...HeroLevelUpItemForm_heroLevelUpItem
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
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "HeroLevelUpSettingsRemoveHeroLevelUpItemMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "HeroLevelUpItem",
        "kind": "LinkedField",
        "name": "removeHeroLevelUpItem",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
    "name": "HeroLevelUpSettingsRemoveHeroLevelUpItemMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "HeroLevelUpItem",
        "kind": "LinkedField",
        "name": "removeHeroLevelUpItem",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
    "cacheID": "81e53aaeacfc374127f1c4b228832ad8",
    "id": null,
    "metadata": {},
    "name": "HeroLevelUpSettingsRemoveHeroLevelUpItemMutation",
    "operationKind": "mutation",
    "text": "mutation HeroLevelUpSettingsRemoveHeroLevelUpItemMutation(\n  $id: ID!\n) {\n  removeHeroLevelUpItem(id: $id) {\n    id\n    ...HeroLevelUpItemForm_heroLevelUpItem\n  }\n}\n\nfragment HeroLevelUpItemForm_heroLevelUpItem on HeroLevelUpItem {\n  defBonus\n  name\n  offBonus\n  offensiveStrength\n  resources\n}\n"
  }
};
})();
(node as any).hash = '0966565ee37353001b31809226e15f41';
export default node;
