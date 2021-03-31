/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type Tribe = "Egyptians" | "Gauls" | "Huns" | "Natars" | "Nature" | "Romans" | "Teutons" | "%future added value";
export type VillageGameInfoQueryVariables = {};
export type VillageGameInfoQueryResponse = {
    readonly gameInfo: {
        readonly tribe: Tribe;
    };
};
export type VillageGameInfoQuery = {
    readonly response: VillageGameInfoQueryResponse;
    readonly variables: VillageGameInfoQueryVariables;
};



/*
query VillageGameInfoQuery {
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
    "name": "VillageGameInfoQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "VillageGameInfoQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "8fa813cc9987de08ad0420ceb8437b15",
    "id": null,
    "metadata": {},
    "name": "VillageGameInfoQuery",
    "operationKind": "query",
    "text": "query VillageGameInfoQuery {\n  gameInfo {\n    tribe\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b56cdbb7c4be54370b51117337c08af5';
export default node;
