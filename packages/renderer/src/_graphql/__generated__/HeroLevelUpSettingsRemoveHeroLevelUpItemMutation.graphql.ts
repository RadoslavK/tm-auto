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
        readonly " $fragmentRefs": FragmentRefs<"HeroLevelUpItem">;
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
            "filters": null,
            "handle": "deleteRecord",
            "key": "",
            "kind": "ScalarHandle",
            "name": "id"
          },
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
    "cacheID": "f83fd6caaae90835ca15ffbc47e8da58",
    "id": null,
    "metadata": {},
    "name": "HeroLevelUpSettingsRemoveHeroLevelUpItemMutation",
    "operationKind": "mutation",
    "text": "mutation HeroLevelUpSettingsRemoveHeroLevelUpItemMutation(\n  $id: ID!\n) {\n  removeHeroLevelUpItem(id: $id) {\n    id\n    ...HeroLevelUpItem\n  }\n}\n\nfragment HeroLevelUpItem on HeroLevelUpItem {\n  defBonus\n  name\n  offBonus\n  offensiveStrength\n  resources\n}\n"
  }
};
})();
(node as any).hash = '8c96c96b0faff2f5a447c49818006477';
export default node;
