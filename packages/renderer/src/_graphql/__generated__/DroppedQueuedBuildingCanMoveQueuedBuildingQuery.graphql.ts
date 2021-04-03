/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type DroppedQueuedBuildingCanMoveQueuedBuildingQueryVariables = {
    villageId: string;
    queueId: string;
    targetQueueId: string;
};
export type DroppedQueuedBuildingCanMoveQueuedBuildingQueryResponse = {
    readonly canMoveQueuedBuilding: boolean;
};
export type DroppedQueuedBuildingCanMoveQueuedBuildingQuery = {
    readonly response: DroppedQueuedBuildingCanMoveQueuedBuildingQueryResponse;
    readonly variables: DroppedQueuedBuildingCanMoveQueuedBuildingQueryVariables;
};



/*
query DroppedQueuedBuildingCanMoveQueuedBuildingQuery(
  $villageId: ID!
  $queueId: ID!
  $targetQueueId: ID!
) {
  canMoveQueuedBuilding(villageId: $villageId, queueId: $queueId, targetQueueId: $targetQueueId)
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "queueId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "targetQueueId"
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
        "name": "queueId",
        "variableName": "queueId"
      },
      {
        "kind": "Variable",
        "name": "targetQueueId",
        "variableName": "targetQueueId"
      },
      {
        "kind": "Variable",
        "name": "villageId",
        "variableName": "villageId"
      }
    ],
    "kind": "ScalarField",
    "name": "canMoveQueuedBuilding",
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
    "name": "DroppedQueuedBuildingCanMoveQueuedBuildingQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "DroppedQueuedBuildingCanMoveQueuedBuildingQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "3555cb114b2d9ac345fa68ebf4b0926c",
    "id": null,
    "metadata": {},
    "name": "DroppedQueuedBuildingCanMoveQueuedBuildingQuery",
    "operationKind": "query",
    "text": "query DroppedQueuedBuildingCanMoveQueuedBuildingQuery(\n  $villageId: ID!\n  $queueId: ID!\n  $targetQueueId: ID!\n) {\n  canMoveQueuedBuilding(villageId: $villageId, queueId: $queueId, targetQueueId: $targetQueueId)\n}\n"
  }
};
})();
(node as any).hash = '6cee9a84a46386bdb05547a033bb6a94';
export default node;
