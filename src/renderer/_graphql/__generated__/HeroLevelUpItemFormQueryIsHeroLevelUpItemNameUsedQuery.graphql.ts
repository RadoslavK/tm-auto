/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type HeroLevelUpItemFormQueryIsHeroLevelUpItemNameUsedQueryVariables = {
    name: string;
    include: boolean;
};
export type HeroLevelUpItemFormQueryIsHeroLevelUpItemNameUsedQueryResponse = {
    readonly isHeroLevelUpItemNameUsed?: boolean;
};
export type HeroLevelUpItemFormQueryIsHeroLevelUpItemNameUsedQuery = {
    readonly response: HeroLevelUpItemFormQueryIsHeroLevelUpItemNameUsedQueryResponse;
    readonly variables: HeroLevelUpItemFormQueryIsHeroLevelUpItemNameUsedQueryVariables;
};



/*
query HeroLevelUpItemFormQueryIsHeroLevelUpItemNameUsedQuery(
  $name: ID!
  $include: Boolean!
) {
  isHeroLevelUpItemNameUsed(name: $name) @include(if: $include)
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "include"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v2 = [
  {
    "condition": "include",
    "kind": "Condition",
    "passingValue": true,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "name"
          }
        ],
        "kind": "ScalarField",
        "name": "isHeroLevelUpItemNameUsed",
        "storageKey": null
      }
    ]
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
    "name": "HeroLevelUpItemFormQueryIsHeroLevelUpItemNameUsedQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "HeroLevelUpItemFormQueryIsHeroLevelUpItemNameUsedQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "5b3dbbaeba3d6a1836a2f0b0e2dc3475",
    "id": null,
    "metadata": {},
    "name": "HeroLevelUpItemFormQueryIsHeroLevelUpItemNameUsedQuery",
    "operationKind": "query",
    "text": "query HeroLevelUpItemFormQueryIsHeroLevelUpItemNameUsedQuery(\n  $name: ID!\n  $include: Boolean!\n) {\n  isHeroLevelUpItemNameUsed(name: $name) @include(if: $include)\n}\n"
  }
};
})();
(node as any).hash = 'b55b3b581e6063dabffcbf267249e83d';
export default node;
