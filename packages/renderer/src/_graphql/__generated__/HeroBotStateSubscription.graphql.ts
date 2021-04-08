/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BotState = "InitialScanning" | "None" | "Paused" | "Running" | "Stopping";
export type HeroBotStateSubscriptionVariables = {};
export type HeroBotStateSubscriptionResponse = {
    readonly botStateChanged: BotState;
};
export type HeroBotStateSubscription = {
    readonly response: HeroBotStateSubscriptionResponse;
    readonly variables: HeroBotStateSubscriptionVariables;
};



/*
subscription HeroBotStateSubscription {
  botStateChanged
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "botStateChanged",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HeroBotStateSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HeroBotStateSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "b0ff8385d6a43c65798af393b8ad6ca3",
    "id": null,
    "metadata": {},
    "name": "HeroBotStateSubscription",
    "operationKind": "subscription",
    "text": "subscription HeroBotStateSubscription {\n  botStateChanged\n}\n"
  }
};
})();
(node as any).hash = '18324b0ea9a0baa73b2968224b4b1b02';
export default node;
