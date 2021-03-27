/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BuildingsSelectedVillageIdQueryVariables = {};
export type BuildingsSelectedVillageIdQueryResponse = {
    readonly __typename: string;
    readonly selectedVillageId: string;
};
export type BuildingsSelectedVillageIdQuery = {
    readonly response: BuildingsSelectedVillageIdQueryResponse;
    readonly variables: BuildingsSelectedVillageIdQueryVariables;
};



/*
query BuildingsSelectedVillageIdQuery {
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
    "name": "BuildingsSelectedVillageIdQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "BuildingsSelectedVillageIdQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "5ce2863701bbbeac9dc6b96fbbf6620e",
    "id": null,
    "metadata": {},
    "name": "BuildingsSelectedVillageIdQuery",
    "operationKind": "query",
    "text": "query BuildingsSelectedVillageIdQuery {\n  __typename\n}\n"
  }
};
})();
(node as any).hash = '202bbadce78ea33265fdd2fa15a989c0';
export default node;
