/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UnitsQueryVariables = {};
export type UnitsQueryResponse = {
    readonly __typename: string;
    readonly selectedVillageId: string;
};
export type UnitsQuery = {
    readonly response: UnitsQueryResponse;
    readonly variables: UnitsQueryVariables;
};



/*
query UnitsQuery {
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
    "name": "UnitsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UnitsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "2ea6617c764f4eba98548fff483c5fca",
    "id": null,
    "metadata": {},
    "name": "UnitsQuery",
    "operationKind": "query",
    "text": "query UnitsQuery {\n  __typename\n}\n"
  }
};
})();
(node as any).hash = 'e1c0be9e9a7be76e07faf7e1ffa10398';
export default node;
