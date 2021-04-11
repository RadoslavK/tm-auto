/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SignInFormQueryVariables = {};
export type SignInFormQueryResponse = {
    readonly lastSignedAccountId: string | null;
    readonly accounts: ReadonlyArray<{
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
    ...Accounts_accounts
    id
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
    ]
  },
  "params": {
    "cacheID": "c2166517e3d581c17909bb01b9d0225a",
    "id": null,
    "metadata": {},
    "name": "SignInFormQuery",
    "operationKind": "query",
    "text": "query SignInFormQuery {\n  lastSignedAccountId\n  accounts {\n    ...Accounts_accounts\n    id\n  }\n}\n\nfragment Accounts_accounts on UserAccount {\n  id\n  username\n  server\n}\n"
  }
};
})();
(node as any).hash = '26c99adabda21434feca986a56d80a8a';
export default node;
