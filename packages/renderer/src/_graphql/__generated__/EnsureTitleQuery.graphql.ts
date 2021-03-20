/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type EnsureTitleQueryVariables = {};
export type EnsureTitleQueryResponse = {
    readonly currentAccount: {
        readonly server: string;
        readonly username: string;
    };
};
export type EnsureTitleQuery = {
    readonly response: EnsureTitleQueryResponse;
    readonly variables: EnsureTitleQueryVariables;
};



/*
query EnsureTitleQuery {
  currentAccount {
    server
    username
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "server",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "EnsureTitleQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserAccount",
        "kind": "LinkedField",
        "name": "currentAccount",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "EnsureTitleQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserAccount",
        "kind": "LinkedField",
        "name": "currentAccount",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ddba2c689aeb9850f55f3635ab6e9e84",
    "id": null,
    "metadata": {},
    "name": "EnsureTitleQuery",
    "operationKind": "query",
    "text": "query EnsureTitleQuery {\n  currentAccount {\n    server\n    username\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '5ac8b8009b64e67d6bcbc79e74fdfbe0';
export default node;
