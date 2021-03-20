/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type MapSearchState = "None" | "Scanning" | "Searching" | "%future added value";
export type MapSearchMapSearchStateQueryVariables = {};
export type MapSearchMapSearchStateQueryResponse = {
    readonly mapSearchState: MapSearchState;
};
export type MapSearchMapSearchStateQuery = {
    readonly response: MapSearchMapSearchStateQueryResponse;
    readonly variables: MapSearchMapSearchStateQueryVariables;
};



/*
query MapSearchMapSearchStateQuery {
  mapSearchState
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
    "name": "MapSearchMapSearchStateQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MapSearchMapSearchStateQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "1694f5ec9903d581038d20f519ca5cb2",
    "id": null,
    "metadata": {},
    "name": "MapSearchMapSearchStateQuery",
    "operationKind": "query",
    "text": "query MapSearchMapSearchStateQuery {\n  mapSearchState\n}\n"
  }
};
})();
(node as any).hash = 'c62f3f756f197ae7a7f509f9de10cd3b';
export default node;
