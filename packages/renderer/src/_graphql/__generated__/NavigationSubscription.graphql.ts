/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BotState = "InitialScanning" | "None" | "Paused" | "Running" | "Stopping";
export type NavigationSubscriptionVariables = {};
export type NavigationSubscriptionResponse = {
    readonly botStateChanged: BotState;
};
export type NavigationSubscription = {
    readonly response: NavigationSubscriptionResponse;
    readonly variables: NavigationSubscriptionVariables;
};



/*
subscription NavigationSubscription {
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
    "name": "NavigationSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NavigationSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "155fa4fdf7ac4f89daaf143c587d2a5f",
    "id": null,
    "metadata": {},
    "name": "NavigationSubscription",
    "operationKind": "subscription",
    "text": "subscription NavigationSubscription {\n  botStateChanged\n}\n"
  }
};
})();
(node as any).hash = 'd56500d024f1cbeb77003f025bf34705';
export default node;
