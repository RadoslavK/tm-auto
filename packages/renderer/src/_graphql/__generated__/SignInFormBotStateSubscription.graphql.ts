/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BotState = "None" | "Paused" | "Pending" | "Running" | "Stopping" | "%future added value";
export type SignInFormBotStateSubscriptionVariables = {};
export type SignInFormBotStateSubscriptionResponse = {
    readonly botStateChanged: BotState;
};
export type SignInFormBotStateSubscription = {
    readonly response: SignInFormBotStateSubscriptionResponse;
    readonly variables: SignInFormBotStateSubscriptionVariables;
};



/*
subscription SignInFormBotStateSubscription {
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
    "name": "SignInFormBotStateSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SignInFormBotStateSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "b0c2b3819ad22f0ca71374e6b1e6b42a",
    "id": null,
    "metadata": {},
    "name": "SignInFormBotStateSubscription",
    "operationKind": "subscription",
    "text": "subscription SignInFormBotStateSubscription {\n  botStateChanged\n}\n"
  }
};
})();
(node as any).hash = 'eb3a0b71907b3df1d5726edbad1edc47';
export default node;
