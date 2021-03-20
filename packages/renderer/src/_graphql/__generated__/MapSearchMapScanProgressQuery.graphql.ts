/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type MapSearchMapScanProgressQueryVariables = {};
export type MapSearchMapScanProgressQueryResponse = {
    readonly mapScanProgress: number;
};
export type MapSearchMapScanProgressQuery = {
    readonly response: MapSearchMapScanProgressQueryResponse;
    readonly variables: MapSearchMapScanProgressQueryVariables;
};



/*
query MapSearchMapScanProgressQuery {
  mapScanProgress
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MapSearchMapScanProgressQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MapSearchMapScanProgressQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "e60319836e111452eb8f131a12ec7309",
    "id": null,
    "metadata": {},
    "name": "MapSearchMapScanProgressQuery",
    "operationKind": "query",
    "text": "query MapSearchMapScanProgressQuery {\n  mapScanProgress\n}\n"
  }
};
})();
(node as any).hash = 'df05ca160b6b7972b0545fd75d1c6ecd';
export default node;
