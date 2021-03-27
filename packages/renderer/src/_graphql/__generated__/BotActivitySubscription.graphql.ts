/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BotActivitySubscriptionVariables = {};
export type BotActivitySubscriptionResponse = {
    readonly botActivityChanged: boolean;
};
export type BotActivitySubscription = {
    readonly response: BotActivitySubscriptionResponse;
    readonly variables: BotActivitySubscriptionVariables;
};



/*
subscription BotActivitySubscription {
  botActivityChanged
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "botActivityChanged",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "BotActivitySubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "BotActivitySubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "2ca82b8defbee72a54cebb5eb7ec782c",
    "id": null,
    "metadata": {},
    "name": "BotActivitySubscription",
    "operationKind": "subscription",
    "text": "subscription BotActivitySubscription {\n  botActivityChanged\n}\n"
  }
};
})();
(node as any).hash = '0a480c99c583475e083be76b1f92f914';
export default node;
