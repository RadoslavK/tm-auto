/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type MapSearchState = "None" | "Scanning" | "Searching" | "%future added value";
export type MapSearchStateSubscriptionVariables = {};
export type MapSearchStateSubscriptionResponse = {
    readonly mapSearchStateChanged: MapSearchState;
};
export type MapSearchStateSubscription = {
    readonly response: MapSearchStateSubscriptionResponse;
    readonly variables: MapSearchStateSubscriptionVariables;
};



/*
subscription MapSearchStateSubscription {
  mapSearchStateChanged
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "mapSearchStateChanged",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MapSearchStateSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MapSearchStateSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "52254eafc402f61e2aa43f4b8422eea7",
    "id": null,
    "metadata": {},
    "name": "MapSearchStateSubscription",
    "operationKind": "subscription",
    "text": "subscription MapSearchStateSubscription {\n  mapSearchStateChanged\n}\n"
  }
};
})();
(node as any).hash = '6c9f09fe801a90e2e9184f25128cf385';
export default node;
