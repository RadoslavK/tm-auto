/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AccountsSubscriptionVariables = {};
export type AccountsSubscriptionResponse = {
    readonly accountsUpdated: ReadonlyArray<{
        readonly id: string;
        readonly username: string;
        readonly server: string;
    }>;
};
export type AccountsSubscription = {
    readonly response: AccountsSubscriptionResponse;
    readonly variables: AccountsSubscriptionVariables;
};



/*
subscription AccountsSubscription {
  accountsUpdated {
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AccountsSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AccountsSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "159de5e49869210a6fb53e6133f5c0df",
    "id": null,
    "metadata": {},
    "name": "AccountsSubscription",
    "operationKind": "subscription",
    "text": "subscription AccountsSubscription {\n  accountsUpdated {\n    id\n    username\n    server\n  }\n}\n"
  }
};
})();
(node as any).hash = '0aa6f765d5cef73df07e1af4ffbf65a9';
export default node;
