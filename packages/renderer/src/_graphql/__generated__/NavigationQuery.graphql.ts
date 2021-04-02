/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BotState = "None" | "Paused" | "Pending" | "Running" | "Stopping";
export type NavigationQueryVariables = {};
export type NavigationQueryResponse = {
    readonly botState: BotState;
};
export type NavigationQuery = {
    readonly response: NavigationQueryResponse;
    readonly variables: NavigationQueryVariables;
};



/*
query NavigationQuery {
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
    "name": "NavigationQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NavigationQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "9c313394283bde1f04159f63ebc48214",
    "id": null,
    "metadata": {},
    "name": "NavigationQuery",
    "operationKind": "query",
    "text": "query NavigationQuery {\n  botState\n}\n"
  }
};
})();
(node as any).hash = '4f9b7fbc067ea03a026263e5ff42e181';
export default node;
