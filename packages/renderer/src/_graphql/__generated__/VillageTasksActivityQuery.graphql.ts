/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type VillageTasksActivityQueryVariables = {};
export type VillageTasksActivityQueryResponse = {
    readonly __typename: string;
    readonly selectedVillageId: string;
};
export type VillageTasksActivityQuery = {
    readonly response: VillageTasksActivityQueryResponse;
    readonly variables: VillageTasksActivityQueryVariables;
};



/*
query VillageTasksActivityQuery {
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
    "name": "VillageTasksActivityQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "VillageTasksActivityQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "c264bbbbea8bf5261b5c40e1ab484436",
    "id": null,
    "metadata": {},
    "name": "VillageTasksActivityQuery",
    "operationKind": "query",
    "text": "query VillageTasksActivityQuery {\n  __typename\n}\n"
  }
};
})();
(node as any).hash = '3f813f11e6b71225601290bb17fda511';
export default node;
