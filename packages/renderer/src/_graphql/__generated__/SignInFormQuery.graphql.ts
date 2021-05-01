/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SignInFormQueryVariables = {};
export type SignInFormQueryResponse = {
    readonly lastSignedAccountId: string | null;
    readonly accounts: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"Accounts_accounts">;
    }>;
};
export type SignInFormQuery = {
    readonly response: SignInFormQueryResponse;
    readonly variables: SignInFormQueryVariables;
};



/*
query SignInFormQuery {
  lastSignedAccountId
  accounts {
    id
    ...Accounts_accounts
  }
}

fragment Accounts_accounts on UserAccount {
  id
  username
  server
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastSignedAccountId",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SignInFormQuery",
    "selections": [
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "UserAccount",
        "kind": "LinkedField",
        "name": "accounts",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Accounts_accounts"
          }
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
    "name": "SignInFormQuery",
    "selections": [
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "UserAccount",
        "kind": "LinkedField",
        "name": "accounts",
        "plural": true,
        "selections": [
          (v1/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "8a7aedd25b71602af7f1558f8c9f5048",
    "id": null,
    "metadata": {},
    "name": "SignInFormQuery",
    "operationKind": "query",
    "text": "query SignInFormQuery {\n  lastSignedAccountId\n  accounts {\n    id\n    ...Accounts_accounts\n  }\n}\n\nfragment Accounts_accounts on UserAccount {\n  id\n  username\n  server\n}\n"
  }
};
})();
(node as any).hash = 'caa1bdecd89f0005207eccd282e6f5cb';
export default node;
