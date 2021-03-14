/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
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
        readonly name: string;
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
    name
  }
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "item",
        "variableName": "item"
      }
    ],
    "concreteType": "HeroLevelUpItem",
    "kind": "LinkedField",
    "name": "addHeroLevelUpItem",
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
    "name": "HeroLevelUpSettingsAddHeroLevelUpItemMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HeroLevelUpSettingsAddHeroLevelUpItemMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "794555ac1d90a682de9f226bb7b5125a",
    "id": null,
    "metadata": {},
    "name": "HeroLevelUpSettingsAddHeroLevelUpItemMutation",
    "operationKind": "mutation",
    "text": "mutation HeroLevelUpSettingsAddHeroLevelUpItemMutation(\n  $item: HeroLevelUpItemInput!\n) {\n  addHeroLevelUpItem(item: $item) {\n    name\n  }\n}\n"
  }
};
})();
(node as any).hash = '9cbe934dca712222c19956fb0f9d32c4';
export default node;
