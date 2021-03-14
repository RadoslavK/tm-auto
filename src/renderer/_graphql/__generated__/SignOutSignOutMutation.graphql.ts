/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SignOutSignOutMutationVariables = {};
export type SignOutSignOutMutationResponse = {
    readonly signOut: boolean | null;
};
export type SignOutSignOutMutation = {
    readonly response: SignOutSignOutMutationResponse;
    readonly variables: SignOutSignOutMutationVariables;
};



/*
mutation SignOutSignOutMutation {
  signOut
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "signOut",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SignOutSignOutMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SignOutSignOutMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "6fbc44637dcfdbcc45b591ca6a2454d3",
    "id": null,
    "metadata": {},
    "name": "SignOutSignOutMutation",
    "operationKind": "mutation",
    "text": "mutation SignOutSignOutMutation {\n  signOut\n}\n"
  }
};
})();
(node as any).hash = '389e360bdb4ed8692d9f45477d8e25cf';
export default node;
