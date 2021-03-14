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
export type HeroLevelUpSettingsUpdateHeroLevelUpItemMutationVariables = {
    item: HeroLevelUpItemInput;
    previousName: string;
};
export type HeroLevelUpSettingsUpdateHeroLevelUpItemMutationResponse = {
    readonly updateHeroLevelUpItem: {
        readonly name: string;
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
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "previousName"
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
      },
      {
        "kind": "Variable",
        "name": "previousName",
        "variableName": "previousName"
      }
    ],
    "concreteType": "HeroLevelUpItem",
    "kind": "LinkedField",
    "name": "updateHeroLevelUpItem",
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
    "name": "HeroLevelUpSettingsUpdateHeroLevelUpItemMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HeroLevelUpSettingsUpdateHeroLevelUpItemMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a57ad17662d3597afe3dbe04fdfcf8e1",
    "id": null,
    "metadata": {},
    "name": "HeroLevelUpSettingsUpdateHeroLevelUpItemMutation",
    "operationKind": "mutation",
    "text": "mutation HeroLevelUpSettingsUpdateHeroLevelUpItemMutation(\n  $item: HeroLevelUpItemInput!\n  $previousName: ID!\n) {\n  updateHeroLevelUpItem(item: $item, previousName: $previousName) {\n    name\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b22ffde72f0d56f2ac1226ebcedac453';
export default node;
