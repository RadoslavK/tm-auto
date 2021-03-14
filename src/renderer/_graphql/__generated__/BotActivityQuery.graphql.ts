/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BotActivityQueryVariables = {};
export type BotActivityQueryResponse = {
    readonly isBotActive: boolean;
};
export type BotActivityQuery = {
    readonly response: BotActivityQueryResponse;
    readonly variables: BotActivityQueryVariables;
};



/*
query BotActivityQuery {
  isBotActive
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isBotActive",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "BotActivityQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "BotActivityQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "bad729505461554f87e882dfeef345a2",
    "id": null,
    "metadata": {},
    "name": "BotActivityQuery",
    "operationKind": "query",
    "text": "query BotActivityQuery {\n  isBotActive\n}\n"
  }
};
})();
(node as any).hash = 'ec9e0d29229df8075d584a8cfbe2d84a';
export default node;
