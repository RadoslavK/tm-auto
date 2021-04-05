/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SignInFormDeleteAccountMutationVariables = {
    id: string;
};
export type SignInFormDeleteAccountMutationResponse = {
    readonly deleteAccount: {
        readonly id: string;
    };
};
export type SignInFormDeleteAccountMutation = {
    readonly response: SignInFormDeleteAccountMutationResponse;
    readonly variables: SignInFormDeleteAccountMutationVariables;
};



/*
mutation SignInFormDeleteAccountMutation(
  $id: ID!
) {
  deleteAccount(id: $id) {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "UserAccount",
    "kind": "LinkedField",
    "name": "deleteAccount",
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
    "name": "SignInFormDeleteAccountMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignInFormDeleteAccountMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "555c09a4677c6083ae06a215c765f1ad",
    "id": null,
    "metadata": {},
    "name": "SignInFormDeleteAccountMutation",
    "operationKind": "mutation",
    "text": "mutation SignInFormDeleteAccountMutation(\n  $id: ID!\n) {\n  deleteAccount(id: $id) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '717631a920db4d7683055c6e17badfbd';
export default node;
