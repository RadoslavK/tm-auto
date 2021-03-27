/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type VillageSelectedVillageIdQueryVariables = {};
export type VillageSelectedVillageIdQueryResponse = {
    readonly __typename: string;
    readonly selectedVillageId: string;
};
export type VillageSelectedVillageIdQuery = {
    readonly response: VillageSelectedVillageIdQueryResponse;
    readonly variables: VillageSelectedVillageIdQueryVariables;
};



/*
query VillageSelectedVillageIdQuery {
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
    "name": "VillageSelectedVillageIdQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "VillageSelectedVillageIdQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "1e49301858e963cf2b7ed4a920ac6594",
    "id": null,
    "metadata": {},
    "name": "VillageSelectedVillageIdQuery",
    "operationKind": "query",
    "text": "query VillageSelectedVillageIdQuery {\n  __typename\n}\n"
  }
};
})();
(node as any).hash = 'b4b4c3d35afeedae61da4cb1dcc8156c';
export default node;
