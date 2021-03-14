/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type MapSearchScanWholeMapMutationVariables = {};
export type MapSearchScanWholeMapMutationResponse = {
    readonly scanWholeMap: boolean | null;
};
export type MapSearchScanWholeMapMutation = {
    readonly response: MapSearchScanWholeMapMutationResponse;
    readonly variables: MapSearchScanWholeMapMutationVariables;
};



/*
mutation MapSearchScanWholeMapMutation {
  scanWholeMap
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "scanWholeMap",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MapSearchScanWholeMapMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MapSearchScanWholeMapMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "fe526f1d08fce8b2c3177cfc3d5c7d30",
    "id": null,
    "metadata": {},
    "name": "MapSearchScanWholeMapMutation",
    "operationKind": "mutation",
    "text": "mutation MapSearchScanWholeMapMutation {\n  scanWholeMap\n}\n"
  }
};
})();
(node as any).hash = '085562542d3ed6823a4805804e0507a0';
export default node;
