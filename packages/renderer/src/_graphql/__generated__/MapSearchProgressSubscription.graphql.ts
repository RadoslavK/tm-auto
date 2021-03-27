/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type MapSearchProgressSubscriptionVariables = {};
export type MapSearchProgressSubscriptionResponse = {
    readonly mapScanProgressUpdated: number;
};
export type MapSearchProgressSubscription = {
    readonly response: MapSearchProgressSubscriptionResponse;
    readonly variables: MapSearchProgressSubscriptionVariables;
};



/*
subscription MapSearchProgressSubscription {
  mapScanProgressUpdated
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "mapScanProgressUpdated",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MapSearchProgressSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MapSearchProgressSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "8b67cf154c9300eac3e38e12d11a443c",
    "id": null,
    "metadata": {},
    "name": "MapSearchProgressSubscription",
    "operationKind": "subscription",
    "text": "subscription MapSearchProgressSubscription {\n  mapScanProgressUpdated\n}\n"
  }
};
})();
(node as any).hash = '2a38573ae211114e56f413f2af314dd1';
export default node;
