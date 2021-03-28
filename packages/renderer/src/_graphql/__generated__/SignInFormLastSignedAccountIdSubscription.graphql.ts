/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SignInFormLastSignedAccountIdSubscriptionVariables = {};
export type SignInFormLastSignedAccountIdSubscriptionResponse = {
    readonly lastSignedAccountIdUpdated: string | null;
};
export type SignInFormLastSignedAccountIdSubscription = {
    readonly response: SignInFormLastSignedAccountIdSubscriptionResponse;
    readonly variables: SignInFormLastSignedAccountIdSubscriptionVariables;
};



/*
subscription SignInFormLastSignedAccountIdSubscription {
  lastSignedAccountIdUpdated
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
    "name": "SignInFormLastSignedAccountIdSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SignInFormLastSignedAccountIdSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "a86ff286665738c792482746b3134d14",
    "id": null,
    "metadata": {},
    "name": "SignInFormLastSignedAccountIdSubscription",
    "operationKind": "subscription",
    "text": "subscription SignInFormLastSignedAccountIdSubscription {\n  lastSignedAccountIdUpdated\n}\n"
  }
};
})();
(node as any).hash = '3743160922a1cda26d7247077493d8b7';
export default node;
