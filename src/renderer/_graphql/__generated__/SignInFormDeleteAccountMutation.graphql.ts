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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
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
    "name": "SignInFormDeleteAccountMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UserAccount",
        "kind": "LinkedField",
        "name": "deleteAccount",
        "plural": false,
        "selections": [
          (v2/*: any*/)
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
    "name": "SignInFormDeleteAccountMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UserAccount",
        "kind": "LinkedField",
        "name": "deleteAccount",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "deleteRecord",
            "key": "",
            "kind": "ScalarHandle",
            "name": "id"
          }
        ],
        "storageKey": null
      }
    ]
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
(node as any).hash = '7c3e93b40566c7cf4482c7ec94c198c5';
export default node;
