/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BotState = "InitialScanning" | "None" | "Paused" | "Running" | "Stopping";
export type SettingsManagementBotStateQueryVariables = {};
export type SettingsManagementBotStateQueryResponse = {
    readonly botState: BotState;
};
export type SettingsManagementBotStateQuery = {
    readonly response: SettingsManagementBotStateQueryResponse;
    readonly variables: SettingsManagementBotStateQueryVariables;
};



/*
query SettingsManagementBotStateQuery {
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
    "name": "SettingsManagementBotStateQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SettingsManagementBotStateQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "1efd53a7d5885ecc7b1001da6d16bafe",
    "id": null,
    "metadata": {},
    "name": "SettingsManagementBotStateQuery",
    "operationKind": "query",
    "text": "query SettingsManagementBotStateQuery {\n  botState\n}\n"
  }
};
})();
(node as any).hash = 'a7f8eb273d158bd6faf66c531fa588ab';
export default node;
