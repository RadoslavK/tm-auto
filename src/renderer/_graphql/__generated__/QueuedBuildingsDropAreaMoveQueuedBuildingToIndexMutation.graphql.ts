/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type QueuedBuildingsDropAreaMoveQueuedBuildingToIndexMutationVariables = {
    villageId: string;
    queueId: string;
    index: number;
};
export type QueuedBuildingsDropAreaMoveQueuedBuildingToIndexMutationResponse = {
    readonly moveQueuedBuildingToIndex: boolean | null;
};
export type QueuedBuildingsDropAreaMoveQueuedBuildingToIndexMutation = {
    readonly response: QueuedBuildingsDropAreaMoveQueuedBuildingToIndexMutationResponse;
    readonly variables: QueuedBuildingsDropAreaMoveQueuedBuildingToIndexMutationVariables;
};



/*
mutation QueuedBuildingsDropAreaMoveQueuedBuildingToIndexMutation(
  $villageId: ID!
  $queueId: ID!
  $index: Int!
) {
  moveQueuedBuildingToIndex(villageId: $villageId, queueId: $queueId, index: $index)
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
    "name": "moveQueuedBuildingToIndex",
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
    "name": "QueuedBuildingsDropAreaMoveQueuedBuildingToIndexMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
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
    "name": "QueuedBuildingsDropAreaMoveQueuedBuildingToIndexMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "c9626f88275a563bda9837dbef8f165a",
    "id": null,
    "metadata": {},
    "name": "QueuedBuildingsDropAreaMoveQueuedBuildingToIndexMutation",
    "operationKind": "mutation",
    "text": "mutation QueuedBuildingsDropAreaMoveQueuedBuildingToIndexMutation(\n  $villageId: ID!\n  $queueId: ID!\n  $index: Int!\n) {\n  moveQueuedBuildingToIndex(villageId: $villageId, queueId: $queueId, index: $index)\n}\n"
  }
};
})();
(node as any).hash = '3c15d564960c2f6ab943c58bf61cb90c';
export default node;
