/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type MapSearchStopMapScanMutationVariables = {};
export type MapSearchStopMapScanMutationResponse = {
    readonly stopMapScan: boolean | null;
};
export type MapSearchStopMapScanMutation = {
    readonly response: MapSearchStopMapScanMutationResponse;
    readonly variables: MapSearchStopMapScanMutationVariables;
};



/*
mutation MapSearchStopMapScanMutation {
  stopMapScan
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "stopMapScan",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MapSearchStopMapScanMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MapSearchStopMapScanMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "99925dad980ff2450c10f6d4574fa711",
    "id": null,
    "metadata": {},
    "name": "MapSearchStopMapScanMutation",
    "operationKind": "mutation",
    "text": "mutation MapSearchStopMapScanMutation {\n  stopMapScan\n}\n"
  }
};
})();
(node as any).hash = '27e9fc53d4cba031f857b0baf0288f25';
export default node;
