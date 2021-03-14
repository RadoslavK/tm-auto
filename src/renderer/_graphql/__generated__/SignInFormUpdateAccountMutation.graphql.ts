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
    "cacheID": "ee05c8c598a007827615d3a2ace43088",
    "id": null,
    "metadata": {},
    "name": "SignInFormUpdateAccountMutation",
    "operationKind": "mutation",
    "text": "mutation SignInFormUpdateAccountMutation(\n  $id: ID!\n  $account: AccountInput!\n) {\n  updateAccount(id: $id, account: $account) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c7002f871dbbca415fcc7463157f83da';
export default node;
