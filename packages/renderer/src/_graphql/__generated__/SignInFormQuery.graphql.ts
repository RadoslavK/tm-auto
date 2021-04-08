/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SignInFormQueryVariables = {};
export type SignInFormQueryResponse = {
    readonly lastSignedAccountId: string | null;
};
export type SignInFormQuery = {
    readonly response: SignInFormQueryResponse;
    readonly variables: SignInFormQueryVariables;
};



/*
query SignInFormQuery {
  lastSignedAccountId
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "lastSignedAccountId",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SignInFormQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SignInFormQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "f685ab3242f67f9829a804b6e46627bc",
    "id": null,
    "metadata": {},
    "name": "SignInFormQuery",
    "operationKind": "query",
    "text": "query SignInFormQuery {\n  lastSignedAccountId\n}\n"
  }
};
})();
(node as any).hash = '6c45157309b8bd0a57d2dbbb56473e99';
export default node;
