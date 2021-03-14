/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AccountInput = {
    password: string;
    server: string;
    username: string;
};
export type SignInFormDialogIsAccountTakenQueryVariables = {
    account: AccountInput;
    skip: boolean;
};
export type SignInFormDialogIsAccountTakenQueryResponse = {
    readonly isAccountTaken?: boolean;
};
export type SignInFormDialogIsAccountTakenQuery = {
    readonly response: SignInFormDialogIsAccountTakenQueryResponse;
    readonly variables: SignInFormDialogIsAccountTakenQueryVariables;
};



/*
query SignInFormDialogIsAccountTakenQuery(
  $account: AccountInput!
  $skip: Boolean!
) {
  isAccountTaken(account: $account) @skip(if: $skip)
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "account"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "skip"
  }
],
v1 = [
  {
    "condition": "skip",
    "kind": "Condition",
    "passingValue": false,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "account",
            "variableName": "account"
          }
        ],
        "kind": "ScalarField",
        "name": "isAccountTaken",
        "storageKey": null
      }
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignInFormDialogIsAccountTakenQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignInFormDialogIsAccountTakenQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c80e9c3e234f4155ec1d39736d6e6575",
    "id": null,
    "metadata": {},
    "name": "SignInFormDialogIsAccountTakenQuery",
    "operationKind": "query",
    "text": "query SignInFormDialogIsAccountTakenQuery(\n  $account: AccountInput!\n  $skip: Boolean!\n) {\n  isAccountTaken(account: $account) @skip(if: $skip)\n}\n"
  }
};
})();
(node as any).hash = '1038c30e10b248aa06a95a154ecc9401';
export default node;
