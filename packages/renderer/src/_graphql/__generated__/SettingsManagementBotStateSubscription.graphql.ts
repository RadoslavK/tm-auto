/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BotState = "InitialScanning" | "None" | "Paused" | "Running" | "Stopping";
export type SettingsManagementBotStateSubscriptionVariables = {};
export type SettingsManagementBotStateSubscriptionResponse = {
    readonly botStateChanged: BotState;
};
export type SettingsManagementBotStateSubscription = {
    readonly response: SettingsManagementBotStateSubscriptionResponse;
    readonly variables: SettingsManagementBotStateSubscriptionVariables;
};



/*
subscription SettingsManagementBotStateSubscription {
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
    "name": "SettingsManagementBotStateSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SettingsManagementBotStateSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "06e8d41cb6a6e7f3cab3954b9d850142",
    "id": null,
    "metadata": {},
    "name": "SettingsManagementBotStateSubscription",
    "operationKind": "subscription",
    "text": "subscription SettingsManagementBotStateSubscription {\n  botStateChanged\n}\n"
  }
};
})();
(node as any).hash = '8e519badd7e5e55e93105fe4806abc14';
export default node;
