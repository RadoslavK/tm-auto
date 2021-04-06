/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AccountsQueryVariables = {};
export type AccountsQueryResponse = {
    readonly accounts: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"Accounts_accounts">;
    }>;
};
export type AccountsQuery = {
    readonly response: AccountsQueryResponse;
    readonly variables: AccountsQueryVariables;
};



/*
query AccountsQuery {
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

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AccountsQuery",
    "selections": [
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
    "name": "AccountsQuery",
    "selections": [
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
    "cacheID": "054dc41aadcab8a7cffb4ffffcf8efd3",
    "id": null,
    "metadata": {},
    "name": "AccountsQuery",
    "operationKind": "query",
    "text": "query AccountsQuery {\n  accounts {\n    ...Accounts_accounts\n    id\n  }\n}\n\nfragment Accounts_accounts on UserAccount {\n  id\n  username\n  server\n}\n"
  }
};
(node as any).hash = 'fa902f4fc906150f9d9cf7b9861b2bac';
export default node;
