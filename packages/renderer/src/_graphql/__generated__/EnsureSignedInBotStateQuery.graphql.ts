/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BotState = "InitialScanning" | "None" | "Paused" | "Running" | "Stopping";
export type EnsureSignedInBotStateQueryVariables = {};
export type EnsureSignedInBotStateQueryResponse = {
    readonly botState: BotState;
};
export type EnsureSignedInBotStateQuery = {
    readonly response: EnsureSignedInBotStateQueryResponse;
    readonly variables: EnsureSignedInBotStateQueryVariables;
};



/*
query EnsureSignedInBotStateQuery {
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
    "name": "EnsureSignedInBotStateQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "EnsureSignedInBotStateQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "5ab70a506afaf7ca9c359baa87765bdc",
    "id": null,
    "metadata": {},
    "name": "EnsureSignedInBotStateQuery",
    "operationKind": "query",
    "text": "query EnsureSignedInBotStateQuery {\n  botState\n}\n"
  }
};
})();
(node as any).hash = '1f8ad40cd48393e6fd92772ed025d900';
export default node;
