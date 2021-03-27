/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HeroLevelUpSettingsRemoveHeroLevelUpItemMutationVariables = {
    name: string;
};
export type HeroLevelUpSettingsRemoveHeroLevelUpItemMutationResponse = {
    readonly removeHeroLevelUpItem: {
        readonly name: string;
        readonly " $fragmentRefs": FragmentRefs<"HeroLevelUpItem">;
    };
};
export type HeroLevelUpSettingsRemoveHeroLevelUpItemMutation = {
    readonly response: HeroLevelUpSettingsRemoveHeroLevelUpItemMutationResponse;
    readonly variables: HeroLevelUpSettingsRemoveHeroLevelUpItemMutationVariables;
};



/*
mutation HeroLevelUpSettingsRemoveHeroLevelUpItemMutation(
  $name: ID!
) {
  removeHeroLevelUpItem(name: $name) {
    name
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
    "name": "name"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "name"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
            "name": "name"
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
    "cacheID": "fde4167f8bc05bc81541da7470dd90ce",
    "id": null,
    "metadata": {},
    "name": "HeroLevelUpSettingsRemoveHeroLevelUpItemMutation",
    "operationKind": "mutation",
    "text": "mutation HeroLevelUpSettingsRemoveHeroLevelUpItemMutation(\n  $name: ID!\n) {\n  removeHeroLevelUpItem(name: $name) {\n    name\n    ...HeroLevelUpItem\n  }\n}\n\nfragment HeroLevelUpItem on HeroLevelUpItem {\n  defBonus\n  name\n  offBonus\n  offensiveStrength\n  resources\n}\n"
  }
};
})();
(node as any).hash = 'b477fd990585361ea3df630f4b0eb619';
export default node;
