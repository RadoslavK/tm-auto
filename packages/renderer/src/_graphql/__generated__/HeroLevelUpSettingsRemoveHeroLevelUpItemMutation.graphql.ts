/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type HeroLevelUpSettingsRemoveHeroLevelUpItemMutationVariables = {
    name: string;
};
export type HeroLevelUpSettingsRemoveHeroLevelUpItemMutationResponse = {
    readonly removeHeroLevelUpItem: {
        readonly name: string;
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
  }
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name"
      }
    ],
    "concreteType": "HeroLevelUpItem",
    "kind": "LinkedField",
    "name": "removeHeroLevelUpItem",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "HeroLevelUpSettingsRemoveHeroLevelUpItemMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HeroLevelUpSettingsRemoveHeroLevelUpItemMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1b1fb94f7581f2489bbd834b436ae0a6",
    "id": null,
    "metadata": {},
    "name": "HeroLevelUpSettingsRemoveHeroLevelUpItemMutation",
    "operationKind": "mutation",
    "text": "mutation HeroLevelUpSettingsRemoveHeroLevelUpItemMutation(\n  $name: ID!\n) {\n  removeHeroLevelUpItem(name: $name) {\n    name\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd12815d93f30f136d2faa2d9601f291d';
export default node;
