/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BotState = "InitialScanning" | "None" | "Paused" | "Running" | "Stopping";
export type MapSearchState = "None" | "Scanning" | "Searching";
export type MapSearchQueryVariables = {};
export type MapSearchQueryResponse = {
    readonly botState: BotState;
    readonly mapScanProgress: number;
    readonly mapSearchState: MapSearchState;
};
export type MapSearchQuery = {
    readonly response: MapSearchQueryResponse;
    readonly variables: MapSearchQueryVariables;
};



/*
query MapSearchQuery {
  botState
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
    "name": "botState",
    "storageKey": null
  },
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
    "cacheID": "b007d44ab0f05ce6d1e60d4f89ff48bd",
    "id": null,
    "metadata": {},
    "name": "MapSearchQuery",
    "operationKind": "query",
    "text": "query MapSearchQuery {\n  botState\n  mapScanProgress\n  mapSearchState\n}\n"
  }
};
})();
(node as any).hash = 'c9962461adc50f142ef35cf0dd33f831';
export default node;
