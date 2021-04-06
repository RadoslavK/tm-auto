/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AccountsSubscriptionVariables = {};
export type AccountsSubscriptionResponse = {
    readonly accountsUpdated: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"Accounts_accounts">;
    }>;
};
export type AccountsSubscription = {
    readonly response: AccountsSubscriptionResponse;
    readonly variables: AccountsSubscriptionVariables;
};



/*
subscription AccountsSubscription {
  accountsUpdated {
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
    "name": "AccountsSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserAccount",
        "kind": "LinkedField",
        "name": "accountsUpdated",
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
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AccountsSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserAccount",
        "kind": "LinkedField",
        "name": "accountsUpdated",
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
    "cacheID": "7c90846a50496b1ca8b5ff06b0ed09e6",
    "id": null,
    "metadata": {},
    "name": "AccountsSubscription",
    "operationKind": "subscription",
    "text": "subscription AccountsSubscription {\n  accountsUpdated {\n    ...Accounts_accounts\n    id\n  }\n}\n\nfragment Accounts_accounts on UserAccount {\n  id\n  username\n  server\n}\n"
  }
};
(node as any).hash = 'bf9436bff253647676a877006ae96266';
export default node;
