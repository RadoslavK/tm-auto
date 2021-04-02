/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type Tribe = "Egyptians" | "Gauls" | "Huns" | "Natars" | "Nature" | "Romans" | "Teutons";
export type EnsureGlobalStateGameInfoQueryVariables = {};
export type EnsureGlobalStateGameInfoQueryResponse = {
    readonly gameInfo: {
        readonly tribe: Tribe;
    };
};
export type EnsureGlobalStateGameInfoQuery = {
    readonly response: EnsureGlobalStateGameInfoQueryResponse;
    readonly variables: EnsureGlobalStateGameInfoQueryVariables;
};



/*
query EnsureGlobalStateGameInfoQuery {
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
    "name": "EnsureGlobalStateGameInfoQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "EnsureGlobalStateGameInfoQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "845c1d4dff131fa75a011f7a30fdf737",
    "id": null,
    "metadata": {},
    "name": "EnsureGlobalStateGameInfoQuery",
    "operationKind": "query",
    "text": "query EnsureGlobalStateGameInfoQuery {\n  gameInfo {\n    tribe\n  }\n}\n"
  }
};
})();
(node as any).hash = 'af19365eb5928ba89e6818a579eb83d0';
export default node;
