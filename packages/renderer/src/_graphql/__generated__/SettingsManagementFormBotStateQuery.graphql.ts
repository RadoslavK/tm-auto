/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BotState = "InitialScanning" | "None" | "Paused" | "Running" | "Stopping";
export type SettingsManagementFormBotStateQueryVariables = {};
export type SettingsManagementFormBotStateQueryResponse = {
    readonly botState: BotState;
};
export type SettingsManagementFormBotStateQuery = {
    readonly response: SettingsManagementFormBotStateQueryResponse;
    readonly variables: SettingsManagementFormBotStateQueryVariables;
};



/*
query SettingsManagementFormBotStateQuery {
  botState
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "botState",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsManagementFormBotStateQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SettingsManagementFormBotStateQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "f655d25b60e7026aa6edab7b9a9b4255",
    "id": null,
    "metadata": {},
    "name": "SettingsManagementFormBotStateQuery",
    "operationKind": "query",
    "text": "query SettingsManagementFormBotStateQuery {\n  botState\n}\n"
  }
};
})();
(node as any).hash = '1f326b50d20221805b2b3d2befd0bf9f';
export default node;
