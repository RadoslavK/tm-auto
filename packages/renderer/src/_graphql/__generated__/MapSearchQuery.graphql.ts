/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type MapSearchState = "None" | "Scanning" | "Searching";
export type MapSearchQueryVariables = {};
export type MapSearchQueryResponse = {
    readonly mapScanProgress: number;
    readonly mapSearchState: MapSearchState;
};
export type MapSearchQuery = {
    readonly response: MapSearchQueryResponse;
    readonly variables: MapSearchQueryVariables;
};



/*
query MapSearchQuery {
  mapScanProgress
  mapSearchState
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "mapScanProgress",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "mapSearchState",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MapSearchQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MapSearchQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "5a887c96c59a1041434b602d6524e477",
    "id": null,
    "metadata": {},
    "name": "MapSearchQuery",
    "operationKind": "query",
    "text": "query MapSearchQuery {\n  mapScanProgress\n  mapSearchState\n}\n"
  }
};
})();
(node as any).hash = '415ab2bd7b55189d9c035fff8e72d13e';
export default node;
