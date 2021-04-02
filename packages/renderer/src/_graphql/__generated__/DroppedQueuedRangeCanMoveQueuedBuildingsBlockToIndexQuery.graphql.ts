/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type DroppedQueuedRangeCanMoveQueuedBuildingsBlockToIndexQueryVariables = {
    villageId: string;
    topBuildingQueueId: string;
    bottomBuildingQueueId: string;
    index: number;
};
export type DroppedQueuedRangeCanMoveQueuedBuildingsBlockToIndexQueryResponse = {
    readonly canMoveQueuedBuildingsBlockToIndex: boolean;
};
export type DroppedQueuedRangeCanMoveQueuedBuildingsBlockToIndexQuery = {
    readonly response: DroppedQueuedRangeCanMoveQueuedBuildingsBlockToIndexQueryResponse;
    readonly variables: DroppedQueuedRangeCanMoveQueuedBuildingsBlockToIndexQueryVariables;
};



/*
query DroppedQueuedRangeCanMoveQueuedBuildingsBlockToIndexQuery(
  $villageId: ID!
  $topBuildingQueueId: ID!
  $bottomBuildingQueueId: ID!
  $index: Int!
) {
  canMoveQueuedBuildingsBlockToIndex(villageId: $villageId, topBuildingQueueId: $topBuildingQueueId, bottomBuildingQueueId: $bottomBuildingQueueId, index: $index)
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "bottomBuildingQueueId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "index"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topBuildingQueueId"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "villageId"
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "bottomBuildingQueueId",
        "variableName": "bottomBuildingQueueId"
      },
      {
        "kind": "Variable",
        "name": "index",
        "variableName": "index"
      },
      {
        "kind": "Variable",
        "name": "topBuildingQueueId",
        "variableName": "topBuildingQueueId"
      },
      {
        "kind": "Variable",
        "name": "villageId",
        "variableName": "villageId"
      }
    ],
    "kind": "ScalarField",
    "name": "canMoveQueuedBuildingsBlockToIndex",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DroppedQueuedRangeCanMoveQueuedBuildingsBlockToIndexQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "DroppedQueuedRangeCanMoveQueuedBuildingsBlockToIndexQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "26a23f5191001887bf009edb714871cc",
    "id": null,
    "metadata": {},
    "name": "DroppedQueuedRangeCanMoveQueuedBuildingsBlockToIndexQuery",
    "operationKind": "query",
    "text": "query DroppedQueuedRangeCanMoveQueuedBuildingsBlockToIndexQuery(\n  $villageId: ID!\n  $topBuildingQueueId: ID!\n  $bottomBuildingQueueId: ID!\n  $index: Int!\n) {\n  canMoveQueuedBuildingsBlockToIndex(villageId: $villageId, topBuildingQueueId: $topBuildingQueueId, bottomBuildingQueueId: $bottomBuildingQueueId, index: $index)\n}\n"
  }
};
})();
(node as any).hash = '6c7cce8cd0bbaa18c6bdc17a757ae62a';
export default node;
