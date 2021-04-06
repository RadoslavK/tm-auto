/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
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
        readonly id: string;
        readonly password: string;
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
    id
    password
  }
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
    "alias": null,
    "args": [
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
    ],
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
        "name": "password",
        "storageKey": null
      }
    ],
    "storageKey": null
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
    "selections": (v2/*: any*/),
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
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "e2f718dba4429a83f9d7df5422396307",
    "id": null,
    "metadata": {},
    "name": "SignInFormUpdateAccountMutation",
    "operationKind": "mutation",
    "text": "mutation SignInFormUpdateAccountMutation(\n  $id: ID!\n  $account: AccountInput!\n) {\n  updateAccount(id: $id, account: $account) {\n    id\n    password\n  }\n}\n"
  }
};
})();
(node as any).hash = '9a4b6b7b62b204b5e4c812bd268ff463';
export default node;
