/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type QueuedBuildingsDropAreaCanMoveQueuedBuildingsBlockToIndexQueryVariables = {
    villageId: string;
    topBuildingQueueId: string;
    bottomBuildingQueueId: string;
    index: number;
    skip: boolean;
};
export type QueuedBuildingsDropAreaCanMoveQueuedBuildingsBlockToIndexQueryResponse = {
    readonly canMoveQueuedBuildingsBlockToIndex?: boolean;
};
export type QueuedBuildingsDropAreaCanMoveQueuedBuildingsBlockToIndexQuery = {
    readonly response: QueuedBuildingsDropAreaCanMoveQueuedBuildingsBlockToIndexQueryResponse;
    readonly variables: QueuedBuildingsDropAreaCanMoveQueuedBuildingsBlockToIndexQueryVariables;
};



/*
query QueuedBuildingsDropAreaCanMoveQueuedBuildingsBlockToIndexQuery(
  $villageId: ID!
  $topBuildingQueueId: ID!
  $bottomBuildingQueueId: ID!
  $index: Int!
  $skip: Boolean!
) {
  canMoveQueuedBuildingsBlockToIndex(villageId: $villageId, topBuildingQueueId: $topBuildingQueueId, bottomBuildingQueueId: $bottomBuildingQueueId, index: $index) @skip(if: $skip)
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
  "name": "skip"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topBuildingQueueId"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "villageId"
},
v5 = [
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
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "QueuedBuildingsDropAreaCanMoveQueuedBuildingsBlockToIndexQuery",
    "selections": (v5/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v4/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "QueuedBuildingsDropAreaCanMoveQueuedBuildingsBlockToIndexQuery",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "536055d31fe3aeabb6c6d1c38c121810",
    "id": null,
    "metadata": {},
    "name": "QueuedBuildingsDropAreaCanMoveQueuedBuildingsBlockToIndexQuery",
    "operationKind": "query",
    "text": "query QueuedBuildingsDropAreaCanMoveQueuedBuildingsBlockToIndexQuery(\n  $villageId: ID!\n  $topBuildingQueueId: ID!\n  $bottomBuildingQueueId: ID!\n  $index: Int!\n  $skip: Boolean!\n) {\n  canMoveQueuedBuildingsBlockToIndex(villageId: $villageId, topBuildingQueueId: $topBuildingQueueId, bottomBuildingQueueId: $bottomBuildingQueueId, index: $index) @skip(if: $skip)\n}\n"
  }
};
})();
(node as any).hash = '5dccb047f96dea39e868c13ab348b1b0';
export default node;
