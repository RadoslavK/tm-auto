/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SignInFormDialogQueryVariables = {
    id: string;
};
export type SignInFormDialogQueryResponse = {
    readonly account: {
        readonly password: string;
        readonly server: string;
        readonly username: string;
    };
};
export type SignInFormDialogQuery = {
    readonly response: SignInFormDialogQueryResponse;
    readonly variables: SignInFormDialogQueryVariables;
};



/*
query SignInFormDialogQuery(
  $id: ID!
) {
  account(id: $id) {
    password
    server
    username
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "password",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "server",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignInFormDialogQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UserAccount",
        "kind": "LinkedField",
        "name": "account",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignInFormDialogQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UserAccount",
        "kind": "LinkedField",
        "name": "account",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
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
    "cacheID": "d55c0cf0ba3959f10040628ef1d5e3db",
    "id": null,
    "metadata": {},
    "name": "SignInFormDialogQuery",
    "operationKind": "query",
    "text": "query SignInFormDialogQuery(\n  $id: ID!\n) {\n  account(id: $id) {\n    password\n    server\n    username\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '20dd0cbd3a8f4a618f943249d30e2456';
export default node;
