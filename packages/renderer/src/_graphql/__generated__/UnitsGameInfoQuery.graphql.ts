/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type Tribe = "Egyptians" | "Gauls" | "Huns" | "Natars" | "Nature" | "Romans" | "Teutons" | "%future added value";
export type UnitsGameInfoQueryVariables = {};
export type UnitsGameInfoQueryResponse = {
    readonly gameInfo: {
        readonly tribe: Tribe;
    };
};
export type UnitsGameInfoQuery = {
    readonly response: UnitsGameInfoQueryResponse;
    readonly variables: UnitsGameInfoQueryVariables;
};



/*
query UnitsGameInfoQuery {
  gameInfo {
    tribe
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "GameInfo",
    "kind": "LinkedField",
    "name": "gameInfo",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "tribe",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UnitsGameInfoQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UnitsGameInfoQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "3e4857d0d98cbd3e91e42694d237a61b",
    "id": null,
    "metadata": {},
    "name": "UnitsGameInfoQuery",
    "operationKind": "query",
    "text": "query UnitsGameInfoQuery {\n  gameInfo {\n    tribe\n  }\n}\n"
  }
};
})();
(node as any).hash = '20d084034a00532d2ffa8a7cee1f5661';
export default node;
