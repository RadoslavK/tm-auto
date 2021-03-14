/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type QueuedBuildingsDropAreaMoveQueuedBuildingsBlockToIndexMutationVariables = {
    villageId: string;
    topBuildingQueueId: string;
    bottomBuildingQueueId: string;
    index: number;
};
export type QueuedBuildingsDropAreaMoveQueuedBuildingsBlockToIndexMutationResponse = {
    readonly moveQueuedBuildingsBlockToIndex: boolean | null;
};
export type QueuedBuildingsDropAreaMoveQueuedBuildingsBlockToIndexMutation = {
    readonly response: QueuedBuildingsDropAreaMoveQueuedBuildingsBlockToIndexMutationResponse;
    readonly variables: QueuedBuildingsDropAreaMoveQueuedBuildingsBlockToIndexMutationVariables;
};



/*
mutation QueuedBuildingsDropAreaMoveQueuedBuildingsBlockToIndexMutation(
  $villageId: ID!
  $topBuildingQueueId: ID!
  $bottomBuildingQueueId: ID!
  $index: Int!
) {
  moveQueuedBuildingsBlockToIndex(villageId: $villageId, topBuildingQueueId: $topBuildingQueueId, bottomBuildingQueueId: $bottomBuildingQueueId, index: $index)
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
    "name": "moveQueuedBuildingsBlockToIndex",
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
    "name": "QueuedBuildingsDropAreaMoveQueuedBuildingsBlockToIndexMutation",
    "selections": (v4/*: any*/),
    "type": "Mutation",
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
    "name": "QueuedBuildingsDropAreaMoveQueuedBuildingsBlockToIndexMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "f97eb31008911a980e87f1a22012f8d5",
    "id": null,
    "metadata": {},
    "name": "QueuedBuildingsDropAreaMoveQueuedBuildingsBlockToIndexMutation",
    "operationKind": "mutation",
    "text": "mutation QueuedBuildingsDropAreaMoveQueuedBuildingsBlockToIndexMutation(\n  $villageId: ID!\n  $topBuildingQueueId: ID!\n  $bottomBuildingQueueId: ID!\n  $index: Int!\n) {\n  moveQueuedBuildingsBlockToIndex(villageId: $villageId, topBuildingQueueId: $topBuildingQueueId, bottomBuildingQueueId: $bottomBuildingQueueId, index: $index)\n}\n"
  }
};
})();
(node as any).hash = '68e60fb031868d20c69c32e1fc4bd1e2';
export default node;
