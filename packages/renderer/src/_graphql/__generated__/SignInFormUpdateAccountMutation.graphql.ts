/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AccountInput = {
    password: string;
    server: string;
    username: string;
};
export type SignInFormUpdateAccountMutationVariables = {
    id: string;
    account: AccountInput;
};
export type SignInFormUpdateAccountMutationResponse = {
    readonly updateAccount: {
        readonly " $fragmentRefs": FragmentRefs<"UserAccount">;
    };
};
export type SignInFormUpdateAccountMutation = {
    readonly response: SignInFormUpdateAccountMutationResponse;
    readonly variables: SignInFormUpdateAccountMutationVariables;
};



/*
mutation SignInFormUpdateAccountMutation(
  $id: ID!
  $account: AccountInput!
) {
  updateAccount(id: $id, account: $account) {
    ...UserAccount
    id
  }
}

fragment UserAccount on UserAccount {
  id
  username
  password
  server
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "account"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = [
  {
    "kind": "Variable",
    "name": "account",
    "variableName": "account"
  },
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SignInFormUpdateAccountMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "UserAccount",
        "kind": "LinkedField",
        "name": "updateAccount",
        "plural": false,
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "SignInFormUpdateAccountMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "UserAccount",
        "kind": "LinkedField",
        "name": "updateAccount",
        "plural": false,
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
            "name": "password",
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
    "cacheID": "fa16c88ff67c181a69dce4254673e8fe",
    "id": null,
    "metadata": {},
    "name": "SignInFormUpdateAccountMutation",
    "operationKind": "mutation",
    "text": "mutation SignInFormUpdateAccountMutation(\n  $id: ID!\n  $account: AccountInput!\n) {\n  updateAccount(id: $id, account: $account) {\n    ...UserAccount\n    id\n  }\n}\n\nfragment UserAccount on UserAccount {\n  id\n  username\n  password\n  server\n}\n"
  }
};
})();
(node as any).hash = '5f6372b75e4de2be5fc48c531917f90d';
export default node;
