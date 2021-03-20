/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
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
  }
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "account",
        "variableName": "account"
      }
    ],
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
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignInFormCreateAccountMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignInFormCreateAccountMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "71a6edb51391eb3d702574f281fd4928",
    "id": null,
    "metadata": {},
    "name": "SignInFormCreateAccountMutation",
    "operationKind": "mutation",
    "text": "mutation SignInFormCreateAccountMutation(\n  $account: AccountInput!\n) {\n  createAccount(account: $account) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c32cab3e35ff39a9a59c8b994fbb6fc0';
export default node;
