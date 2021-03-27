/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BotState = "None" | "Paused" | "Pending" | "Running" | "Stopping" | "%future added value";
export type SignInFormSubscriptionVariables = {};
export type SignInFormSubscriptionResponse = {
    readonly botStateChanged: BotState;
    readonly lastSignedAccountIdUpdated: string | null;
};
export type SignInFormSubscription = {
    readonly response: SignInFormSubscriptionResponse;
    readonly variables: SignInFormSubscriptionVariables;
};



/*
subscription SignInFormSubscription {
  botStateChanged
  lastSignedAccountIdUpdated
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
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "lastSignedAccountIdUpdated",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SignInFormSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SignInFormSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "269f7ff7edc7440ef51121ee524cf0f7",
    "id": null,
    "metadata": {},
    "name": "SignInFormSubscription",
    "operationKind": "subscription",
    "text": "subscription SignInFormSubscription {\n  botStateChanged\n  lastSignedAccountIdUpdated\n}\n"
  }
};
})();
(node as any).hash = '9bb5c6843651bd2aec6ad158db318243';
export default node;
