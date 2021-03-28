/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type VillagesActiveVillageIdChangedSubscriptionVariables = {};
export type VillagesActiveVillageIdChangedSubscriptionResponse = {
    readonly activeVillageIdChanged: string;
};
export type VillagesActiveVillageIdChangedSubscription = {
    readonly response: VillagesActiveVillageIdChangedSubscriptionResponse;
    readonly variables: VillagesActiveVillageIdChangedSubscriptionVariables;
};



/*
subscription VillagesActiveVillageIdChangedSubscription {
  activeVillageIdChanged
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "activeVillageIdChanged",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "VillagesActiveVillageIdChangedSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "VillagesActiveVillageIdChangedSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "a0592c0bc5820a933313633bbc03349b",
    "id": null,
    "metadata": {},
    "name": "VillagesActiveVillageIdChangedSubscription",
    "operationKind": "subscription",
    "text": "subscription VillagesActiveVillageIdChangedSubscription {\n  activeVillageIdChanged\n}\n"
  }
};
})();
(node as any).hash = 'ec5839633c1aed396518852d4804bac0';
export default node;
