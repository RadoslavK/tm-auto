/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AccountsSubscriptionVariables = {};
export type AccountsSubscriptionResponse = {
    readonly accountsUpdated: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"UserAccount">;
    }>;
};
export type AccountsSubscription = {
    readonly response: AccountsSubscriptionResponse;
    readonly variables: AccountsSubscriptionVariables;
};



/*
subscription AccountsSubscription {
  accountsUpdated {
    ...UserAccount
    id
  }
}

fragment UserAccount on UserAccount {
  id
  password
  server
  username
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
            "name": "UserAccount"
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
            "name": "password",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "server",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "username",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ca844bcce0746ca0dd146b3c008e686e",
    "id": null,
    "metadata": {},
    "name": "AccountsSubscription",
    "operationKind": "subscription",
    "text": "subscription AccountsSubscription {\n  accountsUpdated {\n    ...UserAccount\n    id\n  }\n}\n\nfragment UserAccount on UserAccount {\n  id\n  password\n  server\n  username\n}\n"
  }
};
(node as any).hash = 'fd6bbc0a2cb72238c980246a7ac3d057';
export default node;
