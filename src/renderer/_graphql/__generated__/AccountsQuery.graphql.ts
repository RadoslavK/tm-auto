/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AccountsQueryVariables = {};
export type AccountsQueryResponse = {
    readonly accounts: ReadonlyArray<{
        readonly id: string;
        readonly username: string;
        readonly server: string;
    }>;
};
export type AccountsQuery = {
    readonly response: AccountsQueryResponse;
    readonly variables: AccountsQueryVariables;
};



/*
query AccountsQuery {
  accounts {
    id
    username
    server
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "UserAccount",
    "kind": "LinkedField",
    "name": "accounts",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "username",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "server",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AccountsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AccountsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "9d124d823a239d6e723f8f17672814d7",
    "id": null,
    "metadata": {},
    "name": "AccountsQuery",
    "operationKind": "query",
    "text": "query AccountsQuery {\n  accounts {\n    id\n    username\n    server\n  }\n}\n"
  }
};
})();
(node as any).hash = '342feaf734a6163ebe5c41425894bd65';
export default node;
