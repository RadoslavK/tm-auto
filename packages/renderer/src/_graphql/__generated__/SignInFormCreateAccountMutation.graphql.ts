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
        readonly " $fragmentRefs": FragmentRefs<"Accounts_account">;
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
    ...Accounts_account
  }
}

fragment Accounts_account on UserAccount {
  id
  username
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
            "name": "Accounts_account"
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
    "cacheID": "13fc3d82c330b6afe86725bf91ffede1",
    "id": null,
    "metadata": {},
    "name": "SignInFormCreateAccountMutation",
    "operationKind": "mutation",
    "text": "mutation SignInFormCreateAccountMutation(\n  $account: AccountInput!\n) {\n  createAccount(account: $account) {\n    id\n    ...Accounts_account\n  }\n}\n\nfragment Accounts_account on UserAccount {\n  id\n  username\n  server\n}\n"
  }
};
})();
(node as any).hash = '0ab19a5ea9da050635c5f78f33f96df9';
export default node;
