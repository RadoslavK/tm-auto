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
        readonly id: string;
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
    id
    ...UserAccount
  }
}

fragment UserAccount on UserAccount {
  id
  password
  server
  username
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
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
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
          (v2/*: any*/),
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
          (v2/*: any*/),
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
    "cacheID": "bd301fcbdeb1f9a2d8fd205ba79df5ec",
    "id": null,
    "metadata": {},
    "name": "SignInFormCreateAccountMutation",
    "operationKind": "mutation",
    "text": "mutation SignInFormCreateAccountMutation(\n  $account: AccountInput!\n) {\n  createAccount(account: $account) {\n    id\n    ...UserAccount\n  }\n}\n\nfragment UserAccount on UserAccount {\n  id\n  password\n  server\n  username\n}\n"
  }
};
})();
(node as any).hash = '8f755f7982e8c707c01c414225139709';
export default node;
