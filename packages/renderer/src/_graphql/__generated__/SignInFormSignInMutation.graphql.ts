/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SignInFormSignInMutationVariables = {
    accountId: string;
};
export type SignInFormSignInMutationResponse = {
    readonly signIn: boolean | null;
};
export type SignInFormSignInMutation = {
    readonly response: SignInFormSignInMutationResponse;
    readonly variables: SignInFormSignInMutationVariables;
};



/*
mutation SignInFormSignInMutation(
  $accountId: ID!
) {
  signIn(accountId: $accountId)
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "accountId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "accountId",
        "variableName": "accountId"
      }
    ],
    "kind": "ScalarField",
    "name": "signIn",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignInFormSignInMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignInFormSignInMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9c557eab583131f873524f65a22c4d58",
    "id": null,
    "metadata": {},
    "name": "SignInFormSignInMutation",
    "operationKind": "mutation",
    "text": "mutation SignInFormSignInMutation(\n  $accountId: ID!\n) {\n  signIn(accountId: $accountId)\n}\n"
  }
};
})();
(node as any).hash = 'e53489b599e2e0aae22cd4104e701f52';
export default node;
