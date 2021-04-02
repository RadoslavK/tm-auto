/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type DroppedQueuedBuildingCanMoveQueuedBuildingToIndexQueryVariables = {
    villageId: string;
    queueId: string;
    index: number;
};
export type DroppedQueuedBuildingCanMoveQueuedBuildingToIndexQueryResponse = {
    readonly canMoveQueuedBuildingToIndex: boolean;
};
export type DroppedQueuedBuildingCanMoveQueuedBuildingToIndexQuery = {
    readonly response: DroppedQueuedBuildingCanMoveQueuedBuildingToIndexQueryResponse;
    readonly variables: DroppedQueuedBuildingCanMoveQueuedBuildingToIndexQueryVariables;
};



/*
query DroppedQueuedBuildingCanMoveQueuedBuildingToIndexQuery(
  $villageId: ID!
  $queueId: ID!
  $index: Int!
) {
  canMoveQueuedBuildingToIndex(villageId: $villageId, queueId: $queueId, index: $index)
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
  "name": "villageId"
},
v3 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DroppedQueuedBuildingCanMoveQueuedBuildingToIndexQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "DroppedQueuedBuildingCanMoveQueuedBuildingToIndexQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "3c243c62afc73cb8565fa89507a9fe81",
    "id": null,
    "metadata": {},
    "name": "DroppedQueuedBuildingCanMoveQueuedBuildingToIndexQuery",
    "operationKind": "query",
    "text": "query DroppedQueuedBuildingCanMoveQueuedBuildingToIndexQuery(\n  $villageId: ID!\n  $queueId: ID!\n  $index: Int!\n) {\n  canMoveQueuedBuildingToIndex(villageId: $villageId, queueId: $queueId, index: $index)\n}\n"
  }
};
})();
(node as any).hash = '8bb2e6a8c9e8746b048cde3f6355f017';
export default node;
