/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type VillagesActiveVillageIdQueryVariables = {};
export type VillagesActiveVillageIdQueryResponse = {
    readonly activeVillageId: string;
};
export type VillagesActiveVillageIdQuery = {
    readonly response: VillagesActiveVillageIdQueryResponse;
    readonly variables: VillagesActiveVillageIdQueryVariables;
};



/*
query VillagesActiveVillageIdQuery {
  activeVillageId
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "activeVillageId",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "VillagesActiveVillageIdQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "VillagesActiveVillageIdQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "df1ca9a4b5344dd883989e693a187841",
    "id": null,
    "metadata": {},
    "name": "VillagesActiveVillageIdQuery",
    "operationKind": "query",
    "text": "query VillagesActiveVillageIdQuery {\n  activeVillageId\n}\n"
  }
};
})();
(node as any).hash = '254e7b578828d28536b38fd4ff67e4ff';
export default node;
