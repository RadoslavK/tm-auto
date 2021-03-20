/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type QueuedBuildingsDropAreaCanMoveQueuedBuildingToIndexQueryVariables = {
    villageId: string;
    queueId: string;
    index: number;
    skip: boolean;
};
export type QueuedBuildingsDropAreaCanMoveQueuedBuildingToIndexQueryResponse = {
    readonly canMoveQueuedBuildingToIndex?: boolean;
};
export type QueuedBuildingsDropAreaCanMoveQueuedBuildingToIndexQuery = {
    readonly response: QueuedBuildingsDropAreaCanMoveQueuedBuildingToIndexQueryResponse;
    readonly variables: QueuedBuildingsDropAreaCanMoveQueuedBuildingToIndexQueryVariables;
};



/*
query QueuedBuildingsDropAreaCanMoveQueuedBuildingToIndexQuery(
  $villageId: ID!
  $queueId: ID!
  $index: Int!
  $skip: Boolean!
) {
  canMoveQueuedBuildingToIndex(villageId: $villageId, queueId: $queueId, index: $index) @skip(if: $skip)
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "index"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "queueId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "skip"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "villageId"
},
v4 = [
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
            "name": "index",
            "variableName": "index"
          },
          {
            "kind": "Variable",
            "name": "queueId",
            "variableName": "queueId"
          },
          {
            "kind": "Variable",
            "name": "villageId",
            "variableName": "villageId"
          }
        ],
        "kind": "ScalarField",
        "name": "canMoveQueuedBuildingToIndex",
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
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "QueuedBuildingsDropAreaCanMoveQueuedBuildingToIndexQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "QueuedBuildingsDropAreaCanMoveQueuedBuildingToIndexQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "d0b52955cb33ee0b023a57afed9abc77",
    "id": null,
    "metadata": {},
    "name": "QueuedBuildingsDropAreaCanMoveQueuedBuildingToIndexQuery",
    "operationKind": "query",
    "text": "query QueuedBuildingsDropAreaCanMoveQueuedBuildingToIndexQuery(\n  $villageId: ID!\n  $queueId: ID!\n  $index: Int!\n  $skip: Boolean!\n) {\n  canMoveQueuedBuildingToIndex(villageId: $villageId, queueId: $queueId, index: $index) @skip(if: $skip)\n}\n"
  }
};
})();
(node as any).hash = '42a304699313bc1624e488071ce794f2';
export default node;
