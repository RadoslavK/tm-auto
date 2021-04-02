/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BotState = "None" | "Paused" | "Pending" | "Running" | "Stopping";
export type SignInFormQueryVariables = {};
export type SignInFormQueryResponse = {
    readonly botState: BotState;
    readonly lastSignedAccountId: string | null;
};
export type SignInFormQuery = {
    readonly response: SignInFormQueryResponse;
    readonly variables: SignInFormQueryVariables;
};



/*
query SignInFormQuery {
  botState
  lastSignedAccountId
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
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "lastSignedAccountId",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SignInFormQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SignInFormQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "2cddbe56a6d9f2bace645207b9f5d28a",
    "id": null,
    "metadata": {},
    "name": "SignInFormQuery",
    "operationKind": "query",
    "text": "query SignInFormQuery {\n  botState\n  lastSignedAccountId\n}\n"
  }
};
})();
(node as any).hash = 'bff2abefc272a03b35cbedcc85fe1b5b';
export default node;
