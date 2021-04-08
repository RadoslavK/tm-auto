/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BotState = "InitialScanning" | "None" | "Paused" | "Running" | "Stopping";
export type HeroBotStateQueryVariables = {};
export type HeroBotStateQueryResponse = {
    readonly botState: BotState;
};
export type HeroBotStateQuery = {
    readonly response: HeroBotStateQueryResponse;
    readonly variables: HeroBotStateQueryVariables;
};



/*
query HeroBotStateQuery {
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
    "name": "HeroBotStateQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HeroBotStateQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "23fbc2dbc5f5727467caa55ae47620cd",
    "id": null,
    "metadata": {},
    "name": "HeroBotStateQuery",
    "operationKind": "query",
    "text": "query HeroBotStateQuery {\n  botState\n}\n"
  }
};
})();
(node as any).hash = '810743322757fbffecb534ea35678905';
export default node;
