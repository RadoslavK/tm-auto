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
export type SignInFormCreateAccountMutationVariables = {
    account: AccountInput;
};
export type SignInFormCreateAccountMutationResponse = {
    readonly createAccount: {
        readonly " $fragmentRefs": FragmentRefs<"UserAccount">;
    };
};
export type SignInFormCreateAccountMutation = {
    readonly response: SignInFormCreateAccountMutationResponse;
    readonly variables: SignInFormCreateAccountMutationVariables;
};



/*
mutation SignInFormCreateAccountMutation(
  $account: AccountInput!
) {
  createAccount(account: $account) {
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "account"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "account",
    "variableName": "account"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignInFormCreateAccountMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UserAccount",
        "kind": "LinkedField",
        "name": "createAccount",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignInFormCreateAccountMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UserAccount",
        "kind": "LinkedField",
        "name": "createAccount",
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
    "cacheID": "1ec97102a4bddcca3cabd2fcfb6d1aff",
    "id": null,
    "metadata": {},
    "name": "SignInFormCreateAccountMutation",
    "operationKind": "mutation",
    "text": "mutation SignInFormCreateAccountMutation(\n  $account: AccountInput!\n) {\n  createAccount(account: $account) {\n    ...UserAccount\n    id\n  }\n}\n\nfragment UserAccount on UserAccount {\n  id\n  username\n  password\n  server\n}\n"
  }
};
})();
(node as any).hash = '407aeffc3c994a2626b4d18c4d94d7dd';
export default node;
