/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type PartiesQueryVariables = {};
export type PartiesQueryResponse = {
    readonly __typename: string;
    readonly selectedVillageId: string;
};
export type PartiesQuery = {
    readonly response: PartiesQueryResponse;
    readonly variables: PartiesQueryVariables;
};



/*
query PartiesQuery {
  __typename
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "__typename",
    "storageKey": null
  },
  {
    "kind": "ClientExtension",
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "selectedVillageId",
        "storageKey": null
      }
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PartiesQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PartiesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "e96a35fd772ded398842b4815c38bfc8",
    "id": null,
    "metadata": {},
    "name": "PartiesQuery",
    "operationKind": "query",
    "text": "query PartiesQuery {\n  __typename\n}\n"
  }
};
})();
(node as any).hash = 'fa5f027569faf008f9d2aa913c204893';
export default node;
