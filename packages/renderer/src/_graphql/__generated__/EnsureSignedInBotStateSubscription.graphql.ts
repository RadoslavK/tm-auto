/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BotState = "InitialScanning" | "None" | "Paused" | "Running" | "Stopping";
export type EnsureSignedInBotStateSubscriptionVariables = {};
export type EnsureSignedInBotStateSubscriptionResponse = {
    readonly botStateChanged: BotState;
};
export type EnsureSignedInBotStateSubscription = {
    readonly response: EnsureSignedInBotStateSubscriptionResponse;
    readonly variables: EnsureSignedInBotStateSubscriptionVariables;
};



/*
subscription EnsureSignedInBotStateSubscription {
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
    "name": "EnsureSignedInBotStateSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "EnsureSignedInBotStateSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "707071ab24288d7633ff26715e3e4c4a",
    "id": null,
    "metadata": {},
    "name": "EnsureSignedInBotStateSubscription",
    "operationKind": "subscription",
    "text": "subscription EnsureSignedInBotStateSubscription {\n  botStateChanged\n}\n"
  }
};
})();
(node as any).hash = '152b3d909c80cb8b37b7621245500ab9';
export default node;
