/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BotState = "InitialScanning" | "None" | "Paused" | "Running" | "Stopping";
export type MapSearchBotSubscriptionVariables = {};
export type MapSearchBotSubscriptionResponse = {
    readonly botStateChanged: BotState;
};
export type MapSearchBotSubscription = {
    readonly response: MapSearchBotSubscriptionResponse;
    readonly variables: MapSearchBotSubscriptionVariables;
};



/*
subscription MapSearchBotSubscription {
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
    "name": "MapSearchBotSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MapSearchBotSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "0c51c2dc5be59162a927a1f1ea2eaf6e",
    "id": null,
    "metadata": {},
    "name": "MapSearchBotSubscription",
    "operationKind": "subscription",
    "text": "subscription MapSearchBotSubscription {\n  botStateChanged\n}\n"
  }
};
})();
(node as any).hash = 'c73c052b0f5b5f2c3e663eb151f729e1';
export default node;
